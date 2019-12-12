// @flow

import React from 'react';
import type {Element} from 'react';
import {View, Text, LayoutAnimation, Switch, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import {useTheme} from '../utils/hooks/useTheme';
import type {
  Theme,
  ReducerAction,
  ReminderIntervalQuantity,
  ReminderIntervalUnit,
  SubscriptionIntervalUnit,
} from '../utils/Types';
import ReminderInterval from '../class-models/ReminderInterval';
import SubscriptionCycleInterval from '../class-models/SubscriptionCycleInterval';
import FormDataRow from './list-items/FormDataRow';
import FirstPaymentPicker from './pickers/FirstPaymentPicker';
import IntervalPicker from './pickers/IntervalPicker';
import ReminderTimePicker from './pickers/ReminderTimePicker';
import LineDivider from './LineDivider';

type Props = {
  switchTint: ?string,
  dispatch: (action: ReducerAction) => void,
  state: DetailsState,
  onScrollToEnd: () => void,
};

type DetailsState = {
  cost: string,
  description: ?string,
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
  SET_COST: 'SET_COST',
  SET_DESC: 'SET_DESC',
  SET_FIRST_PAYMENT: 'SET_FIRST_PAYMENT',
  TOGGLE_HAS_REMINDER: 'TOGGLE_HAS_REMINDER',
  SET_REMINDER_INTERVAL: 'SET_REMINDER_INTERVAL',
  SET_CYCLE: 'SET_CYCLE',
  TOGGLE_PAYMENT_PICKER: 'TOGGLE_PAYMENT_PICKER',
  TOGGLE_CYCLE_PICKER: 'TOGGLE_CYCLE_PICKER',
  TOGGLE_REMINDER_PICKER: 'TOGGLE_REMINDER_PICKER',
  TOGGLE_REMINDER_TIME_PICKER: 'TOGGLE_REMINDER_TIME_PICKER',
};

const SubDetailsForm = ({
  switchTint,
  dispatch,
  state,
  onScrollToEnd,
}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const onToggleFirstPaymentPicker = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    dispatch({
      type: types.TOGGLE_PAYMENT_PICKER,
      payload: null,
    });

    onScrollToEnd();
  };

  const onChangeFirstPayment = (value: Date) => {
    const adjusted = value.setSeconds(0, 0);

    dispatch({
      type: types.SET_FIRST_PAYMENT,
      payload: {firstPayment: adjusted},
    });
  };

  const onToggleCyclePicker = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    dispatch({
      type: types.TOGGLE_CYCLE_PICKER,
      payload: null,
    });

    onScrollToEnd();
  };

  const onSelectCycleQuantity = (quantity: ReminderIntervalQuantity) => {
    dispatch({
      type: types.SET_CYCLE,
      payload: {
        cycle: new SubscriptionCycleInterval({
          quantity,
          unit: state.cycle.unit,
        }),
      },
    });
  };

  const onSelectCycleUnit = (unit: SubscriptionIntervalUnit) => {
    dispatch({
      type: types.SET_CYCLE,
      payload: {
        cycle: new SubscriptionCycleInterval({
          quantity: state.cycle.quantity,
          unit,
        }),
      },
    });
  };

  const onToggleReminder = (hasReminder: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    dispatch({
      type: types.TOGGLE_HAS_REMINDER,
      payload: {hasReminder},
    });

    onScrollToEnd();
  };

  const onToggleReminderPicker = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    dispatch({
      type: types.TOGGLE_REMINDER_PICKER,
      payload: null,
    });

    onScrollToEnd();
  };

  const onSelectReminderQuantity = (newQuantity: ReminderIntervalQuantity) => {
    let {unit} = state.reminderInterval;

    if (newQuantity === 0) {
      unit = 'Same Day';
    } else if (newQuantity > 0 && unit === 'Same Day') {
      unit = 'Day(s)';
    }

    dispatch({
      type: types.SET_REMINDER_INTERVAL,
      payload: {
        reminderInterval: new ReminderInterval({quantity: newQuantity, unit}),
      },
    });
  };

  const onSelectReminderUnit = (newUnit: ReminderIntervalUnit) => {
    let {quantity} = state.reminderInterval;

    if (newUnit === 'Same Day') {
      quantity = 0;
    } else if (newUnit !== 'Same Day' && quantity === 0) {
      quantity = 1;
    }

    dispatch({
      type: types.SET_REMINDER_INTERVAL,
      payload: {
        reminderInterval: new ReminderInterval({quantity, unit: newUnit}),
      },
    });
  };

  const onToggleReminderTimePicker = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    dispatch({
      type: types.TOGGLE_REMINDER_TIME_PICKER,
      payload: null,
    });

    onScrollToEnd();
  };

  console.log('details form render');

  return (
    <>
      <FormDataRow
        isExpanded={state.enableFirstPaymentPicker}
        label={'First Payment'}
        value={moment(state.firstPayment).format('MMM Do, YYYY')}
        onPress={onToggleFirstPaymentPicker}
      />
      {state.enableFirstPaymentPicker && (
        <View style={styles.picker}>
          <FirstPaymentPicker
            value={state.firstPayment}
            onChangeDate={onChangeFirstPayment}
          />
        </View>
      )}
      <LineDivider leftSpace={15} color={theme.colors.soft2} />
      <FormDataRow
        isExpanded={state.enableCyclePicker}
        label={'Payment Cycle'}
        value={state.cycle.toPretty()}
        onPress={onToggleCyclePicker}
      />
      {state.enableCyclePicker && (
        <View style={styles.picker}>
          <IntervalPicker
            type={'cycle'}
            label={'How often is the payment made?'}
            interval={state.cycle}
            onSelectQuantity={onSelectCycleQuantity}
            onSelectUnit={onSelectCycleUnit}
          />
        </View>
      )}
      <LineDivider leftSpace={15} color={theme.colors.soft2} />
      <FormDataRow
        isExpanded={state.enableReminderPicker}
        label={'Remind Me'}
        value={'true'}
        rightComponent={
          <Switch
            value={state.hasReminder}
            onValueChange={onToggleReminder}
            trackColor={{true: switchTint}}
          />
        }
        onPress={onToggleReminderPicker}
      />
      {state.hasReminder && !state.enableReminderPicker && (
        <TouchableOpacity
          // style={styles}
          activeOpacity={0.8}
          onPress={onToggleReminderPicker}>
          <Text style={styles.reminderDate} maxFontSizeMultiplier={1.5}>
            {state.reminderInterval.toPretty()}
          </Text>
        </TouchableOpacity>
      )}
      {state.enableReminderPicker && (
        <View style={styles.picker}>
          <IntervalPicker
            type={'reminder'}
            label={'How far in advance?'}
            interval={state.reminderInterval}
            onSelectQuantity={onSelectReminderQuantity}
            onSelectUnit={onSelectReminderUnit}
          />
        </View>
      )}
      <LineDivider leftSpace={15} color={theme.colors.soft2} />
      <FormDataRow
        isExpanded={state.enableReminderTimePicker}
        label={'Reminder Time'}
        value={moment(state.firstPayment).format('hh:mm A')}
        onPress={onToggleReminderTimePicker}
      />
      {state.enableReminderTimePicker && (
        <View style={styles.picker}>
          <ReminderTimePicker
            value={state.firstPayment}
            onChangeTime={onChangeFirstPayment}
          />
        </View>
      )}
      <LineDivider leftSpace={15} color={theme.colors.soft2} />
    </>
  );
};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    picker: {overflow: 'hidden'},

    reminderDate: {
      paddingHorizontal: 15,
      marginBottom: 15,
      alignSelf: 'flex-end',
      ...theme.styles.lightText,
    },
  });

export default SubDetailsForm;
