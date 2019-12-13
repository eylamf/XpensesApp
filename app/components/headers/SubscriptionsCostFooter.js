// @flow

import React, {useRef, useMemo, useEffect} from 'react';
import type {Element} from 'react';
import {
  Animated,
  Easing,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeArea} from 'react-native-safe-area-context';
import {connect} from 'remx';
import LinearGradient from 'react-native-linear-gradient';
// import Constants from '../../utils/Constants';
import {convertColorToOpacity} from '../../utils/Theme';
import {useTheme} from '../../utils/hooks/useTheme';
import {SubscriptionsStore} from '../../stores/subscriptions/Store';
import {AppStateStore} from '../../stores/app-state/Store';
import type {
  Theme,
  CostTypeFilter,
  CostIntervalFilter,
} from '../../utils/Types';
import Row from '../Row';

type Props = {
  totalCost: number,
  costTypeFilter: CostTypeFilter,
  costIntervalFilter: CostIntervalFilter,
};

export const GRADIENT_TOP_PADDING = 150;

const SubscriptionsCostFooter = ({
  totalCost,
  costTypeFilter,
  costIntervalFilter,
}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const gradient = useMemo(() => {
    return [convertColorToOpacity(theme.colors.main, 0), theme.colors.main];
  }, [theme.colors.main]);

  const mounted = useRef(false);

  const insets = useSafeArea();

  const totalCostAnimVal = useRef(new Animated.Value(0)).current;
  const transitionValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let reset;

    if (mounted.current) {
      Animated.timing(totalCostAnimVal, {
        toValue: 1,
        duration: 500,
        easing: Easing.elastic(1.2),
        delay: 250,
        useNativeDriver: true,
      }).start(() => {
        reset = setTimeout(() => {
          totalCostAnimVal.setValue(0);
        }, 500);
      });
    } else {
      Animated.timing(transitionValue, {
        toValue: 1,
        duration: 650,
        easing: Easing.out(Easing.poly(4)),
        useNativeDriver: true,
      }).start(() => {
        mounted.current = true;
      });
    }

    return () => {
      if (reset) {
        clearTimeout(reset);
      }
    };
  }, [totalCost, totalCostAnimVal, transitionValue]);

  const onShowFilterOptions = () => {
    AppStateStore.setBottomSheetEnabled(true);
  };

  const scale = totalCostAnimVal.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.2, 1],
  });

  const translateY = transitionValue.interpolate({
    inputRange: [0, 1],
    outputRange: [insets.bottom + 30 + 100, 0],
  });

  return (
    <Animated.View
      style={[styles.container, {transform: [{translateY}]}]}
      pointerEvents={'box-none'}>
      <LinearGradient
        style={styles.gradient}
        colors={gradient}
        locations={[0.01, 1]}
        pointerEvents={'none'}
      />
      <Row style={[styles.content, {paddingBottom: insets.bottom + 30}]}>
        <TouchableOpacity
          style={theme.styles.flexOne}
          activeOpacity={0.8}
          onPress={onShowFilterOptions}>
          <Text style={styles.filterType} maxFontSizeMultiplier={1.5}>
            {costTypeFilter}
          </Text>
          <Row style={styles.configure}>
            <Text style={styles.filterInterval} maxFontSizeMultiplier={1.5}>
              {costIntervalFilter}
            </Text>
            {/* <Image
              style={styles.chevron}
              source={CHEVRON}
              resizeMode={'cover'}
            /> */}
          </Row>
        </TouchableOpacity>
        <Animated.Text
          style={[styles.totalCost, {transform: [{scale}]}]}
          maxFontSizeMultiplier={1.5}>
          ${totalCost}
        </Animated.Text>
      </Row>
    </Animated.View>
  );
};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
    },

    gradient: {
      height: 100,
    },

    content: {
      paddingTop: 15,
      backgroundColor: theme.colors.main,
      paddingHorizontal: 20,
    },

    chevron: {
      width: 15,
      height: 15,
      tintColor:
        theme.id === 'light' ? theme.colors.opposite : theme.colors.soft3,
      marginLeft: 2,
      marginTop: 2,
    },

    totalCost: {
      letterSpacing: 1,
      ...theme.styles.mdText,
      ...theme.styles.bold,
    },

    filterType: {
      ...theme.styles.mdText,
      ...theme.styles.bold,
    },

    filterInterval: {
      ...theme.styles.lightText,
    },

    configure: {
      marginTop: 3,
      marginRight: 2,
    },
  });

const mapStateToProps = () => ({
  totalCost: SubscriptionsStore.getTotalCost(),
  costTypeFilter: SubscriptionsStore.getCostTypeFilter(),
  costIntervalFilter: SubscriptionsStore.getCostIntervalFilter(),
});

export default connect(mapStateToProps)(SubscriptionsCostFooter);
