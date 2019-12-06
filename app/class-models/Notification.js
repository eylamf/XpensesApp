// @flow

import type {RepeatType, NotificationSource} from '../utils/Types';

class Notification {
  subID: string;
  title: string;
  message: string;
  fireDate: number;
  repeatType: ?RepeatType;
  repeatTime: ?number;

  constructor(source: NotificationSource) {
    const {subID, title, message, fireDate, repeatType, repeatTime} = source;

    this.subID = subID;
    this.title = title;
    this.message = message;
    this.fireDate = fireDate;
    this.repeatType = repeatType || null;
    this.repeatTime = repeatTime || null;
  }
}

export default Notification;
