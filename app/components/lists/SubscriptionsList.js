// @flow

import React, {useRef, useMemo} from 'react';
import type {Element} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'remx';
import {convertColorToOpacity} from '../../utils/Theme';
import {useTheme} from '../../utils/hooks/useTheme';
import type {Theme} from '../../utils/Types';
import Subscription from '../../class-models/Subscription';
import SubscriptionItem from '../list-items/SubscriptionItem';
import {SubscriptionsStore} from '../../stores/subscriptions/Store';
import LineDivider from '../LineDivider';
import EmptySubscriptions from '../list-items/EmptySubscriptions';

type Props = {
  subscriptionIDs: string[],
  onItemPress: (sub: Subscription) => void,
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SubscriptionsList = ({
  subscriptionIDs,
  onItemPress,
}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const scrollY = useRef(new Animated.Value(0)).current;

  const gradientColors = useMemo(() => {
    return [
      convertColorToOpacity(theme.colors.main, 0.8),
      convertColorToOpacity(theme.colors.main, 0),
    ];
  }, [theme.colors.main]);

  const keyExtractor = (item: string): string => item;

  const renderItem = ({item: subID}: {item: string}): Element<any> => {
    return <SubscriptionItem subscriptionID={subID} onPress={onItemPress} />;
  };

  const renderSeparator = () => {
    return <LineDivider leftSpace={15} color={theme.colors.soft1} />;
  };

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
      {/* {subscriptionIDs.length === 0 ? (
        <EmptySubscriptions textStyle={theme.styles.mdLightText} />
      ) : ( */}
      <AnimatedFlatList
        data={subscriptionIDs}
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
        contentContainerStyle={styles.listContent}
      />
      {/* )} */}
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

    listContent: {paddingBottom: 180}, // 100 from SubCostFooter - TODO: export it
  });

const mapStateToProps = () => ({
  subscriptionIDs: SubscriptionsStore.getIDs(),
});

export default connect(mapStateToProps)(SubscriptionsList);
