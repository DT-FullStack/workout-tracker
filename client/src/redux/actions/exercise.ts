import { EXERCISE } from "./";
import { AppDispatch } from "../store";
import { action } from './index';
import { ExerciseDB } from 'api/ExerciseDB';
import { BodyPart, Equipment, TargetMuscles, Exercise } from '../../api/ExerciseDB';
import { ExerciseSearchState } from "redux/reducers/Exercise";

type ExerciseSearchOrderTuple = ['name' | 'target' | 'bodyPart' | 'equipment', string | TargetMuscles | BodyPart | Equipment | null]
type ExerciseSearchOrderTupleList = ExerciseSearchOrderTuple[];

export const exerciseApi = new ExerciseDB();

export const setBodyPart = (bodyPart: BodyPart) => (action(EXERCISE.SET_BODYPART, bodyPart));
export const setEquipment = (equip: Equipment) => (action(EXERCISE.SET_EQUIPMENT, equip));
export const setTarget = (target: TargetMuscles) => (action(EXERCISE.SET_TARGET, target));
export const setName = (name: string) => (action(EXERCISE.SET_NAME, name));

export const searchExercises = ({ name, target, bodyPart, equipment }: ExerciseSearchState) => async (dispatch: AppDispatch) => {
  const searchOrder: ExerciseSearchOrderTupleList = [['name', name], ['target', target], ['bodyPart', bodyPart], ['equipment', equipment]];
  let results: Exercise[] = [];
  do {
    const primary = searchOrder.shift();
    if (primary) results = await exerciseApi.search(primary[0], primary[1] as string | null) as Exercise[];
  } while (!results.length && searchOrder.length);

  while (results.length && searchOrder.length) {
    const [filterBy, value] = searchOrder.shift() as ExerciseSearchOrderTuple;
    if (value === null) break;
    results = results.filter((exercise: Exercise) => exercise[filterBy] === value);
    console.log(filterBy, value, results);
  }

  dispatch(action(EXERCISE.SEARCH_RESULTS, results));
}
export const setSelectedExercise = (exercise: Exercise) => action(EXERCISE.SELECT_EXERCISE, exercise)
