//
//  Itinerary.h
//  ExpBuddyNav
//
//  Created by Neo Matrix on 18/03/2009.
//  Copyright 2009 None. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Voucher.h"

#define	iField1Key	@"name"
#define	iField2Key	@"description"
#define	iField3Key	@"link"
#define	iField4Key	@"itnId"
#define	iField5Key	@"airlineTicketNum"
#define	iField6Key	@"htmlData"
#define	iField7Key	@"vouchers"

@interface Itinerary : NSObject <NSCoding> {
	NSString *name;
	NSString *description;
	NSString *link;
	NSString *itnId;
	NSString *airlineTicketNum;
	NSData* htmlData;
	NSMutableArray* vouchers;
}
@property(nonatomic,retain) NSString *name;
@property(nonatomic,retain) NSString *description;
@property(nonatomic,retain) NSString *link;
@property(nonatomic,retain) NSString *itnId;
@property(nonatomic,retain) NSData *htmlData;
@property(nonatomic,retain) NSString *airlineTicketNum;
@property(nonatomic,retain) NSMutableArray *vouchers;
-(void)updateVoucher:(Voucher*)itn;
-(void)addVoucher:(Voucher*)itn;
- (id)initWithName:(NSString*)n;
@end
