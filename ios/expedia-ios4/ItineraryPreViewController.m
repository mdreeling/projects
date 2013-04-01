//
//  ItineraryPreView.m
//  ExpBuddyNav
//
//  Created by Neo Matrix on 4/11/09.
//  Copyright 2009 None. All rights reserved.
//

#import "ItineraryPreViewController.h"
#import "NavAppDelegate.h"

@implementation ItineraryPreViewController
@synthesize array,selectedItinerary,htmlDetailController,voucherView;

// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
    [super viewDidLoad];
	array = [[NSMutableArray alloc] init];
	NavAppDelegate *delegate = [[UIApplication sharedApplication] delegate];
	
	if(delegate.offline){
		[array addObject:@"Complete Itinerary (Offline)"];
		[array addObject:@"Vouchers (Offline)"];
	}else{
		[array addObject:@"Complete Itinerary"];
		[array addObject:@"Vouchers"];
	}
}


- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
	[self pushNextView:indexPath];
}

-(void) pushNextView:(NSIndexPath *)indexPath
{
	NavAppDelegate *delegate = [[UIApplication sharedApplication] delegate];
	NSUInteger row = [indexPath row];
	/** This is the Complete HTML View **/
	if(row==0){
		if (htmlDetailController == nil) {
			htmlDetailController = [[HTMLDetailViewController alloc] 
									initWithNibName:@"HTMLDetailView" bundle:[NSBundle mainBundle]];
		}
		
		htmlDetailController.title = @"Details";
		Itinerary *selected = [self selectedItinerary];
		htmlDetailController.selectedItinerary = selected;
		NSLog(@"exbuddia - Tapped accessory button from itinerary %@",selected.itnId);
		[delegate.navController pushViewController:htmlDetailController animated:YES];
	}
	if(row==1){
		if (voucherView == nil) {
			voucherView = [[VoucherViewController alloc] init];
		}
		
		voucherView.title = @"Vouchers";
		Itinerary *selected = [self selectedItinerary];
		voucherView.selectedItinerary = selected;
		
		NSLog(@"exbuddia - Tapped row to load vouchers for itinerary %@",selected.itnId);
		[delegate.navController pushViewController:voucherView animated:YES];
	}
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
	
	static NSString *MyIdentifier = @"MyIdentifier";
	
	UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:MyIdentifier];
	if (cell == nil) {
		cell = [[[UITableViewCell alloc] initWithFrame:CGRectZero reuseIdentifier:MyIdentifier] autorelease];
	}
	
	NSString *f = (NSString *)[array objectAtIndex:indexPath.row];
	
	[cell setText:f];
	
	// Set up the cell
	return cell;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning]; // Releases the view if it doesn't have a superview
    // Release anything that's not essential, such as cached data
}

#pragma mark Table view methods

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}


- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
	return array.count;
}

#pragma mark -
#pragma mark Table Delegate Methods
- (UITableViewCellAccessoryType)tableView:(UITableView *)tableView 
		 accessoryTypeForRowWithIndexPath:(NSIndexPath *)indexPath
{
	return UITableViewCellAccessoryDetailDisclosureButton;
}

- (void)dealloc {
    [super dealloc];
	[array release];
	[htmlDetailController release];
	[voucherView release];
	[selectedItinerary release];
}


@end
