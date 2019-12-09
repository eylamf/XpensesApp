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
}

export default ReminderInterval;
