//
//  ItinsViewController.m
//  ExpBuddyNav
//
//  Created by Neo Matrix on 18/03/2009.
//  Copyright 2009 None. All rights reserved.
//

#import "ItinsViewController.h"
#import "NavAppDelegate.h"
#import "Itinerary.h"

@implementation ItinsViewController
@synthesize preController, printReadyData;


- (void)dealloc {
    [super dealloc];
	[printReadyData release];
	[preController release];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
	
	static NSString *MyIdentifier = @"MyIdentifier";
	
	UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:MyIdentifier];
	if (cell == nil) {
		cell = [[[UITableViewCell alloc] initWithFrame:CGRectZero reuseIdentifier:MyIdentifier] autorelease];
	}
	
	NavAppDelegate *appDelegate = (NavAppDelegate *)[[UIApplication sharedApplication] delegate];
	Itinerary *f = (Itinerary *)[appDelegate.dataManager.myData.itins objectAtIndex:indexPath.row];
	
	[cell setText:f.name];
	
	//[f release];
	
	// Set up the cell
	return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
	[self pushNextView:indexPath];
}

-(void) pushNextView:(NSIndexPath *)indexPath
{
	NavAppDelegate *delegate = [[UIApplication sharedApplication] delegate];
	
	if (preController == nil)
		preController = [[ItineraryPreViewController alloc] 
						   initWithNibName:@"ItineraryPreView" bundle:[NSBundle mainBundle]];
	
	preController.title = @"Details";
	NSUInteger row = [indexPath row];
	
	Itinerary *selected = [delegate.dataManager.myData.itins objectAtIndex:row];
	preController.selectedItinerary = selected;
	NSLog(@"exbuddia - Tapped accessory button from itinerary %@",selected.itnId);
	[delegate.navController pushViewController:preController animated:YES];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning]; // Releases the view if it doesn't have a superview
    // Release anything that's not essential, such as cached data
}

#pragma mark Table view methods

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
		//NSLog(@"cells3");
    return 1;
}


- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
	NavAppDelegate *appDelegate = (NavAppDelegate *)[[UIApplication sharedApplication] delegate];
	NSInteger myCount = appDelegate.dataManager.myData.itins.count;
	//NSLog(@"numberOfRowsInSection %i",myCount);
	return myCount;
}

// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
    [super viewDidLoad];
}

#pragma mark -
#pragma mark Table Delegate Methods
- (UITableViewCellAccessoryType)tableView:(UITableView *)tableView 
		 accessoryTypeForRowWithIndexPath:(NSIndexPath *)indexPath
{
	return UITableViewCellAccessoryDetailDisclosureButton;
}

- (void)tableView:(UITableView *)tableView 
accessoryButtonTappedForRowWithIndexPath:(NSIndexPath *)indexPath
{	
[self pushNextView:indexPath];
}

@end

