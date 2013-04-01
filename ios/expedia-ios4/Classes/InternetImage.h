//
//  Created by Björn Sållarp on 2008-09-03.
//  Copyright 2008 MightyLittle Industries. All rights reserved.
//
//  Read my blog @ http://jsus.is-a-geek.org

#import <UIKit/UIKit.h>

@interface InternetImage : NSObject {
	@private NSMutableData *m_ImageRequestData;
	@private id m_Delegate;
	@private NSURLConnection *imageConnection;
	@public NSString* ImageUrl;
	@public UIImage* Image;
	bool workInProgress;
}


@property (nonatomic, retain) NSString* ImageUrl;
@property (nonatomic, retain) UIImage* Image;
@property (nonatomic, assign) bool workInProgress;

-(void)setDelegate:(id)new_delegate;
-(id)initWithUrl:(NSString*)urlToImage;
-(void)downloadImage:(id)delegate;
-(void)abortDownload;

@end


@interface NSObject (InternetImageDelegate)
- (void)internetImageReady:(InternetImage*)internetImage;
@end
