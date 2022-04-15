import { AsyncAction, EXERCISE } from "./";
import { AppDispatch } from "../store";
import { Action } from './index';
import { ExerciseDB } from 'api/ExerciseDB';
import { BodyPart, Equipment, TargetMuscle, Exercise } from '../../models/Exercise';
import { ExerciseSearchState } from "redux/reducers/Exercise";

type ExerciseAction<P> = Action<EXERCISE, P>
type ExerciseHandler<P> = (payload: P) => ExerciseAction<P> | AsyncAction | void;
function action<P>(type: EXERCISE, payload?: P): ExerciseAction<P> { return payload ? { type, payload } : { type } };

export const exerciseApi = new ExerciseDB();

export const setBodyPart: ExerciseHandler<BodyPart> = bodyPart => (action(EXERCISE.SET_BODYPART, bodyPart));
export const setEquipment: ExerciseHandler<Equipment> = equip => (action(EXERCISE.SET_EQUIPMENT, equip));
export const setTarget: ExerciseHandler<TargetMuscle> = target => (action(EXERCISE.SET_TARGET, target));
export const setName: ExerciseHandler<string | null> = name => action(EXERCISE.SET_NAME, name);

export const searchExercises: ExerciseHandler<ExerciseSearchState> = (params) => async (dispatch) => {
  const nonNull: Partial<ExerciseSearchState> = {};
  if (params.name) nonNull.name = params.name;
  if (params.bodyPart) nonNull.bodyPart = params.bodyPart;
  if (params.equipment) nonNull.equipment = params.equipment;
  if (params.target) nonNull.target = params.target;

  const { data: results } = await exerciseApi.search(nonNull);
  dispatch(action(EXERCISE.SEARCH_PARAMS, nonNull));
  dispatch(action(EXERCISE.SEARCH_RESULTS, results));
}
export const setSelectedExercise: ExerciseHandler<Exercise> = exercise => action(EXERCISE.SELECT_EXERCISE, exercise)
