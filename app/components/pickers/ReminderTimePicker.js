// @flow

import React from 'react';
import type {Element} from 'react';
import {Text, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useTheme} from '../../utils/hooks/useTheme';
import type {Theme} from '../../utils/Types';

type Props = {
  value: number,
  onChangeTime: (t: Date) => void,
};

const ReminderTimePicker = ({value, onChangeTime}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  return (
    <>
      <Text style={styles.label} maxFontSizeMultiplier={1.5}>
        Select a time to receive your reminder(s)
      </Text>
      <DatePicker
        style={styles.picker}
        date={new Date(value)}
        onDateChange={onChangeTime}
        textColor={theme.id === 'dark' ? '#ffffff' : '#000'}
        mode={'time'}
      />
    </>
  );
};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    picker: {
      alignSelf: 'center',
    },

    label: {
      paddingHorizontal: 15,
      ...theme.styles.lightText,
    },
  });

export default ReminderTimePicker;
