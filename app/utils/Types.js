// @flow

import Company from '../class-models/Company';
import ReminderInterval from '../class-models/ReminderInterval';
import SubscriptionCycleInterval from '../class-models/SubscriptionCycleInterval';

type ColorSet = $Exact<{
  primary: string,
  primaryDark: string,
  secondary: string,
  accent: string,
  main: string,
  soft: string,
  soft1: string,
  soft2: string,
  soft3: string,
  opposite: string,
  white: string,
  black: string,
  alert: string,
}>;

export type ColorMap = $ReadOnly<{
  light: ColorSet,
  dark: ColorSet,
}>;

export type Theme = $ReadOnly<{
  id: string,
  oppositeID: string,
  colors: ColorSet,
  styles: any,
}>;

export type ScreenCoords = $ReadOnly<{
  x: number,
  y: number,
  w: number,
  h: number,
}>;

export type ReducerAction = $ReadOnly<{
  type: string,
  payload: any,
}>;

export type SubscriptionIntervalUnit =
  | 'Day(s)'
  | 'Week(s)'
  | 'Month(s)'
  | 'Year(s)';

export type SubscriptionIntervalFormattedUnit =
  | 'Day'
  | 'Week'
  | 'Month'
  | 'Year';

export type SubscriptionIntervalSource = $Exact<{
  quantity: ReminderIntervalQuantity,
  unit: SubscriptionIntervalUnit,
}>;

export type ReminderIntervalQuantity =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30;

export type ReminderIntervalUnit =
  | 'Same Day'
  // | 'Minute(s)'
  | 'Day(s)'
  | 'Week(s)'
  | 'Month(s)';

export type ReminderIntervalFormattedUnit = 'Day' | 'Week' | 'Month';

export type ReminderIntervalSource = $Exact<{
  quantity: ReminderIntervalQuantity,
  unit: ReminderIntervalUnit,
}>;

export type RepeatType = 'month' | 'week' | 'day' | 'hour' | 'time';

export type NotificationSource = $ReadOnly<{
  subID: string,
  title: string,
  message: string,
  fireDate: number,
  repeatType?: RepeatType,
  repeatTime?: ?number,
}>;

export type CompanySource = $ReadOnly<{
  id: string,
  name: string,
  logoURI: number | string,
  filledLogo?: ?number,
  colorGroup: ColorGroup,
  forceTint?: boolean,
}>;

export type SubscriptionSource = $ReadOnly<{
  id?: string,
  company: Company,
  description?: ?string,
  cost?: number,
  firstPayment?: number,
  cycle?: ?SubscriptionCycleInterval,
  hasReminder?: boolean,
  reminderInterval?: ?ReminderInterval,
  custom?: boolean,
}>;

export type CostTypeFilter = 'Average' | 'Remaining' | 'Exact';

export type CostIntervalFilter =
  | 'Per Week'
  | 'Per Month'
  | 'Per Year'
  | 'This Week'
  | 'This Month'
  | 'This Year';

export type SimpleCostIntervalFilter = 'Week' | 'Month' | 'Year';

export type ColorGroup = {
  color: string,
  tint1: string,
  tint2: string,
};

export type ReceiptEntry = $ReadOnly<{
  subID: string, // Points to Subscription ID
  cost: number,
  intervals: number,
}>;

type AlertAction = $ReadOnly<{
  text: string,
  onPress: () => void,
  style?: string,
}>;

export type AlertConfig = $Exact<{
  title: string,
  message: string,
  actions: AlertAction[],
}>;
