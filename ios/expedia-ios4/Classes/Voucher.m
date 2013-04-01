//
//  Voucher.m
//  ExpBuddyNav
//
//  Created by Neo Matrix on 4/13/09.
//  Copyright 2009 None. All rights reserved.
//

#import "Voucher.h"

@implementation Voucher
@synthesize voucherUrl,voucherParams,itineraryId,binaryData,voucherId,voucherLocalFileName;

#pragma mark NSCoding
- (void)encodeWithCoder:(NSCoder *)encoder
{
	[encoder encodeObject:voucherUrl forKey:vField1Key];
	[encoder encodeObject:voucherParams forKey:vField2Key];
	[encoder encodeObject:itineraryId forKey:vField3Key];
	[encoder encodeObject:binaryData forKey:vField4Key];
	[encoder encodeObject:voucherId forKey:vField5Key];
	[encoder encodeObject:voucherLocalFileName forKey:vField6Key];
}
- (id)initWithCoder:(NSCoder *)decoder
{
	if (self = [super init])
	{
		self.voucherUrl = [decoder decodeObjectForKey:vField1Key];
		self.voucherParams = [decoder decodeObjectForKey:vField2Key];
		self.itineraryId = [decoder decodeObjectForKey:vField3Key];
		self.binaryData = [decoder decodeObjectForKey:vField4Key];
		self.voucherId = [decoder decodeObjectForKey:vField5Key];
		self.voucherLocalFileName = [decoder decodeObjectForKey:vField6Key];
	}
	
	return self;
}

- (void)dealloc {
    [super dealloc];
	[voucherUrl release];
	[voucherId release];
	[voucherParams release];
	[itineraryId release];
	[binaryData release];
	[voucherLocalFileName release];
}

- (id)copyWithZone:(NSZone *)zone
{
    Voucher *copy = [[[Voucher alloc] init]autorelease];
	copy.voucherId = [self voucherId];
	copy.voucherParams = [self voucherParams];
	copy.itineraryId = [self itineraryId];
	copy.binaryData = [self binaryData];
	copy.voucherLocalFileName = [self voucherLocalFileName];

    return copy;
}

@end
