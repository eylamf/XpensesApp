// @flow

import React from 'react';
import type {Element} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useTheme} from '../../utils/hooks/useTheme';
import type {Theme} from '../../utils/Types';
import SubscriptionItem from '../list-items/SubscriptionItem';
import {SubscriptionsStore} from '../../stores/subscriptions/Store';
import {connect} from 'remx';

type Props = {
  subscriptionIDs: string[],
};

const SubscriptionsList = ({subscriptionIDs}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const keyExtractor = (item: string): string => item;

  const renderItem = ({item: subID}: {item: string}): Element<any> => {
    return <SubscriptionItem subscriptionID={subID} />;
  };

  return (
    <FlatList
      data={subscriptionIDs}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    content: {
      paddingTop: 15,
    },
  });

const mapStateToProps = () => ({
  subscriptionIDs: SubscriptionsStore.getIDs(),
});

export default connect(mapStateToProps)(SubscriptionsList);
