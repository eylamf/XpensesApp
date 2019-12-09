// @flow

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
}

export default SubscriptionCycleInterval;
