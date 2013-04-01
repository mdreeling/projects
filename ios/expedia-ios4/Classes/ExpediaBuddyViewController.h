//
//  ExpediaBuddyViewController.h
//  ExpediaBuddy
//
//  Created by Neo Matrix on 08/03/2009.
//  Copyright None 2009. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XPathQuery.h"
#import "FirstLevelViewController.h"
#import "ItinsViewController.h"
#import "ExpediaSiteInterface.h"
#import "InternetImage.h"

@interface ExpediaBuddyViewController : FirstLevelViewController  <UIActionSheetDelegate, UIPickerViewDataSource, UIPickerViewDelegate> {
	IBOutlet UITextField *usernameField;
	IBOutlet UITextField *passwordField;
	IBOutlet UIButton *signInButton;
	IBOutlet UIActivityIndicatorView *progress;
	IBOutlet UISwitch *offlineSwitch;
	ItinsViewController *itnController;
	ExpediaSiteInterface *expedia;
	// Site list
	IBOutlet UIPickerView *siteView;
	IBOutlet UILabel *progressText;
	NSMutableArray *arraySites;
	InternetImage *asynchImage;
}
@property (nonatomic, retain) UILabel *progressText;
@property (nonatomic, retain) UISwitch *offlineSwitch;
@property (nonatomic, retain) UIPickerView *siteView;
@property (nonatomic, retain) NSMutableArray *arraySites;
@property (nonatomic, retain) UITextField *usernameField;
@property (nonatomic, retain) ExpediaSiteInterface *expedia;
@property (nonatomic, retain) ItinsViewController *itnController;
@property (nonatomic, retain) UITextField *passwordField;
@property (nonatomic, retain) UIButton *signInButton;
@property (nonatomic, retain) UIActivityIndicatorView *progress;
@property (nonatomic, retain) InternetImage *asynchImage;
- (IBAction) textFieldDoneEditing:(id)sender;
- (IBAction) backgroundClick:(id)sender;
- (IBAction) signIn:(id)sender;
- (BOOL) pageContainsSignInError:(NSString*)html;
- (void) updateFields;
- (void) downloadImageFromInternet:(NSString*) urlToImage;
- (void) internetImageReady:(InternetImage*)internetImage;
- (void) testThreading;
- (void) onLoadSuccess:(NSData*)html;
- (void) updateExpGUI:(NSString*)text;
- (void) onLoadError;
- (IBAction) switchChanged:(id)sender;
@end

