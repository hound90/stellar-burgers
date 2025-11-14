import profileOrdersReducer, { fetchProfileOrders, clearError } from '../profileOrdersSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    ingredients: ['1', '2'],
    status: 'done',
    name: 'Мой заказ 1',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 1
  },
  {
    _id: '2',
    ingredients: ['3', '4'],
    status: 'pending',
    name: 'Мой заказ 2',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 2
  }
];

describe('profileOrdersSlice', () => {
  it('должен обрабатывать начальное состояние', () => {
    const state = profileOrdersReducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      orders: [],
      loading: false,
      error: null
    });
  });

  it('должен устанавливать loading при загрузке заказов', () => {
    const action = { type: fetchProfileOrders.pending.type };
    const state = profileOrdersReducer(undefined, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять заказы при успешной загрузке', () => {
    const action = {
      type: fetchProfileOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = profileOrdersReducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.error).toBeNull();
  });

  it('должен сохранять ошибку при неудачной загрузке заказов', () => {
    const action = {
      type: fetchProfileOrders.rejected.type,
      payload: 'Ошибка загрузки заказов'
    };
    const state = profileOrdersReducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки заказов');
    expect(state.orders).toEqual([]);
  });

  it('должен очищать ошибку', () => {
    const initialState = {
      orders: [],
      loading: false,
      error: 'Какая-то ошибка'
    };

    const state = profileOrdersReducer(initialState, clearError());
    expect(state.error).toBeNull();
  });
});
