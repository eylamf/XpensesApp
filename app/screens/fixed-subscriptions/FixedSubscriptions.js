// @flow

import React, {useCallback, useState} from 'react';
import type {Element} from 'react';
import {View, StatusBar} from 'react-native';
import stylesheet from './FixedStyles';
import {useTheme} from '../../utils/hooks/useTheme';
import Subscription from '../../class-models/Subscription';
import SearchBar from '../../components/headers/SearchBar';
import FixedSubscriptionsList from '../../components/lists/FixedSubscriptionsList';

type Props = {
  navigation: any,
  route: any,
};

const MySubscriptions = ({navigation, route}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const [query, setQuery] = useState('');

  const onClose = () => navigation.goBack();

  const onSearch = () => {};

  const onSubscriptionPress = useCallback((subscription: Subscription) => {
    navigation.navigate('SubDetails', {subscription, isAddMode: true});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StatusBar barStyle={`${theme.oppositeID}-content`} animated />
      <View style={theme.styles.container}>
        <SearchBar
          query={query}
          onChangeQuery={(q: string) => setQuery(q)}
          onDone={onClose}
          onSearch={onSearch}
        />
        <FixedSubscriptionsList onItemPress={onSubscriptionPress} />
      </View>
    </>
  );
};

export default MySubscriptions;
