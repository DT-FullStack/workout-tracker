import { WORKOUT } from "redux/actions"
import { Reducer } from "redux";
import { Workout, WorkoutInterval, WorkoutSequence, WorkoutSet } from '../../models/Workout';
import { Exercise } from '../../models/Exercise';
import _ from 'lodash'

export type WorkoutCursor = [number, number | null]

interface WorkoutsState {
  current: Workout,
  cursor?: WorkoutCursor
  exercise: Exercise | null
  changeEvent?: boolean
  hasChanges: boolean
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
  hasChanges: false,
  isSearching: false,
  history: [],
  saveEventSuccess: false,
}

const WorkoutReducer: Reducer<WorkoutsState> = (state = initial, { type, payload = null }) => {
  const { current, isSearching, history, cursor } = state;
  const { datetime, sequenceList } = current;
  const newSequenceList = [...sequenceList];
  let sequenceIndex: number, itemIndex: number;
  let sequence: WorkoutSequence, item: WorkoutSet & WorkoutInterval;
  switch (type) {
    case WORKOUT.FETCH_HISTORY:
      return {
        ...state,
        history: payload
      }
    case WORKOUT.SET_START:
      return {
        ...state,
        changeEvent: true, current: { ...current, datetime: { ...datetime, start: payload } }
      }
    case WORKOUT.SET_END:
      return {
        ...state, changeEvent: true, current: { ...current, datetime: { ...datetime, end: payload } }
      }
    case WORKOUT.OPEN_SEARCH:
      let newPosition = payload ? [...payload] : cursor ? [...cursor] : undefined;
      return { ...state, isSearching: true, exercise: null, cursor: newPosition };
    case WORKOUT.CLOSE_SEARCH:
      return {
        ...state, isSearching: false
      }
    case WORKOUT.SELECT_EXERCISE:
      return {
        ...state, exercise: payload, isSearching: false
      }
    case WORKOUT.NEW_SEQUENCE:
      return {
        ...state, current: { ...current, sequenceList: [...sequenceList, []], }, changeEvent: true, exercise: null
      }
    case WORKOUT.DUPLICATE_ITEM:
      [sequenceIndex, itemIndex] = payload;
      sequence = [...newSequenceList[sequenceIndex]];
      item = { ...sequence[itemIndex] };
      sequence.push(item);
      newSequenceList[sequenceIndex] = sequence;
      return {
        ...state, changeEvent: true, cursor: [sequenceIndex, sequence.length - 1], current: { ...current, sequenceList: newSequenceList }
      }
    case WORKOUT.DELETE_ITEM:
      [sequenceIndex, itemIndex] = payload;
      sequence = [...newSequenceList[sequenceIndex]];
      sequence.splice(itemIndex, 1);
      newSequenceList[sequenceIndex] = sequence;
      return { ...state, changeEvent: true, current: { ...current, sequenceList: newSequenceList } };
    case WORKOUT.UPDATE_SEQUENCE:
      if (!cursor) return { ...state };
      sequenceIndex = cursor[0];
      const outerList = [...sequenceList];
      const innerList = [...outerList[sequenceIndex]];
      itemIndex = cursor[1] === null ? innerList.length : cursor[1];
      innerList[itemIndex] = payload;
      outerList[sequenceIndex] = innerList;
      return { ...state, current: { ...current, sequenceList: outerList }, cursor: undefined, changeEvent: true, exercise: null };
    case WORKOUT.DELETE_SEQUENCE:
      if (payload === null) payload = 0;
      newSequenceList.splice(payload, 1);
      if (newSequenceList.length === 0) newSequenceList.push([]);
      return { ...state, changeEvent: true, current: { ...current, sequenceList: newSequenceList } };
    case WORKOUT.SELECT_WORKOUT:
      return {
        ...state, current: payload, cursor: undefined
      }
    case WORKOUT.TRIGGER_CHANGE:
      console.log('trigger change');
      return { ...state, hasChanges: true, changeEvent: false }
    case WORKOUT.DELETE_WORKOUT:
      return { ...state, history: [...history].filter(workout => workout._id !== payload) };
    case WORKOUT.SAVE_WORKOUT:
      console.log('save workout');
      const newHistory = [...history];
      let i = _.findIndex(newHistory, (workout) => workout._id === payload._id);
      if (i > -1) newHistory.splice(i, 1, payload);
      else newHistory.push(payload);
      return { ...state, current: payload, history: newHistory, saveEventSuccess: true, hasChanges: false };
    case WORKOUT.RESET_SAVE_EVENT:
      return {
        ...state, saveEventSuccess: false
      }
    case WORKOUT.SET_CURSOR_INDEX:
      return {
        ...state, cursor: payload
      }
    default:
      return state;
  }
}

export default WorkoutReducer;