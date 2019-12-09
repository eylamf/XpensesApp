// @flow

import React, {useLayoutEffect, useCallback, useRef} from 'react';
import type {Element} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {connect} from 'remx';
import {convertColorToOpacity} from '../utils/Theme';
import {useTheme} from '../utils/hooks/useTheme';
import type {Theme} from '../utils/Types';
import {AppStateStore} from '../stores/app-state/Store';
import SubscriptionsPaymentFilterSheet from './sheets/SubscriptionsPaymentFilterSheet';

type Props = {
  bottomSheetEnabled: boolean,
  children: React$Node,
};

const SHEET_SNAP_POINTS = [340, 0];

const AppContainer = ({bottomSheetEnabled, children}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const bottomSheet = useRef();

  const sheetPosn = useRef(new Animated.Value(1)).current;

  useLayoutEffect(() => {
    if (bottomSheetEnabled) {
      bottomSheet.current && bottomSheet.current.snapTo(0);
    }
  }, [bottomSheetEnabled]);

  const renderSheetHeader = useCallback(() => {
    return (
      <View style={styles.sheetHeader}>
        <View style={styles.handle} />
      </View>
    );
  }, [styles.sheetHeader, styles.handle]);

  const renderSheetContent = useCallback(() => {
    return <SubscriptionsPaymentFilterSheet />;
  }, []);

  const onSheetClose = useCallback(() => {
    console.log('on sheet close');
    AppStateStore.setBottomSheetEnabled(false);
  }, []);

  const sheetOpacity = Animated.interpolate(sheetPosn, {
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View style={theme.styles.flexOne}>
      {children}
      <Animated.View
        style={[styles.overlay, {opacity: sheetOpacity}]}
        pointerEvents={bottomSheetEnabled ? 'auto' : 'none'}
      />
      <BottomSheet
        ref={bottomSheet}
        snapPoints={SHEET_SNAP_POINTS}
        initialSnap={1}
        renderHeader={renderSheetHeader}
        renderContent={renderSheetContent}
        onCloseEnd={onSheetClose}
        callbackNode={sheetPosn}
        enabledContentGestureInteraction={false}
      />
    </View>
  );
};

const stylesheet = (theme: Theme) => {
  const isLight = theme.id === 'light';
  const color = isLight ? theme.colors.black : theme.colors.soft3;
  const opacity = isLight ? 0.5 : 0.3;

  return StyleSheet.create({
    overlay: {
      backgroundColor: convertColorToOpacity(color, opacity),
      ...StyleSheet.absoluteFill,
    },

    sheetHeader: {
      height: 40,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      backgroundColor: theme.colors.main,
      ...theme.styles.center,
    },

    handle: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.soft2,
    },

    sheetContent: {
      backgroundColor: theme.colors.main,
    },
  });
};

const mapStateToProps = () => ({
  bottomSheetEnabled: AppStateStore.isBottomSheetEnabled(),
});

export default connect(mapStateToProps)(AppContainer);
