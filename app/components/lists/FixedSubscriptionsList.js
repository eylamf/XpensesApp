// @flow

import React, {useCallback, useReducer, useEffect} from 'react';
import type {Element} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {connect} from 'remx';
import {useTheme} from '../../utils/hooks/useTheme';
import type {Theme, ReducerAction} from '../../utils/Types';
import {SubscriptionsStore} from '../../stores/subscriptions/Store';
import Subscription from '../../class-models/Subscription';
import FixedSubscriptionItem from '../list-items/FixedSubscriptionItem';
import LineDivider from '../LineDivider';
import {SUBSCRIPTIONS} from '../../utils/Data';

type Props = {
  subbedIDs: string[],
  onItemPress: (sub: Subscription) => void,
};

type State = {
  ids: string[],
  allIDs: string[],
};

const reducer = (state: State, action: ReducerAction): State => {
  switch (action.type) {
    case 'SET_IDS': {
      const {ids} = action.payload;

      return {
        ...state,
        ids,
      };
    }

    default:
      return state;
  }
};

const FixedSubscriptionsList = ({
  subbedIDs,
  onItemPress,
}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);
  const [state, dispatch] = useReducer(reducer, {
    ids: Object.keys(SUBSCRIPTIONS),
    allIDs: Object.keys(SUBSCRIPTIONS),
  });

  useEffect(() => {
    const ids = state.allIDs.filter(id => !SubscriptionsStore.exists(id));

    dispatch({type: 'SET_IDS', payload: {ids}});

    console.log('called');
  }, [subbedIDs, state.allIDs]);

  const keyExtractor = (item: string): string => item;

  const renderItem = useCallback(
    ({item: subID}: {item: string}): Element<any> => {
      const subscription = SUBSCRIPTIONS[subID];
      return (
        <FixedSubscriptionItem
          subscription={subscription}
          onPress={onItemPress}
        />
      );
    },
    [onItemPress],
  );

  const renderSeparator = useCallback((): Element<any> => {
    return <LineDivider leftSpace={15} color={theme.colors.soft2} />;
  }, [theme]);

  return (
    <FlatList
      data={state.ids}
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
  subbedIDs: SubscriptionsStore.getIDs(),
});

export default connect(mapStateToProps)(FixedSubscriptionsList);
