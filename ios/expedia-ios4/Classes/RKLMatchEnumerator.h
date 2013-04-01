//
//  RKLMatchEnumerator.h
//  ExpBuddyNav
//
//  Created by Neo Matrix on 4/13/09.
//  Copyright 2009 None. All rights reserved.
//

#import <Foundation/NSEnumerator.h>
#import <Foundation/NSString.h>
#import <stddef.h>

@interface NSString (RegexKitLiteEnumeratorAdditions)
- (NSEnumerator *)matchEnumeratorWithRegex:(NSString *)regex;

@end
