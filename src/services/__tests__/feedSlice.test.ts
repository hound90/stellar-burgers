import feedReducer, { fetchFeeds } from '../feedSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    ingredients: ['1', '2'],
    status: 'done',
    name: 'Заказ 1',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 1
  },
  {
    _id: '2',
    ingredients: ['3', '4'],
    status: 'pending',
    name: 'Заказ 2',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 2
  }
];

describe('feedSlice', () => {
  it('должен обрабатывать начальное состояние', () => {
    const state = feedReducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      loading: false,
      error: null
    });
  });

  it('должен устанавливать loading при загрузке ленты', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedReducer(undefined, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять данные ленты при успешной загрузке', () => {
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: {
        orders: mockOrders,
        total: 100,
        totalToday: 10
      }
    };
    const state = feedReducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
    expect(state.error).toBeNull();
  });

  it('должен сохранять ошибку при неудачной загрузке ленты', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      payload: 'Ошибка загрузки ленты'
    };
    const state = feedReducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ленты');
    expect(state.orders).toEqual([]);
  });
});
