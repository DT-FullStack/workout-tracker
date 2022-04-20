import { EXERCISE } from "redux/actions"
import { Reducer } from "redux";
import { BodyPart, Equipment, TargetMuscle, Exercise } from "../../models/Exercise";
import _ from 'lodash';


export interface ExerciseSearchState {
  bodyPart: BodyPart | null
  equipment: Equipment | null
  target: TargetMuscle | null
  name: string | null
}
export interface ExerciseState {
  search: ExerciseSearchState
  list: Exercise[]
  listParams: Partial<ExerciseSearchState>
  current: Exercise | null,
  active: string[]
}
const initial: ExerciseState = {
  search: {
    bodyPart: null,
    equipment: null,
    target: null,
    name: null,
  },
  list: [],
  listParams: {},
  current: null,
  active: []
}

const ExerciseReducer: Reducer<ExerciseState> = (state = initial, { type, payload }) => {
  const { search, active } = state;
  switch (type) {
    case EXERCISE.SET_BODYPART:
      if (payload === 'any') payload = null;
      return { ...state, search: { ...search, bodyPart: payload } }
    case EXERCISE.SET_EQUIPMENT:
      if (payload === 'any') payload = null;
      return { ...state, search: { ...search, equipment: payload } }
    case EXERCISE.SET_NAME:
      if (!payload) payload = null;
      return { ...state, search: { ...search, name: payload } }
    case EXERCISE.SET_TARGET:
      if (payload === 'any') payload = null;
      return { ...state, search: { ...search, target: payload } }
    case EXERCISE.SEARCH_RESULTS:
      if (!payload) payload = [];
      return { ...state, list: payload };
    case EXERCISE.SEARCH_PARAMS:
      if (!payload) payload = {};
      return { ...state, listParams: payload };
    case EXERCISE.TOGGLE_EXERCISE:
      const alreadyActive = active.includes(payload._id);
      return { ...state, active: alreadyActive ? _.without(active, payload._id) : [...active, payload._id] }
    case EXERCISE.DESELECT_EXERCISE:
      return { ...state, active: _.without(active, payload._id) }
    case EXERCISE.SELECT_EXERCISE:
      return { ...state, active: [...active, payload._id] }
    default:
      return state;
  }
}

export default ExerciseReducer;