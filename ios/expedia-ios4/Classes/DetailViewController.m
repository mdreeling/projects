//
//  DetailViewController.m
//  TableView
//
//  Created by iPhone SDK Articles on 1/17/09.
//  Copyright www.iPhoneSDKArticles.com 2009. 
//

#import "DetailViewController.h"

@implementation DetailViewController

@synthesize selectedCountry;

// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
    [super viewDidLoad];
	
	//Display the selected country.
	lblText.text = selectedCountry;
	
	//Set the title of the navigation bar
	self.navigationItem.title = @"Selected Country";
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning]; // Releases the view if it doesn't have a superview
    // Release anything that's not essential, such as cached data
}


- (void)dealloc {
	
	[selectedCountry release];
	[lblText release];
    [super dealloc];
}


@end
