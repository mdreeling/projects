//
//  ExpediaUtils.m
//  ExpBuddyNav
//
//  Created by Neo Matrix on 22/03/2009.
//  Copyright 2009 None. All rights reserved.
//

#import "ExpediaUtils.h"
#import "Itinerary.h"
#import "RegexKitLite.h"
#import "FlurryAPI.h"
#import "RKLMatchEnumerator.h"

/** Identifies the Itinerary Listing Page **/
NSString * const REGEX_ITINERARY_PAGE_IDENTIFIER = @"s_pageName = \"HTX_ITNLITN\"";
/** Identifies the Itinerary Listing Page **/
NSString * const REGEX_PRINT_PAGE_IDENTIFIER = @"s_pageName = \"HTX_ITNHEAD_PRN\"";
/** Identifies the standard login Page **/
NSString * const REGEX_SIGNIN_PAGE_IDENTIFIER = @"s_pageName = \"HTX_LOGIN\"";
/** Identifies the standard login page **/
NSString * const REGEX_SIGNIN_REDIRECT_PAGE_IDENTIFIER = @"s_pageName = \"HTX_QSREDIR\"";
/** Identifies a voucher URL **/
NSString * const REGEX_VOUCHER_URL_IDENTIFIER = @"\/pub\/agent.dll.*qscr=vosv.*&Y=[0-9]*";
/** Identifies a voucher URL **/
NSString * const REGEX_VOUCHER_ID_IDENTIFIER = @"(?<=&id=)[0-9]*";
/** Location of the Expedia DLL for the US site **/
NSString * const EXPEDIA_AGENT_DLL = @"http://www.expedia.com/pub/agent.dll";
/** Location of the Expedia DLL for the US site **/
NSString * const EXPEDIA_AGENT_DLL_SECURE = @"https://www.expedia.com/pub/agent.dll";
/** Location of the Expedia DLL for the US site **/
NSString * const EXPEDIA_DOMAIN_SMALL = @"expedia.com";
/** Location of the Expedia top level domain for the US site **/
NSString * const EXPEDIA_DOMAIN = @"http://www.expedia.com";
/** Location of the Expedia top level secure domain for the US site **/
NSString * const EXPEDIA_DOMAIN_SECURE = @"https://www.expedia.com";

@implementation ExpediaUtils


/**
 Looks through an NSData object looking for a particular Regular expression. 
 If one is found, it returns the first string which matched.
 */
+(NSString*)findStringViaRegex:(NSString*)donorString forRegEx:(NSString*)regex
{	
	NSRange searchRange = NSMakeRange(0, [donorString length]);

	//NSString *regexString  = @"Expedia itinerary number:";
	NSRange   matchedRange = NSMakeRange(NSNotFound, 0);
	NSError  *error        = NULL;
	
	matchedRange = [donorString rangeOfRegex:regex options:RKLNoOptions inRange:searchRange capture:0 error:&error];
	
	if(error != nil){
		NSLog(@"exbuddia - Error executing regex %@, error is %@",regex, [error localizedDescription]);
		[FlurryAPI logEvent:@"APP_ERROR_PARSING_REGEX"];
	}
	
	NSString *matchedString = nil;
	
	if(matchedRange.length > 0) {
		NSLog(@"exbuddia - matchedRange   : %@", NSStringFromRange(matchedRange));
		// 2008-03-18 03:51:16.530 test[51583:813] matchedRange   : {5, 2}
		matchedString = [donorString substringWithRange:matchedRange];
		NSLog(@"exbuddia - matchedString: '%@'", matchedString);
		// 2008-03-18 03:51:16.532 test[51583:813] matchedString: 'is'
	}
	
	return matchedString;
}

/**
 Looks through an NSData object looking for a particular Regular expression. 
 If one is found, it returns the first string which matched.
 */
+(NSString*)getTextNodeViaRegex:(NSData*)htmlData forRegEx:(NSString*)regex
{	
	NSRange searchRange = NSMakeRange(0, [htmlData length]);
	NSString *searchString = [NSString stringWithCString:[htmlData bytes] length:[htmlData length]];
	//NSString *regexString  = @"Expedia itinerary number:";
	NSRange   matchedRange = NSMakeRange(NSNotFound, 0);
	NSError  *error        = NULL;
	
	matchedRange = [searchString rangeOfRegex:regex options:RKLNoOptions inRange:searchRange capture:0 error:&error];
	
	if(error != nil){
		NSLog(@"exbuddia - Error executing regex %@, error is %@",regex, [error localizedDescription]);
		[FlurryAPI logEvent:@"APP_ERROR_PARSING_REGEX"];
	}
	
	NSString *matchedString = nil;
	
	if(matchedRange.length > 0) {
		NSLog(@"exbuddia - matchedRange   : %@", NSStringFromRange(matchedRange));
		// 2008-03-18 03:51:16.530 test[51583:813] matchedRange   : {5, 2}
		matchedString = [searchString substringWithRange:matchedRange];
		NSLog(@"exbuddia - matchedString: '%@'", matchedString);
		// 2008-03-18 03:51:16.532 test[51583:813] matchedString: 'is'
	}
	
	return matchedString;
}

+(NSString*)getItnNumberFromNodes:(NSArray*)linkNodes atIndex:(NSInteger)itineraryIndex
{	
	NSEnumerator *enumerator;
	NSString *link = nil;
	id key;
	/** Get the text **/
	int i =0;
	for (NSDictionary *node in linkNodes)
	{	
		enumerator = [node keyEnumerator];
		
		while ((key = [enumerator nextObject])) {	
			if(i == itineraryIndex && [((NSString*)key) isEqualToString:@"nodeContent"])
			{	
				NSString *itineraryLink = (NSString*)[node objectForKey:key];
				NSLog(@"exbuddia - link : %@",itineraryLink);
				NSRange leftBracket = [itineraryLink rangeOfString:@"("];
				NSRange rightBracket = [itineraryLink rangeOfString:@")"];
				int numLength = (rightBracket.location-2) - (leftBracket.location+2);
				NSRange twoToSixRange = NSMakeRange(leftBracket.location+2, numLength+1);
				link = [itineraryLink substringWithRange:twoToSixRange];
				
				//NSLog(@"exbuddia - link number : %@",link);
			}
			
			i++;
		}
	}
	
	return link;
}

+(BOOL)findRegexInPage:(NSData*)withHtmlData andRegex:(NSString*)regexIn
{
	/** Check to see if we are now on the itinerary page **/
	NSString* regex = [self getTextNodeViaRegex:withHtmlData forRegEx:regexIn];
	
	if(regex == nil)
	{
		return FALSE;
	}
	
	return TRUE;
}

+(NSMutableArray*)findMultipleRegexInPage:(NSData*)withHtmlData andRegex:(NSString*)regexIn
{
	NSEnumerator *matchEnumerator = NULL;
	NSString *searchString = [NSString stringWithCString:[withHtmlData bytes] length:[withHtmlData length]];
	NSLog(@"regexString : '%@'", regexIn);
	
	matchEnumerator = [searchString matchEnumeratorWithRegex:regexIn];
	
	NSUInteger  line          = 0;
	NSString   *matchedString = NULL;
	NSMutableArray   *matchedStrings = [[[NSMutableArray alloc] init] autorelease];
	
	while((matchedString = [matchEnumerator nextObject]) != NULL) {
		NSLog(@"%d: %d '%@'", ++line, [matchedString length], matchedString);
		[matchedStrings addObject:matchedString];
	}
	
	return matchedStrings;
}
@end
