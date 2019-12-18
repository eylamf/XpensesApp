// @flow

import DeviceInfo from 'react-native-device-info';
import {getStatusBarHeight as fetchStatusBarHeight} from 'react-native-status-bar-height';
import {Dimensions, Platform} from 'react-native';

class Constants {
  _windowWidth: number;
  _windowHeight: number;
  _navbarHeight: number;
  _statusBarHeight: number;
  _systemVersion: number;

  constructor() {
    const {width, height} = Dimensions.get('window');

    this._windowWidth = width;
    this._windowHeight = height;
    this._statusBarHeight = fetchStatusBarHeight();

    const systemVersion = DeviceInfo.getSystemVersion();

    this._systemVersion = Number(systemVersion);
  }

  getNavbarHeight(): number {
    let height = 0;

    Platform.OS === 'ios' ? (height += 44) : (height += 54);

    return height;
  }

  getStatusBarHeight(): number {
    return this._statusBarHeight;
  }

  getWindowWidth(): number {
    return this._windowWidth;
  }

  getWindowHeight(): number {
    return this._windowHeight;
  }

  isIOS13OrLater(): boolean {
    return Platform.OS === 'ios' && this._systemVersion >= 13;
  }
}

export default new Constants();
