//
//  Itinerary.m
//  ExpBuddyNav
//
//  Created by Neo Matrix on 18/03/2009.
//  Copyright 2009 None. All rights reserved.
//

#import "Voucher.h"
#import "Itinerary.h"
#import "FlurryAPI.h"

@implementation Itinerary
@synthesize name,description, link, itnId,airlineTicketNum,htmlData,vouchers;

#pragma mark NSCoding
- (void)encodeWithCoder:(NSCoder *)encoder
{
	[encoder encodeObject:name forKey:iField1Key];
	[encoder encodeObject:description forKey:iField2Key];
	[encoder encodeObject:link forKey:iField3Key];
	[encoder encodeObject:itnId forKey:iField4Key];
	[encoder encodeObject:airlineTicketNum forKey:iField5Key];
	[encoder encodeObject:htmlData forKey:iField6Key];
	[encoder encodeObject:vouchers forKey:iField7Key];
}
- (id)initWithCoder:(NSCoder *)decoder
{
	if (self = [super init])
	{
		self.name = [decoder decodeObjectForKey:iField1Key];
		self.description = [decoder decodeObjectForKey:iField2Key];
		self.link = [decoder decodeObjectForKey:iField3Key];
		self.itnId = [decoder decodeObjectForKey:iField4Key];
		self.airlineTicketNum = [decoder decodeObjectForKey:iField5Key];
		self.htmlData = [decoder decodeObjectForKey:iField6Key];
		self.vouchers = [decoder decodeObjectForKey:iField7Key];
	}

	return self;
}

- (id)initWithName: (NSString*)n {
	self.name = n;
	return self;
}


-(void)addVoucher:(Voucher*)itn
{	
	BOOL alreadyExists = FALSE;
	if(vouchers == nil || vouchers.count ==0)
	{	
		NSLog(@"** exbuddia - Had to create a brand new VOUCHERS object **");
		vouchers = [[NSMutableArray alloc] init];
	}
	
	NSEnumerator *enumerator = [vouchers objectEnumerator];
	Voucher *anObject;
	
	while (anObject = (Voucher*)[enumerator nextObject]) {
		if([itn.voucherParams isEqualToString:anObject.voucherParams])
		{
			NSLog(@"exbuddia - Already stored this voucher. Need to update instead");
			
			alreadyExists = TRUE;
		}
	}
	if(!alreadyExists){
	[vouchers addObject:itn];
	}
}

-(void)updateVoucher:(Voucher*)itn
{
	NSEnumerator *enumerator = [vouchers objectEnumerator];
	Voucher *anObject;
	NSInteger i=0;
	BOOL found = FALSE;
	while (anObject = (Voucher*)[enumerator nextObject]) {
		if([itn.voucherParams isEqualToString:anObject.voucherParams])
		{
			NSLog(@"exbuddia - Updating this voucher %@",itn.voucherParams);
			found = TRUE;
		}
		if(!found)
		{
			i++;
		}
	}
	
	if(itn.binaryData.length !=0){
		[vouchers replaceObjectAtIndex:i withObject:itn];
		NSLog(@"exbuddia - Replaced voucher %@ at index %d with an updated version",itn.voucherParams,i);
		[FlurryAPI logEvent:@"APP_REPLACING_VOUCHER_WITH_LIVE_VERSION"];
	}else
	{
	    NSLog(@"exbuddia - WARNING - Tried to replace voucher %@ at index %d with Zero GIF data",itn.voucherParams,i);
		[FlurryAPI logEvent:@"APP_TRYING_TO_STORE_ZERO_GIF_DATA"];
	}
}

- (void)dealloc {
	[super dealloc];
	[name release];
	[description release];
	[itnId release];
	[airlineTicketNum release];
	[htmlData release];
	[vouchers release];
	[link release];
}

@end
