// @flow

import React from 'react';
import type {Element} from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';
import {connect} from 'remx';
import {SubscriptionsStore} from '../../stores/subscriptions/Store';
import {useTheme} from '../../utils/hooks/useTheme';
import type {Theme, ReceiptMap} from '../../utils/Types';
import Subscription from '../../class-models/Subscription';
import Row from '../Row';

type Props = {
  receipt: ReceiptMap,
};

const ReceiptList = ({receipt}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const keyExtractor = (subID: string): string => subID;

  const renderItem = ({item: subID}: {item: string}) => {
    const sub: Subscription = SubscriptionsStore.getSubscriptionByID(subID);
    const cost = receipt[subID];

    return (
      <Row style={styles.item}>
        <Text style={styles.name}>{sub.getCompanyName()}</Text>
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
      data={Object.keys(receipt)}
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
