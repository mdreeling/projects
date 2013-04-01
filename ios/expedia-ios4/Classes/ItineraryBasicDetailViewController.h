//
//  ItineraryBasicDetailViewController.h
//  ExpBuddyNav
//
//  Created by Neo Matrix on 22/03/2009.
//  Copyright 2009 None. All rights reserved.
//

#define kNumberOfEditableRows	4
#define kNameRowIndex			0
#define kFromYearRowIndex		1
#define kToYearRowIndex			2
#define kPartyIndex				3

#define kLabelTag			4096


#import <UIKit/UIKit.h>
#import "Itinerary.h"

@interface ItineraryBasicDetailViewController : UITableViewController <UITableViewDelegate, UITableViewDataSource, UITextFieldDelegate> {
	Itinerary *itn;
	NSArray *fieldLabels;
	NSMutableDictionary *tempValues;
	UITextField *textFieldBeingEdited;
}

@property (nonatomic, retain) Itinerary *itn;
@property (nonatomic, retain) NSArray *fieldLabels;
@property (nonatomic, retain) NSMutableDictionary *tempValues;
@property (nonatomic, retain) UITextField *textFieldBeingEdited;

- (IBAction)cancel:(id)sender;
- (IBAction)save:(id)sender;
- (IBAction)textFieldDone:(id)sender;
@end
