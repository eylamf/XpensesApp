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
}

export default SubscriptionCycleInterval;
