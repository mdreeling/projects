//
//  CompleteItineraryView.m
//  ExpBuddyNav
//
//  Created by Neo Matrix on 22/03/2009.
//  Copyright 2009 None. All rights reserved.
//

#import "CompleteItineraryViewController.h"
#import "NavAppDelegate.h"

@implementation CompleteItineraryViewController
@synthesize list,selectedItinerary,expedia,itinDetails;

-(id)initWithStyle:(UITableViewStyle)style {
	if (self = [super initWithStyle:style]) {
		
	}
	return self;
}
- (void)viewDidLoad {
	expedia = [[ExpediaSiteInterface alloc] init];
	NSArray *array = [[NSArray alloc] initWithObjects:@"General", @"Hotels",@"Flights",@"Cars",@"Activities", nil];
	self.list = array;
	[array release];
	[super viewDidLoad];
	// Load the Itinerary Page
	//NSData *itinData = [expedia loadItineraryURL:selectedItinerary.itnId];
	// Parse the Itinerary Page into a complete Itinerary Object Model
	//itinDetails = [expedia parseItineraryPage:itinData];
}



- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
	// Return YES for supported orientations
	return (interfaceOrientation == UIInterfaceOrientationPortrait);
}


- (void)didReceiveMemoryWarning {
	[super didReceiveMemoryWarning]; // Releases the view if it doesn't have a superview
	// Release anything that's not essential, such as cached data
}


- (void)dealloc {
	[childController release];
	//[expedia release];
	[super dealloc];
}

#pragma mark -
#pragma mark Table Data Source Methods
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
	return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
	return [list count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView 
		 cellForRowAtIndexPath:(NSIndexPath *)indexPath {
	
	static NSString *MyIdentifier = @"DisclosureButtonCellIdentifier";
	
	UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:MyIdentifier];
	if (cell == nil) {
		cell = [[[UITableViewCell alloc] initWithFrame:CGRectZero 
									   reuseIdentifier:MyIdentifier] autorelease];
	}
	// Configure the cell
	NSUInteger row = [indexPath row];
	NSString *rowString = [list objectAtIndex:row];
	cell.text = rowString;
	[rowString release];
	return cell;
}

#pragma mark -
#pragma mark Table Delegate Methods
- (UITableViewCellAccessoryType)tableView:(UITableView *)tableView 
		 accessoryTypeForRowWithIndexPath:(NSIndexPath *)indexPath
{
	return UITableViewCellAccessoryDetailDisclosureButton;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
	
	UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Hey, do you see the disclosure button?" 
													message:@"If you're trying to drill down, touch that instead" 
												   delegate:nil 
										  cancelButtonTitle:@"Won't happen again" 
										  otherButtonTitles:nil];
	[alert show];
	[alert release];
	
}
- (void)tableView:(UITableView *)tableView 
accessoryButtonTappedForRowWithIndexPath:(NSIndexPath *)indexPath
{
	if (childController == nil)
		childController = [[HTMLDetailViewController alloc] initWithNibName:@"HTMLDetailView" bundle:nil];
	//[childController Style:UITableViewStyleGrouped];
	//childController.style = style.UITableViewStyleGrouped;
	childController.title = @"Disclosure Button Pressed";
	NSUInteger row = [indexPath row];
	
	NSString *selectedMovie = [list objectAtIndex:row];
	NSString *detailMessage  = [[NSString alloc] 
								initWithFormat:@"You pressed the disclosure button for %@.", selectedMovie];
	//childController.message = detailMessage;

	//childController.itn = itinDetails;
	[detailMessage release];
	
	NavAppDelegate *delegate = [[UIApplication sharedApplication] delegate];
	[delegate.navController pushViewController:childController animated:YES];
	
}
@end
