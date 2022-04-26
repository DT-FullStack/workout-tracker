import { WorkoutSet } from '../../models/Workout';
import { HasStatistics, StatCreator } from '../utils/HasStatistics';

export class StatsSet extends HasStatistics {
  totalWeight: number;

  reps: StatCreator = () => [this.set.reps, 'reps']
  weightPerRep: StatCreator = () => this.totalWeight ? [this.totalWeight, 'lbs'] : undefined;
  weightMoved: StatCreator = () => this.totalWeight ? [this.totalWeight * this.set.reps, 'total lbs'] : undefined;
  assist: StatCreator = () => [this.weightAssist, 'lbs assist']

  constructor(private set: WorkoutSet) {
    super();
    this.totalWeight = this.weight + this.barWeight - this.weightAssist
  }

  weight = this.set.weight || 0
  barWeight = this.set.barWeight || 0
  weightAssist = this.set.weightAssist || 0

  statMethods = () => this.totalWeight > 0
    ? [this.reps, this.weightPerRep, this.weightMoved]
    : this.weightAssist
      ? [this.reps, this.assist]
      : [this.reps]
}