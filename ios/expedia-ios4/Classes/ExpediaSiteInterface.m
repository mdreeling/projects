//
//  ExpediaSiteParser.m
//  ExpBuddyNav
//
//  Created by Neo Matrix on 22/03/2009.
//  Copyright 2009 None. All rights reserved.
//

#import "ExpediaSiteInterface.h"
#import "NavAppDelegate.h"
#import "FlurryAPI.h"
#import "TTURLRequestQueue.h"
/***********/
/** XPATH **/
/***********/
/** Retrieves the text of the links from the itinerary page **/
NSString *XPATH_INTINERARY_ITEM_TEXT = @"//a[@id='A2002_20301']/text()";
/** Retrieves the links from the itinerary page **/
NSString *XPATH_INTINERARY_ITEM_LINK = @"//a[@id='A2002_20301']/@href";
/** Retrieves the Expedia Trip Number **/
NSString *XPATH_TEXT_INTINERARY_ITN_NUMBER = @"//font/child::text()[contains(.,'Expedia itinerary')]";
NSString *XPATH_VALUE_INTINERARY_ITN_NUMBER = @"//font/child::text()[contains(.,'Expedia itinerary')]/parent::*/b/text()";
/** Retrieves the Airline Ticket Number **/
NSString *XPATH_TEXT_INTINERARY_AIR_TICKET_NUMBER = @"//font/child::text()[contains(.,'Airline ticket number')]";
/** Retrieves the Airline Ticket Number **/
NSString *XPATH_TEXT_INTINERARY_DELTA_CONF_CODE = @"//font/child::text()[contains(.,'Delta confirmation code')]";

static NSString* kSafariUserAgent = @"Mozilla/5.0 (iPhone; U; CPU iPhone OS 2_2 like Mac OS X;\
en-us) AppleWebKit/525.181 (KHTML, like Gecko) Version/3.1.1 Mobile/5H11 Safari/525.20";

@implementation ExpediaSiteInterface

@synthesize utils, callingClass;

- (void)dealloc {
    [super dealloc];
	[utils release];
}
#pragma mark MAIN

/**
 * THREADED - Logs into Expedia and retrieves cookies etc
 */
- (void) loginWithThread
{
	if(isLoading)
	{
		@throw [NSException exceptionWithName:@"Load Request Ignored" 
									   reason:@"Could Not Start Load While Load In Progress" 
									 userInfo:nil];
	}
	isLoading = YES;

	
	[NSThread detachNewThreadSelector:@selector(logInAndDisplayItineraries) 
							 toTarget:self 
						   withObject:nil];
}

/**
 * Logs into Expedia and retrieves cookies etc
 */
