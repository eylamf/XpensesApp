// @flow

import React, {useLayoutEffect, useState, useCallback} from 'react';
import type {Element} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Constants from '../../utils/Constants';
import {useTheme} from '../../utils/hooks/useTheme';
import type {Theme, ColorGroup} from '../../utils/Types';
import ColorGridItem from '../../components/list-items/ColorGridItem';
import {COLOR_GRID_VALUES} from '../../utils/Data';

type Props = {
  navigation: any,
  route: any,
};

const ColorGrid = ({navigation, route}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const [selected, setSelected] = useState(() => {
    const {selectedColor} = route.params;

    const index = COLOR_GRID_VALUES.findIndex(c => c.color === selectedColor);

    if (index === -1) {
      return COLOR_GRID_VALUES[0];
    }

    return COLOR_GRID_VALUES[index];
  });

  const onDone = useCallback(() => {
    route.params.onSelectColor(selected);
    navigation.goBack();
  }, [navigation, route.params, selected]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: theme.colors.primary,
      headerBackTitle: 'Custom',
      headerTitleStyle: {color: theme.colors.opposite},
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerRight}
          activeOpacity={0.8}
          onPress={onDone}>
          <Text style={theme.styles.text}>Done</Text>
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    onDone,
    styles.headerRight,
    theme.colors.opposite,
    theme.colors.primary,
    theme.styles.text,
  ]);

  const keyExtractor = (item: ColorGroup) => item.color;

  const renderItem = ({item}: {item: ColorGroup}) => {
    return (
      <ColorGridItem
        selected={selected.color === item.color}
        color={item.color}
        selectedColor={theme.colors.opposite}
        onPress={() => setSelected(item)}
      />
    );
  };

  return (
    <View style={theme.styles.container}>
      <FlatList
        keyExtractor={keyExtractor}
        data={COLOR_GRID_VALUES}
        renderItem={renderItem}
        numColumns={5}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    headerRight: {
      height: 24,
      paddingLeft: 40,
      ...theme.styles.center,
    },

    listContent: {
      paddingVertical: 15,
    },

    columnWrapper: {
      height: Constants.getWindowWidth() / 5,
      // justifyContent: 'center',
    },
  });

export default ColorGrid;
