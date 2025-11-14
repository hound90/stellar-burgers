import ingredientsReducer, { fetchIngredients } from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булочка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 40,
    calories: 250,
    price: 100,
    image: 'bun.jpg',
    image_mobile: 'bun-mobile.jpg',
    image_large: 'bun-large.jpg'
  },
  {
    _id: '2',
    name: 'Котлета',
    type: 'main',
    proteins: 20,
    fat: 15,
    carbohydrates: 0,
    calories: 300,
    price: 200,
    image: 'cutlet.jpg',
    image_mobile: 'cutlet-mobile.jpg',
    image_large: 'cutlet-large.jpg'
  }
];

describe('ingredientsSlice', () => {
  it('должен обрабатывать начальное состояние', () => {
    const state = ingredientsReducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      items: [],
      loading: false,
      error: null
    });
  });

  it('должен устанавливать loading при начале загрузки', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(undefined, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять ингредиенты при успешной загрузке', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  it('должен сохранять ошибку при неудачной загрузке', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const state = ingredientsReducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
    expect(state.items).toEqual([]);
  });
});