- (void)logInAndDisplayItineraries {
	
	NSAutoreleasePool * pool =[[NSAutoreleasePool alloc] init];
	
	[self performSelectorOnMainThread:@selector(updateGUI:)
						   withObject:@"Contacting..." 
						waitUntilDone:YES];
	
	NavAppDelegate *delegate = [[UIApplication sharedApplication] delegate];
	
	NSHTTPURLResponse   * response;
	NSError             * error = nil;
	NSMutableURLRequest * request;
	request = [[[NSMutableURLRequest alloc] initWithURL:[NSURL URLWithString:EXPEDIA_DOMAIN]
											cachePolicy:NSURLRequestReloadIgnoringCacheData 
										timeoutInterval:60] autorelease];
	
	[request setValue:kSafariUserAgent forHTTPHeaderField:@"User-Agent"];
	
	[NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&error];	
	//NSLog(@"RESPONSE HEADERS: \n%@", [response allHeaderFields]);
	if(error != nil){
		
		[self performSelectorOnMainThread:@selector(loadDidFinishWithError)
							   withObject:nil 
							waitUntilDone:YES];
		
		NSLog(@"exbuddia - Error executing signin request %@, error is %@",request.URL, [error localizedDescription]);
		[FlurryAPI logEvent:@"APP_ERROR_INITIAL_EXPEDIA_URL_RQST"];
		return;
	}
	
	[self performSelectorOnMainThread:@selector(updateGUI:)
						   withObject:@"Signing in..." 
						waitUntilDone:YES];
	
	// If you want to get all of the cookies:
	NSArray * all = [NSHTTPCookie cookiesWithResponseHeaderFields:[response allHeaderFields] forURL:[NSURL URLWithString:EXPEDIA_DOMAIN]];
	//NSLog(@"exbuddia - How many Cookies: %d", all.count);
	// Store the cookies:
	// NSHTTPCookieStorage is a Singleton.
	[[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookies:all forURL:[NSURL URLWithString:@"http://temp"] mainDocumentURL:nil];
	
	// Now we can print all of the cookies we have:
	//for (NSHTTPCookie *cookie in all)
	//NSLog(@"exbuddia - Name: %@ : Value: %@, Expires: %@", cookie.name, cookie.value, cookie.expiresDate); 
	
	
	// Now lets go back the other way.  We want the server to know we have some cookies available:
	// this availableCookies array is going to be the same as the 'all' array above.  We could 
	// have just used the 'all' array, but this shows you how to get the cookies back from the singleton.
	NSArray * availableCookies = [[NSHTTPCookieStorage sharedHTTPCookieStorage] cookiesForURL:[NSURL URLWithString:@"http://temp"]];
	NSDictionary * headers = [NSHTTPCookie requestHeaderFieldsWithCookies:availableCookies];
	
	// we are just recycling the original request
	[request setAllHTTPHeaderFields:headers];
	
	request.URL = [NSURL URLWithString:EXPEDIA_AGENT_DLL_SECURE];
	error       = nil;
	response    = nil;
	[request setHTTPMethod: @"POST"];		//create post data
    
    //attach params
    NSString *params = [NSString stringWithFormat:@"usri=%@&upwd=%@&ussl=1&qscr=logi&subl=1&lmde=25&uact=3&uurl=&fram=&wdth=&hght=&itlo=0&gpid=ACE9278EECE9&slnk=&flag=&tmpu=&selc=0&fnui=1&rfrr=-54386",delegate.login,delegate.password];     
    [request setHTTPBody: [params dataUsingEncoding: NSASCIIStringEncoding]];
	
	/** Send Request **/
	[NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&error];
    
	if(error != nil){
		
		[self performSelectorOnMainThread:@selector(loadDidFinishWithError)
							   withObject:nil 
							waitUntilDone:YES];
		
		NSLog(@"exbuddia - Error executing signin request %@, error is %@",request.URL, [error localizedDescription]);
		[FlurryAPI logEvent:@"APP_ERROR_SIGNIN_POST_RQST"];
		return;
	}
	
	[self performSelectorOnMainThread:@selector(updateGUI:)
						   withObject:@"Loading itineraries..." 
						waitUntilDone:YES];
	
	//NSLog(@"POST - RESPONSE HEADERS: \n%@", [response allHeaderFields]);
	
	// If you want to get all of the cookies:
	all = [NSHTTPCookie cookiesWithResponseHeaderFields:[response allHeaderFields] forURL:[NSURL URLWithString:EXPEDIA_DOMAIN]];
	//NSLog(@"POST - How many Cookies: %d", all.count);
	// Store the cookies:
	// NSHTTPCookieStorage is a Singleton.
	[[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookies:all forURL:[NSURL URLWithString:@"http://temp"] mainDocumentURL:nil];
	
	// Now we can print all of the cookies we have:
	//for (NSHTTPCookie *cookie in all)
	//NSLog(@"Name: %@ : Value: %@, Expires: %@", cookie.name, cookie.value, cookie.expiresDate); 
	
	//[params release];
	
	
	//NSLog(@"The server saw:\n%@", [[[NSString alloc] initWithData:data encoding: NSASCIIStringEncoding] autorelease]);
	
	/****************/
	// we are just recycling the original request
	[request setAllHTTPHeaderFields:headers];
	NSString* itineraryListURL = [NSString stringWithFormat:@"%@?qscr=litn&rfrr=-938",EXPEDIA_AGENT_DLL];
	request.URL = [NSURL URLWithString:itineraryListURL];
	error       = nil;
	response    = nil;
	
	NSData *data = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&error];
	
	if(error != nil){
		
		[self performSelectorOnMainThread:@selector(loadDidFinishWithError)
							   withObject:nil 
							waitUntilDone:YES];
		
		NSLog(@"exbuddia - Error executing signin request %@, error is %@",request.URL, [error localizedDescription]);
		[FlurryAPI logEvent:@"APP_ERROR_ITIN_URL_RQST"];
		return;
	}
	
	[self performSelectorOnMainThread:@selector(loadDidFinishWithData:)
							   withObject:data 
							waitUntilDone:YES];
	
	[pool release];
	
}

#pragma mark CALLBACKS

- (void)updateGUI:(NSString*)text
{	
	if(callingClass && [callingClass respondsToSelector:@selector(updateExpGUI:)])
	{
		[callingClass updateExpGUI:text];
	}
}

- (void)loadDidFinishWithData:(NSData*)imageData
{	
	isLoading = NO;
	if(callingClass && [callingClass respondsToSelector:@selector(onLoadSuccess:)])
	{
		[callingClass onLoadSuccess:imageData];
	}
}

- (void)loadDidFinishWithError
{	
	isLoading = NO;
	if(callingClass && [callingClass respondsToSelector:@selector(onLoadError)])
	{
		[callingClass onLoadError];
	}
}

#pragma mark LOAD_ITINS
/**
 * Logs into Expedia and retrieves cookies etc
 */
- (NSData*)loadItineraryURL:(NSString*)itineraryNumber {
	NSHTTPURLResponse   * response;
	NSError             * error = nil;
	NSMutableURLRequest * request;
	
	request = [[[NSMutableURLRequest alloc] init] autorelease];
	// Now lets go back the other way.  We want the server to know we have some cookies available:
	// this availableCookies array is going to be the same as the 'all' array above.  We could 
	// have just used the 'all' array, but this shows you how to get the cookies back from the singleton.
	NSArray * availableCookies = [[NSHTTPCookieStorage sharedHTTPCookieStorage] cookiesForURL:[NSURL URLWithString:@"http://temp"]];
	NSDictionary * headers = [NSHTTPCookie requestHeaderFieldsWithCookies:availableCookies];
	
	// we are just recycling the original request
	[request setAllHTTPHeaderFields:headers];
	[request setValue:kSafariUserAgent forHTTPHeaderField:@"User-Agent"];
	
	request.URL = [NSURL URLWithString:EXPEDIA_AGENT_DLL];
	error       = nil;
	response    = nil;
	[request setHTTPMethod: @"POST"];		//create post data
    
    //attach params
    NSString *params = [NSString stringWithFormat:@"qscr=open&itid=%@&vwtp=4", itineraryNumber];     
    [request setHTTPBody: [params dataUsingEncoding: NSASCIIStringEncoding]];
	NSData * data = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&error];
	if(error != nil){
		NSLog(@"exbuddia - Error executing request %@, error is %@",request.URL, [error localizedDescription]);
		[FlurryAPI logEvent:@"APP_ERROR_ITN_URL_RQST"];
	}
	//NSLog(@"POST - RESPONSE HEADERS: \n%@", [response allHeaderFields]);
	//NSLog(@"The server saw:\n%@", [[[NSString alloc] initWithData:data encoding: NSASCIIStringEncoding] autorelease]);
	
	data = [self insertViewPort:data];
	
	return data;
}

