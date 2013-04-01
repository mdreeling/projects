//
//  ExpediaUtils.h
//  ExpBuddyNav
//
//  Created by Neo Matrix on 22/03/2009.
//  Copyright 2009 None. All rights reserved.
//

#import <Foundation/Foundation.h>

extern NSString * const REGEX_ITINERARY_PAGE_IDENTIFIER;
extern NSString * const REGEX_SIGNIN_PAGE_IDENTIFIER;
extern NSString * const REGEX_SIGNIN_REDIRECT_PAGE_IDENTIFIER;
extern NSString * const REGEX_VOUCHER_URL_IDENTIFIER;
extern NSString * const REGEX_PRINT_PAGE_IDENTIFIER;
extern NSString * const REGEX_VOUCHER_ID_IDENTIFIER;
extern NSString * const EXPEDIA_AGENT_DLL;
extern NSString * const EXPEDIA_AGENT_DLL_SECURE;
extern NSString * const EXPEDIA_DOMAIN;
extern NSString * const EXPEDIA_DOMAIN_SECURE;
extern NSString * const EXPEDIA_DOMAIN_SMALL;

@interface ExpediaUtils : NSObject {

}
+(NSString*)getItnNumberFromNodes:(NSArray*)linkNodes atIndex:(NSInteger)index;
+(NSString*)getTextNodeViaRegex:(NSData*)htmlData forRegEx:(NSString*)regex;
+(BOOL)findRegexInPage:(NSData*)withHtmlData andRegex:(NSString*)regexIn;
+(NSMutableArray*)findMultipleRegexInPage:(NSData*)withHtmlData andRegex:(NSString*)regexIn;
+(NSString*)findStringViaRegex:(NSString*)donorString forRegEx:(NSString*)regex;
@end
