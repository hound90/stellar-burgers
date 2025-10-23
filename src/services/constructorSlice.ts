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
      // УБЕДИСЬ что action.payload - простой объект
      if (action.payload.type === 'bun') {
        state.selectedBun = action.payload;
      } else {
        state.selectedIngredients.push(action.payload);
      }
    },

    removeIngredient: (state, action: PayloadAction<number>) => {
      state.selectedIngredients.splice(action.payload, 1);
    },

    clearConstructor: (state) => {
      state.selectedBun = null;
      state.selectedIngredients = [];
    }
  }
});

export const { addIngredient, removeIngredient, clearConstructor } =
  constructorSlice.actions;
export default constructorSlice.reducer;
