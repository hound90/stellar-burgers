import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';
import constructorReducer from './constructorSlice'; // ДОБАВЬ
import orderReducer from './orderSlice';
import userReducer from './userSlice';
import feedReducer from './feedSlice'; // ДОБАВЬ

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer, // ДОБАВЬ (используй то же имя что в store.ts)
  order: orderReducer,
  user: userReducer,
  feed: feedReducer // ДОБАВЬ
});

export type RootState = ReturnType<typeof rootReducer>;
