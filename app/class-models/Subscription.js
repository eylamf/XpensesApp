// @flow

import Company from './Company';
import type {
  SubscriptionSource,
  SubscriptionCycle,
  ReminderInterval,
} from '../utils/Types';

class Subscription {
  id: string;
  company: Company;
  description: ?string;
  cost: number;
  firstPayment: number;
  cycle: ?SubscriptionCycle;
  hasReminder: boolean;
  reminderInterval: ?ReminderInterval;

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
    this.firstPayment = firstPayment || Date.now();
    this.cycle = cycle || {quantity: 1, unit: 'Month(s)'};
    this.hasReminder = hasReminder || false;
    this.reminderInterval = reminderInterval || {quantity: 1, unit: 'Day(s)'};
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

  setCompanyDescription(desc: string) {
    this.description = desc;
  }

  set(key: string, value: any) {
    this[key] = value;
  }
}

export default Subscription;
