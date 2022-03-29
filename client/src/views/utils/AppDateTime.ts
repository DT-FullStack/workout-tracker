import { DateTime } from 'luxon';

export class AppDateTime {
  dt: DateTime = DateTime.now()
  constructor(timestamp?: number) {
    console.log(timestamp);
    if (timestamp) this.dt = DateTime.fromMillis(timestamp);
  }

  toTimeOrDateTimeString(): string {
    return this.isBeforeToday() ? this.dt.toLocaleString() : this.dt.toLocaleString(DateTime.TIME_SIMPLE)
  }
  isBeforeToday(): boolean {
    return this.dt.startOf('day') < DateTime.now().startOf('day')
  }

}