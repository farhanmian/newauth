#import <React/RCTLinkingManager.h> //Add this Line in Header of file
#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <React/RCTAppSetupUtils.h>

#import "RNSplashScreen.h"
#import <TSBackgroundFetch/TSBackgroundFetch.h>
#if RCT_NEW_ARCH_ENABLED
#import <React/CoreModulesPlugins.h>
#import <React/RCTCxxBridgeDelegate.h>
#import <React/RCTFabricSurfaceHostingProxyRootView.h>
#import <React/RCTSurfacePresenter.h>
#import <React/RCTSurfacePresenterBridgeAdapter.h>
#import <ReactCommon/RCTTurboModuleManager.h>
#import <UserNotifications/UserNotifications.h>
#import <UserNotifications/UNUserNotificationCenter.h>
#import <react/config/ReactNativeConfig.h>
#import <NotifeeCore+UNUserNotificationCenter.h>

@interface AppDelegate () <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
  RCTTurboModuleManager *_turboModuleManager;
  RCTSurfacePresenterBridgeAdapter *_bridgeAdapter;
  std::shared_ptr<const facebook::react::ReactNativeConfig> _reactNativeConfig;
  facebook::react::ContextContainer::Shared _contextContainer;
}
@end
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  // [REQUIRED] Register BackgroundFetch
  [[TSBackgroundFetch sharedInstance] didFinishLaunching];
  
  RCTAppSetupPrepareApp(application);
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  
  
#if RCT_NEW_ARCH_ENABLED
  _contextContainer = std::make_shared<facebook::react::ContextContainer const>();
  _reactNativeConfig = std::make_shared<facebook::react::EmptyReactNativeConfig const>();
  _contextContainer->insert("ReactNativeConfig", _reactNativeConfig);
  _bridgeAdapter = [[RCTSurfacePresenterBridgeAdapter alloc] initWithBridge:bridge contextContainer:_contextContainer];
  bridge.surfacePresenter = _bridgeAdapter.surfacePresenter;
#endif

  UIView *rootView = RCTAppSetupDefaultRootView(bridge, @"Newauth", nil);

  if (@available(iOS 13.0, *)) {
    rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
    rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  // Set the splash screen to show by default.
   [RNSplashScreen show];
  
  // Request notification permissions
      UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
      UNAuthorizationOptions options = UNAuthorizationOptionBadge | UNAuthorizationOptionSound | UNAuthorizationOptionAlert;
      
      [center requestAuthorizationWithOptions:options completionHandler:^(BOOL granted, NSError * _Nullable error) {
          if (granted) {
              // User granted permission
              NSLog(@"Notification permission granted");
          } else {
              // User denied permission or there was an error
              NSLog(@"Notification permission denied");
          }
      }];
  return YES;
}

- (BOOL)application:(UIApplication *)application
openURL:(NSURL *)url
options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
return [RCTLinkingManager application:application openURL:url options:options];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
//  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

#if RCT_NEW_ARCH_ENABLED

#pragma mark - RCTCxxBridgeDelegate

- (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
{
  _turboModuleManager = [[RCTTurboModuleManager alloc] initWithBridge:bridge
                                                             delegate:self
                                                            jsInvoker:bridge.jsCallInvoker];
  return RCTAppSetupDefaultJsExecutorFactory(bridge, _turboModuleManager);
}

#pragma mark RCTTurboModuleManagerDelegate

- (Class)getModuleClassFromName:(const char *)name
{
  return RCTCoreModulesClassProvider(name);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                      jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
{
  return nullptr;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                     initParams:
                                                         (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return nullptr;
}

- (id<RCTTurboModule>)getModuleInstanceFromClass:(Class)moduleClass
{
  return RCTAppSetupDefaultModuleFromClass(moduleClass);
}

#endif

@end






// #import "AppDelegate.h"

// #import <React/RCTBridge.h>
// #import <React/RCTBundleURLProvider.h>
// #import <React/RCTRootView.h>

// #import <RCTAppSetupUtils.h>
// // Import RNSplashScreen
// #import <RNSplashScreen.h>

// #if RCT_NEW_ARCH_ENABLED
// #import <React/CoreModulesPlugins.h>
// #import <React/RCTCxxBridgeDelegate.h>
// #import <React/RCTFabricSurfaceHostingProxyRootView.h>
// #import <React/RCTSurfacePresenter.h>
// #import <React/RCTSurfacePresenterBridgeAdapter.h>
// #import <ReactCommon/RCTTurboModuleManager.h>
// #import <React/RCTPushNotificationManager.h>
// #import <UserNotifications/UserNotifications.h>
// #import <UserNotifications/UNUserNotificationCenter.h>
// #import <react/config/ReactNativeConfig.h>

// @interface AppDelegate () <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
//   RCTTurboModuleManager *_turboModuleManager;
//   RCTSurfacePresenterBridgeAdapter *_bridgeAdapter;
//   std::shared_ptr<const facebook::react::ReactNativeConfig> _reactNativeConfig;
//   facebook::react::ContextContainer::Shared _contextContainer;
// }
// @end
// #endif

// @implementation AppDelegate

// - (BOOL)application:(UIApplication *)application
// didFinishLaunchingWithOptions:(NSDictionary *)launchOptions

// {
//   self.moduleName = @"Newauth";
//    // You can add your custom initial props in the dictionary below.
//    // They will be passed down to the ViewController used by React Native.
//    self.initialProps = @{};
//   // Request notification permissions
//      UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
//      [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert | UNAuthorizationOptionBadge | UNAuthorizationOptionSound)
//                            completionHandler:^(BOOL granted, NSError * _Nullable error) {
//                                if (granted) {
//                                    NSLog(@"Notification permissions granted.");
//                                } else {
//                                    NSLog(@"Notification permissions denied.");
//                                }
//                            }];
//    /* First */
//    return [super application:application
//          didFinishLaunchingWithOptions:launchOptions];

//    /* Second */
// //   [RNSplashScreen show];

//    /* Third */
// //   return didFinishLaunchingWithOptions;
  
// }


// - (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
// {
// #if DEBUG
//   return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
// #else
//   return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
// #endif
// }

// #if RCT_NEW_ARCH_ENABLED

// #pragma mark - RCTCxxBridgeDelegate

// - (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
// {
//   _turboModuleManager = [[RCTTurboModuleManager alloc] initWithBridge:bridge
//                                                              delegate:self
//                                                             jsInvoker:bridge.jsCallInvoker];
//   return RCTAppSetupDefaultJsExecutorFactory(bridge, _turboModuleManager);
// }

// #pragma mark RCTTurboModuleManagerDelegate

// - (Class)getModuleClassFromName:(const char *)name
// {
//   return RCTCoreModulesClassProvider(name);
// }

// - (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
//                                                       jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
// {
//   return nullptr;
// }

// - (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
//                                                      initParams:
//                                                          (const facebook::react::ObjCTurboModule::InitParams &)params
// {
//   return nullptr;
// }

// - (id<RCTTurboModule>)getModuleInstanceFromClass:(Class)moduleClass
// {
//   return RCTAppSetupDefaultModuleFromClass(moduleClass);
// }

// #endif

// @end
