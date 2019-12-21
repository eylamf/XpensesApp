// @flow

import React, {useState} from 'react';
import type {Element} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {RectButton, TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeArea} from 'react-native-safe-area-context';
import {connect} from 'remx';
import {SubscriptionsStore} from '../../stores/subscriptions/Store';
import {useTheme} from '../../utils/hooks/useTheme';
import type {
  Theme,
  CostTypeFilter,
  CostIntervalFilter,
  SimpleCostIntervalFilter,
} from '../../utils/Types';
import Constants from '../../utils/Constants';
import Row from '../Row';
import LineDivider from '../LineDivider';

type Props = {
  costTypeFilter: CostTypeFilter,
  costIntervalFilter: CostIntervalFilter,
  onHeightMeasured: (h: number) => void,
};

const COST_TYPE_FILTER_KEYS = ['Average', 'Remaining', 'Exact'];
const DETAILS = {
  Average: 'Shows the average amount due for the period of your choosing.',
  Remaining:
    'Shows the amount due between now and the end of the selected period.',
  Exact: 'Shows the exact amount due within the selected period.',
};
const INTERVALS = ['Week', 'Month', 'Year'];

const CHECK = require('../../../assets/Checkmark.png');

const SubscriptionsPaymentFilterSheet = ({
  costTypeFilter,
  costIntervalFilter,
  onHeightMeasured,
}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const insets = useSafeArea();

  // Allows for adjusting height according to user's accessibility settings (such as text size)
  const onLayout = ({nativeEvent}) => {
    const {height: h} = nativeEvent.layout;

    onHeightMeasured(h);
  };

  const onChangeCostTypeFilter = (filterType: CostTypeFilter) => {
    if (filterType === 'Average') {
      SubscriptionsStore.setCostFilters(
        filterType,
        `Per ${costIntervalFilter.split(' ')[1]}`,
      );
    } else {
      SubscriptionsStore.setCostFilters(
        filterType,
        `This ${costIntervalFilter.split(' ')[1]}`,
      );
    }

    SubscriptionsStore.adjustTotalCost();
  };

  const onChangeInterval = (interval: SimpleCostIntervalFilter) => {
    let adjusted: CostIntervalFilter;

    if (costTypeFilter === 'Average') {
      adjusted = `Per ${interval}`;
    } else {
      adjusted = `This ${interval}`;
    }

    SubscriptionsStore.setCostIntervalFilter(adjusted);

    SubscriptionsStore.adjustTotalCost();
  };

  return (
    <View
      style={[styles.container, {paddingBottom: insets.bottom + 15}]}
      onLayout={onLayout}>
      <Text style={styles.sectionLabel} maxFontSizeMultiplier={1.5}>
        Choose a filter
      </Text>
      <View style={styles.types}>
        {COST_TYPE_FILTER_KEYS.map((filterType, index) => (
          <View key={filterType}>
            <RectButton
              style={styles.item}
              activeOpacity={0.6}
              underlayColor={theme.colors.soft1}
              rippleColor={theme.colors.soft1}
              onPress={() => onChangeCostTypeFilter(filterType)}>
              <Row alignment={'flex-start'}>
                <View style={styles.checkContainer}>
                  {filterType === costTypeFilter && (
                    <Image
                      style={styles.checkmark}
                      source={CHECK}
                      resizeMode={'cover'}
                    />
                  )}
                </View>
                <View style={theme.styles.flexOne}>
                  <Text style={styles.label} maxFontSizeMultiplier={1.5}>
                    {filterType}
                  </Text>
                  <Text
                    style={theme.styles.lightText}
                    maxFontSizeMultiplier={1.5}>
                    {DETAILS[filterType]}
                  </Text>
                </View>
              </Row>
            </RectButton>
            <LineDivider leftSpace={50} color={theme.colors.soft1} />
          </View>
        ))}
      </View>
      <Text style={styles.sectionLabel} maxFontSizeMultiplier={1.5}>
        Choose a payment period
      </Text>
      <Row style={styles.intervals}>
        {INTERVALS.map((interval, index) => (
          <TouchableOpacity
            key={interval}
            style={styles.intervalItem}
            activeOpacity={0.8}
            onPress={() => onChangeInterval(interval)}>
            <Text
              style={
                `This ${interval}` === costIntervalFilter ||
                `Per ${interval}` === costIntervalFilter
                  ? theme.styles.mdPrimaryText
                  : theme.styles.mdText
              }
              maxFontSizeMultiplier={1.5}>
              {interval}
            </Text>
          </TouchableOpacity>
        ))}
      </Row>
    </View>
  );
};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {backgroundColor: theme.colors.main},

    sectionLabel: {
      marginLeft: 15,
      ...theme.styles.smLightText,
    },

    types: {marginBottom: 15},

    item: {
      width: Constants.getWindowWidth(),
      padding: 15,
    },

    checkContainer: {
      width: 20,
      height: 20,
      marginRight: 15,
      ...theme.styles.center,
    },

    checkmark: {
      width: 20,
      height: 20,
      tintColor: theme.colors.primary,
    },

    label: {
      marginBottom: 5,
      ...theme.styles.text,
      ...theme.styles.bold,
    },

    intervals: {
      marginTop: 15,
      paddingLeft: 50,
      paddingRight: 15,
    },

    intervalItem: {
      height: 40,
      marginRight: 15,
    },
  });

const mapStateToProps = () => ({
  costTypeFilter: SubscriptionsStore.getCostTypeFilter(),
  costIntervalFilter: SubscriptionsStore.getCostIntervalFilter(),
});

export default connect(mapStateToProps)(SubscriptionsPaymentFilterSheet);
