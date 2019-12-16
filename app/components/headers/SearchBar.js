// @flow

import React, {useRef, useEffect} from 'react';
import type {Element} from 'react';
import {
  Animated,
  Easing,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeArea} from 'react-native-safe-area-context';
import {useTheme} from '../../utils/hooks/useTheme';
import type {Theme} from '../../utils/Types';
import Row from '../Row';
import LineDivider from '../LineDivider';

type Props = {
  query: string,
  onChangeQuery: (q: string) => void,
  onSearch: () => void,
  onDone: () => void,
};

const SearchBar = ({
  query,
  onChangeQuery,
  onSearch,
  onDone,
}: Props): Element<any> => {
  const insets = useSafeArea();

  const [theme, styles] = useTheme(stylesheet);

  const mounted = useRef(false);
  const transitionValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!mounted.current) {
      Animated.timing(transitionValue, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.poly(4)),
        useNativeDriver: true,
      }).start(() => {
        mounted.current = true;
      });
    }
  }, [transitionValue]);

  const translateY = transitionValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-60 - insets.top, 0],
  });

  return (
    <Animated.View style={{transform: [{translateY}]}}>
      <Row style={[styles.container, {paddingTop: insets.top + 15}]}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.input}
            placeholder={'Search by name'}
            placeholderTextColor={theme.colors.soft3}
            value={query}
            onChangeText={onChangeQuery}
            clearButtonMode={'while-editing'}
            onSubmitEditing={onSearch}
            returnKeyType={'search'}
            selectionColor={theme.colors.primary}
            maxFontSizeMultiplier={1.5}
          />
        </View>
        <TouchableOpacity
          style={styles.doneBtn}
          activeOpacity={0.8}
          onPress={onDone}>
          <Text style={theme.styles.primaryText} maxFontSizeMultiplier={1.5}>
            Done
          </Text>
        </TouchableOpacity>
      </Row>
      {/* <LineDivider color={theme.colors.soft2} /> */}
    </Animated.View>
  );
};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.main,
      paddingBottom: 10,
    },

    searchBox: {
      flex: 1,
      height: 40,
      marginLeft: 15,
      backgroundColor: theme.colors.soft1,
      borderRadius: 5,
      justifyContent: 'center',
      paddingLeft: 10,
      paddingRight: 5,
    },

    input: {
      flex: 1,
      ...theme.styles.text,
    },

    doneBtn: {
      height: 26,
      paddingHorizontal: 15,
      // marginLeft: 15,
      ...theme.styles.center,
    },
  });

export default SearchBar;
