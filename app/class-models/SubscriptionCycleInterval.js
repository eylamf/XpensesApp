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

  // TODO: get exact day count
  toDays(exact?: boolean = false): number {
    const unit = this.getFormattedUnit();

    // if (exact) {
    //   if (unit === 'Day') {
    //     return this.quantity;
    //   } else if (unit === 'Week') {
    //     this.quantity * 7;
    //   } else if (unit === 'Month') {
    //   }
    // }

    return moment.duration(this.quantity, this.getFormattedUnit()).asDays();
  }
}

export default SubscriptionCycleInterval;
