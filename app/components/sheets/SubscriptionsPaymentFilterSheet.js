// @flow

import React, {useState} from 'react';
import type {Element} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {connect} from 'remx';
import {AppStateStore} from '../../stores/app-state/Store';
import {useTheme} from '../../utils/hooks/useTheme';
import type {
  Theme,
  CostTypeFilter,
  CostIntervalFilter,
} from '../../utils/Types';
import Constants from '../../utils/Constants';
import Row from '../Row';
import LineDivider from '../LineDivider';

type Props = {
  costTypeFilter: CostTypeFilter,
  costIntervalFilter: CostIntervalFilter,
};

const COST_TYPE_FILTER_KEYS = ['Average', 'Remaining', 'Total'];
const DETAILS = {
  Average: 'Divides the total of all bills into the period of your choosing.',
  Remaining: 'Shows a total of the bills you have left to pay in this period.',
  Total: 'Shows a total of the bills you have in this entire period.',
};

const CHECK = require('../../../assets/Checkmark.png');

const SubscriptionsPaymentFilterSheet = ({
  costTypeFilter,
  costIntervalFilter,
}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const onChangeCostTypeFilter = (filterType: CostTypeFilter) => {
    AppStateStore.setCostTypeFilter(filterType);
  };

  return (
    <View style={styles.container}>
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
                <Text style={styles.label}>{filterType} Expenses</Text>
                <Text style={theme.styles.lightText}>
                  {DETAILS[filterType]}
                </Text>
              </View>
            </Row>
          </RectButton>
          {index !== COST_TYPE_FILTER_KEYS.length - 1 && (
            <LineDivider leftSpace={15} color={theme.colors.soft2} />
          )}
        </View>
      ))}
    </View>
  );
};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: 300,
      backgroundColor: theme.colors.main,
    },

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
  });

const mapStateToProps = () => ({
  costTypeFilter: AppStateStore.getCostTypeFilter(),
  costIntervalFilter: AppStateStore.getCostIntervalFilter(),
});

export default connect(mapStateToProps)(SubscriptionsPaymentFilterSheet);
