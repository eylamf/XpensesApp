// @flow

import React, {useReducer, useRef, useLayoutEffect, useCallback} from 'react';
import type {Element} from 'react';
import {View, ScrollView, TextInput, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import stylesheet from './CreateStyles';
import {useTheme} from '../../utils/hooks/useTheme';
import type {ReducerAction, ColorGroup} from '../../utils/Types';
import Constants from '../../utils/Constants';
import SubscriptionCycleInterval from '../../class-models/SubscriptionCycleInterval';
import ReminderInterval from '../../class-models/ReminderInterval';
import Subscription from '../../class-models/Subscription';
import Company from '../../class-models/Company';
import Row from '../../components/Row';
import LineDivider from '../../components/LineDivider';
import CustomLogo from '../../components/CustomLogo';
import SubDetailsForm from '../../components/SubDetailsForm';
import FormDataRow from '../../components/list-items/FormDataRow';
import * as SubscriptionActions from '../../stores/subscriptions/Actions';

type Props = {
  navigation: any,
  route: any,
};

// Flattened Subscription class
type State = {
  name: string,
  description: ?string,
  logoURI: string,
  colorGroup: ColorGroup,
  cost: string,
  firstPayment: number,
  cycle: SubscriptionCycleInterval,
  hasReminder: boolean,
  reminderInterval: ReminderInterval,
  enableFirstPaymentPicker: boolean,
  enableCyclePicker: boolean,
  enableReminderPicker: boolean,
  enableReminderTimePicker: boolean,
};

const types = {
  SET_LOGO: 'SET_LOGO',
  SET_NAME: 'SET_NAME',
  SET_DESC: 'SET_DESC',
  SET_COST: 'SET_COST',
  SET_COLOR: 'SET_COLOR',
  SET_FIRST_PAYMENT: 'SET_FIRST_PAYMENT',
  TOGGLE_HAS_REMINDER: 'TOGGLE_HAS_REMINDER',
  SET_REMINDER_INTERVAL: 'SET_REMINDER_INTERVAL',
  SET_CYCLE: 'SET_CYCLE',
  TOGGLE_PAYMENT_PICKER: 'TOGGLE_PAYMENT_PICKER',
  TOGGLE_CYCLE_PICKER: 'TOGGLE_CYCLE_PICKER',
  TOGGLE_REMINDER_PICKER: 'TOGGLE_REMINDER_PICKER',
  TOGGLE_REMINDER_TIME_PICKER: 'TOGGLE_REMINDER_TIME_PICKER',
};

const reducer = (state: State, action: ReducerAction): State => {
  switch (action.type) {
    case types.SET_LOGO:
      return {...state, logoURI: action.payload.logoURI};

    case types.SET_NAME:
      return {...state, name: action.payload.name};

    case types.SET_DESC:
      return {...state, description: action.payload.description};

    case types.SET_COST:
      return {...state, cost: action.payload.cost};

    case types.SET_COLOR: {
      const {colorGroup} = action.payload;

      return {
        ...state,
        colorGroup,
      };
    }

    case types.SET_FIRST_PAYMENT:
      return {...state, firstPayment: action.payload.firstPayment};

    case types.SET_CYCLE:
      return {...state, cycle: action.payload.cycle};

    case types.TOGGLE_HAS_REMINDER: {
      const {hasReminder} = action.payload;
      return {
        ...state,
        hasReminder,
        enableReminderPicker: hasReminder,
        enableFirstPaymentPicker: false,
        enableCyclePicker: false,
        enableReminderTimePicker: false,
      };
    }

    case types.SET_REMINDER_INTERVAL:
      return {...state, reminderInterval: action.payload.reminderInterval};

    case types.TOGGLE_PAYMENT_PICKER: {
      return {
        ...state,
        enableFirstPaymentPicker: !state.enableFirstPaymentPicker,
        enableCyclePicker: false,
        enableReminderPicker: false,
        enableReminderTimePicker: false,
      };
    }

    case types.TOGGLE_CYCLE_PICKER: {
      return {
        ...state,
        enableFirstPaymentPicker: false,
        enableCyclePicker: !state.enableCyclePicker,
        enableReminderPicker: false,
        enableReminderTimePicker: false,
      };
    }

    case types.TOGGLE_REMINDER_PICKER: {
      const enabled = !state.enableReminderPicker;
      let hasReminder = state.hasReminder;

      if (enabled) {
        if (!hasReminder) {
          hasReminder = true;
        }
      }

      return {
        ...state,
        enableFirstPaymentPicker: false,
        enableCyclePicker: false,
        enableReminderPicker: enabled,
        enableReminderTimePicker: false,
        hasReminder,
      };
    }

    case types.TOGGLE_REMINDER_TIME_PICKER:
      return {
        ...state,
        enableFirstPaymentPicker: false,
        enableCyclePicker: false,
        enableReminderPicker: false,
        enableReminderTimePicker: !state.enableReminderTimePicker,
      };

    default:
      return state;
  }
};

const CreateSubscription = ({navigation, route}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const scrollview = useRef();

  const [state, dispatch] = useReducer(reducer, {
    name: '',
    description: null,
    logoURI: '',
    colorGroup: {
      color: theme.id === 'light' ? theme.colors.soft1 : theme.colors.soft,
      tint1: theme.id === 'light' ? theme.colors.soft2 : theme.colors.main,
      tint2: theme.colors.soft3,
    },
    cost: '',
    firstPayment: new Date().setHours(0, 0, 0, 0),
    cycle: new SubscriptionCycleInterval({quantity: 1, unit: 'Month(s)'}),
    hasReminder: false,
    reminderInterval: new ReminderInterval({quantity: 1, unit: 'Day(s)'}),
    enableFirstPaymentPicker: false,
    enableCyclePicker: false,
    enableReminderPicker: false,
    enableReminderTimePicker: false,
  });

  const onAdd = useCallback(async () => {
    const {name, colorGroup, logoURI} = state;

    const company = new Company({
      id: state.name.toLowerCase(),
      name,
      logoURI,
      colorGroup,
    });

    const subscription = new Subscription({
      id: state.name.toLowerCase(),
      company,
      description: state.description,
      cost: Number(state.cost),
      firstPayment: state.firstPayment,
      cycle: state.cycle,
      hasReminder: state.hasReminder,
      reminderInterval: state.reminderInterval,
      custom: true,
    });

    console.log('CreateSubscription: new custom', '=>', subscription);

    await SubscriptionActions.addSubscription(subscription);

    navigation.goBack();
  }, [state, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {color: theme.colors.opposite},
      headerBackTitle: 'All',
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerRight}
          activeOpacity={0.8}
          onPress={onAdd}>
          <Text style={theme.styles.primaryText} maxFontSizeMultiplier={1.3}>
            Add
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    onAdd,
    styles.headerRight,
    theme.colors.primary,
    theme.colors.opposite,
    theme.styles.primaryText,
  ]);

  const onBlur = () => {
    let formatted = Number(state.cost).toFixed(2);

    dispatch({type: types.SET_COST, payload: {cost: formatted.toString()}});
  };

  const onAddPhoto = () => {
    ImagePicker.openPicker({
      width: Constants.getWindowWidth(),
      height: Constants.getWindowWidth(),
      cropping: true,
      cropperCircleOverlay: true,
    }).then(image => {
      dispatch({
        type: types.SET_LOGO,
        payload: {logoURI: image.path},
      });
    });
  };

  const onScrollToEnd = () => {
    setTimeout(() => {
      scrollview.current && scrollview.current.scrollToEnd();
      scrollview.current && scrollview.current.flashScrollIndicators();
    }, 0);
  };

  const onGoToColorSelect = () => {
    navigation.navigate('ColorGrid', {
      selectedColor: state.colorGroup.color,
      onSelectColor: (colorGroup: ColorGroup) =>
        dispatch({
          type: types.SET_COLOR,
          payload: {colorGroup},
        }),
      isModal: false,
    });
  };

  return (
    <View style={theme.styles.container}>
      <ScrollView ref={scrollview}>
        <View style={[styles.top, {backgroundColor: state.colorGroup.color}]}>
          <CustomLogo
            style={styles.logo}
            uri={state.logoURI}
            onAddPhoto={onAddPhoto}
            isAddMode
            rounded
          />
          <TextInput
            style={styles.name}
            placeholder={'Name'}
            placeholderTextColor={state.colorGroup.tint2}
            value={state.name}
            selectionColor={theme.colors.white}
            onChangeText={(text: string) =>
              dispatch({type: types.SET_NAME, payload: {name: text}})
            }
            maxFontSizeMultiplier={1.5}
          />
          <TextInput
            style={theme.styles.whiteText}
            placeholder={'Add a description'}
            placeholderTextColor={state.colorGroup.tint2}
            onChangeText={(text: string) =>
              dispatch({type: types.SET_DESC, payload: {description: text}})
            }
            value={state.description}
            selectionColor={theme.colors.white}
            maxFontSizeMultiplier={1.5}
          />
        </View>
        <Row
          style={[
            styles.costSection,
            {backgroundColor: state.colorGroup.color},
          ]}>
          <Row
            style={[
              styles.costContainer,
              {backgroundColor: state.colorGroup.tint1},
            ]}>
            <Text style={theme.styles.mdWhiteText} maxFontSizeMultiplier={1.5}>
              $
            </Text>
            <TextInput
              style={styles.costInput}
              placeholder={'0.00'}
              placeholderTextColor={state.colorGroup.tint2}
              value={state.cost}
              onChangeText={(text: string) =>
                dispatch({type: types.SET_COST, payload: {cost: text}})
              }
              onBlur={onBlur}
              selectionColor={theme.colors.white}
              keyboardType={'numeric'}
              maxFontSizeMultiplier={1.5}
            />
          </Row>
        </Row>
        <SubDetailsForm
          switchTint={
            state.colorGroup.color ===
            (theme.id === 'light' ? theme.colors.soft1 : theme.colors.soft)
              ? null
              : state.colorGroup.color
          }
          state={state}
          dispatch={dispatch}
          onScrollToEnd={onScrollToEnd}
        />
        <FormDataRow
          label={'Color'}
          rightComponent={
            <View
              style={[
                styles.colorPreview,
                {backgroundColor: state.colorGroup.color},
              ]}
            />
          }
          onPress={onGoToColorSelect}
        />
        <LineDivider leftSpace={15} color={theme.colors.soft1} />
      </ScrollView>
    </View>
  );
};

export default CreateSubscription;
