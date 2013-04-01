//
//  ItineraryPreView.h
//  ExpBuddyNav
//
//  Created by Neo Matrix on 4/11/09.
//  Copyright 2009 None. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Itinerary.h"
#import "HTMLDetailViewController.h"
#import "VoucherViewController.h"

@interface ItineraryPreViewController : TTTableViewController {
	NSMutableArray *array;
	Itinerary *selectedItinerary;
	HTMLDetailViewController *htmlDetailController;
	VoucherViewController *voucherView;
}
-(void) pushNextView:(NSIndexPath *)indexPath;
@property (nonatomic, retain) NSMutableArray *array;
@property (nonatomic, retain) Itinerary *selectedItinerary;
@property (nonatomic, retain) HTMLDetailViewController *htmlDetailController;
@property (nonatomic, retain) VoucherViewController *voucherView;
@end
