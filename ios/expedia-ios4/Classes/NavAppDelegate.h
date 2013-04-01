//
//  NavAppDelegate.h
//  Nav
//
//  Created by Jeff LaMarche on 7/22/08.
//  Copyright __MyCompanyName__ 2008. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "SwitchViewController.h"
#import "DataManager.h"

@class NavViewController;

@interface NavAppDelegate : NSObject <UIApplicationDelegate> {
	IBOutlet UIWindow *window;
	IBOutlet UINavigationController *navController;
	IBOutlet SwitchViewController *switchViewController;
	DataManager *dataManager;
	NSString *login;
	NSString *password;
	BOOL offline;
}
@property (nonatomic, retain) DataManager *dataManager;
@property (nonatomic, retain) UIWindow *window;
@property (nonatomic, retain) NSString *login;
@property (nonatomic, getter=isOffline) BOOL offline;
@property (nonatomic, retain) NSString *password;
@property (nonatomic, retain) UINavigationController *navController;
@property (nonatomic, retain) IBOutlet SwitchViewController *switchViewController;

@end

