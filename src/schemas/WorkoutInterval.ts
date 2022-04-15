import { Schema, Model, model, Types } from 'mongoose'
import { WorkoutInterval } from '../../client/src/models/Workout'

const workoutIntervalSchema = new Schema<WorkoutInterval>({
  exercise: {
    type: Types.Map,
    of: String,
    required: true
  },
  duration: { type: Number, required: true },
  weight: Number,
  speed: Number,
  distance: Number,
  incline: Number,
  calories: Number,
})

export default workoutIntervalSchema;