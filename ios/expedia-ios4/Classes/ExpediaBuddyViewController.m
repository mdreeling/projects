//
//  ExpediaBuddyViewController.m
//  ExpediaBuddy
//
//  Created by Neo Matrix on 08/03/2009.
//  Copyright None 2009. All rights reserved.
//

#import "ExpediaBuddyViewController.h"

#import "NavAppDelegate.h"
#import "Itinerary.h"
#import "Reachability.h"
#import "SFHFKeychainUtils.h"
#import "FlurryAPI.h"
#import "ExpediaUtils.h"
#import "ThreadRequestLoader.h"

@implementation ExpediaBuddyViewController
@synthesize usernameField, passwordField, signInButton, progress,itnController, expedia,arraySites, siteView, asynchImage, progressText,offlineSwitch;



// The designated initializer. Override to perform setup that is required before the view is loaded.
- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
	if (self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil]) {
		// Custom initialization
	}
	return self;
}


/*
 // Implement loadView to create a view hierarchy programmatically, without using a nib.
 - (void)loadView {
 }
 */
- (void) testThreading
{
	// Create a instance of InternetImage
	ThreadRequestLoader *aps = [[ThreadRequestLoader alloc] init];
	
	aps.actionTarget = self;
	// Start downloading the image with self as delegate receiver
	[aps loadStringURL:@"http://www.google.ie"];
}

- (void) downloadImageFromInternet:(NSString*) urlToImage
{
	// Create a instance of InternetImage
	asynchImage = [[InternetImage alloc] initWithUrl:urlToImage];
	
	// Start downloading the image with self as delegate receiver
	[asynchImage downloadImage:self];
}

-(void) updateExpGUI:(NSString*)text
{	
	[progressText setHidden:NO];
	progressText.text = text;
	[signInButton setEnabled:YES];
}

-(void) onLoadError
{	
	[progressText setHidden:YES];
	[progress stopAnimating];
	progressText.text = @"";
	[FlurryAPI logEvent:@"APP_COULD_NOT_LOAD_URL"];
	UIAlertView *alert = [[[UIAlertView alloc] initWithTitle:@"Unable to contact expedia" 
													 message:@"Could not contact expedia, an unknown error occurred. Check your internet connection, and make sure that you have access to the internet"
													delegate:nil 
										   cancelButtonTitle:@"OK" 
										   otherButtonTitles: nil]autorelease];
	[alert show];
}

-(void) onLoadSuccess:(NSData*)html
{	
	NavAppDelegate *delegate = [[UIApplication sharedApplication] delegate];
	BOOL doPush = FALSE; 
	// The image has been downloaded. Put the image into the UIImageView
	//[imageView setImage:downloadedImage.Image];
	NSLog(@"onLoadSuccess - Site downloaded ");
	
	/** 2. If you never made it past the sign-in page - better say so **/
	if([ExpediaUtils findRegexInPage:html andRegex:REGEX_SIGNIN_PAGE_IDENTIFIER] || 
	   [ExpediaUtils findRegexInPage:html andRegex:REGEX_SIGNIN_REDIRECT_PAGE_IDENTIFIER])
	{	
		NSLog(@"exbuddia - Looks like a bad sign-in - the server saw:\n%@", [[[NSString alloc] initWithData:html encoding: NSASCIIStringEncoding] autorelease]);
		[FlurryAPI logEvent:@"APP_PAGE_BAD_SIGNIN"];
		UIAlertView *alert = [[[UIAlertView alloc] initWithTitle:@"Unable To Signin" 
														 message:@"Could not sign in. Bad username or password."
														delegate:nil 
											   cancelButtonTitle:@"OK" 
											   otherButtonTitles: nil]autorelease];
		[alert show];
		return;
	}
	/** 3. If you never made it to the itinerary page - better say so **/
	if(![ExpediaUtils findRegexInPage:html andRegex:REGEX_ITINERARY_PAGE_IDENTIFIER])
	{	
		NSLog(@"exbuddia - No itinerary listing - instead the server saw:\n%@", [[[NSString alloc] initWithData:html encoding: NSASCIIStringEncoding] autorelease]);
		[FlurryAPI logEvent:@"APP_PAGE_NO_ITINS_LISTING"];
		
		UIAlertView *alert = [[[UIAlertView alloc] initWithTitle:@"Itinerary Listing Unavailable" 
														 message:@"We're very sorry, but your itineraries could not be loaded. This may be due to a site error or dropped connection. Please try again later."
														delegate:nil 
											   cancelButtonTitle:@"OK" 
											   otherButtonTitles: nil]autorelease];
		[alert show];
		return;
	}
	
	/** Parse the page and add the itineraries to the global object **/
	[expedia parse:html];
	[self updateFields];
	progressText.text = @"";
	doPush = TRUE;
	
	[progress stopAnimating];
	if(doPush) {
		[delegate.navController pushViewController:itnController animated:YES];
	}
	
	[signInButton setEnabled: YES];
}



