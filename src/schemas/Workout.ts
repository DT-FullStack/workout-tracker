import { Schema, Model, model } from 'mongoose'
import { Workout } from '../../models/Workout'

interface WorkoutModel extends Model<Workout> {

}

const workoutSchema = new Schema<Workout>({
  datetime: {
    start: Schema.Types.Date,
    end: Schema.Types.Date
  },

})

const Workout = model<Workout, WorkoutModel>('Workout', workoutSchema);

export default Workout;