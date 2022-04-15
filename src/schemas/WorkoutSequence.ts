import { Schema, Model, model, Types } from 'mongoose'
import { WorkoutInterval, WorkoutSet } from '../Workout';
import User from './User';
import _ from 'lodash';
// import { Exercise as ExerciseI } from '../../client/src/api/ExerciseDB';
import Exercise from './Exercise';

export type SequenceItem = WorkoutSet & WorkoutInterval;
export interface SequenceItemSchema extends Model<SequenceItem> { }
// export interface Sequence extends Model<Sequqnce> { }

export const sequenceItemSchema = new Schema<SequenceItem, SequenceItemSchema>({
  exercise: {
    type: Types.ObjectId,
    ref: 'Exercise',
  },
  reps: Number,
  weight: Number,
  barWeight: Number,
  assistWeight: Number,
  duration: Number,
  speed: Number,
  distance: Number,
  incline: Number,
  verticalRise: Number,
  calories: Number,
})

