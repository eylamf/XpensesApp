// @flow

import React, {useRef, useEffect} from 'react';
import type {Element} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {TouchableOpacity as RNTouchableOpacity} from 'react-native-gesture-handler';
import Animated, {Easing} from 'react-native-reanimated';
import {connect} from 'remx';
import {SubscriptionsStore} from '../../stores/subscriptions/Store';
import {useTheme} from '../../utils/hooks/useTheme';
import stylesheet from './ReceiptStyles';
import Constants from '../../utils/Constants';
import Row from '../../components/Row';
import ReceiptList from '../../components/lists/ReceiptList';
// import LineDivider from '../../components/LineDivider';

type Props = {
  navigation: any,
};

const INITIAL_TRANSLATE_Y = Constants.getWindowHeight() * 0.75;
const PLUS = require('../../../assets/Plus.png');

const ReceiptModal = ({navigation}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const transitionVal = useRef(new Animated.Value(0)).current;

  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      Animated.timing(transitionVal, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.poly(4)),
        useNativeDriver: true,
      }).start(() => {
        mounted.current = true;
      });
    }
  }, [transitionVal]);

  const translateY = Animated.interpolate(transitionVal, {
    inputRange: [0, 1],
    outputRange: [INITIAL_TRANSLATE_Y, 0],
  });

  const onDismiss = () => {
    Animated.timing(transitionVal, {
      toValue: 0,
      duration: 250,
      easing: Easing.out(Easing.poly(4)),
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        navigation.goBack();
      }
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.overlay, {opacity: transitionVal}]}>
        <TouchableOpacity
          style={theme.styles.flexOne}
          activeOpacity={1}
          onPress={onDismiss}
        />
      </Animated.View>
      <Animated.View style={[styles.content, {transform: [{translateY}]}]}>
        <Row style={styles.header}>
          <RNTouchableOpacity
            style={styles.closeBtn}
            activeOpacity={0.8}
            onPress={onDismiss}>
            <Image
              style={styles.closeIcon}
              source={PLUS}
              resizeMode={'cover'}
            />
          </RNTouchableOpacity>
        </Row>
        <Text style={styles.title} maxFontSizeMultiplier={1.5}>
          Breakdown
        </Text>
        <ReceiptList />
      </Animated.View>
    </View>
  );
};

export default ReceiptModal;
