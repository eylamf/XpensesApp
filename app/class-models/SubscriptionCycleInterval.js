// @flow

import moment from 'moment';
import type {
  SubscriptionIntervalSource,
  SubscriptionIntervalUnit,
  SubscriptionIntervalFormattedUnit,
  ReminderIntervalQuantity,
} from '../utils/Types';

class SubscriptionCycleInterval {
  unit: SubscriptionIntervalUnit;
  quantity: ReminderIntervalQuantity;

  constructor(source: SubscriptionIntervalSource) {
    this.unit = source.unit;
    this.quantity = source.quantity;
  }

  getFormattedUnit(): SubscriptionIntervalFormattedUnit {
    return this.unit.substring(0, this.unit.length - 3);
  }

  /**
   * toString() equivalent.
   */
  toPretty(): string {
    return `Every ${this.quantity} ${this.unit}`;
  }

  isEqual(other: any): boolean {
    if (!(other instanceof SubscriptionCycleInterval)) {
      return false;
    }

    return this.unit === other.unit && this.quantity === other.quantity;
  }

  toDays(exact?: boolean = false): number {
    const unit = this.getFormattedUnit();

    // if (unit === 'Day') {
    //   return this.quantity;
    // } else if (unit === 'Week') {
    //   return this.quantity * 7;
    // } else if (unit === 'Month') {
    //   if (exact) {
    //     const now = new Date();
    //     const daysInCurrentMonth = new Date(
    //       now.getFullYear(),
    //       now.getMonth() + 1,
    //       0,
    //     ).getDate();

    //     console.log(
    //       'SubsctionCycleInterval: number of days in this month',
    //       daysInCurrentMonth,
    //     );

    //     /**
    //      * TODO: build array and get daysInMonths for this.quantitiy - 1...0
    //      */
    //     return this.quantity * daysInCurrentMonth;
    //   }

    //   return this.quantity * (365 / 12);
    // } else if (unit === 'Year') {
    //   return 365;
    // }

    return moment.duration(this.quantity, this.getFormattedUnit()).asDays();
  }
}

export default SubscriptionCycleInterval;
