// @flow

import type {
  ReminderIntervalSource,
  ReminderIntervalUnit,
  ReminderIntervalFormattedUnit,
  ReminderIntervalQuantity,
} from '../utils/Types';

class ReminderInterval {
  unit: ReminderIntervalUnit;
  quantity: ReminderIntervalQuantity;

  constructor(source: ReminderIntervalSource) {
    this.unit = source.unit;
    this.quantity = source.quantity;
  }

  getFormattedUnit(): ReminderIntervalFormattedUnit {
    if (this.quantity === 0) {
      return 'Day';
    } else {
      return this.unit.substring(0, this.unit.length - 3);
    }
  }

  /**
   * toString() equivalent.
   */
  toPretty(): string {
    if (this.quantity === 0) {
      return this.unit;
    }

    return `${this.quantity} ${this.unit} before`;
  }

  isEqual(other: any): boolean {
    if (!(other instanceof ReminderInterval)) {
      return false;
    }

    return this.unit === other.unit && this.quantity === other.quantity;
  }
}

export default ReminderInterval;
