import { DateTime, Duration, DurationLikeObject, DurationObjectUnits, ToHumanDurationOptions } from 'luxon';

export class AppDateTime {
  dt: DateTime = DateTime.now()
  constructor(timestamp?: number) {
    if (timestamp) this.dt = DateTime.fromMillis(timestamp);
  }

  toTimeOrDateTimeString(): string {
    return this.isBeforeToday() ? this.dt.toLocaleString() : this.dt.toLocaleString(DateTime.TIME_SIMPLE)
  }
  isBeforeToday(): boolean {
    return this.dt.startOf('day') < DateTime.now().startOf('day')
  }
  short(): string {
    return this.dt.toLocaleString(DateTime.DATETIME_SHORT);
  }
  mini(): string {
    return this.dt.toLocaleString({ day: 'numeric', month: 'numeric', year: '2-digit' });
  }
  time(): string {
    return this.dt.toLocaleString(DateTime.TIME_SIMPLE)
  }
  timeBetween(datetime: AppDateTime): Duration {
    return this.dt.diff(datetime.dt)
  }
}

export class AppDuration {
  private lux !: Duration;
  constructor(public duration: number, public units: string = 'minutes') {
    switch (units) {
      case 'hours':
        this.lux = Duration.fromObject({ hours: duration });
        break;
      case 'seconds':
        this.lux = Duration.fromObject({ seconds: duration });
        break;
      default:
        this.lux = Duration.fromObject({ minutes: duration });
        break;
    }
  }
  human = (options?: ToHumanDurationOptions): string => this.lux.toHuman(options);
}

export const humanDuration = (units: (keyof DurationLikeObject)[] = ['hours', 'minutes', 'seconds']): (seconds: number) => string => {
  return (seconds: number) => {
    const normalized = Duration.fromObject({ seconds }).shiftTo(...units).normalize().toObject();
    for (let unit of units) {
      let value = normalized[unit as keyof DurationObjectUnits];
      if (!value) delete normalized[unit as keyof DurationObjectUnits]
    }
    return Duration.fromObject(normalized).toHuman();
  }
}

export const secondsToMinuteString = (value: number): string => {
  const minutes = Math.floor(value / 60), seconds = value % 60;
  return minutes && seconds ?
    `${minutes}:${seconds}`
    : minutes ?
      `${minutes}:00`
      : `00:${seconds}`
}

export const secondsToHours = (value: number): number => value / 60 / 60