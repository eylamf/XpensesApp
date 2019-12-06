// @flow

import React, {useCallback, useState, useLayoutEffect} from 'react';
import type {Element} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StatusBar,
  TextInput,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import stylesheet from './DetailsStyles';
import {useTheme} from '../../utils/hooks/useTheme';
import Subscription from '../../class-models/Subscription';
import SubDetailsHeader from '../../components/headers/SubDetailsHeader';
import Row from '../../components/Row';
import * as SubscriptionActions from '../../stores/subscriptions/Actions';

type Props = {
  navigation: any,
  route: any,
};

const SubscriptionDetails = ({navigation, route}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const insets = useSafeArea();

  const {
    subscription,
    isAddMode,
  }: {subscription: Subscription, isAddMode: boolean} = route.params;

  const [cost, setCost] = useState(subscription.cost.toFixed(2).toString());
  const [description, setDescription] = useState(subscription.description);

  const onClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onAction = useCallback(() => {
    if (isAddMode) {
      const updated = new Subscription({...subscription});

      if (cost !== subscription.cost) {
        updated.setCost(Number(cost));
      }

      if (description !== subscription.description) {
        updated.setDescription(description);
      }

      console.log('SubDetails: updated', updated);

      SubscriptionActions.addSubscription(updated);
    }
  }, [cost, description, isAddMode, subscription]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerRight}
          activeOpacity={0.8}
          onPress={onAction}>
          <Text style={theme.styles.whiteText}>
            {isAddMode ? 'Add' : 'Save'}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    isAddMode,
    onAction,
    styles.headerRight,
    theme.styles.whiteText,
  ]);

  const onBlur = () => {
    let formatted = Number(cost).toFixed(2);

    setCost(formatted.toString());
  };

  return (
    <>
      <StatusBar barStyle={'light-content'} animated />
      <View style={theme.styles.container}>
        <SubDetailsHeader
          color={subscription.company.color}
          title={subscription.company.name}
          isAddMode={isAddMode}
          onClose={onClose}
          // onAction={onAction}
        />
        <ScrollView
          contentContainerStyle={[
            styles.listContent,
            {paddingBottom: insets.bottom},
          ]}
          stickyHeaderIndices={[1]}>
          <View
            style={[styles.top, {backgroundColor: subscription.company.color}]}>
            <Image
              style={styles.logo}
              source={{uri: subscription.company.logoURI}}
              resizeMode={'cover'}
            />
            <Text style={styles.name}>{subscription.company.name}</Text>
            <TextInput
              style={theme.styles.whiteText}
              placeholder={'Add a description'}
              placeholderTextColor={subscription.company.tint2}
              onChangeText={(text: string) => setDescription(text)}
              value={description}
              selectionColor={theme.colors.white}
            />
          </View>
          <Row
            style={[
              styles.costSection,
              {backgroundColor: subscription.company.color},
            ]}>
            <Row
              style={[
                styles.costContainer,
                {backgroundColor: subscription.company.tint1},
              ]}>
              <Text style={theme.styles.mdWhiteText}>$</Text>
              <TextInput
                style={styles.costInput}
                placeholder={'0.00'}
                placeholderTextColor={subscription.company.tint2}
                value={cost}
                onChangeText={(text: string) => setCost(text)}
                onBlur={onBlur}
                selectionColor={theme.colors.white}
                keyboardType={'numeric'}
              />
            </Row>
          </Row>
        </ScrollView>
      </View>
    </>
  );
};

export default SubscriptionDetails;
