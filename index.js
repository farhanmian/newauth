/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {AndroidImportance, EventType}   from '@notifee/react-native';


notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;
});
// Register main application
AppRegistry.registerComponent(appName, () => App);