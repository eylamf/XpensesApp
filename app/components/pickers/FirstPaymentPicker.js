// @flow

import React from 'react';
import type {Element} from 'react';
import {Text, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useTheme} from '../../utils/hooks/useTheme';
// import Constants from '../../utils/Constants';
import type {Theme} from '../../utils/Types';

type Props = {
  value: number, // Date in milliseconds
  onChangeDate: (d: Date) => void,
};

const FirstPaymentPicker = ({value, onChangeDate}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  return (
    <>
      <Text style={styles.label}>Start date for payments</Text>
      <DatePicker
        style={styles.picker}
        date={new Date(value)}
        onDateChange={onChangeDate}
        textColor={theme.id === 'dark' ? '#ffffff' : '#000'}
        mode={'datetime'}
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

export default FirstPaymentPicker;
