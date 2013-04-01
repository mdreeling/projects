//
//  DataManager.h
//  ExpBuddyNav
//
//  Created by Neo Matrix on 3/26/09.
//  Copyright 2009 None. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ExbuddiaData.h"

#define kFilename		@"exbuddia.plist"
#define kDataKey		@"Data"

@interface DataManager : NSObject {
	ExbuddiaData* myData;
}
@property(nonatomic,retain) ExbuddiaData *myData;
- (NSString *)getDataFilePath;
-(void) displaySummary:(ExbuddiaData*) bud;
- (void)load;
- (void)save:(ExbuddiaData*)dataIn;
- (void)save;
@end
