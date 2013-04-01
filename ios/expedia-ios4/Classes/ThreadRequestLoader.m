//
//  APSWebImageView.m
//
//  Created by Andrew Paul Simmons on 8/23/08.
//  This software is under the MIT License see .h file
//


#import "ThreadRequestLoader.h"

@implementation ThreadRequestLoader

@synthesize actionTarget, onLoadSuccess, onLoadFailure;

- (void) loadStringURL:(NSString*)theURLString
{
	if(isLoading)
	{
		@throw [NSException exceptionWithName:@"Load Request Ignored" 
									   reason:@"Could Not Start Load While Load In Progress" 
									 userInfo:nil];
	}
	isLoading = YES;
	urlString = [theURLString copy];
	
	[NSThread detachNewThreadSelector:@selector(performAsyncLoadWithURL:) 
							 toTarget:self 
						   withObject:[NSURL URLWithString:urlString]];
}

- (void) performAsyncLoadWithURL:(NSURL*)url
{
	NSAutoreleasePool * pool =[[NSAutoreleasePool alloc] init];
	
	NSError* loadError = nil;
	NSData* imageData = [NSData dataWithContentsOfURL:url options:NSMappedRead error:&loadError];
	
	if(imageData)
	{
		[self performSelectorOnMainThread:@selector(loadDidFinishWithData:)
							   withObject:imageData 
							waitUntilDone:YES];
	}
	else
	{
		[self performSelectorOnMainThread:@selector(loadDidFinishWithError:)
							   withObject:loadError 
							waitUntilDone:YES];
	}
	
	[pool release]; // imageData will be released here
}

- (void)loadDidFinishWithData:(NSData*)imageData
{	
	isLoading = NO;
	[urlString release]; // success hence no need for url
	//self.image = [[[UIImage alloc] initWithData:imageData] autorelease];
	
	if(actionTarget && [actionTarget respondsToSelector:@selector(onLoadSuccess)])
	{
		[actionTarget onLoadSuccess];
	}
}

- (void)loadDidFinishWithError:(NSError*)error
{
	isLoading = NO;
	NSLog(@"\nAPSWebImageView: Failed Image Load\n		[%@]\n		With Error - %@", 
		  urlString, [error localizedDescription]);
	[urlString release];
	
	if(actionTarget && [actionTarget respondsToSelector:onLoadFailure])
	{
		[actionTarget performSelector:onLoadFailure];
	}
}

- (void)dealloc 
{
	[urlString release];
	[super dealloc];
}

@end
