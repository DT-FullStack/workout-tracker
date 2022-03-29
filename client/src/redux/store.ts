import { configureStore } from '@reduxjs/toolkit'
import reducers from './reducers';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

export const store = configureStore({
  reducer: reducers
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

