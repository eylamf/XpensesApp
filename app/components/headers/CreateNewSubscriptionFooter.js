// @flow

import React, {useEffect, useRef} from 'react';
import type {Element} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
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

const PLUS = require('../../../assets/Plus.png');

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
      <LineDivider color={theme.colors.soft2} />
      <RectButton
        style={styles.container}
        activeOpacity={0.9}
        underlayColor={theme.colors.soft}
        rippleColor={theme.colors.soft}
        onPress={onPress}>
        <Row style={[styles.content, {paddingBottom: insets.bottom + 30}]}>
          {/* <View style={styles.iconContainer}>
            <Image style={styles.addIcon} source={PLUS} resizeMode={'cover'} />
          </View> */}
          <Text style={styles.addLabel} maxFontSizeMultiplier={1.5}>
            Create a custom subscription
          </Text>
        </Row>
      </RectButton>
    </Animated.View>
  );
};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {backgroundColor: theme.colors.main},

    content: {
      paddingTop: 30,
      paddingHorizontal: 15,
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
      ...theme.styles.mdText,
      // ...theme.styles.bold,
    },
  });

export default CreateNewSubscriptionFooter;
