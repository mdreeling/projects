//
//  ExbuddiaData.h
//  ExpBuddyNav
//
//  Created by Neo Matrix on 3/26/09.
//  Copyright 2009 None. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Itinerary.h"

#define	kField1Key	@"username"
#define	kField2Key	@"password"
#define	kField3Key	@"defaultsite"
#define	kField4Key	@"itineraries"

@interface ExbuddiaData : NSObject <NSCoding> {
	NSString *username;
	NSString *password;
	NSString *defaultSite;
	NSMutableArray* itins;
}
@property(nonatomic,retain) NSMutableArray *itins;
@property(nonatomic,retain) NSString *username;
@property(nonatomic,retain) NSString *password;
@property(nonatomic,retain) NSString *defaultSite;
-(void)updateItinerary:(Itinerary*)itn;
-(void)addItinerary:(Itinerary*)itn;
-(Itinerary*)getItineraryById:(NSString*) itinId;
@end
