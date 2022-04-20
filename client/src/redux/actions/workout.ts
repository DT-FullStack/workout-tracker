import { action, ActionCreator, WORKOUT } from './index';
import { Workout, WorkoutSet, WorkoutInterval, WorkoutSequence } from '../../models/Workout';
import { Exercise } from '../../models/Exercise';
import WorkoutDB from 'api/WorkoutDB';
import { useNavigate } from 'react-router-dom';
import { WorkoutCursor } from 'redux/reducers/Workout';

const workoutApi = new WorkoutDB();

type WorkoutAction<P = void> = ActionCreator<WORKOUT, P>

export const startWorkout: WorkoutAction<number> = (timestamp) => action(WORKOUT.SET_START, timestamp);
export const endWorkout: WorkoutAction<number> = (timestamp) => action(WORKOUT.SET_END, timestamp);
export const clearStart: WorkoutAction<null> = () => action(WORKOUT.SET_START, null);
export const clearEnd: WorkoutAction<null> = () => action(WORKOUT.SET_END, null);

export const selectExerciseForWorkout: WorkoutAction<Exercise> = (exercise) => action(WORKOUT.SELECT_EXERCISE, exercise)
// export const addToSequence: WorkoutAction<Partial<WorkoutSet | WorkoutInterval>> = (item) => action(WORKOUT.ADD_TO_SEQUENCE, item);
export const updateSequence: WorkoutAction<WorkoutSet | WorkoutInterval> = (item) => action(WORKOUT.UPDATE_SEQUENCE, item);
export const duplicateSequenceItem: WorkoutAction<WorkoutSet | WorkoutInterval> = (item) => {

}

export const resetSaveTracker: WorkoutAction = () => action(WORKOUT.RESET_SAVE_EVENT);
export const fetchWorkoutHistory: WorkoutAction = () => async (dispatch, getState) => {
  const { id } = getState().auth;
  if (id) {
    const { data: workouts } = await workoutApi.fetchList(id);
    dispatch(action(WORKOUT.FETCH_HISTORY, workouts));
  } else dispatch(action(WORKOUT.FETCH_HISTORY, []));
}
export const saveWorkout: WorkoutAction<Workout> = (workout) => async (dispatch, getState) => {
  const { id: userId } = getState().auth;
  if (userId) {
    const { data: { workoutId } } = await workoutApi.saveWorkout(workout, userId);
    dispatch(action(WORKOUT.SAVE_WORKOUT, { ...workout, _id: workoutId }));
    console.log(workoutId);
  }
}
export const selectWorkout: WorkoutAction<Workout> = (workout) => action(WORKOUT.SELECT_WORKOUT, workout)
export const deleteWorkout: WorkoutAction<Workout> = (workout) => async (dispatch) => {
  const { _id } = workout;
  if (!_id) return;
  const { data: { error } } = await workoutApi.deleteWorkout(_id);
  if (!error) {
    dispatch(action(WORKOUT.DELETE_WORKOUT, workout._id))
  }
}
export const openSearch: WorkoutAction<WorkoutCursor | void> = (indexArray) => action(WORKOUT.OPEN_SEARCH, indexArray);
export const closeSearch: WorkoutAction = () => action(WORKOUT.CLOSE_SEARCH);

export const duplicateWorkout: WorkoutAction<Workout> = (workout) => {
  const copy: Workout = { ...workout, datetime: {} };
  delete copy._id;
  return action(WORKOUT.SELECT_WORKOUT, copy);
}
export const setWorkoutCursor: WorkoutAction<WorkoutCursor | void> = (indexArray) => action(WORKOUT.SET_CURSOR_INDEX, indexArray);

