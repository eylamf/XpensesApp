// @flow

import React from 'react';
import type {Element} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useTheme} from '../../utils/hooks/useTheme';
import type {Theme} from '../../utils/Types';
import Subscription from '../../class-models/Subscription';
import Row from '../Row';
import CustomLogo from '../CustomLogo';

type Props = {
  subscription: Subscription,
  onPress: (sub: Subscription) => void,
};

const CHEVRON = require('../../../assets/Chevron.png');

const FixedSubscriptionItem = ({
  subscription,
  onPress,
}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  return (
    <RectButton
      style={styles.container}
      activeOpacity={0.6}
      underlayColor={theme.colors.soft1}
      rippleColor={theme.colors.soft1}
      onPress={() => onPress(subscription)}>
      <Row style={theme.styles.padding}>
        <CustomLogo
          style={[
            styles.logo,
            subscription.company.forceTint
              ? {tintColor: theme.colors.opposite}
              : null,
          ]}
          uri={subscription.company.logoURI}
        />
        <Text style={styles.name} maxFontSizeMultiplier={1.5}>
          {subscription.company.name}
        </Text>
        <Image style={styles.chevron} source={CHEVRON} resizeMode={'cover'} />
      </Row>
    </RectButton>
  );
};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {backgroundColor: theme.colors.main},

    logo: {
      width: 34,
      height: 34,
      marginRight: 15,
    },

    name: {
      flex: 1,
      ...theme.styles.mdText,
      ...theme.styles.bold,
    },

    chevron: {
      width: 18,
      height: 18,
      tintColor: theme.colors.soft3,
    },
  });

export default FixedSubscriptionItem;
