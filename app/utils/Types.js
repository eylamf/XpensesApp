// @flow

import Company from '../class-models/Company';

type ColorSet = $Exact<{
  primary: string,
  primaryDark: string,
  secondary: string,
  accent: string,
  main: string,
  soft: string,
  soft2: string,
  soft3: string,
  opposite: string,
  white: string,
  black: string,
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

export type SubscriptionCycle = $Exact<{
  quantity: number,
  unit: 'Minute(s)' | 'Day(s)' | 'Week(s)' | 'Month(s)',
}>;

export type ReminderInterval = $Exact<{
  quantity: number,
  unit: 'Same Day' | 'Minute(s)' | 'Day(s)' | 'Week(s)' | 'Month(s)',
}>;

export type RepeatType = 'month' | 'week' | 'day' | 'hour' | 'time';

export type NotificationSource = $ReadOnly<{
  subID: string,
  title: string,
  message: string,
  fireDate: number,
  repeatType?: RepeatType,
  repeatTime?: number,
}>;

export type CompanySource = $ReadOnly<{
  id: string,
  name: string,
  logoURI: string,
  color: string,
  tint1: string,
  tint2: string,
  forceTint?: boolean,
}>;

export type SubscriptionSource = $ReadOnly<{
  id?: string,
  company: Company,
  description?: ?string,
  cost?: number,
  firstPayment?: number,
  cycle?: ?SubscriptionCycle,
  hasReminder?: boolean,
  reminderInterval?: ?ReminderInterval,
}>;
