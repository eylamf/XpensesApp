// @flow

import React from 'react';
import type {Element} from 'react';
import {Alert} from 'react-native';
import type {AlertConfig} from './Types';

class ErrorHandler {
  static showAlert(config: AlertConfig, cancelable?: boolean = false) {
    const {title, message, actions} = config;

    Alert.alert(title, message, actions, {cancelable});
  }
}

export default ErrorHandler;
