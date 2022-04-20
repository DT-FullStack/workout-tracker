import { combineReducers } from 'redux'
import authReducer from './Auth'
import ExercisesReducer from './Exercise';
import WorkoutsReducer from './Workout';


export default combineReducers({
  auth: authReducer,
  exercises: ExercisesReducer,
  workout: WorkoutsReducer
})