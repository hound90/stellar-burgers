import orderReducer, { createOrder, fetchOrderByNumber, clearOrder } from '../orderSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: '1',
  ingredients: ['1', '2', '3'],
  status: 'done',
  name: 'Space флюоресцентный бургер',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  number: 12345
};

describe('orderSlice', () => {
  it('должен обрабатывать начальное состояние', () => {
    const state = orderReducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      currentOrder: null,
      orderRequest: false,
      error: null
    });
  });

  it('должен устанавливать orderRequest при создании заказа', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(undefined, action);

    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять заказ при успешном создании', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: mockOrder
    };
    const state = orderReducer(undefined, action);

    expect(state.orderRequest).toBe(false);
    expect(state.currentOrder).toEqual(mockOrder);
    expect(state.error).toBeNull();
  });

  it('должен сохранять ошибку при неудачном создании заказа', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: 'Ошибка создания заказа' }
    };
    const state = orderReducer(undefined, action);

    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка создания заказа');
    expect(state.currentOrder).toBeNull();
  });

  it('должен очищать заказ', () => {
    const initialState = {
      currentOrder: mockOrder,
      orderRequest: false,
      error: null
    };

    const state = orderReducer(initialState, clearOrder());

    expect(state.currentOrder).toBeNull();
    expect(state.orderRequest).toBe(false);
  });

  it('должен обрабатывать загрузку заказа по номеру', () => {
    const pendingAction = { type: fetchOrderByNumber.pending.type };
    const statePending = orderReducer(undefined, pendingAction);
    expect(statePending.orderRequest).toBe(true);

    const fulfilledAction = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: mockOrder
    };
    const stateFulfilled = orderReducer(undefined, fulfilledAction);
    expect(stateFulfilled.currentOrder).toEqual(mockOrder);
    expect(stateFulfilled.orderRequest).toBe(false);
  });
});
