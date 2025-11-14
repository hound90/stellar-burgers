import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from '../constructorSlice';
import { TIngredient } from '@utils-types';

const mockBun: TIngredient = {
  _id: '1',
  name: 'Булочка',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 40,
  calories: 250,
  price: 100,
  image: 'bun-image.jpg',
  image_mobile: 'bun-image-mobile.jpg',
  image_large: 'bun-image-large.jpg'
};

const mockIngredient1: TIngredient = {
  _id: '2',
  name: 'Котлета',
  type: 'main',
  proteins: 20,
  fat: 15,
  carbohydrates: 0,
  calories: 300,
  price: 200,
  image: 'cutlet-image.jpg',
  image_mobile: 'cutlet-image-mobile.jpg',
  image_large: 'cutlet-image-large.jpg'
};

const mockIngredient2: TIngredient = {
  _id: '3',
  name: 'Сыр',
  type: 'main',
  proteins: 25,
  fat: 30,
  carbohydrates: 0,
  calories: 400,
  price: 150,
  image: 'cheese-image.jpg',
  image_mobile: 'cheese-image-mobile.jpg',
  image_large: 'cheese-image-large.jpg'
};

describe('constructorSlice', () => {
  it('должен обрабатывать начальное состояние', () => {
    const state = constructorReducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      selectedBun: null,
      selectedIngredients: []
    });
  });

  it('должен добавлять булку', () => {
    const state = constructorReducer(undefined, addIngredient(mockBun));

    expect(state.selectedBun).toEqual(mockBun);
    expect(state.selectedIngredients).toEqual([]);
  });

  it('должен добавлять ингредиент в начинку', () => {
    const state = constructorReducer(undefined, addIngredient(mockIngredient1));

    expect(state.selectedBun).toBeNull();
    expect(state.selectedIngredients).toHaveLength(1);
    expect(state.selectedIngredients[0]).toEqual(mockIngredient1);
  });

  it('должен удалять ингредиент из начинки', () => {
    const initialState = {
      selectedBun: null,
      selectedIngredients: [mockIngredient1, mockIngredient2]
    };

    const state = constructorReducer(initialState, removeIngredient(0));

    expect(state.selectedIngredients).toHaveLength(1);
    expect(state.selectedIngredients[0]).toEqual(mockIngredient2);
  });

  it('должен перемещать ингредиент вверх', () => {
    const initialState = {
      selectedBun: null,
      selectedIngredients: [mockIngredient1, mockIngredient2]
    };

    const state = constructorReducer(initialState, moveIngredientUp(1));

    expect(state.selectedIngredients[0]).toEqual(mockIngredient2);
    expect(state.selectedIngredients[1]).toEqual(mockIngredient1);
  });

  it('должен перемещать ингредиент вниз', () => {
    const initialState = {
      selectedBun: null,
      selectedIngredients: [mockIngredient1, mockIngredient2]
    };

    const state = constructorReducer(initialState, moveIngredientDown(0));

    expect(state.selectedIngredients[0]).toEqual(mockIngredient2);
    expect(state.selectedIngredients[1]).toEqual(mockIngredient1);
  });

  it('должен очищать конструктор', () => {
    const initialState = {
      selectedBun: mockBun,
      selectedIngredients: [mockIngredient1, mockIngredient2]
    };

    const state = constructorReducer(initialState, clearConstructor());

    expect(state.selectedBun).toBeNull();
    expect(state.selectedIngredients).toHaveLength(0);
  });
});
