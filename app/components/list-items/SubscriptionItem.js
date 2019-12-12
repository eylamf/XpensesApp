// @flow

import React from 'react';
import type {Element} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {connect} from 'remx';
import {useTheme} from '../../utils/hooks/useTheme';
import type {Theme} from '../../utils/Types';
import Subscription from '../../class-models/Subscription';
import {SubscriptionsStore} from '../../stores/subscriptions/Store';
import Row from '../Row';
import CustomLogo from '../CustomLogo';

type Props = {
  subscriptionID: string,
  subscription: Subscription,
  description: ?string,
  cost: number,
  onPress: (sub: Subscription) => void,
};

const SubscriptionItem = ({
  subscriptionID,
  subscription,
  description,
  cost,
  onPress,
}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  return (
    <RectButton
      style={styles.container}
      activeOpacity={0.9}
      underlayColor={theme.colors.soft}
      rippleColor={theme.colors.soft}
      onPress={() => onPress(subscription)}>
      <Row style={theme.styles.padding}>
        <CustomLogo
          style={[
            styles.logo,
            !subscription.custom
              ? subscription.company.forceTint
                ? {tintColor: theme.colors.opposite}
                : null
              : null,
          ]}
          uri={subscription.company.logoURI}
          initials={subscription.company.getInitials()}
          bgColor={subscription.company.colorGroup.color}
        />
        <View style={theme.styles.flexOne}>
          <Text style={styles.name} maxFontSizeMultiplier={1.5}>
            {subscription.company.name}
          </Text>
          {subscription.hasDescription() && (
            <Text style={styles.desc} maxFontSizeMultiplier={1.5}>
              {description}
            </Text>
          )}
        </View>
        <View style={styles.costContainer}>
          <Text style={styles.costLabel} maxFontSizeMultiplier={1.5}>
            ${cost}
          </Text>
          <Text style={styles.interval} maxFontSizeMultiplier={1.5}>
            {subscription.cycle.toPretty()}
          </Text>
        </View>
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
      ...theme.styles.text,
      ...theme.styles.bold,
    },

    desc: {
      marginTop: 3,
      ...theme.styles.lightText,
    },

    costContainer: {
      marginLeft: 15,
      alignItems: 'flex-end',
    },

    costLabel: {
      marginBottom: 3,
      ...theme.styles.text,
      // ...theme.styles.bold,
    },

    interval: {
      ...theme.styles.smText,
    },
  });

const mapStateToProps = (ownProps: Props) => ({
  subscription: SubscriptionsStore.getSubscriptionByID(ownProps.subscriptionID),
  cost: SubscriptionsStore.getSubscriptionByID(ownProps.subscriptionID).cost,
  description: SubscriptionsStore.getSubscriptionByID(ownProps.subscriptionID)
    .description,
});

export default connect(mapStateToProps)(SubscriptionItem);
