import { action, ActionCreator, WORKOUT } from './index';
import { Workout, WorkoutSet, WorkoutInterval, WorkoutSequence } from '../../models/Workout';
import { Exercise } from '../../models/Exercise';
import WorkoutDB from 'api/WorkoutDB';
import { useNavigate } from 'react-router-dom';

const workoutApi = new WorkoutDB();

type WorkoutAction<P = void> = ActionCreator<WORKOUT, P>

export const startWorkout: WorkoutAction<number> = (timestamp) => action(WORKOUT.SET_START, timestamp);
export const endWorkout: WorkoutAction<number> = (timestamp) => action(WORKOUT.SET_END, timestamp);
export const clearStart: WorkoutAction = () => action(WORKOUT.CLEAR_START);
export const clearEnd: WorkoutAction = () => action(WORKOUT.CLEAR_END);

export const selectExerciseForWorkout: WorkoutAction<Exercise> = (exercise) => action(WORKOUT.SELECT_EXERCISE, exercise)
export const toggleExerciseSearch: WorkoutAction = () => action(WORKOUT.TOGGLE_EXERCISE_SEARCH)
export const addToSequence: WorkoutAction<WorkoutSet | WorkoutInterval> = (item) => action(WORKOUT.ADD_TO_SEQUENCE, item);
export const addSequenceToWorkout: WorkoutAction<WorkoutSequence> = (sequence) => {
  if (sequence && sequence.length) return action(WORKOUT.ADD_SEQUENCE_TO_WORKOUT, sequence);
}

export const resetSaveTracker: WorkoutAction = () => action(WORKOUT.RESET_SAVE_EVENT);
export const fetchWorkoutHistory: WorkoutAction = () => async (dispatch, getState) => {
  const { id } = getState().auth;
  if (id) {
    const { data: workouts } = await workoutApi.fetchList(id);
    dispatch(action(WORKOUT.FETCH_HISTORY, workouts));
  }
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
// export const editWorkout: WorkoutAction<Workout> = (workout) => action(WORKOUT.EDIT_WORKOUT, workout);