import { WORKOUT } from "redux/actions"
import { Reducer } from "redux";
import { Workout, WorkoutSequence } from '../../models/Workout';
import { Exercise } from '../../models/Exercise';
import _ from 'lodash'

export type WorkoutCursor = [number, number | null]

interface WorkoutsState {
  current: Workout,
  cursor?: WorkoutCursor
  exercise: Exercise | null
  hasChanges?: boolean
  history: Workout[]
  isSearching: boolean
  saveEventSuccess: boolean
}
const initial: WorkoutsState = {
  current: {
    datetime: {},
    sequenceList: []
  },
  exercise: null,
  isSearching: false,
  history: [],
  saveEventSuccess: false
}

const WorkoutReducer: Reducer<WorkoutsState> = (state = initial, { type, payload = null }) => {
  const { current, isSearching, history, cursor } = state;
  const { datetime, sequenceList } = current;
  switch (type) {
    case WORKOUT.FETCH_HISTORY:
      return { ...state, history: payload }
    case WORKOUT.SET_START:
      return { ...state, hasChanges: true, current: { ...current, datetime: { ...datetime, start: payload } } }
    case WORKOUT.SET_END:
      return { ...state, hasChanges: true, current: { ...current, datetime: { ...datetime, end: payload } } }
    case WORKOUT.OPEN_SEARCH:
      let newPosition = payload ? [...payload] : cursor ? [...cursor] : undefined;
      return { ...state, isSearching: true, exercise: null, cursor: newPosition };
    case WORKOUT.CLOSE_SEARCH:
      return { ...state, isSearching: false }
    case WORKOUT.SELECT_EXERCISE:
      return { ...state, exercise: payload, isSearching: false }
    case WORKOUT.NEW_SEQUENCE:
      return {
        ...state,
        current: {
          ...current,
          sequenceList: [...sequenceList, []],
        },
        hasChanges: true,
        exercise: null
      }
    case WORKOUT.UPDATE_SEQUENCE:
      if (!cursor) return { ...state };
      const [sequenceIndex, itemIndex] = cursor;
      const outerList = [...sequenceList];
      const innerList = [...outerList[sequenceIndex]];
      innerList[itemIndex || innerList.length] = payload;
      outerList[sequenceIndex] = innerList;
      return { ...state, current: { ...current, sequenceList: outerList }, cursor: undefined, hasChanges: true, exercise: null };
    case WORKOUT.SELECT_WORKOUT:
      return {
        ...state, current: payload
      }
    case WORKOUT.DELETE_WORKOUT:
      return { ...state, history: [...history].filter(workout => workout._id !== payload) };
    case WORKOUT.SAVE_WORKOUT:
      const newHistory = [...history];
      let i = _.findIndex(newHistory, (workout) => workout._id === payload._id);
      if (i > -1) newHistory.splice(i, 1, payload);
      else newHistory.push(payload);
      return { ...state, history: newHistory, saveEventSuccess: true, hasChanges: false };
    case WORKOUT.RESET_SAVE_EVENT:
      return { ...state, saveEventSuccess: false }
    case WORKOUT.SET_CURSOR_INDEX:
      return { ...state, cursor: payload }
    default:
      return state;
  }
}

export default WorkoutReducer;