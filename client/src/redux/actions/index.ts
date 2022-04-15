import { AnyAction } from 'redux';
import { AppDispatch, RootState } from 'redux/store';

export type AsyncAction = (dispatch: AppDispatch, getState: () => RootState) => Promise<void>;
export interface Action<T, P = void> extends AnyAction { type: T, payload?: P }

export type ActionCreator<A, P> = (payload: P) => Action<A, P> | AsyncAction | void;
export function action<A, P = void>(type: A, payload?: P): Action<A, P> { return payload ? { type, payload } : { type } };


export enum AUTH {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  REGISTER = 'REGISTER',
  SET_TOKEN = "SET_TOKEN"
}
export enum EXERCISE {
  SET_BODYPART = 'SET_BODYPART',
  SET_EQUIPMENT = 'SET_EQUIPMENT',
  SET_TARGET = 'SET_TARGET',
  SET_NAME = 'SET_NAME',
  SEARCH_RESULTS = 'SEARCH_RESULTS',
  SEARCH_PARAMS = 'SEARCH_PARAMS',
  SELECT_EXERCISE = 'SELECT_CURRENT_EXERCISE'
}

export enum WORKOUT {
  FETCH_HISTORY = 'FETCH_WORKOUT_HISTORY',
  SET_START = 'SET_START',
  SET_END = 'SET_END',
  CLEAR_START = 'CLEAR_START',
  CLEAR_END = 'CLEAR_END',
  TOGGLE_EXERCISE_SEARCH = 'TOGGLE_EXERCISE_SEARCH',
  SELECT_EXERCISE = 'SELECT_EXERCISE_FOR_WORKOUT',
  SELECT_WORKOUT = 'SELECT_WORKOUT',
  ADD_TO_SEQUENCE = 'ADD_TO_SEQUENCE',
  ADD_SEQUENCE_TO_WORKOUT = 'ADD_SEQUENCE_TO_WORKOUT',
  UPDATE_SEQUENCE = 'UPDATE_SEQUENCE',
  DELETE_WORKOUT = 'DELETE_WORKOUT',
  SAVE_WORKOUT = 'SAVE_WORKOUT',
  RESET_SAVE_EVENT = 'RESET_SAVE_EVENT',
  DUPLICATE_WORKOUT = 'DUPLICATE_WORKOUT',
  EDIT_SET = 'EDIT_SET',
  EDIT_INTERVAL = 'EDIT_INTERVAL',
  SET_CURSOR_INDEX = 'SET_CURSOR_INDEX'
}
