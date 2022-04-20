import { ActionCreator, AsyncAction, EXERCISE } from "./";
import { AppDispatch } from "../store";
import { Action, action } from './index';
import { ExerciseDB } from 'api/ExerciseDB';
import { BodyPart, Equipment, TargetMuscle, Exercise } from '../../models/Exercise';
import { ExerciseSearchState } from "redux/reducers/Exercise";

type ExerciseAction<P = void> = ActionCreator<EXERCISE, P>

export const exerciseApi = new ExerciseDB();

export const setBodyPart: ExerciseAction<BodyPart> = bodyPart => (action(EXERCISE.SET_BODYPART, bodyPart));
export const setEquipment: ExerciseAction<Equipment> = equip => (action(EXERCISE.SET_EQUIPMENT, equip));
export const setTarget: ExerciseAction<TargetMuscle> = target => (action(EXERCISE.SET_TARGET, target));
export const setName: ExerciseAction<string | null> = name => action(EXERCISE.SET_NAME, name);

export const searchExercises: ExerciseAction<ExerciseSearchState> = (params) => async (dispatch) => {
  const nonNull: Partial<ExerciseSearchState> = {};
  if (params.name) nonNull.name = params.name;
  if (params.bodyPart) nonNull.bodyPart = params.bodyPart;
  if (params.equipment) nonNull.equipment = params.equipment;
  if (params.target) nonNull.target = params.target;

  const { data: results } = await exerciseApi.search(nonNull);
  dispatch(action(EXERCISE.SEARCH_PARAMS, nonNull));
  dispatch(action(EXERCISE.SEARCH_RESULTS, results));
}
export const toggleSelectExercise: ExerciseAction<Exercise> = exercise => action(EXERCISE.TOGGLE_EXERCISE, exercise)
export const selectExercise: ExerciseAction<Exercise> = exercise => action(EXERCISE.SELECT_EXERCISE, exercise)
export const deselectExercise: ExerciseAction<Exercise> = exercise => action(EXERCISE.DESELECT_EXERCISE, exercise)