-(void) internetImageReady:(InternetImage*)downloadedImage
{	
	// The image has been downloaded. Put the image into the UIImageView
	//[imageView setImage:downloadedImage.Image];
	NSLog(@"exbuddia - Image downloaded ");
	
}

- (IBAction)signIn:(id)sender
{	
	[signInButton setEnabled: NO];
	[self updateFields];
	/** Global App Delegate **/
	NavAppDelegate *delegate = [[UIApplication sharedApplication] delegate];
	BOOL doPush = FALSE; 
	[progress hidesWhenStopped];
	expedia = [[ExpediaSiteInterface alloc] init];
	[progress startAnimating];
	/**
	 * Someone is trying to go online - but there is no internet connection.
	 */
	if (!delegate.offline && [[Reachability sharedReachability] internetConnectionStatus] == NotReachable ) {
		[progress stopAnimating];
		[signInButton setEnabled: YES];
		UIAlertView *alert = [[[UIAlertView alloc] initWithTitle:@"No Internet Connection" 
														 message:@"You cannot use Exbuddia in online mode right now, because there is no internet connection avaiable."
														delegate:nil 
											   cancelButtonTitle:@"OK" 
											   otherButtonTitles: nil]autorelease];
		[alert show];
		return;
	}
	/* At this point we need to see if we have an internet connection
	 * if we do not have one, then we need to check to see if we have some local
	 * itinerary data. If so then we display that.
	 * If we are running offline, and there is no data, we need to tell the user that they need to 
	 * first go online at least once and store the data.
	 * Otherwise we just use the online connection.
	 *
	 * If the user has specifically forced online mode, we'll try and help them out by letting them give it a go....
	 */
	if (delegate.offline || [[Reachability sharedReachability] internetConnectionStatus] == NotReachable ) {
		[signInButton setTitle:@"Sign In (Offline Mode)" forState:UIControlStateNormal];
		if(delegate.dataManager.myData.itins.count == 0){
			UIAlertView *alert = [[[UIAlertView alloc] initWithTitle:@"No Saved Data" 
															 message:@"Unfortunately, you cannot use Exbuddia in offline mode right now because you do not have any saved itineraries.You need to go online first and browse your itineraries. Then they will be available for offline browsing."
															delegate:nil 
												   cancelButtonTitle:@"OK" 
												   otherButtonTitles: nil]autorelease];
			[alert show];
			[FlurryAPI logEvent:@"APP_START_CANNOT_SIGNIN_OFFLINE_NO_ITINERARIES_SAVED"];
			[progress stopAnimating];
			[signInButton setEnabled: YES];
			return;
		} else {
			/** We are offline and we also have some saved data **/
			doPush = TRUE;
			
			progressText.text = @"";
			doPush = TRUE;
			
			[progress stopAnimating];
			if(doPush) {
				[delegate.navController pushViewController:itnController animated:YES];
			}
			
			[signInButton setEnabled: YES];
		}
	} else {
		/** 1. Login to expedia to the main itinerary page **/
		expedia.callingClass = self;
		[expedia loginWithThread];
	}
}

/*
 Basically checks the signin page which is returned
 from the itinerary load from Expedia to see if it contains a 
 SignIn error (indicating that the login was unsuccessful).
 
 There are many ways to check for a signin error, one being to check
 for the CSS class of the error which normally appears on every national site.
 */
- (BOOL)pageContainsSignInError:(NSString*)html
{
	return TRUE;
}

-(void)actionSheet:(UIActionSheet *)actionSheet didDismissWithButtonIndex:(NSInteger)buttonIndex
{
	if(!(buttonIndex == [actionSheet cancelButtonIndex]))
	{
		NSString *msg = nil;
		
		if(usernameField.text.length > 0){
			msg = [[[NSString alloc] initWithFormat:@"Username %@ field OK",usernameField.text] autorelease];
		}
		else
		{
			msg = @"Username field ok";
		}
		
		UIAlertView *alert = [[[UIAlertView alloc] initWithTitle:@"Signing in"
														 message:msg
														delegate:self
											   cancelButtonTitle:@"Phew"
											   otherButtonTitles:nil] autorelease];
		
		[alert show];
	}
}

- (IBAction)backgroundClick:(id)sender
{
	[usernameField resignFirstResponder];
	[passwordField resignFirstResponder];
	[self updateFields];
}

- (IBAction)textFieldDoneEditing:(id)sender
{
	[sender resignFirstResponder];
	[self updateFields];
	
}

