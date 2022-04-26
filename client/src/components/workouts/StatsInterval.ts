import { HasStatistics, StatCreator } from "components/utils/HasStatistics";
import { WorkoutInterval } from '../../models/Workout';
import { humanDuration } from '../utils/AppDateTime';

export class StatsInterval extends HasStatistics {

  duration: StatCreator = () => humanDuration()(this.interval.duration)
  constructor(private interval: WorkoutInterval) {
    super();

  }

  distance = this.interval.distance || 0

  statMethods = () => [this.duration]

}