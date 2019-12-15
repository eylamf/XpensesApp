// @flow

import React, {useEffect, useRef} from 'react';
import type {Element} from 'react';
import {Text, StyleSheet} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import {RectButton} from 'react-native-gesture-handler';
import {useSafeArea} from 'react-native-safe-area-context';
import {useTheme} from '../../utils/hooks/useTheme';
import type {Theme} from '../../utils/Types';
import Row from '../Row';
import LineDivider from '../LineDivider';

type Props = {
  onPress: () => void,
};

const CreateNewSubscriptionFooter = ({onPress}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const insets = useSafeArea();

  const transitionValue = useRef(new Animated.Value(0)).current;

  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      Animated.timing(transitionValue, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.poly(4)),
        useNativeDriver: true,
      }).start(() => {
        mounted.current = true;
      });
    }
  }, [transitionValue]);

  const translateY = Animated.interpolate(transitionValue, {
    inputRange: [0, 1],
    outputRange: [94 + insets.bottom, 0],
  });

  return (
    <Animated.View style={{transform: [{translateY}]}}>
      <Row style={[styles.content, {paddingBottom: insets.bottom + 20}]}>
        <RectButton
          style={styles.container}
          activeOpacity={0.6}
          underlayColor={theme.colors.soft1}
          rippleColor={theme.colors.soft1}
          onPress={onPress}>
          <Text style={styles.addLabel} maxFontSizeMultiplier={1.5}>
            Create Your Own
          </Text>
        </RectButton>
      </Row>
    </Animated.View>
  );
};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 30,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.primary,
      ...theme.styles.center,
    },

    content: {
      paddingTop: 15,
      // paddingHorizontal: 15,
      ...theme.styles.center,
    },

    iconContainer: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: theme.colors.soft1,
      marginRight: 15,
      ...theme.styles.center,
    },

    addIcon: {
      width: 15,
      height: 15,
      tintColor: theme.colors.primary,
    },

    addLabel: {
      ...theme.styles.whiteText,
      ...theme.styles.bold,
    },
  });

export default CreateNewSubscriptionFooter;
