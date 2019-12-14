// @flow

import React from 'react';
import type {Element} from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';
import {connect} from 'remx';
import {SubscriptionsStore} from '../../stores/subscriptions/Store';
import {useTheme} from '../../utils/hooks/useTheme';
import type {Theme, ReceiptEntry} from '../../utils/Types';
import Subscription from '../../class-models/Subscription';
import Row from '../Row';

type Props = {
  receipt: ReceiptEntry[],
};

const ReceiptList = ({receipt}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const keyExtractor = (entry: ReceiptEntry): string => entry.subID;

  const renderItem = ({item: entry}: {item: ReceiptEntry}) => {
    const sub: Subscription = SubscriptionsStore.getSubscriptionByID(
      entry.subID,
    );
    const {cost, intervals} = entry;

    const intervalsLabel = intervals > 0 ? `(${intervals})` : '';

    return (
      <Row style={styles.item}>
        <Text
          style={
            styles.name
          }>{`${sub.getCompanyName()} ${intervalsLabel}`}</Text>
        <Text style={cost === 0 ? styles.disabledCost : styles.cost}>
          ${cost.toFixed(2)}
        </Text>
      </Row>
    );
  };

  return (
    <FlatList
      style={styles.list}
      keyExtractor={keyExtractor}
      data={receipt}
      renderItem={renderItem}
    />
  );
};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    list: {paddingBottom: 10},

    item: {
      paddingVertical: 10,
      paddingHorizontal: 15,
    },

    name: {
      flex: 1,
      ...theme.styles.text,
    },

    cost: {
      ...theme.styles.text,
      ...theme.styles.bold,
    },

    disabledCost: {
      ...theme.styles.lightText,
      ...theme.styles.bold,
    },
  });

const mapStateToProps = () => ({
  receipt: SubscriptionsStore.getReceipt(),
});

export default connect(mapStateToProps)(ReceiptList);
