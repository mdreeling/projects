//
//  TestController.m
//  ExpBuddyNav
//
//  Created by Neo Matrix on 4/13/09.
//  Copyright 2009 None. All rights reserved.
//

#import "VoucherViewController.h"
#import "MockPhotoSource.h"
#import "MockPhotoSource.h"
#import "NavAppDelegate.h"
#import "Reachability.h"
#import "FlurryAPI.h"
#import "Voucher.h"
#import "TTURLRequestQueue.h"

@implementation VoucherViewController
@synthesize expedia,selectedItinerary,voucherPhotos;


- (void)viewDidLoad {
[super viewDidLoad];
} 

- (void)viewWillAppear:(BOOL)animated {
	NSLog(@"exbuddia - Vouchers did appear for itinerary %@",selectedItinerary.itnId);
	[self loadVouchers];
	self.photoSource = [[[MockPhotoSource alloc]
						 initWithType:MockPhotoSourceNormal 
						 title:@"Vouchers" 
						 photos:voucherPhotos
						 photos2:nil] autorelease];
	[super viewWillAppear:animated];
}

#pragma mark New Methods
- (MockPhotoSource*) getVoucherPhotosForViewer:(NSArray *)vouchers
{	
	NSEnumerator * enumerator = [vouchers objectEnumerator];
	Voucher *vch;

	while(vch = (Voucher*)[enumerator nextObject])
    {
		MockPhoto *mck = [[[MockPhoto alloc]
						   initWithURL:[NSString stringWithFormat:@"%@%@",EXPEDIA_DOMAIN_SECURE,vch.voucherParams]
						   smallURL:[NSString stringWithFormat:@"%@%@",EXPEDIA_DOMAIN_SECURE,vch.voucherParams]
						   size:CGSizeMake(600, 599)
						   caption:@"Expedia Voucher"] autorelease];
		[voucherPhotos addObject:mck];
    }
	
	return nil;
}

-(void)loadVouchers
{
	voucherPhotos = [[NSMutableArray alloc] init];
	//[loading setText:@"Loading Itinerary..."];
	//	[htmlProgress startAnimating];
	NavAppDelegate *delegate = [[UIApplication sharedApplication] delegate];
	NSData *itinData;
	NSMutableArray *currentVouchers = nil;
	//selectedItinerary.htmlData = itinData;
	//[cd updateItinerary:selectedItinerary];
	//[[delegate dataManager] save];
	if (delegate.offline || [[Reachability sharedReachability] internetConnectionStatus] == NotReachable ) 
	{	
		self.title = @"Vouchers (Offline)";
		delegate.offline = YES;
		[FlurryAPI logEvent:@"OFFLINE_VOUCHER_VIEW"];
		delegate = [[UIApplication sharedApplication] delegate];
		ExbuddiaData* cd = [[delegate dataManager] myData];
		NSLog(@"exbuddia - Loading OFFLINE Voucher view for itinerary %@",selectedItinerary.itnId);
		Itinerary *myItn= [cd getItineraryById:selectedItinerary.itnId];
		NSLog(@"exbuddia - %d OFFLINE Voucher(s) for itinerary %@",myItn.vouchers.count,selectedItinerary.itnId);
		currentVouchers =  [[NSMutableArray alloc] initWithArray:myItn.vouchers copyItems:YES];
	} else {
		[FlurryAPI logEvent:@"LIVE_VOUCHER_VIEW"];
		expedia = [[[ExpediaSiteInterface alloc] init] autorelease];
		NSLog(@"exbuddia - Loading LIVE Voucher view for itinerary %@",selectedItinerary.itnId);
		itinData = [expedia loadItineraryURL:selectedItinerary.itnId];
		
		
		/** 3. If you never made it to the itinerary/voucher page - better say so **/
		if(![ExpediaUtils findRegexInPage:itinData andRegex:REGEX_PRINT_PAGE_IDENTIFIER])
		{	
			NSLog(@"exbuddia - Itinerary page could not be loaded - instead the server saw:\n%@", [[[NSString alloc] initWithData:itinData encoding: NSASCIIStringEncoding] autorelease]);
			[FlurryAPI logEvent:@"APP_COULD_NOT_LOAD_VOUCHER"];
			
			UIAlertView *alert = [[[UIAlertView alloc] initWithTitle:@"Voucher Unavailable" 
															message:@"We're very sorry, but your voucher could not be loaded. This may be due to a site error or dropped connection. Please try again later."
														   delegate:nil 
												  cancelButtonTitle:@"OK" 
												  otherButtonTitles: nil] autorelease];
			[alert show];
			return;
		}
		
		/** 1. - Find the vouchers in the itinerary data **/
		NSArray *voucherParams = [ExpediaUtils findMultipleRegexInPage:itinData andRegex:REGEX_VOUCHER_URL_IDENTIFIER];
		/** 2. - Create a brand new set of live vouchers **/
		currentVouchers = [[NSMutableArray alloc]init];
		/** 3. - Pass those params to the loadVoucher Method. **/
		int arrayCount = [voucherParams count];
		int i=0;
		for (i = 0; i < arrayCount; i++) {
			Voucher *vch = [[Voucher alloc] init];
			NSString *voucherParam = [voucherParams objectAtIndex:i];
			NSString *voucherId = [ExpediaUtils findStringViaRegex:voucherParam forRegEx:REGEX_VOUCHER_ID_IDENTIFIER];
			//NSData *vchBinaryData = [expedia loadVoucher:voucherParam withIdNum:[NSString stringWithFormat:@"voucher-%@.gif",voucherId]];
			vch.voucherId = voucherId;
			vch.voucherParams = voucherParam;
			//vch.binaryData = vchBinaryData;
			vch.itineraryId = selectedItinerary.itnId;
			vch.voucherLocalFileName = [NSString stringWithFormat:@"voucher-%@.gif",voucherId];
			[currentVouchers addObject:vch];
			[selectedItinerary addVoucher:vch];
			[delegate.dataManager.myData updateItinerary:selectedItinerary];
			[vch release];
		}
	}
	
	if(currentVouchers.count == 0){
		UIAlertView *alert = [[[UIAlertView alloc] initWithTitle:@"Empty Voucher Data" 
														message:@"Unfortunately, Exbuddia could not display your vouchers, the data could not be retrieved. Possibly a network error,or if working offline, an issue with the saved data."
													   delegate:nil 
											  cancelButtonTitle:@"OK" 
											  otherButtonTitles: nil] autorelease];
		[alert show];
		[FlurryAPI logEvent:@"APP_EMPTY_VOUCHER_DATA"];
		return;
	}
	
	
	/** Creates an NSArray of photos of the vouchers which are used to display them **/
	[self getVoucherPhotosForViewer:currentVouchers];
	//[currentVouchers release];
}

