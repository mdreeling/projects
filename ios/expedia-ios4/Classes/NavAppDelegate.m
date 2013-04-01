//
//  NavAppDelegate.m
//  Nav
//
//  Created by Jeff LaMarche on 7/22/08.
//  Copyright __MyCompanyName__ 2008. All rights reserved.
//

#import "NavAppDelegate.h"
#import "FlurryAPI.h"

@implementation NavAppDelegate

@synthesize window;
@synthesize navController,switchViewController,dataManager, login, password,offline;

void uncaughtExceptionHandler(NSException *exception) {
    [FlurryAPI logError:@"Uncaught" message:@"Crash!" exception:exception];
}
- (void)applicationDidFinishLaunching:(UIApplication *)application {
	NSSetUncaughtExceptionHandler(&uncaughtExceptionHandler);
	self.offline = NO;
	[FlurryAPI startSessionWithLocationServices:@"PD329WBYQ2QGWWBMPG7Q"];
	dataManager = [[DataManager alloc] init];
	[dataManager load];
	[window addSubview:navController.view];
    [window makeKeyAndVisible];
}

- (void)dealloc {
	[switchViewController release];
	[navController release];
	[window release];
	[login release];
	[password release];
	[dataManager release];
	[super dealloc];
}

@end