/**
 * Logs into Expedia and retrieves cookies etc
 */
- (NSData*)loadVoucher:(NSString*)params withIdNum:(NSString*)idNumber
{
	NSHTTPURLResponse   * response;
	NSError             * error = nil;
	NSMutableURLRequest * request;
	
	request = [[[NSMutableURLRequest alloc] init] autorelease];
	// Now lets go back the other way.  We want the server to know we have some cookies available:
	// this availableCookies array is going to be the same as the 'all' array above.  We could 
	// have just used the 'all' array, but this shows you how to get the cookies back from the singleton.
	NSArray * availableCookies = [[NSHTTPCookieStorage sharedHTTPCookieStorage] cookiesForURL:[NSURL URLWithString:@"http://temp"]];
	NSDictionary * headers = [NSHTTPCookie requestHeaderFieldsWithCookies:availableCookies];
	
	// we are just recycling the original request
	[request setAllHTTPHeaderFields:headers];
	[request setValue:kSafariUserAgent forHTTPHeaderField:@"User-Agent"];
	
	NSString *theURL = EXPEDIA_DOMAIN;
	theURL = [theURL stringByAppendingString:@"%@"];
	theURL = [NSString stringWithFormat:theURL, params];
	NSLog(@"exbuddia - Attempting to load voucher from %@", theURL);
	request.URL = [NSURL URLWithString:theURL];
	error       = nil;
	response    = nil;
	[request setHTTPMethod: @"GET"];		//create post data

	NSData * data = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&error];
    if(error != nil){
		NSLog(@"exbuddia - Error executing request %@, error is %@",request.URL, [error localizedDescription]);
		[FlurryAPI logEvent:@"APP_ERROR_VCH_URL_RQST"];
	}
	/** TEST - Write it out to disk **/
	[data writeToFile:[self getDataFilePath:idNumber] atomically:YES];

	//NSLog(@"POST - RESPONSE HEADERS: \n%@", [response allHeaderFields]);
	//NSLog(@"The server saw:\n%@", [[[NSString alloc] initWithData:data encoding: NSASCIIStringEncoding] autorelease]);
	return data;
}

/**
 * Logs into Expedia and retrieves cookies etc
 */
