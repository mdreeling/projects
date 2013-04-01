//
//  ExpediaBuddyAppDelegate.h
//  ExpediaBuddy
//
//  Created by Neo Matrix on 08/03/2009.
//  Copyright None 2009. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "SwitchViewController.h"

@class ExpediaBuddyViewController;

@interface ExpediaBuddyAppDelegate : NSObject <UIApplicationDelegate> {
    UIWindow *window;
    ExpediaBuddyViewController *viewController;
	IBOutlet SwitchViewController *switchViewController;
}

@property (nonatomic, retain) IBOutlet UIWindow *window;
@property (nonatomic, retain) IBOutlet ExpediaBuddyViewController *viewController;
@property (nonatomic, retain) IBOutlet SwitchViewController *switchViewController;

@end

