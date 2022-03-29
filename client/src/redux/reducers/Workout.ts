import { WORKOUT } from "redux/actions"
import { Reducer } from "redux";
import { Workout, WorkoutSequence } from '../../../../models/Workout';
import { current } from "@reduxjs/toolkit";
import { Exercise } from '../../api/ExerciseDB';

const initialExercise: Exercise = {
  bodyPart: 'waist',
  equipment: 'body weight',
  gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0003.gif',
  id: '0003',
  name: 'air bike',
  target: 'abs'
} as unknown as Exercise;

interface WorkoutsState {
  current: Workout,
  sequence: WorkoutSequence
  exercise: Exercise | null
  history: Workout[]
  isSearching: boolean
}
const initial: WorkoutsState = {
  current: {
    datetime: {},
    sequenceList: []
  },
  isSearching: false,
  exercise: initialExercise,
  sequence: [],
  history: []
}

const WorkoutReducer: Reducer<WorkoutsState> = (state = initial, { type, payload = null }) => {
  const { current, exercise, sequence, isSearching } = state;
  const { datetime, sequenceList } = current;
  switch (type) {
    case WORKOUT.SET_START:
      return { ...state, current: { ...current, datetime: { ...datetime, start: payload || Date.now() } } }
    case WORKOUT.SET_END:
      return { ...state, current: { ...current, datetime: { ...datetime, end: payload || Date.now() } } }
    case WORKOUT.CLEAR_START:
      return { ...state, current: { ...current, datetime: { ...datetime, start: undefined } } }
    case WORKOUT.CLEAR_END:
      return { ...state, current: { ...current, datetime: { ...datetime, end: undefined } } }
    case WORKOUT.SELECT_EXERCISE:
      return { ...state, exercise: payload, isSearching: false }
    case WORKOUT.TOGGLE_EXERCISE_SEARCH:
      return { ...state, isSearching: !isSearching }
    case WORKOUT.ADD_TO_SEQUENCE:
      return { ...state, sequence: [...sequence, payload] }
    default:
      return state;
  }
}

export default WorkoutReducer;