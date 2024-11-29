/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import ZoomOnClick from './Screens/ZoomOnClick';
import IosPermission from './Screens/IosPermission';
import notifee, {EventType} from '@notifee/react-native';
import SplashScreen from 'react-native-splash-screen';
import {Text, YellowBox} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      //  <IosPermission/>
      // <Text>Testing</Text>
      <ZoomOnClick />
    );
  }
}
