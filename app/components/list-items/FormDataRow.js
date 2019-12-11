// @flow

import React, {useEffect, useRef} from 'react';
import type {Element} from 'react';
import {Text, Image, Animated, Easing, StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useTheme} from '../../utils/hooks/useTheme';
import type {Theme} from '../../utils/Types';
import Row from '../Row';

type Props = {
  isExpanded: boolean,
  label: string,
  value: string | number,
  rightComponent: ?Element<any>,
  onPress: () => void,
};

const CHEVRON = require('../../../assets/Chevron.png');

const FormDataRow = ({
  isExpanded,
  label,
  value,
  rightComponent,
  onPress,
}: Props): Element<any> => {
  const mounted = useRef(false);
  const animVal = useRef(new Animated.Value(0)).current;

  const [theme, styles] = useTheme(stylesheet);

  useEffect(() => {
    if (mounted.current) {
      if (isExpanded) {
        Animated.timing(animVal, {
          toValue: 1,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(animVal, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start();
      }
    } else {
      mounted.current = true;
    }
  }, [isExpanded, animVal]);

  const rotate = animVal.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '-90deg'],
  });

  return (
    <RectButton
      style={styles.cycle}
      onPress={onPress}
      activeOpacity={0.9}
      underlayColor={theme.colors.soft}
      rippleColor={theme.colors.soft}>
      <Row>
        <Text style={styles.label}>{label}</Text>
        {rightComponent ? (
          rightComponent
        ) : (
          <Row>
            <Text style={theme.styles.lightText}>{value}</Text>
            <Animated.Image
              style={[styles.chevron, {transform: [{rotate}]}]}
              source={CHEVRON}
              resizeMode={'cover'}
            />
          </Row>
        )}
      </Row>
    </RectButton>
  );
};

FormDataRow.defaultProps = {
  rightComponent: null,
  isExpanded: false,
  value: '',
};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    label: {
      flex: 1,
      ...theme.styles.text,
    },

    input: {
      alignSelf: 'center',
      ...theme.styles.mdText,
    },

    cycle: {
      padding: 15,
    },

    data: {
      paddingHorizontal: 10,
      paddingVertical: 2,
      backgroundColor: theme.colors.black,
      borderRadius: 5,
    },

    chevron: {
      width: 20,
      height: 20,
      tintColor: theme.colors.soft3,
      marginLeft: 10,
      marginTop: 2,
    },
  });

export default FormDataRow;
