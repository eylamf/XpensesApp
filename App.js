// @flow

import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator, YellowBox} from 'react-native';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import {NavigationNativeContainer} from '@react-navigation/native';
import {connect} from 'remx';
import {Navigation} from './app/utils/Navigation';
import {AppStateStore} from './app/stores/app-state/Store';
import * as AppStateActions from './app/stores/app-state/Actions';
import {registerForPushNotifications, fetchNotifications} from './app/stores/notifications/Actions';

enableScreens();

YellowBox.ignoreWarnings(['Warning: componentWillMount']);

type Props = {
  loading: boolean,
  isNewUser: boolean,
};

const App = ({loading, isNewUser}: Props): React$Node => {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      fetchNotifications();
      registerForPushNotifications();
      mounted.current = true;
    }
  }, []);

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
