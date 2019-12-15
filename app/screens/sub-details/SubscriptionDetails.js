// @flow

import React, {useRef, useCallback, useReducer, useLayoutEffect} from 'react';
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
import type {ReducerAction, ColorGroup} from '../../utils/Types';
import ReminderInterval from '../../class-models/ReminderInterval';
import SubscriptionCycleInterval from '../../class-models/SubscriptionCycleInterval';
import Subscription from '../../class-models/Subscription';
import SubDetailsHeader from '../../components/headers/SubDetailsHeader';
import SubDetailsForm from '../../components/SubDetailsForm';
import Row from '../../components/Row';
import CustomLogo from '../../components/CustomLogo';
import FormDataRow from '../../components/list-items/FormDataRow';
import LineDivider from '../../components/LineDivider';
import * as SubscriptionActions from '../../stores/subscriptions/Actions';

type Props = {
  navigation: any,
  route: any,
};

type State = {
  name: string,
  cost: string,
  description: ?string,
  colorGroup: ColorGroup,
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
  SET_NAME: 'SET_NAME',
  SET_COST: 'SET_COST',
  SET_DESC: 'SET_DESC',
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
    case types.SET_NAME:
      return {...state, name: action.payload.name};

    case types.SET_COST:
      return {...state, cost: action.payload.cost};

    case types.SET_DESC:
      return {...state, description: action.payload.description};

    case types.SET_COLOR:
      return {...state, colorGroup: action.payload.colorGroup};

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

const SubscriptionDetails = ({navigation, route}: Props): Element<any> => {
  const scrollview = useRef();

  const [theme, styles] = useTheme(stylesheet);

  const insets = useSafeArea();

  const {
    subscription,
    isAddMode,
  }: {subscription: Subscription, isAddMode: boolean} = route.params;

  const [state, dispatch] = useReducer(reducer, {
    name: subscription.company.name,
    cost: subscription.cost.toFixed(2).toString(),
    description: subscription.description,
    colorGroup: subscription.company.colorGroup,
    firstPayment: subscription.firstPayment,
    cycle: new SubscriptionCycleInterval({
      quantity: subscription.cycle.quantity,
      unit: subscription.cycle.unit,
    }),
    hasReminder: subscription.hasReminder,
    reminderInterval: new ReminderInterval({
      quantity: subscription.reminderInterval.quantity,
      unit: subscription.reminderInterval.unit,
    }),
    enableFirstPaymentPicker: false,
    enableCyclePicker: false,
    enableReminderPicker: false,
    enableReminderTimePicker: false,
  });

  const onClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onAction = useCallback(async () => {
    if (isAddMode) {
      const updated = new Subscription({
        ...subscription,
        firstPayment: state.firstPayment,
        description: state.description,
        cycle: state.cycle,
        reminderInterval: state.reminderInterval,
        hasReminder: state.hasReminder,
      });

      if (state.cost !== subscription.cost) {
        updated.setCost(Number(state.cost));
      }

      if (state.description !== subscription.description) {
        updated.setDescription(state.description);
      }

      await SubscriptionActions.addSubscription(updated);

      onClose();
    } else {
      if (state.colorGroup.color !== subscription.company.colorGroup.color) {
        subscription.company.setColorGroup(state.colorGroup);
      }

      const updated = new Subscription({
        company: subscription.company,
        cost: Number(state.cost),
        firstPayment: state.firstPayment,
        description: state.description,
        cycle: state.cycle,
        reminderInterval: state.reminderInterval,
        hasReminder: state.hasReminder,
        custom: subscription.custom,
      });

      await SubscriptionActions.updateSubscription(updated);

      onClose();
    }
  }, [
    isAddMode,
    subscription,
    state.firstPayment,
    state.description,
    state.cycle,
    state.reminderInterval,
    state.hasReminder,
    state.cost,
    state.colorGroup,
    onClose,
  ]);

  useLayoutEffect(() => {
    if (isAddMode) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={styles.headerRight}
            activeOpacity={0.8}
            onPress={onAction}>
            <Text style={theme.styles.whiteText} maxFontSizeMultiplier={1.3}>
              Add
            </Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [
    navigation,
    isAddMode,
    onAction,
    styles.headerRight,
    theme.styles.whiteText,
  ]);

  const onBlur = () => {
    let formatted = Number(state.cost).toFixed(2);

    dispatch({type: types.SET_COST, payload: {cost: formatted.toString()}});
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
      onSelectColor: (colorGroup: ColorGroup) => {
        dispatch({type: types.SET_COLOR, payload: {colorGroup}});
      },
      isModal: true,
    });
  };

  const onRemove = async () => {
    await SubscriptionActions.removeSubscription(subscription.id);
    onClose();
  };

  return (
    <>
      <StatusBar barStyle={'light-content'} animated />
      <View style={theme.styles.container}>
        <SubDetailsHeader
          color={state.colorGroup.color}
          title={subscription.company.name}
          isAddMode={isAddMode}
          onClose={onClose}
          onSave={onAction}
        />
        <ScrollView
          ref={scrollview}
          contentContainerStyle={[
            styles.listContent,
            {paddingBottom: insets.bottom + 15},
          ]}
          stickyHeaderIndices={[1]}>
          <View style={[styles.top, {backgroundColor: state.colorGroup.color}]}>
            <CustomLogo
              style={[
                styles.logo,
                !subscription.custom ? {tintColor: theme.colors.white} : null,
              ]}
              uri={subscription.company.logoURI}
              initials={subscription.company.getInitials()}
              isAddMode={subscription.custom && !subscription.company.logoURI}
              rounded={subscription.custom}
            />
            <TextInput
              style={styles.name}
              placeholder={'Name'}
              placeholderTextColor={state.colorGroup.tint1}
              onChangeText={(text: string) =>
                dispatch({type: types.SET_NAME, payload: {name: text}})
              }
              selectionColor={theme.colors.white}
              value={state.name}
              editable={subscription.custom}
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
              <Text
                style={theme.styles.mdWhiteText}
                maxFontSizeMultiplier={1.5}>
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
              subscription.company.forceTint ? null : state.colorGroup.color
            }
            state={state}
            dispatch={dispatch}
            onScrollToEnd={onScrollToEnd}
          />
          {subscription.custom && (
            <>
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
            </>
          )}
        </ScrollView>
        <TouchableOpacity
          style={[styles.deleteBtn, {paddingBottom: insets.bottom + 15}]}
          activeOpacity={0.8}
          onPress={onRemove}>
          <Text style={theme.styles.lightText}>Delete Subscription</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SubscriptionDetails;
