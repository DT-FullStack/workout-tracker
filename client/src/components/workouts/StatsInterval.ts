import { HasStatistics, StatCreator } from "components/utils/HasStatistics";
import { WorkoutInterval } from '../../models/Workout';
import { humanDuration, secondsToHours } from '../utils/AppDateTime';

export class StatsInterval extends HasStatistics {
  totalWeight: number;

  duration: StatCreator = () => humanDuration()(this.interval.duration)
  distanceStat: StatCreator = () => this.distance ? [this.distance, 'mi'] : undefined;
  mph: StatCreator = () =>
    this.speed
      ? [this.speed, 'mph']
      : this.distance
        ? [this.decimal(this.distance / secondsToHours(this.interval.duration), 2), 'mph']
        : undefined;

  constructor(private interval: WorkoutInterval) {
    super();
    this.totalWeight = this.weight + this.barWeight - this.weightAssist
  }

  distance = this.interval.distance || 0
  incline = this.interval.incline || 0
  speed = this.interval.speed || 0
  verticalRise = this.interval.verticalRise || 0
  weight = this.interval.weight || 0
  barWeight = this.interval.barWeight || 0
  weightAssist = this.interval.weightAssist || 0
  calories = this.interval.calories || 0

  statMethods = () => {
    const stat = this.createStat;
    return [
      this.duration,
      stat(this.distance, 'mi'),
      this.mph,
      stat(this.incline, '% incline')
    ]
  }

}