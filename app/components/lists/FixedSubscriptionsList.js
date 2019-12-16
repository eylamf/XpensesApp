// @flow

import React, {
  useMemo,
  useCallback,
  useReducer,
  useRef,
  useEffect,
} from 'react';
import type {Element} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'remx';
import {useTheme} from '../../utils/hooks/useTheme';
import {convertColorToOpacity} from '../../utils/Theme';
import type {Theme, ReducerAction} from '../../utils/Types';
import {SubscriptionsStore} from '../../stores/subscriptions/Store';
import Subscription from '../../class-models/Subscription';
import FixedSubscriptionItem from '../list-items/FixedSubscriptionItem';
import LineDivider from '../LineDivider';
import {SUBSCRIPTIONS} from '../../utils/Data';

type Props = {
  subbedIDs: string[],
  onItemPress: (sub: Subscription) => void,
  query: string,
};

type State = {
  ids: string[],
  unsubbedIDs: string[],
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

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
  query,
}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const [state, dispatch] = useReducer(
    reducer,
    {ids: [], unsubbedIDs: []},
    () => {
      const allSorted = Object.keys(SUBSCRIPTIONS).sort();
      const unsubbedIDs = allSorted.filter(id => {
        return !SubscriptionsStore.exists(id);
      });

      return {
        ids: unsubbedIDs,
        unsubbedIDs,
      };
    },
  );

  // Set unsubbed IDs
  useEffect(() => {
    const ids = state.unsubbedIDs.filter(
      (id: string) => !SubscriptionsStore.exists(id),
    );
    dispatch({type: 'SET_IDS', payload: {ids}});
  }, [subbedIDs, state.unsubbedIDs]);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = state.unsubbedIDs.filter((id: string) => {
        const sub: Subscription = SUBSCRIPTIONS[id];

        return sub.getCompanyName().indexOf(query) > -1;
      });

      dispatch({type: 'SET_IDS', payload: {ids: filtered}});
    } else {
      dispatch({type: 'SET_IDS', payload: {ids: state.unsubbedIDs}});
    }
  }, [query, state.unsubbedIDs]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const gradientColors = useMemo(() => {
    return [theme.colors.main, convertColorToOpacity(theme.colors.main, 0)];
  }, [theme.colors.main]);

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
    return <LineDivider leftSpace={15} color={theme.colors.soft1} />;
  }, [theme]);

  const fadeOpacity = Animated.interpolate(scrollY, {
    inputRange: [0, 30],
    outputRange: [0, 1],
  });

  return (
    <View style={theme.styles.flexOne}>
      <Animated.View
        style={[styles.fade, {opacity: fadeOpacity}]}
        pointerEvents={'none'}>
        <LinearGradient style={styles.gradient} colors={gradientColors} />
      </Animated.View>
      {/* <LineDivider color={theme.colors.soft2} /> */}
      <AnimatedFlatList
        data={state.ids}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={renderSeparator}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
        keyboardDismissMode={'interactive'}
        contentContainerStyle={styles.listContent}
      />
      <LinearGradient
        style={styles.footerGradient}
        colors={gradientColors}
        pointerEvents={'none'}
      />
    </View>
  );
};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    fade: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 2,
    },

    gradient: {height: 80},

    footerGradient: {
      height: 80,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      transform: [{scale: -1}], // In order to use the same memoized gradient colors as the top gradient
    },

    listContent: {paddingBottom: 80},
  });

const mapStateToProps = () => ({
  subbedIDs: SubscriptionsStore.getIDs(),
});

export default connect(mapStateToProps)(FixedSubscriptionsList);