- (void)updateFields 
{
	NavAppDelegate *delegate = [[UIApplication sharedApplication] delegate];
	delegate.login = usernameField.text;
	delegate.password = passwordField.text;
}
// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
	
	arraySites = [[NSMutableArray alloc] init];
	[arraySites addObject:EXPEDIA_DOMAIN_SMALL];
	[arraySites addObject:@"expedia.co.uk"];
	[arraySites addObject:@"expedia.de"];
	[arraySites addObject:@"expedia.fr"];
	[arraySites addObject:@"expedia.it"];
	[arraySites addObject:@"expedia.at"];
	[arraySites addObject:@"expedia.ie"];
	
	
	[super viewDidLoad];
	UIImage *buttonImageNormal = [UIImage imageNamed:@"whiteButton.png"];
	UIImage *stretchableButtonImageNormal = [buttonImageNormal
											 stretchableImageWithLeftCapWidth:12 topCapHeight:0];
	[signInButton setBackgroundImage:stretchableButtonImageNormal
							forState:UIControlStateNormal];
	
	UIImage *buttonImagePressed = [UIImage imageNamed:@"blueButton.png"];
	UIImage *stretchableButtonImagePressed = [buttonImagePressed
											  stretchableImageWithLeftCapWidth:12 topCapHeight:0];
	[signInButton setBackgroundImage:stretchableButtonImagePressed
							forState:UIControlStateHighlighted];
	
	itnController = [[ItinsViewController alloc] initWithNibName:@"ItineraryView" bundle:[NSBundle mainBundle]];
	itnController.title = @"Itineraries";

	if ( [[Reachability sharedReachability] internetConnectionStatus] == NotReachable ) {
		[offlineSwitch setOn:YES animated:NO];  
		[signInButton setTitle:@"Sign In (Offline Mode)" forState:UIControlStateNormal];
		/** Global App Delegate **/
		NavAppDelegate *delegate = [[UIApplication sharedApplication] delegate];
		delegate.offline = (BOOL) offlineSwitch.isOn;

		return;
	}
}

- (void)didReceiveMemoryWarning {
	[super didReceiveMemoryWarning]; // Releases the view if it doesn't have a superview
	// Release anything that's not essential, such as cached data
}

#pragma mark ---- UIPickerViewDataSource delegate methods ----

// returns the number of columns to display.
- (NSInteger)numberOfComponentsInPickerView:(UIPickerView *)pickerView
{
	return 1;
}

// returns the number of rows
- (NSInteger)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component
{
	return [arraySites count];
}

- (NSString *)pickerView:(UIPickerView *)thePickerView titleForRow:(NSInteger)row forComponent:(NSInteger)component {
	
	return [arraySites objectAtIndex:row];
}

- (void)viewWillAppear:(BOOL)animated
{	NavAppDelegate *delegate = [[UIApplication sharedApplication] delegate];
	NSUserDefaults *prefs = [NSUserDefaults standardUserDefaults];
	NSString *pword = [prefs objectForKey:EXPEDIA_DOMAIN_SMALL];
	usernameField.text = pword;
	// Secure 
	NSError *error = nil;
	NSString *pass = [SFHFKeychainUtils getPasswordForUsername:usernameField.text
												andServiceName:EXPEDIA_DOMAIN_SMALL error:&error];
	if(error != nil){
		NSLog(@"pass = %@ error %@",pass,[error localizedDescription]);
	}
	passwordField.text = pass;
	delegate.login = usernameField.text;
	delegate.password = passwordField.text;
}

- (IBAction) switchChanged:(id)sender
{
	UISwitch *swt = (UISwitch *) sender;
	/** Global App Delegate **/
	NavAppDelegate *delegate = [[UIApplication sharedApplication] delegate];
	delegate.offline = (BOOL) swt.isOn;
	
	if(!delegate.offline){
		[signInButton setTitle:@"Sign In" forState:UIControlStateNormal];
	}
	if(delegate.offline){
		[signInButton setTitle:@"Sign In (Offline Mode)" forState:UIControlStateNormal];
	}
}

- (void)viewWillDisappear:(BOOL)animated{
	/** At the point of the view dissapearing, we know that 
	 *  the username and password have been accepted, so its best to store them now.
	 **/
	NSError *error = nil;
	NSUserDefaults *prefs = [NSUserDefaults standardUserDefaults];
	[prefs setObject:usernameField.text forKey:EXPEDIA_DOMAIN_SMALL];
	[SFHFKeychainUtils storeUsername:usernameField.text
						 andPassword:passwordField.text forServiceName:EXPEDIA_DOMAIN_SMALL updateExisting:YES error:&error];
	if(error != nil){
		NSLog(@"exbuddia - Error storing password - error is %@",[error localizedDescription]);
		[FlurryAPI logEvent:@"APP_ERROR_STORING_PASSWORD"];
	}
}

- (void)dealloc {
	[super dealloc];
	[usernameField release];
	[passwordField release];
	[signInButton release];
	[progress release];
	[itnController release];
	[expedia release];
	[arraySites release];
	[siteView release];
}

@end
