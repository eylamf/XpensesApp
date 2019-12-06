// @flow

import React, {useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator, YellowBox} from 'react-native';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import {NavigationNativeContainer} from '@react-navigation/native';
import {Navigation} from './app/utils/Navigation';
import {AppStateStore} from './app/stores/app-state/Store';
import * as AppStateActions from './app/stores/app-state/Actions';
import {connect} from 'remx';

enableScreens();

YellowBox.ignoreWarnings(['Warning: componentWillMount']);

type Props = {
  loading: boolean,
  isNewUser: boolean,
};

const App = ({loading, isNewUser}: Props): React$Node => {
  useEffect(() => {
    if (isNewUser) {
      AppStateActions.checkIfNewUser();
    }
  }, [isNewUser]);

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator />
          </View>
        ) : (
          <NavigationNativeContainer>
            <Navigation />
          </NavigationNativeContainer>
        )}
      </SafeAreaProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0, 0, 0)',
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = () => ({
  isNewUser: AppStateStore.isNewUser(),
});

export default connect(mapStateToProps)(App);
