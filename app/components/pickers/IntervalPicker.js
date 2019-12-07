// @flow

import React from 'react';
import type {Element} from 'react';
import {Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {useTheme} from '../../utils/hooks/useTheme';
// import Constants from '../../utils/Constants';
import type {
  Theme,
  ReminderInterval,
  SubscriptionCycle,
} from '../../utils/Types';
import Row from '../Row';

type Props = {
  type: 'cycle' | 'reminder',
  label: string,
  interval: ReminderInterval | SubscriptionCycle,
  onSelectQuantity: (q: number) => void,
  onSelectUnit: (u: string) => void,
};

const CYCLE_QUANTITIES = [...Array(30).keys()].map(n => ++n);
const CYCLE_UNITS = ['Day(s)', 'Week(s)', 'Month(s)'];
const REMINDER_QUANTITIES = [...Array(30).keys()];
const REMINDER_UNITS = ['Same Day', 'Day(s)', 'Week(s)', 'Month(s)'];

const IntervalPicker = ({
  type,
  label,
  interval,
  onSelectQuantity,
  onSelectUnit,
}: Props): Element<any> => {
  const units = type === 'cycle' ? CYCLE_UNITS : REMINDER_UNITS;
  const quantities = type === 'cycle' ? CYCLE_QUANTITIES : REMINDER_QUANTITIES;

  const [theme, styles] = useTheme(stylesheet);

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <Row style={styles.container}>
        <Picker
          style={theme.styles.flexOne}
          selectedValue={interval.quantity}
          itemStyle={styles.text}
          onValueChange={onSelectQuantity}>
          {quantities.map(x => (
            <Picker.Item
              key={x}
              label={x === 0 ? '' : x.toString()}
              value={x}
            />
          ))}
        </Picker>
        <Picker
          style={theme.styles.flexOne}
          selectedValue={interval.unit}
          itemStyle={styles.text}
          onValueChange={onSelectUnit}>
          {units.map(x => (
            <Picker.Item key={x} label={x} value={x} />
          ))}
        </Picker>
      </Row>
    </>
  );
};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: 30,
      backgroundColor: theme.colors.main,
    },

    text: {
      ...theme.styles.text,
      fontSize: 22,
    },

    label: {
      paddingHorizontal: 15,
      ...theme.styles.lightText,
    },
  });

export default IntervalPicker;
