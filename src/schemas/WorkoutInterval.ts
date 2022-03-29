import { Schema, Model, model } from 'mongoose'
import { WorkoutInterval } from '../../models/Workout'

interface WorkoutIntervalModel extends Model<WorkoutInterval> {

}

const workoutSchema = new Schema<WorkoutInterval>({
})


const WorkoutInterval = model<WorkoutInterval, WorkoutIntervalModel>('WorkoutInterval', workoutSchema);

export default WorkoutInterval;