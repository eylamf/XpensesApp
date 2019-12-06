// @flow

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {NavigationNativeContainer} from '@react-navigation/native';
import {Navigation} from './app/utils/Navigation';

enableScreens();

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <NavigationNativeContainer>
        <Navigation />
      </NavigationNativeContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
