//
//  DataManager.m
//  ExpBuddyNav
//
//  Created by Neo Matrix on 3/26/09.
//  Copyright 2009 None. All rights reserved.
//

#import "DataManager.h"


@implementation DataManager
@synthesize myData;

- (NSString *)getDataFilePath
{
	NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
	NSString *documentsDirectory = [paths objectAtIndex:0];
	return [documentsDirectory stringByAppendingPathComponent:kFilename];
}

- (void)save:(ExbuddiaData*)dataIn
{
	NSMutableData *data = [[[NSMutableData alloc] init] autorelease];
	NSKeyedArchiver *archiver = [[[NSKeyedArchiver alloc] initForWritingWithMutableData:data] autorelease];
	[archiver encodeObject:dataIn forKey:kDataKey];
	[archiver finishEncoding];
	[data writeToFile:[self getDataFilePath] atomically:YES];
}

- (void)save
{
	NSMutableData *data = [[[NSMutableData alloc] init] autorelease];
	NSKeyedArchiver *archiver = [[[NSKeyedArchiver alloc] initForWritingWithMutableData:data] autorelease];
	[archiver encodeObject:self.myData forKey:kDataKey];
	[self displaySummary:self.myData];
	[archiver finishEncoding];
	[data writeToFile:[self getDataFilePath] atomically:YES];
	//[dataIn release];
}

-(void) displaySummary:(ExbuddiaData*) bud
{
	NSEnumerator *enumerator = [bud.itins objectEnumerator];
	Itinerary *itn;
	NSLog(@"********************** OBJECT SUMMARY ***************************");
	while (itn = (Itinerary*)[enumerator nextObject]) {
		NSLog(@"Itinerary - %@ - HtmlData (%d)",itn.name,itn.htmlData.length);
		
		if(itn.vouchers.count > 0){
			NSEnumerator *enm = [itn.vouchers objectEnumerator];
			Voucher *vch;
			while (vch = (Voucher*)[enm nextObject]) 
			{
				NSLog(@" - Voucher - %@",vch.voucherLocalFileName);
			}
		}
	}
	NSLog(@"********************** OBJECT SUMMARY ***************************");
}

-(void)load {
	NSString *filePath = [self getDataFilePath];
	if ([[NSFileManager defaultManager] fileExistsAtPath:filePath])
	{
		NSData *data = [[[NSMutableData alloc] initWithContentsOfFile:[self getDataFilePath]] autorelease];
		NSKeyedUnarchiver *unarchiver = [[[NSKeyedUnarchiver alloc] initForReadingWithData:data] autorelease];
		self.myData = [unarchiver decodeObjectForKey:kDataKey];
		[self displaySummary:self.myData];
		[unarchiver finishDecoding];
	}
	
	if(self.myData == nil)
	{	
		NSLog(@"** exbuddia - Had to create a brand new ExbuddiaData object **");
		self.myData = [[[ExbuddiaData alloc] init] autorelease];
	}
}

- (void)dealloc {
    [super dealloc];
	[myData release];
}
@end
