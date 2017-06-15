//
//  AvatarManager.m
//  dreamfactory
//
//  Created by fanshuo on 2017/6/15.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "AvatarManager.h"

@implementation AvatarManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}

@end
