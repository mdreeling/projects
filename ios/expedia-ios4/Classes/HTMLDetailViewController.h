//
//  HTMLDetailViewController.h
//  ExpBuddyNav
//
//  Created by Neo Matrix on 24/03/2009.
//  Copyright 2009 None. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Itinerary.h"
#import "ExpediaSiteInterface.h"
#import "TTTableViewController.h"

@interface HTMLDetailViewController : TTTableViewController<UIWebViewDelegate> {
	IBOutlet UIWebView  *webView;
	Itinerary *selectedItinerary;
	ExpediaSiteInterface *expedia;
	IBOutlet UIActivityIndicatorView *htmlProgress;
	IBOutlet UILabel *loading;
}
@property (nonatomic, retain) UIWebView *webView;
@property (nonatomic, retain) ExpediaSiteInterface *expedia;
@property (nonatomic, retain) Itinerary *selectedItinerary;
@property (nonatomic, retain) UILabel *loading;
@property (nonatomic, retain) UIActivityIndicatorView *htmlProgress;
@end
