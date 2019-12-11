// @flow

import React, {useReducer, useLayoutEffect, useCallback} from 'react';
import type {Element} from 'react';
import {View, ScrollView, Image, TextInput, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import stylesheet from './CreateStyles';
import {useTheme} from '../../utils/hooks/useTheme';
import type {ReducerAction} from '../../utils/Types';
import Row from '../../components/Row';
import CustomLogo from '../../components/CustomLogo';

type Props = {
  navigation: any,
  route: any,
};

// Flattened Subscription class
type State = {
  name: string,
  description: ?string,
  logoURI: string,
  color: string,
  tint1: string,
  tint2: string,
  cost: string,
};

const types = {
  SET_NAME: 'SET_NAME',
  SET_DESC: 'SET_DESC',
  SET_COST: 'SET_COST',
  SET_COLOR: 'SET_COLOR',
  SET_TINT1: 'SET_TINT1',
  SET_TINT2: 'SET_TINT2',
};

const reducer = (state: State, action: ReducerAction): State => {
  switch (action.type) {
    case types.SET_NAME:
      return {...state, name: action.payload.name};

    case types.SET_DESC:
      return {...state, description: action.payload.description};

    case types.SET_COST:
      return {...state, cost: action.payload.cost};

    case types.SET_COLOR:
      return {...state, color: action.payload.color};

    case types.SET_TINT1:
      return {...state, tint1: action.payload.tint1};

    case types.SET_TINT2:
      return {...state, tint2: action.payload.tint2};

    default:
      return state;
  }
};

const CreateSubscription = ({navigation, route}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const [state, dispatch] = useReducer(reducer, {
    name: '',
    description: null,
    logoURI: '',
    color: theme.colors.soft,
    tint1: theme.colors.soft1,
    tint2: theme.colors.soft3,
    cost: '',
  });

  const onAdd = useCallback(() => {
    alert('Add pressed');
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: theme.colors.primary,
      headerTitleStyle: {color: null},
      headerBackTitle: 'All',
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerRight}
          activeOpacity={0.8}
          onPress={onAdd}>
          <Text style={theme.styles.whiteText}>Add</Text>
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    onAdd,
    styles.headerRight,
    theme.colors.primary,
    theme.styles.whiteText,
  ]);

  const onBlur = () => {
    let formatted = Number(state.cost).toFixed(2);

    dispatch({type: types.SET_COST, payload: {cost: formatted.toString()}});
  };

  const onAddPhoto = () => {};

  return (
    <View style={theme.styles.container}>
      <ScrollView>
        <View style={[styles.top, {backgroundColor: state.color}]}>
          <CustomLogo uri={state.logoURI} onAddPhoto={onAddPhoto} />
          <TextInput
            style={styles.name}
            placeholder={'Name'}
            placeholderTextColor={theme.colors.soft3}
            value={state.name}
            selectionColor={theme.colors.opposite}
            onChangeText={(text: string) =>
              dispatch({type: types.SET_NAME, payload: {name: text}})
            }
          />
          <TextInput
            style={theme.styles.whiteText}
            placeholder={'Add a description'}
            placeholderTextColor={state.tint2}
            onChangeText={(text: string) =>
              dispatch({type: types.SET_DESC, payload: {description: text}})
            }
            value={state.description}
            selectionColor={theme.colors.white}
          />
        </View>
        <Row style={[styles.costSection, {backgroundColor: state.color}]}>
          <Row style={[styles.costContainer, {backgroundColor: state.tint1}]}>
            <Text style={theme.styles.mdWhiteText}>$</Text>
            <TextInput
              style={styles.costInput}
              placeholder={'0.00'}
              placeholderTextColor={state.tint2}
              value={state.cost}
              onChangeText={(text: string) =>
                dispatch({type: types.SET_COST, payload: {cost: text}})
              }
              onBlur={onBlur}
              selectionColor={theme.colors.white}
              keyboardType={'numeric'}
            />
          </Row>
        </Row>
      </ScrollView>
    </View>
  );
};

export default CreateSubscription;
