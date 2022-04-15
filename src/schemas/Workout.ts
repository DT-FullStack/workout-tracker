import { Schema, model, Types } from 'mongoose'
import { Workout as IWorkout } from '../../client/src/models/Workout';
import User from './User';
import _ from 'lodash';
import { sequenceItemSchema } from './WorkoutSequence';
import { AppModel } from './AppModel';
import { AppDocument, AppQuery } from './AppDocument';

interface WorkoutSchema extends AppModel<IWorkout> {
  findAndPopulate: AppQuery<IWorkout>
}



export const workoutSchema = new Schema<IWorkout, WorkoutSchema>({
  datetime: {
    start: Number,
    end: Number
  },
  sequenceList: [[sequenceItemSchema]],
  user: {
    type: Types.ObjectId,
    ref: 'User'
  },

})

workoutSchema.statics.findAndPopulate = async function (params: { [key: string]: any }) {
  return this.find(params).populate({ path: 'sequenceList', populate: { path: 'exercise', model: 'Exercise' } });
}

workoutSchema.methods.serialize = function () {
  const { _id, datetime, sequenceList, user } = this;
  return { _id, datetime, sequenceList, user };
}


workoutSchema.post('save', async function () {
  await User.findByIdAndUpdate(this.userId, { $push: { workouts: this._id } });
})

const Workout = model<IWorkout, WorkoutSchema>('Workout', workoutSchema);


export default Workout;