- (NSData*)loadVoucher:(NSString*)url
{
	NSHTTPURLResponse   * response;
	NSError             * error = nil;
	NSMutableURLRequest * request;
	
	request = [[[NSMutableURLRequest alloc] init] autorelease];
	// Now lets go back the other way.  We want the server to know we have some cookies available:
	// this availableCookies array is going to be the same as the 'all' array above.  We could 
	// have just used the 'all' array, but this shows you how to get the cookies back from the singleton.
	NSArray * availableCookies = [[NSHTTPCookieStorage sharedHTTPCookieStorage] cookiesForURL:[NSURL URLWithString:@"http://temp"]];
	NSDictionary * headers = [NSHTTPCookie requestHeaderFieldsWithCookies:availableCookies];
	
	// we are just recycling the original request
	[request setAllHTTPHeaderFields:headers];
	[request setValue:kSafariUserAgent forHTTPHeaderField:@"User-Agent"];

	NSLog(@"exbuddia - Attempting to load voucher from %@", url);
	request.URL = [NSURL URLWithString:url];
	error       = nil;
	response    = nil;
	[request setHTTPMethod: @"GET"];		//create post data
	
	NSData * data = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&error];
    if(error != nil){
		NSLog(@"exbuddia - Error executing request %@, error is %@",request.URL, [error localizedDescription]);
		[FlurryAPI logEvent:@"APP_ERROR_VCH_URL_RQST"];
	}
	/** TEST - Write it out to disk **/
	//[data writeToFile:[self getDataFilePath:idNumber] atomically:YES];
	
	//NSLog(@"POST - RESPONSE HEADERS: \n%@", [response allHeaderFields]);
	//NSLog(@"The server saw:\n%@", [[[NSString alloc] initWithData:data encoding: NSASCIIStringEncoding] autorelease]);
	return data;
}

#pragma mark UTIL
- (NSData *)insertViewPort:(NSData*) data
{	
	NSString *html = [[[NSString alloc] initWithData:data encoding: NSASCIIStringEncoding] autorelease];
	NSString *aString = @"<meta name=\"viewport\" content=\"width=320\"/>\n";
	html = [aString stringByAppendingString: html];
	
	return [html dataUsingEncoding: NSASCIIStringEncoding];
}

- (NSString *)getDataFilePath:(NSString*) filename
{	
	NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
	NSString *documentsDirectory = [paths objectAtIndex:0];
	return [documentsDirectory stringByAppendingPathComponent:filename];
}


-(NSString*)getTextNodeContent:(NSData*)htmlData forXpath:(NSString*)xpathString
{
	utils = [[ExpediaUtils alloc] init];
	
	NSArray *textNodes = PerformHTMLXPathQuery(htmlData,xpathString);
	NSString *text = nil;
	NSEnumerator *enumerator;
	id key;
	
	/** Get the text **/
	for (NSDictionary *node in textNodes)
	{	
		enumerator = [node keyEnumerator];
		while ((key = [enumerator nextObject])) {		
			if([((NSString*)key) isEqualToString:@"nodeContent"])
			{	
				text = [node objectForKey:key];
				NSLog(@"Text : %@", text);
			}
		}
	}
	
	return text;
}

-(Itinerary*)parseItineraryPage:(NSData*)htmlData
{	
	/** Caller does NOT own the reference - autorelease **/
	Itinerary *itin = [[[Itinerary alloc] init] autorelease];
	[self getTextNodeContent:htmlData forXpath:XPATH_TEXT_INTINERARY_DELTA_CONF_CODE];
	/** Get itinerary number **/
	itin.itnId = [self getTextNodeContent:htmlData forXpath:XPATH_VALUE_INTINERARY_ITN_NUMBER];
	//itin.airlineTicketNum = [ExpediaUtils getTextNodeViaRegex:htmlData forRegEx:nil];
	
	return itin;
}
/**
 * Parses XPath expressions
 */
-(void)parse:(NSData*)htmlData
{		
	NSArray *textNodes = PerformHTMLXPathQuery(htmlData,XPATH_INTINERARY_ITEM_TEXT);
	NSArray *linkNodes = PerformHTMLXPathQuery(htmlData,XPATH_INTINERARY_ITEM_LINK);
	NSEnumerator *enumerator;
	id key;
	
	NavAppDelegate *appDelegate = (NavAppDelegate *)[[UIApplication sharedApplication] delegate];
	NSInteger i = 0;
	//[appDelegate.dataManager.myData.itins removeAllObjects];
	/** Get the text **/
	for (NSDictionary *node in textNodes)
	{	
		enumerator = [node keyEnumerator];
		
		while ((key = [enumerator nextObject])) {		
			if([((NSString*)key) isEqualToString:@"nodeContent"])
			{	
				Itinerary *itinerary = [[Itinerary alloc] initWithName:(NSString*)[node objectForKey:key]];
				NSString* number = [ExpediaUtils getItnNumberFromNodes:linkNodes atIndex:i];
				itinerary.itnId = number;
				[appDelegate.dataManager.myData addItinerary:itinerary];
				NSLog(@"exbuddia - %@ : %@", number, [node objectForKey:key]);
				[itinerary release];
			}
			i++;
		}
	}
}

@end
