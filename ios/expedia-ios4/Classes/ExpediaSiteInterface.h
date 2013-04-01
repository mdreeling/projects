//
//  ExpediaSiteParser.h
//  ExpBuddyNav
//
//  Created by Neo Matrix on 22/03/2009.
//  Copyright 2009 None. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "XPathQuery.h"
#import "ExpediaUtils.h"
#import "Itinerary.h"

@interface ExpediaSiteInterface : NSObject {
	ExpediaUtils *utils;
	id callingClass;
	BOOL isLoading;
}
// callbacks
@property (assign) id callingClass;
- (NSData *)insertViewPort:(NSData*) data;
- (NSData*)loadVoucher:(NSString*)url;
- (NSString *)getDataFilePath:(NSString*) filename;
- (void)logInAndDisplayItineraries;
- (void) loginWithThread;
- (NSData*)loadItineraryURL:(NSString*) itineraryNumber;
- (NSData*)loadVoucher:(NSString*)params withIdNum:(NSString*)idNumber;
-(void)parse:(NSData*)htmlData;
-(Itinerary*)parseItineraryPage:(NSData*)htmlData;
-(NSString*)getTextNodeContent:(NSData*)htmlData forXpath:(NSString*)path;
@property (nonatomic, retain) ExpediaUtils *utils;
@end
