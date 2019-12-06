// @flow

import React, {useCallback, useReducer} from 'react';
import type {Element} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useTheme} from '../../utils/hooks/useTheme';
import type {Theme, ReducerAction} from '../../utils/Types';
import FixedSubscriptionItem from '../list-items/FixedSubscriptionItem';
import LineDivider from '../LineDivider';
import {SUBSCRIPTIONS} from '../../utils/Data';

type Props = {};

type State = {
  ids: string[],
  allIDs: string[],
};

const reducer = (state: State, action: ReducerAction): State => {
  switch (action.type) {
    case 'SET_ALL_IDS': {
      const {allIDs} = action.payload;

      return {
        ids: allIDs,
        allIDs,
      };
    }

    default:
      return state;
  }
};

const FixedSubscriptionsList = ({}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);
  const [state, dispatch] = useReducer(reducer, {
    ids: Object.keys(SUBSCRIPTIONS),
    allIDs: Object.keys(SUBSCRIPTIONS),
  });

  const keyExtractor = (item: string): string => item;

  const renderItem = useCallback(
    ({item: subID}: {item: string}): Element<any> => {
      const subscription = SUBSCRIPTIONS[subID];
      return <FixedSubscriptionItem subscription={subscription} />;
    },
    [],
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

export default FixedSubscriptionsList;
