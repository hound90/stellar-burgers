import { TIngredient } from '@utils-types';
import { Location } from 'react-router-dom';

export type TBurgerIngredientProps = {
  ingredient: TIngredient;
  count: number;
  locationState: { background: Location };
};
