// @flow

import React from 'react';
import type {Element} from 'react';
import {View, LayoutAnimation, StyleSheet} from 'react-native';
import moment from 'moment';
import {useTheme} from '../utils/hooks/useTheme';
import type {
  Theme,
  ReducerAction,
  SubscriptionCycle,
  ReminderInterval,
} from '../utils/Types';
import FormDataRow from './list-items/FormDataRow';
import FirstPaymentPicker from './pickers/FirstPaymentPicker';
import IntervalPicker from './pickers/IntervalPicker';
import LineDivider from './LineDivider';

type Props = {
  dispatch: (action: ReducerAction) => void,
  state: DetailsState,
};

type DetailsState = {
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

const SubDetailsForm = ({dispatch, state}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const onToggleFirstPaymentPicker = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    dispatch({
      type: types.TOGGLE_PAYMENT_PICKER,
      payload: null,
    });
  };

  const onChangeFirstPayment = (value: Date) => {
    dispatch({
      type: types.SET_FIRST_PAYMENT,
      payload: {firstPayment: value.getTime()},
    });
  };

  const onToggleCyclePicker = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    dispatch({
      type: types.TOGGLE_CYCLE_PICKER,
      payload: null,
    });
  };

  const onSelectCycleQuantity = (quantity: number) => {
    dispatch({
      type: types.SET_CYCLE,
      payload: {cycle: {quantity, unit: state.cycle.unit}},
    });
  };

  const onSelectCycleUnit = (unit: string) => {
    dispatch({
      type: types.SET_CYCLE,
      payload: {cycle: {quantity: state.cycle.quantity, unit}},
    });
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
        value={`Every ${state.cycle.quantity} ${state.cycle.unit}`}
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
    </>
  );
};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    picker: {overflow: 'hidden'},
  });

export default SubDetailsForm;