- (NSString *)getDataFilePath:(NSString*) filename
{	
	NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
	NSString *documentsDirectory = [paths objectAtIndex:0];
	return [documentsDirectory stringByAppendingPathComponent:filename];
}
/**
- (void)viewDidLoad {
	self.photoSource = [[[MockPhotoSource alloc]
						 initWithType:MockPhotoSourceNormal
						 // initWithType:MockPhotoSourceDelayed
						 // initWithType:MockPhotoSourceLoadError
						 // initWithType:MockPhotoSourceDelayed|MockPhotoSourceLoadError
						 title:@"Flickr Photos"
						 photos:[NSArray arrayWithObjects:
								 // Request fails immediately due to DNS error
								 //    [[[MockPhoto alloc]
								 //      initWithURL:@"http://example.com"
								 //      smallURL:@"http://example.com"
								 //      size:CGSizeMake(320, 480)] autorelease],
								 
								 // 404 on both url and thumbnail
								 //    [[[MockPhoto alloc]
								 //      initWithURL:@"http://farm4.static.flickr.com/3425/3214x620333_daf56d25e5.jpg?v=0"
								 //      smallURL:@"http://farm4.static.flickr.com/3425/3214620333_daf56d25e5_t.jpg"
								 //      size:CGSizeMake(320, 480)] autorelease],
								 
								 // Returns HTML instead of image
								 //    [[[MockPhoto alloc]
								 //      initWithURL:@"http://flickr.com"
								 //      smallURL:@"http://farm4.static.flickr.com/3444/3223645618_f5e2fa7fea_t.jpg"
								 //      size:CGSizeMake(320, 480)] autorelease],    
								 
								 [[[MockPhoto alloc]
								   initWithURL:@"http://farm4.static.flickr.com/3444/3223645618_13fe36887a_o.jpg"
								   smallURL:@"http://farm4.static.flickr.com/3444/3223645618_f5e2fa7fea_t.jpg"
								   size:CGSizeMake(320, 480)
								   caption:@"These are the wood tiles that we had installed after the accident."] autorelease],
								 
								 // Causes album to be loaded
								 // [NSNull null],
								 
								 [[[MockPhoto alloc]
								   initWithURL:@"http://farm2.static.flickr.com/1124/3164979509_bcfdd72123.jpg?v=0"
								   smallURL:@"http://farm2.static.flickr.com/1124/3164979509_bcfdd72123_t.jpg"
								   size:CGSizeMake(320, 480)
								   caption:@"A hike."] autorelease],
								 
								 [[[MockPhoto alloc]
								   initWithURL:@"http://farm4.static.flickr.com/3106/3203111597_d849ef615b.jpg?v=0"
								   smallURL:@"http://farm4.static.flickr.com/3106/3203111597_d849ef615b_t.jpg"
								   size:CGSizeMake(320, 480)] autorelease],
								 
								 [[[MockPhoto alloc]
								   initWithURL:@"http://farm4.static.flickr.com/3099/3164979221_6c0e583f7d.jpg?v=0"
								   smallURL:@"http://farm4.static.flickr.com/3099/3164979221_6c0e583f7d_t.jpg"
								   size:CGSizeMake(320, 480)] autorelease],
								 
								 [[[MockPhoto alloc]
								   initWithURL:@"http://farm4.static.flickr.com/3081/3164978791_3c292029f2.jpg?v=0"
								   smallURL:@"http://farm4.static.flickr.com/3081/3164978791_3c292029f2_t.jpg"
								   size:CGSizeMake(320, 480)] autorelease],
								 
								 [[[MockPhoto alloc]
								   initWithURL:@"http://farm2.static.flickr.com/1134/3172884000_84bc6a841e.jpg?v=0"
								   smallURL:@"http://farm2.static.flickr.com/1134/3172884000_84bc6a841e_t.jpg"
								   size:CGSizeMake(320, 480)] autorelease],
								 [[[MockPhoto alloc]
								   initWithURL:@"http://farm4.static.flickr.com/3246/2957580101_33c799fc09_o.jpg"
								   smallURL:@"http://farm4.static.flickr.com/3246/2957580101_d63ef56b15_t.jpg"
								   size:CGSizeMake(960, 1280)] autorelease],
								 [[[MockPhoto alloc]
								   initWithURL:@"http://farm3.static.flickr.com/2358/2179913094_3a1591008e.jpg"
								   smallURL:@"http://farm3.static.flickr.com/2358/2179913094_3a1591008e_t.jpg"
								   size:CGSizeMake(383, 500)] autorelease],
								 [[[MockPhoto alloc]
								   initWithURL:@"http://farm4.static.flickr.com/3162/2677417507_e5d0007e41.jpg"
								   smallURL:@"http://farm4.static.flickr.com/3162/2677417507_e5d0007e41_t.jpg"
								   size:CGSizeMake(391, 500)] autorelease],
								 [[[MockPhoto alloc]
								   initWithURL:@"http://farm4.static.flickr.com/3334/3334095096_ffdce92fc4.jpg"
								   smallURL:@"http://farm4.static.flickr.com/3334/3334095096_ffdce92fc4_t.jpg"
								   size:CGSizeMake(407, 500)] autorelease],
								 [[[MockPhoto alloc]
								   initWithURL:@"http://farm4.static.flickr.com/3118/3122869991_c15255d889.jpg"
								   smallURL:@"http://farm4.static.flickr.com/3118/3122869991_c15255d889_t.jpg"
								   size:CGSizeMake(500, 406)] autorelease],
								 [[[MockPhoto alloc]
								   initWithURL:@"http://farm2.static.flickr.com/1004/3174172875_1e7a34ccb7.jpg"
								   smallURL:@"http://farm2.static.flickr.com/1004/3174172875_1e7a34ccb7_t.jpg"
								   size:CGSizeMake(500, 372)] autorelease],
								 [[[MockPhoto alloc]
								   initWithURL:@"http://farm3.static.flickr.com/2300/2179038972_65f1e5f8c4.jpg"
								   smallURL:@"http://farm3.static.flickr.com/2300/2179038972_65f1e5f8c4_t.jpg"
								   size:CGSizeMake(391, 500)] autorelease],
								 
								 nil]
						 
						 photos2:nil
						 ] autorelease];
}
**/
- (void)dealloc {
	[super dealloc];
	[expedia release];
	[selectedItinerary release];
	[voucherPhotos release];
}

@end
