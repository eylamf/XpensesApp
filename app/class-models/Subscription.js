// @flow

import moment from 'moment';
import Company from './Company';
import type {SubscriptionSource, RepeatType} from '../utils/Types';
import ReminderInterval from './ReminderInterval';
import SubscriptionCycleInterval from './SubscriptionCycleInterval';
import Notification from './Notification';

class Subscription {
  id: string;
  company: Company;
  description: ?string;
  cost: number;
  firstPayment: number;
  cycle: SubscriptionCycleInterval;
  hasReminder: boolean;
  reminderInterval: ReminderInterval;

  constructor(source: SubscriptionSource) {
    const {
      company,
      description,
      cost,
      firstPayment,
      cycle,
      hasReminder,
      reminderInterval,
    } = source;

    this.id = company.id;
    this.company = company;
    this.description = description || null;
    this.cost = cost || 0;
    this.firstPayment = firstPayment || new Date().setMinutes(0, 0, 0);
    this.cycle =
      cycle || new SubscriptionCycleInterval({quantity: 1, unit: 'Month(s)'});
    this.hasReminder = hasReminder || false;
    this.reminderInterval =
      reminderInterval || new ReminderInterval({quantity: 1, unit: 'Day(s)'});
  }

  getCompanyName(): string {
    return this.company.name;
  }

  getDescription(): ?string {
    return this.description;
  }

  setCost(cost: number) {
    this.cost = cost;
  }

  hasDescription(): boolean {
    return this.description != null;
  }

  setDescription(desc: ?string) {
    this.description = desc;
  }

  set(key: string, value: any) {
    this[key] = value;
  }

  generateNotification(): Notification {
    const firstPaymentDate = moment(this.firstPayment);

    let fireDate = firstPaymentDate;

    let repeatType: RepeatType = this.reminderInterval.getFormattedUnit();

    const {unit, quantity} = this.cycle;

    const reminderMillisInAdvance = this._convertIntervalToMillis(
      this.reminderInterval,
    );

    // Set fire date
    switch (unit) {
      case 'Day(s)':
        fireDate = firstPaymentDate
          .add(quantity, 'd')
          .subtract(reminderMillisInAdvance, 'ms');
        break;
      case 'Week(s)':
        fireDate = firstPaymentDate
          .add(quantity, 'w')
          .subtract(reminderMillisInAdvance, 'ms');
        break;
      case 'Month(s)':
        fireDate = firstPaymentDate
          .add(quantity, 'M')
          .subtract(reminderMillisInAdvance, 'ms');
        break;
      default:
        break;
    }

    // Set repeat time if quantity > 1
    let repeatTime = null;

    if (quantity > 1) {
      repeatType = 'time';
      repeatTime = this._convertIntervalToMillis(this.cycle);
    }

    const notification = new Notification({
      subID: this.id,
      title: 'Subscription Reminder',
      message: `For ${this.getCompanyName()}`,
      fireDate: fireDate.valueOf(),
      repeatType: repeatType.toLowerCase(),
      repeatTime,
    });

    return notification;
  }

  // Get milliseconds of reminder interval for PushNotification's 'time' repeatType
  _convertIntervalToMillis(
    interval: ReminderInterval | SubscriptionCycleInterval,
  ): number {
    const units = `${interval.getFormattedUnit().toLowerCase()}s`;

    const duration = moment.duration(interval.quantity, units);

    console.log('duration', duration, interval.quantity, units);

    return duration.asMilliseconds();
  }
}

export default Subscription;
