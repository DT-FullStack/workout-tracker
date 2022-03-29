import { EXERCISE } from "redux/actions"
import { Reducer } from "redux";
import { BodyPart, BodyPartList, Equipment, EquipmentList, TargetMuscles, TargetMusclesList, Exercise } from "api/ExerciseDB";
import { searchBy, searchTerm } from "views/exercises/ExerciseSearch";


export interface ExerciseSearchState {
  bodyPart: BodyPart | null
  equipment: Equipment | null
  target: TargetMuscles | null
  name: string | null
}
export interface ExerciseState {
  search: {
    bodyPart: BodyPart | null
    equipment: Equipment | null
    target: TargetMuscles | null
    name: string | null
  }
  list: Exercise[]
  current: Exercise | null
}
const initial: ExerciseState = {
  search: {
    bodyPart: null,
    equipment: null,
    target: null,
    name: null,
  },
  list: [],
  current: null
}

const ExerciseReducer: Reducer<ExerciseState> = (state = initial, { type, payload = {} }) => {
  const { search, list, current } = state;
  switch (type) {
    case EXERCISE.SET_BODYPART:
      if (payload === search.bodyPart) return state;
      if (payload === 'any') payload = null;
      return { ...state, search: { ...search, bodyPart: payload } }
    case EXERCISE.SET_EQUIPMENT:
      if (payload === search.equipment) return state;
      if (payload === 'any') payload = null;
      return { ...state, search: { ...search, equipment: payload } }
    case EXERCISE.SET_NAME:
      if (payload === search.name) return state;
      if (payload === '') payload = null;
      return { ...state, search: { ...search, name: payload } }
    case EXERCISE.SET_TARGET:
      if (payload === search.target) return state;
      if (payload === 'any') payload = null;
      return { ...state, search: { ...search, target: payload } }
    case EXERCISE.SEARCH_RESULTS:
      return { ...state, list: payload };
    case EXERCISE.SELECT_EXERCISE:
      return { ...state, current: payload }
    default:
      return state;
  }
}

export default ExerciseReducer;