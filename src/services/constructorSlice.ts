import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface ConstructorState {
  selectedBun: TIngredient | null;
  selectedIngredients: TIngredient[];
}

const initialState: ConstructorState = {
  selectedBun: null,
  selectedIngredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.selectedBun = action.payload;
      } else {
        state.selectedIngredients.push(action.payload);
      }
    },

    removeIngredient: (state, action: PayloadAction<number>) => {
      state.selectedIngredients.splice(action.payload, 1);
    },

    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const temp = state.selectedIngredients[index];
        state.selectedIngredients[index] = state.selectedIngredients[index - 1];
        state.selectedIngredients[index - 1] = temp;
      }
    },

    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.selectedIngredients.length - 1) {
        const temp = state.selectedIngredients[index];
        state.selectedIngredients[index] = state.selectedIngredients[index + 1];
        state.selectedIngredients[index + 1] = temp;
      }
    },

    clearConstructor: (state) => {
      state.selectedBun = null;
      state.selectedIngredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = constructorSlice.actions;
export default constructorSlice.reducer;
