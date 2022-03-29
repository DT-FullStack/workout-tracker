import { action, WORKOUT } from './index';
import { Workout, WorkoutSequenceList, WorkoutSet, WorkoutInterval } from '../../../../models/Workout';
import { DateTime } from 'luxon';
import { Exercise } from '../../api/ExerciseDB';

const newWorkout = (): Workout => ({ datetime: {}, sequenceList: [] })

export const startWorkout = () => action(WORKOUT.SET_START);
export const endWorkout = () => action(WORKOUT.SET_END);
export const clearStart = () => action(WORKOUT.CLEAR_START);
export const clearEnd = () => action(WORKOUT.CLEAR_END);
export const selectExerciseForWorkout = (exercise: Exercise) => action(WORKOUT.SELECT_EXERCISE, exercise)
export const toggleExerciseSearch = () => action(WORKOUT.TOGGLE_EXERCISE_SEARCH)
export const addToSequence = (item: WorkoutSet | WorkoutInterval) => action(WORKOUT.ADD_TO_SEQUENCE, item);