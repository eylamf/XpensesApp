// @flow

import React, {useState} from 'react';
import type {Element} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {RectButton, TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'remx';
import {AppStateStore} from '../../stores/app-state/Store';
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
import * as AppStateActions from '../../stores/app-state/Actions';

type Props = {
  costTypeFilter: CostTypeFilter,
  costIntervalFilter: CostIntervalFilter,
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
}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const onChangeCostTypeFilter = (filterType: CostTypeFilter) => {
    if (filterType === 'Average') {
      AppStateStore.setCostIntervalFilter(
        `Per ${costIntervalFilter.split(' ')[1]}`,
      );
    } else {
      AppStateStore.setCostIntervalFilter(
        `This ${costIntervalFilter.split(' ')[1]}`,
      );
    }

    AppStateActions.adjustFinalCost(filterType, costIntervalFilter);
    AppStateStore.setCostTypeFilter(filterType);
  };

  const onChangeInterval = (interval: SimpleCostIntervalFilter) => {
    let adjusted: CostIntervalFilter;

    if (costTypeFilter === 'Average') {
      adjusted = `Per ${interval}`;
    } else {
      adjusted = `This ${interval}`;
    }

    AppStateActions.adjustFinalCost(costTypeFilter, adjusted);
    AppStateStore.setCostIntervalFilter(adjusted);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>Choose a filter</Text>
      <View style={styles.types}>
        {COST_TYPE_FILTER_KEYS.map((filterType, index) => (
          <View key={filterType}>
            <RectButton
              style={styles.item}
              activeOpacity={0.9}
              underlayColor={theme.colors.soft}
              rippleColor={theme.colors.soft}
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
                  <Text style={styles.label}>{filterType}</Text>
                  <Text style={theme.styles.lightText}>
                    {DETAILS[filterType]}
                  </Text>
                </View>
              </Row>
            </RectButton>
            <LineDivider leftSpace={15} color={theme.colors.soft2} />
          </View>
        ))}
      </View>
      <Text style={styles.sectionLabel}>Choose a payment period</Text>
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
              }>
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
    container: {
      height: 400,
      backgroundColor: theme.colors.main,
      // padding: 15,
    },

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
      width: 15,
      height: 15,
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
  costTypeFilter: AppStateStore.getCostTypeFilter(),
  costIntervalFilter: AppStateStore.getCostIntervalFilter(),
});

export default connect(mapStateToProps)(SubscriptionsPaymentFilterSheet);
