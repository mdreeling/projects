//
//  RootViewController.m
//  Nav
//
//  Created by Jeff LaMarche on 7/22/08.
//  Copyright 2008 __MyCompanyName__. All rights reserved.
//

#import "RootViewController.h"
#import "NavAppDelegate.h"
#import "ExpediaBuddyViewController.h"
#import "FirstLevelViewController.h"
#import "DetailViewController.h"
#import "FlurryAPI.h"

@implementation RootViewController
@synthesize controllers;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
	if (self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil]) {
		// Initialization code
	}
	return self;
}

/*
 Implement loadView if you want to create a view hierarchy programmatically
- (void)loadView {
}
 */

- (void)viewDidLoad {
	self.title = @"Expedia Buddy";
	NSMutableArray *array = [[[NSMutableArray alloc] init] autorelease];
	
	// Disclosure Button
	ExpediaBuddyViewController *disclosureButtonController = [[[ExpediaBuddyViewController alloc] initWithNibName:@"ExpediaBuddyViewController" bundle:[NSBundle mainBundle]] autorelease];
	disclosureButtonController.rowImage = [UIImage imageNamed:@"disclosureButtonControllerIcon.png"];
	[array addObject:disclosureButtonController];

	NavAppDelegate *delegate = [[UIApplication sharedApplication] delegate];
	NSLog(@"exbuddia - Loading ExbuddiaData object with %d itineraries",delegate.dataManager.myData.itins.count);
	ExbuddiaData *exp = [delegate.dataManager myData];
	exp.defaultSite = @"expedia.com";
	disclosureButtonController.title = [NSString stringWithFormat:@"Sign In (%@)",exp.defaultSite];
	UIApplication *app = [UIApplication sharedApplication];
	[[NSNotificationCenter defaultCenter] addObserver:self
											 selector:@selector(applicationWillTerminate:)
												 name:UIApplicationWillTerminateNotification 
											   object:app];
		
	[super viewDidLoad];
	self.controllers = array;	
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
	return 1;
}

// Update the table before the view displays.
- (void)viewWillAppear:(BOOL)animated {
    [self.tableView reloadData];
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
	[controllers release];
	[super dealloc];
}

#pragma mark -
#pragma mark Table Data Source Methods
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
	return [self.controllers count];
}
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
	
	static NSString *TopLevelCellIdentifier = @"TopLevelCellIdentifier";
	
	UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:TopLevelCellIdentifier];
	if (cell == nil) {
		cell = [[[UITableViewCell alloc] initWithFrame:CGRectZero reuseIdentifier:TopLevelCellIdentifier] autorelease];
	}
	// Configure the cell
	NSUInteger row = [indexPath row];
	FirstLevelViewController *controller = [controllers objectAtIndex:row];
	cell.text = controller.title;
	cell.image = controller.rowImage;
	return cell;
}

#pragma mark -
#pragma mark Table View Delegate Methods
- (UITableViewCellAccessoryType)tableView:(UITableView *)tableView accessoryTypeForRowWithIndexPath:(NSIndexPath *)indexPath
{
	return UITableViewCellAccessoryDisclosureIndicator;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
	NSUInteger row = [indexPath row];
	FirstLevelViewController *nextController = [self.controllers objectAtIndex:row];
	
	NavAppDelegate *delegate = [[UIApplication sharedApplication] delegate];
	[delegate.navController pushViewController:nextController animated:YES];
}

- (void)applicationWillTerminate:(NSNotification *)notification
{	
	NavAppDelegate *delegate = [[UIApplication sharedApplication] delegate];
	
	if(delegate.offline == NO){
		//NSLog(@"exbuddia - Saving ExbuddiaData object with %@ itineraries",delegate.dataManager.myData.itins.count);
		NSLog(@"exbuddia - Saving ExbuddiaData object after online session");
		[delegate.dataManager save];
		[FlurryAPI logEvent:@"APP_TERMINATE_WITH_SAVE"];
	}else{
		[FlurryAPI logEvent:@"APP_TERMINATE_NO_SAVE"];
	}
}
@end
