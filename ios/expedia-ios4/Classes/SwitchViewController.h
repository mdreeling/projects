//
//  SwitchViewController.h
//  ExpediaBuddy
//
//  Created by Neo Matrix on 10/03/2009.
//  Copyright 2009 None. All rights reserved.
//

#import <UIKit/UIKit.h>

@class ExpediaBuddyViewController;
@class ItineraryViewController;

@interface SwitchViewController : UIViewController {
	ItineraryViewController *yellowViewController;
	ExpediaBuddyViewController *blueViewController;
}

@property (retain,nonatomic) ItineraryViewController *yellowViewController;
@property (retain,nonatomic) ExpediaBuddyViewController *blueViewController;
-(IBAction)switchViews:(id)sender;

@end
