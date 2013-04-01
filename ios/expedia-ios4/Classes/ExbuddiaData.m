//
//  ExbuddiaData.m
//  ExpBuddyNav
//
//  Created by Neo Matrix on 3/26/09.
//  Copyright 2009 None. All rights reserved.
//

#import "ExbuddiaData.h"
#import "FlurryAPI.h"

@implementation ExbuddiaData
@synthesize itins,username,password,defaultSite;

#pragma mark NSCoding
- (void)encodeWithCoder:(NSCoder *)encoder
{
	[encoder encodeObject:username forKey:kField1Key];
	[encoder encodeObject:password forKey:kField2Key];
	[encoder encodeObject:defaultSite forKey:kField3Key];
	[encoder encodeObject:itins forKey:kField4Key];
}
- (id)initWithCoder:(NSCoder *)decoder
{
	if (self = [super init])
	{
		self.username = [decoder decodeObjectForKey:kField1Key];
		self.password = [decoder decodeObjectForKey:kField2Key];
		self.defaultSite = [decoder decodeObjectForKey:kField3Key];
		self.itins = [decoder decodeObjectForKey:kField4Key];
	}

	return self;
}

-(Itinerary*)getItineraryById:(NSString*) itinId
{
	NSEnumerator *enumerator = [itins objectEnumerator];
	Itinerary *anObject;
	Itinerary *itinFound = nil;
	while (anObject = (Itinerary*)[enumerator nextObject]) {
		if([itinId isEqualToString:anObject.itnId])
		{	
			itinFound = anObject;
			NSLog(@"exbuddia - Found itinerary. Returning [%@,htmlDataLength=%d]",itinFound.name,itinFound.htmlData.length);
		}
	}
	
	return itinFound;
}

-(void)addItinerary:(Itinerary*)itn
{	
	BOOL alreadyExists = FALSE;
	
	if(itins == nil  || itins.count ==0)
	{	
		NSLog(@"** exbuddia - Had to create a brand new ITINERARIES object **");
		itins = [[NSMutableArray alloc] init];
	}
	NSEnumerator *enumerator = [itins objectEnumerator];
	Itinerary *anObject;
	
	while (anObject = (Itinerary*)[enumerator nextObject]) {
		if([itn.itnId isEqualToString:anObject.itnId])
		{
			NSLog(@"exbuddia - Already stored this itinerary. Not re-adding.");
			alreadyExists = TRUE;
		}
	}
	
	if(!alreadyExists){
		[itins addObject:itn];
	}
}

-(void)updateItinerary:(Itinerary*)itn
{
	NSEnumerator *enumerator = [itins objectEnumerator];
	Itinerary *anObject;
	NSInteger i=0;
	BOOL found = FALSE;
	while (anObject = (Itinerary*)[enumerator nextObject]) {
		if([itn.itnId isEqualToString:anObject.itnId])
		{
			NSLog(@"exbuddia - Updating this itinerary %@",itn.itnId);
			found = TRUE;
		}
		if(!found)
		{
			i++;
		}
	}
	
	if(itn.htmlData.length !=0){
	[itins replaceObjectAtIndex:i withObject:itn];
		NSLog(@"exbuddia - Replaced itinerary %@ at index %d with an updated version",itn.itnId,i);
		[FlurryAPI logEvent:@"APP_REPLACING_ITINERARY_WITH_LIVE_VERSION"];
	}else
	{
	    NSLog(@"exbuddia - WARNING - Tried to replace itinerary %@ at index %d with Zero HTML data",itn.itnId,i);
		[FlurryAPI logEvent:@"APP_TRYING_TO_STORE_ZERO_HTML_DATA"];
	}
}

- (void)dealloc {
    [super dealloc];
	[itins release];
	[username release];
	[password release];
	[defaultSite release];
}
@end
