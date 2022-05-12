import { Schema, model, FilterQuery } from 'mongoose';
import { Exercise as IExercise } from '../../client/src/models/Exercise';
import { AppModel } from './AppModel';

interface ExerciseSchema extends AppModel<IExercise> {
  getFindQuery(params: FilterQuery<IExercise>): FilterQuery<IExercise>
}

export const exerciseSchema = new Schema<IExercise, ExerciseSchema>({
  name: { type: String, required: true },
  bodyPart: { type: String, required: true },
  target: { type: String, required: true },
  equipment: { type: String, required: true },
  gifUrl: { type: String, required: true },
})

exerciseSchema.methods.serialize = function () {
  const { _id, name, bodyPart, target, equipment, gifUrl } = this;
  return { _id, name, bodyPart, target, equipment, gifUrl }
}

exerciseSchema.statics.getFindQuery = function (params: FilterQuery<IExercise>) {
  const query: FilterQuery<IExercise> = { ...params };
  if (query.name) {
    const regex = query.name.trim().split(' ').map((n: string) => `(?=.*(?:\\b${n}|${n}\\b))`).join('');
    query.name = { $regex: regex, $options: 'i' }
  }
  return query;
}

const Exercise = model<IExercise, ExerciseSchema>('Exercise', exerciseSchema);

export default Exercise;