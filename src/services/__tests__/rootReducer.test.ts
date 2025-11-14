import ingredientsReducer from '../ingredientsSlice';
import constructorReducer from '../constructorSlice';
import orderReducer from '../orderSlice';
import userReducer from '../userSlice';
import feedReducer from '../feedSlice';
import profileOrdersReducer from '../profileOrdersSlice';
import { rootReducer } from '../rootReducer';
import { combineReducers } from '@reduxjs/toolkit';

const expectedRootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer
});

describe('rootReducer', () => {
  it('должен совпадать с ручной комбинацией редюсеров', () => {
    const UNKNOWN_ACTION = { type: 'UNKNOWN_ACTION' };

    // Получаем состояние от реального rootReducer
    const actualState = rootReducer(undefined, UNKNOWN_ACTION);

    // Получаем состояние от ожидаемой комбинации
    const expectedState = expectedRootReducer(undefined, UNKNOWN_ACTION);

    // Сравниваем результаты
    expect(actualState).toEqual(expectedState);
  });

  it('должен иметь правильную структуру', () => {
    const state = rootReducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      ingredients: {
        items: [],
        loading: false,
        error: null
      },
      burgerConstructor: {
        selectedBun: null,
        selectedIngredients: []
      },
      order: {
        currentOrder: null,
        orderRequest: false,
        error: null
      },
      user: {
        user: null,
        isAuthChecked: false,
        error: null,
        loading: false
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        loading: false,
        error: null
      },
      profileOrders: {
        orders: [],
        loading: false,
        error: null
      }
    });
  });
});
