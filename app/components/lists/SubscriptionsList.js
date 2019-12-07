// @flow

import React, {useCallback} from 'react';
import type {Element} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {connect} from 'remx';
import {useTheme} from '../../utils/hooks/useTheme';
import type {Theme} from '../../utils/Types';
import Subscription from '../../class-models/Subscription';
import SubscriptionItem from '../list-items/SubscriptionItem';
import {SubscriptionsStore} from '../../stores/subscriptions/Store';
import LineDivider from '../LineDivider';

type Props = {
  subscriptionIDs: string[],
  onItemPress: (sub: Subscription) => void,
};

const SubscriptionsList = ({
  subscriptionIDs,
  onItemPress,
}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const keyExtractor = (item: string): string => item;

  const renderItem = ({item: subID}: {item: string}): Element<any> => {
    return <SubscriptionItem subscriptionID={subID} onPress={onItemPress} />;
  };

  const renderSeparator = () => {
    return <LineDivider leftSpace={15} color={theme.colors.soft2} />;
  };

  console.log(subscriptionIDs);

  return (
    <FlatList
      data={subscriptionIDs}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      ListFooterComponent={renderSeparator}
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
