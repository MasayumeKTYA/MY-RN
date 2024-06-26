import { configureStore } from '@reduxjs/toolkit';
import winStateReducer from './module/winState';
import songStateReducer from './module/songState';
import thunk from 'redux-thunk';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
const store = configureStore({
  reducer: {
    winState: winStateReducer,
    songState: songStateReducer,
  },
  // applyMiddleware(thunk)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
