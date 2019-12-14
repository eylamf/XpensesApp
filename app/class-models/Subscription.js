// @flow

import moment from 'moment';
import Company from './Company';
import type {
  SubscriptionSource,
  RepeatType,
  CostTypeFilter,
  CostIntervalFilter,
  SimpleCostIntervalFilter,
} from '../utils/Types';
import ReminderInterval from './ReminderInterval';
import SubscriptionCycleInterval from './SubscriptionCycleInterval';
import Notification from './Notification';
import {daysInMonth, getDayInYear} from '../utils/DateUtils';

class Subscription {
  id: string;
  company: Company;
  description: ?string;
  cost: number;
  firstPayment: number;
  cycle: SubscriptionCycleInterval;
  hasReminder: boolean;
  reminderInterval: ReminderInterval;
  custom: boolean;

  constructor(source: SubscriptionSource) {
    const {
      company,
      description,
      cost,
      firstPayment,
      cycle,
      hasReminder,
      reminderInterval,
      custom,
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
    this.custom = custom || false;
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

  getCostForFilters(
    filterType: CostTypeFilter,
    filterInterval: CostIntervalFilter,
  ): number {
    const interval: SimpleCostIntervalFilter = filterInterval.split(' ')[1];

    let result = 0;

    let firstPaymentDayInYear = getDayInYear(new Date(this.firstPayment));

    const dayInYear = getDayInYear();

    let cycleAsDays;

    const now = new Date();

    switch (interval) {
      case 'Week':
        if (filterType === 'Average') {
          cycleAsDays = this.cycle.toDays();
          result = this.cost * (7 / cycleAsDays);
        } else if (filterType === 'Remaining') {
          cycleAsDays = this.cycle.toDays(true);

          const dayInWeek = now.getDay();
          const diff = 7 - dayInWeek;
          const endOfWeekDayInYear = getDayInYear(
            moment()
              .add(diff, 'd')
              .toDate(),
          );

          let intervals = 0;

          if (firstPaymentDayInYear === dayInYear) {
            intervals = -1;
          }

          let incrementedDayOfYear = firstPaymentDayInYear;

          while (incrementedDayOfYear < dayInYear) {
            incrementedDayOfYear += cycleAsDays;
          }

          while (incrementedDayOfYear <= endOfWeekDayInYear) {
            intervals++;
            incrementedDayOfYear += cycleAsDays;
          }

          result = this.cost * intervals;
        } else if (filterType === 'Exact') {
          cycleAsDays = this.cycle.toDays(true);

          const dayInWeek = now.getDay();
          const startOfWeekDayInYear = getDayInYear(
            moment({hour: 0})
              .subtract(dayInWeek, 'd')
              .toDate(),
          );
          const endOfWeekDayInYear = getDayInYear(
            moment()
              .add(7 - dayInWeek, 'd')
              .toDate(),
          );

          let intervals = 0;

          if (firstPaymentDayInYear === dayInYear) {
            intervals = -1;
          }

          let incrementedDayOfYear = firstPaymentDayInYear;

          while (incrementedDayOfYear < startOfWeekDayInYear) {
            incrementedDayOfYear += cycleAsDays;
          }

          while (incrementedDayOfYear <= endOfWeekDayInYear) {
            intervals++;
            incrementedDayOfYear += cycleAsDays;
          }

          result = this.cost * intervals;
          // if (cycleAsDays <= 7) {
          //   const originalStartDay = new Date(this.firstPayment).getDay();
          //   const startDay = now.getDay();

          //   if (Math.abs(originalStartDay - startDay) % 2 === 0) {
          //     result = this.cost * Math.round(6 / cycleAsDays);
          //   } else {
          //     result = this.cost * Math.round(7 / cycleAsDays);
          //   }
          // }
        }
        break;
      case 'Month':
        if (filterType === 'Average') {
          cycleAsDays = this.cycle.toDays();

          if (this.cycle.getFormattedUnit() === 'Month') {
            cycleAsDays = this.cycle.quantity * 30;

            result = this.cost * (30 / cycleAsDays);
          } else {
            result = this.cost * (365 / 12 / cycleAsDays);
          }
        } else if (filterType === 'Remaining') {
          cycleAsDays = this.cycle.toDays(true);

          const dayInMonth = now.getDate();
          const daysInThisMonth = daysInMonth();
          const diff = daysInThisMonth - dayInMonth;
          const endOfMonthDayInYear = getDayInYear(
            moment()
              .add(diff, 'd')
              .toDate(),
          );

          let intervals = 0;

          if (firstPaymentDayInYear === dayInYear) {
            intervals = -1;
          }

          let incrementedDayOfYear = firstPaymentDayInYear;

          while (incrementedDayOfYear < dayInYear) {
            incrementedDayOfYear += cycleAsDays;
          }

          while (incrementedDayOfYear < endOfMonthDayInYear) {
            intervals++;
            incrementedDayOfYear += cycleAsDays;
          }

          result = this.cost * intervals;
        } else if (filterType === 'Exact') {
          cycleAsDays = this.cycle.toDays(true);

          const dayInMonth = now.getDate();
          const daysThisMonth = daysInMonth();
          const startDayOfMonthDayInYear = getDayInYear(
            moment({hour: 0})
              .subtract(dayInMonth - 1, 'd')
              .toDate(),
          );
          const diff = daysThisMonth - dayInMonth;
          const endOfMonthDayInYear = getDayInYear(
            moment({hour: 0})
              .add(diff, 'd')
              .toDate(),
          );

          let intervals = 0;

          if (firstPaymentDayInYear === dayInYear) {
            intervals = -1;
          }

          let incrementedDayOfYear = firstPaymentDayInYear;

          while (incrementedDayOfYear < startDayOfMonthDayInYear) {
            incrementedDayOfYear += cycleAsDays;
          }

          while (incrementedDayOfYear <= endOfMonthDayInYear) {
            intervals++;
            incrementedDayOfYear += cycleAsDays;
          }

          result = this.cost * intervals;
          // if (cycleAsDays <= daysThisMonth) {
          //   result = this.cost * Math.round(daysThisMonth / cycleAsDays);
          // }
        }
        break;
      case 'Year':
        if (filterType === 'Average') {
          cycleAsDays = this.cycle.toDays();
          // Add 1 to compensate for decimal cycleAsDays (6 month * 2 could be > 365)
          if (cycleAsDays * 2 > 366) {
            result = this.cost * Math.floor(365 / cycleAsDays);
          } else {
            result = this.cost * Math.round(365 / cycleAsDays);
          }
        } else if (filterType === 'Remaining') {
          cycleAsDays = this.cycle.toDays(true);

          let intervals = 0;

          if (firstPaymentDayInYear === getDayInYear()) {
            intervals = -1;
          }

          let incrementedDayOfYear = firstPaymentDayInYear;

          while (incrementedDayOfYear < dayInYear) {
            incrementedDayOfYear += cycleAsDays;
          }

          while (incrementedDayOfYear <= 365) {
            intervals++;
            incrementedDayOfYear += cycleAsDays;
          }

          result = this.cost * intervals;
        } else if (filterType === 'Exact') {
          cycleAsDays = this.cycle.toDays(true);

          let startDayOfYear = getDayInYear(new Date(this.firstPayment));

          console.log(
            'Remaining in year: start day of year = ' +
              this.getCompanyName() +
              startDayOfYear,
          );

          let intervals = 0;

          while (startDayOfYear <= 365) {
            intervals++;
            startDayOfYear += cycleAsDays;
          }

          console.log(
            'Remaining in year',
            this.getCompanyName(),
            'startDayOfYear: ' + startDayOfYear,
            'intervals: ' + intervals,
          );

          result = this.cost * intervals;

          // cycleAsDays = this.cycle.toDays(true);

          // const diffFromEndOfYear =
          //   moment(`${now.getFullYear()}-12-31`)
          //     .hour(0)
          //     .diff(moment(this.firstPayment), 'days') + 1;

          // const intervals = Math.round(diffFromEndOfYear / cycleAsDays);

          // result = this.cost * intervals;
        }
        break;
      default:
        break;
    }

    return result;
  }

  getTimeUntilDueLabel(): string {
    const dayInYear = getDayInYear();
    const firstPaymentDayInYear = getDayInYear(new Date(this.firstPayment));
    const cycleAsDays = this.cycle.toDays(true);

    let daysUntil, dueDate;

    // TODO: Case - If its next year
    // if () {
    // }

    let incrementedDayOfYear = firstPaymentDayInYear;

    while (incrementedDayOfYear < dayInYear) {
      incrementedDayOfYear += cycleAsDays;
    }

    if (incrementedDayOfYear === dayInYear) {
      return 'Today';
    }

    daysUntil = Math.floor(incrementedDayOfYear - dayInYear);
    dueDate = moment({hour: 0}).add(daysUntil, 'd');

    const label = dueDate.fromNow(true);

    return label.charAt(0).toUpperCase() + label.slice(1);
  }

  // Get milliseconds of reminder or cycle interval
  _convertIntervalToMillis(
    interval: ReminderInterval | SubscriptionCycleInterval,
  ): number {
    const units = `${interval.getFormattedUnit().toLowerCase()}s`;

    const duration = moment.duration(interval.quantity, units);

    return duration.asMilliseconds();
  }
}

export default Subscription;
