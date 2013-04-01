//
//  HTMLDetailViewController.m
//  ExpBuddyNav
//
//  Created by Neo Matrix on 24/03/2009.
//  Copyright 2009 None. All rights reserved.
//

#import "HTMLDetailViewController.h"
#import "ExbuddiaData.h"
#import "DataManager.h"
#import "NavAppDelegate.h"
#import "Reachability.h"
#import "FlurryAPI.h"

@implementation HTMLDetailViewController
@synthesize webView, selectedItinerary,expedia,htmlProgress,loading;


// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
	[super viewDidLoad];
	[self.view addSubview: htmlProgress];
}

- (void)webViewDidStartLoad:(UIWebView *)webView {
	[loading setText:@"Loading Itinerary..."];
	[htmlProgress startAnimating];
}

- (void)webViewDidFinishLoad:(UIWebView *)webView {
	[htmlProgress stopAnimating];
		[loading setText:@""];
}

- (void)viewWillDisappear:(BOOL)animated
{
	[webView loadHTMLString:nil baseURL:nil];
}
- (void)viewWillAppear:(BOOL)animated
{		
	[loading setText:@"Loading Itinerary..."];
	[htmlProgress startAnimating];
}

- (void)viewDidAppear:(BOOL)animated
{	
	//[loading setText:@"Loading Itinerary..."];
//	[htmlProgress startAnimating];
	NavAppDelegate *delegate = [[UIApplication sharedApplication] delegate];
	NSData *itinData;
	//selectedItinerary.htmlData = itinData;
	//[cd updateItinerary:selectedItinerary];
	//[[delegate dataManager] save];
	if (delegate.offline || [[Reachability sharedReachability] internetConnectionStatus] == NotReachable ) 
	{	
		[FlurryAPI logEvent:@"OFFLINE_ITINERARY_VIEW"];
		delegate = [[UIApplication sharedApplication] delegate];
		ExbuddiaData* cd = [[delegate dataManager] myData];
		NSLog(@"exbuddia - Loading OFFLINE itinerary view for itinerary %@",selectedItinerary.itnId);
		itinData = [[cd getItineraryById:selectedItinerary.itnId] htmlData];
		self.title = @"Details (Offline)";
	} else {
		[FlurryAPI logEvent:@"LIVE_ITINERARY_VIEW"];
		expedia = [[[ExpediaSiteInterface alloc] init] autorelease];
		NSLog(@"exbuddia - Loading LIVE itinerary view for itinerary %@",selectedItinerary.itnId);
		itinData = [expedia loadItineraryURL:selectedItinerary.itnId];
		selectedItinerary.htmlData = itinData;
		[delegate.dataManager.myData updateItinerary:selectedItinerary];
	}
	
	if(itinData.length == 0){
			UIAlertView *alert = [[[UIAlertView alloc] initWithTitle:@"Empty Itinerary Data" 
													message:@"Unfortunately, Exbuddia could not display your itinerary, the data could not be retrieved. Possibly a network error,or if working offline, an issue with the saved data."
												   delegate:nil 
										  cancelButtonTitle:@"OK" 
										  otherButtonTitles: nil] autorelease];
			[alert show];

		[htmlProgress stopAnimating];
		[loading setText:@""];
		[FlurryAPI logEvent:@"APP_EMPTY_ITINERARY_DATA"];
		return;
	}
	NSString *fileString = [[[NSString alloc] initWithData:itinData encoding:NSASCIIStringEncoding] autorelease];
	[webView loadHTMLString:fileString baseURL:nil];
}

/*
// Override to allow orientations other than the default portrait orientation.
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    // Return YES for supported orientations
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}
*/

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning]; // Releases the view if it doesn't have a superview
    // Release anything that's not essential, such as cached data
}


- (void)dealloc {
    [super dealloc];
	[webView release];
	[selectedItinerary release];
	[expedia release];
	[htmlProgress release];
	[loading release];
}


@end
