//
//  TestController.h
//  ExpBuddyNav
//
//  Created by Neo Matrix on 4/13/09.
//  Copyright 2009 None. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "TTPhotoViewController.h"
#import "ExpediaSiteInterface.h"
#import "MockPhotoSource.h"

@interface VoucherViewController : TTPhotoViewController {
	ExpediaSiteInterface *expedia;
	Itinerary *selectedItinerary;
	NSMutableArray *voucherPhotos;
}
- (NSString *)getDataFilePath:(NSString*) filename;
- (MockPhotoSource*) getVoucherPhotosForViewer:(NSArray *)vouchers;
- (void)loadVouchers;
@property (nonatomic, retain) ExpediaSiteInterface *expedia;
@property (nonatomic, retain) Itinerary *selectedItinerary;
@property (nonatomic, retain) NSMutableArray *voucherPhotos;
@end
