// @flow

import React, {useCallback, useState} from 'react';
import type {Element} from 'react';
import {View, StatusBar} from 'react-native';
import stylesheet from './FixedStyles';
import {useTheme} from '../../utils/hooks/useTheme';
import Subscription from '../../class-models/Subscription';
import SearchBar from '../../components/headers/SearchBar';
import FixedSubscriptionsList from '../../components/lists/FixedSubscriptionsList';
import CreateNewSubscriptionFooter from '../../components/headers/CreateNewSubscriptionFooter';

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

  const onCreateNewPress = () => {
    navigation.navigate('CreateNew');
  };

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
        <FixedSubscriptionsList
          query={query}
          onItemPress={onSubscriptionPress}
        />
        <CreateNewSubscriptionFooter onPress={onCreateNewPress} />
      </View>
    </>
  );
};

export default MySubscriptions;
