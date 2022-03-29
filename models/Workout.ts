
export interface WorkoutSet {
  exerciseId: string;
  exerciseName: string;
  reps: number;
  weight?: number
  barWeight?: number
}
export interface WorkoutInterval {
  exerciseId: string;
  exerciseName: string;
  duration: number;
  weight?: number
  speed?: number
  distance?: number
  incline?: number
  calories?: number
}
export type WorkoutSequence = (WorkoutSet | WorkoutInterval)[];

export type WorkoutSequenceList = WorkoutSequence[];

export interface Workout {
  id?: string,
  datetime: {
    start?: number;
    end?: number;
  }
  sequenceList: WorkoutSequenceList
}

