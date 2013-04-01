//
//  YellowViewController.m
//  ExpediaBuddy
//
//  Created by Neo Matrix on 10/03/2009.
//  Copyright 2009 None. All rights reserved.
//

#import "ItineraryViewController.h"
#import "NavAppDelegate.h"
#import "Itinerary.h"

@implementation ItineraryViewController

-(IBAction)yellowButtonPressed:(id)sender
{
	UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Yellow View Button Pressed" message:@"You pressed the button on the yellow view" delegate:nil cancelButtonTitle:@"Yep, I did." otherButtonTitles:nil];
	[alert show];
	[alert release];
}


// The designated initializer. Override to perform setup that is required before the view is loaded.
- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
    if (self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil]) {
        // Custom initialization
    }
    return self;
}



// Implement loadView to create a view hierarchy programmatically, without using a nib.
- (void)loadView {
}



// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
    [super viewDidLoad];
		self.title = @"Fruits";
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
	return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
	NavAppDelegate *appDelegate = (NavAppDelegate *)[[UIApplication sharedApplication] delegate];
    return appDelegate.itineraries.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
	
	static NSString *MyIdentifier = @"MyIdentifier";
	
	UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:MyIdentifier];
	if (cell == nil) {
		cell = [[[UITableViewCell alloc] initWithFrame:CGRectZero reuseIdentifier:MyIdentifier] autorelease];
	}
	
	NavAppDelegate *appDelegate = (NavAppDelegate *)[[UIApplication sharedApplication] delegate];
	Itinerary *f = (Itinerary *)[appDelegate.itineraries objectAtIndex:indexPath.row];
	
	[cell setText:f.name];
	
	//[f release];
	
	// Set up the cell
	return cell;
}


- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
	// Navigation logic
	NavAppDelegate *appDelegate = (NavAppDelegate *)[[UIApplication sharedApplication] delegate];
	Itinerary *itn = (Itinerary *)[appDelegate.itineraries objectAtIndex:indexPath.row];
	/**
	if(self.fruitView == nil) {
		FruitViewController *viewController = [[FruitViewController alloc] initWithNibName:@"FruitViewController" bundle:[NSBundle mainBundle]];
		self.fruitView = viewController;
		[viewController release];
	}**/
	
	//[self.navigationController pushViewController:self.fruitView animated:YES];
	//self.fruitView.title = [itn name];
	//[self.fruitView.fruitDescription setText:[fruit description]];
	
	// [fruit release];
}


// Override to allow orientations other than the default portrait orientation.
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    // Return YES for supported orientations
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning]; // Releases the view if it doesn't have a superview
    // Release anything that's not essential, such as cached data
}


- (void)dealloc {
    [super dealloc];
}


@end
