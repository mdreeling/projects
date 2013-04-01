//
//  Voucher.h
//  ExpBuddyNav
//
//  Created by Neo Matrix on 4/13/09.
//  Copyright 2009 None. All rights reserved.
//

#import <Foundation/Foundation.h>

#define	vField1Key	@"voucherParams"
#define	vField2Key	@"voucherUrl"
#define	vField3Key	@"itineraryId"
#define	vField4Key	@"binaryData"
#define	vField5Key	@"voucherId"
#define	vField6Key	@"voucherLocalFileName"

@interface Voucher : NSObject <NSCoding,NSCopying> {
	NSString *voucherUrl;
	NSString *voucherParams;
	NSString *itineraryId;
	NSString *voucherId;
	NSData *binaryData;
	NSString *voucherLocalFileName;
}
@property(nonatomic,retain) NSString *voucherId;
@property(nonatomic,retain) NSString *voucherUrl;
@property(nonatomic,retain) NSString *voucherParams;
@property(nonatomic,retain) NSString *itineraryId;
@property(nonatomic,retain) NSData *binaryData;
@property(nonatomic,retain) NSString *voucherLocalFileName;
@end
