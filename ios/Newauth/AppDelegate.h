#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <UserNotifications/UserNotifications.h>
#import <NotifeeCore+UNUserNotificationCenter.h>
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end


// #import <React/RCTBridgeDelegate.h>
// #import <UIKit/UIKit.h>
// #import <RCTAppDelegate.h>
// #import <UserNotifications/UserNotifications.h>
// #import <RNPermissionHandlerNotifications.h>
// #import <React/RCTPushNotificationManager.h>
// #import <UserNotifications/UNUserNotificationCenter.h>
// @interface AppDelegate : RCTAppDelegate
// //UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

// //@property (nonatomic, strong) UIWindow *window;
// //@property (nonatomic, strong) RCTBridge *bridge;
// //@property (nonatomic, strong) NSString *moduleName;
// //@property (nonatomic, strong) NSDictionary *initialProps;
// //@property (strong, nonatomic) ViewController *viewController;
// @end
