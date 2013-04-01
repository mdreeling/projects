//
//  CompleteItineraryView.h
//  ExpBuddyNav
//
//  Created by Neo Matrix on 22/03/2009.
//  Copyright 2009 None. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "HTMLDetailViewController.h"
#import "Itinerary.h"
#import "ExpediaSiteInterface.h"

@interface CompleteItineraryViewController : UITableViewController	<UITableViewDelegate, UITableViewDataSource> {
		NSArray	*list;
		HTMLDetailViewController *childController;
		Itinerary *selectedItinerary;
		Itinerary *itinDetails;
		ExpediaSiteInterface *expedia;
}
@property (nonatomic, retain) ExpediaSiteInterface *expedia;
@property (nonatomic, retain) NSArray *list;
@property (nonatomic, retain) Itinerary *selectedItinerary;
@property (nonatomic, retain) Itinerary *itinDetails;
@end
