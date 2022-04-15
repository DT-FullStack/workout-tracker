import { Schema, model } from 'mongoose'
import { Exercise as IExercise } from '../../client/src/api/ExerciseDB';
import { AppModel } from './AppModel';

interface ExerciseSchema extends AppModel<IExercise> { }

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

const Exercise = model<IExercise, ExerciseSchema>('Exercise', exerciseSchema);

export default Exercise;