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
import type {
  ReducerAction,
  ReminderInterval,
  SubscriptionCycle,
} from '../../utils/Types';
import Subscription from '../../class-models/Subscription';
import SubDetailsHeader from '../../components/headers/SubDetailsHeader';
import SubDetailsForm from '../../components/SubDetailsForm';
import Row from '../../components/Row';
import * as SubscriptionActions from '../../stores/subscriptions/Actions';

type Props = {
  navigation: any,
  route: any,
};

type State = {
  cost: string,
  description: ?string,
  firstPayment: number,
  cycle: SubscriptionCycle,
  hasReminder: boolean,
  reminderInterval: ReminderInterval,
  enableFirstPaymentPicker: boolean,
  enableCyclePicker: boolean,
  enableReminderPicker: boolean,
};

const types = {
  SET_COST: 'SET_COST',
  SET_DESC: 'SET_DESC',
  SET_FIRST_PAYMENT: 'SET_FIRST_PAYMENT',
  TOGGLE_HAS_REMINDER: 'TOGGLE_HAS_REMINDER',
  SET_REMINDER_INTERVAL: 'SET_REMINDER_INTERVAL',
  SET_CYCLE: 'SET_CYCLE',
  TOGGLE_PAYMENT_PICKER: 'TOGGLE_PAYMENT_PICKER',
  TOGGLE_CYCLE_PICKER: 'TOGGLE_CYCLE_PICKER',
  TOGGLE_REMINDER_PICKER: 'TOGGLE_REMINDER_PICKER',
};

const reducer = (state: State, action: ReducerAction): State => {
  switch (action.type) {
    case types.SET_COST:
      return {...state, cost: action.payload.cost};

    case types.SET_DESC:
      return {...state, description: action.payload.description};

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
      };
    }

    case types.TOGGLE_CYCLE_PICKER: {
      return {
        ...state,
        enableFirstPaymentPicker: false,
        enableCyclePicker: !state.enableCyclePicker,
        enableReminderPicker: false,
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
        hasReminder,
      };
    }

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
    cost: subscription.cost.toFixed(2).toString(),
    description: subscription.description,
    firstPayment: subscription.firstPayment,
    cycle: subscription.cycle,
    hasReminder: subscription.hasReminder,
    reminderInterval: subscription.reminderInterval,
    enableFirstPaymentPicker: false,
    enableCyclePicker: false,
    enableReminderPicker: false,
  });

  const onClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  console.log(isAddMode);

  const onAction = useCallback(async () => {
    if (isAddMode) {
      const updated = new Subscription({...subscription});

      if (state.cost !== subscription.cost) {
        updated.setCost(Number(state.cost));
      }

      if (state.description !== subscription.description) {
        updated.setDescription(state.description);
      }

      await SubscriptionActions.addSubscription(updated);

      onClose();
    } else {
      const updated = new Subscription({
        company: subscription.company,
        cost: Number(state.cost),
        firstPayment: state.firstPayment,
        description: state.description,
        cycle: state.cycle,
        reminderInterval: state.reminderInterval,
        hasReminder: state.hasReminder,
      });

      await SubscriptionActions.updateSubscription(updated);

      onClose();
    }
  }, [
    isAddMode,
    subscription,
    state.cost,
    state.firstPayment,
    state.description,
    state.cycle,
    state.reminderInterval,
    state.hasReminder,
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
            <Text style={theme.styles.whiteText}>Add</Text>
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
    }, 0);
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
          onSave={onAction}
        />
        <ScrollView
          ref={scrollview}
          contentContainerStyle={[
            styles.listContent,
            {paddingBottom: insets.bottom + 15},
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
              onChangeText={(text: string) =>
                dispatch({type: types.SET_DESC, payload: {description: text}})
              }
              value={state.description}
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
          <SubDetailsForm
            switchTint={
              subscription.company.forceTint ? null : subscription.company.color
            }
            state={state}
            dispatch={dispatch}
            onScrollToEnd={onScrollToEnd}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default SubscriptionDetails;
