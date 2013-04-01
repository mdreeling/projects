//
//  ItinsViewController.h
//  ExpBuddyNav
//
//  Created by Neo Matrix on 18/03/2009.
//  Copyright 2009 None. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "HTMLDetailViewController.h"
#import "ItineraryPreViewController.h"

@interface ItinsViewController : TTTableViewController {
	ItineraryPreViewController *preController;
	NSData *printReadyData;
}
-(void) pushNextView:(NSIndexPath *)indexPath;
@property (nonatomic, retain) ItineraryPreViewController *preController;
@property (nonatomic, retain) NSData *printReadyData;
@end
