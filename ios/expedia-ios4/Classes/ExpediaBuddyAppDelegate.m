//
//  ExpediaBuddyAppDelegate.m
//  ExpediaBuddy
//
//  Created by Neo Matrix on 08/03/2009.
//  Copyright None 2009. All rights reserved.
//

#import "ExpediaBuddyAppDelegate.h"
#import "ExpediaBuddyViewController.h"

@implementation ExpediaBuddyAppDelegate

@synthesize window;
@synthesize viewController, switchViewController;


- (void)applicationDidFinishLaunching:(UIApplication *)application {    
    
    // Override point for customization after app launch    
    //[window addSubview:viewController.view];
	[window addSubview:switchViewController.view];
    [window makeKeyAndVisible];
}


- (void)dealloc {
    [viewController release];
	[switchViewController release];
    [window release];
    [super dealloc];
}


@end
