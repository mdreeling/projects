//
//  TabRootViewController.h
//  ExpBuddyNav
//
//  Created by Neo Matrix on 20/03/2009.
//  Copyright 2009 None. All rights reserved.
//

#import <UIKit/UIKit.h>


@interface TabRootViewController : UIViewController {
	IBOutlet UITabBarController *tabBarController;
}
@property (nonatomic, retain) UITabBarController *tabBarController;
@end
