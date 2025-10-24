import { FC, useEffect, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { clearConstructor } from '../../services/constructorSlice';
import { clearOrder, createOrder } from '../../services/orderSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedBun, selectedIngredients } = useAppSelector(
    (state) => state.burgerConstructor
  );
  const { currentOrder, orderRequest } = useAppSelector((state) => state.order);
  const { user } = useAppSelector((state) => state.user);

  const constructorItems = {
    bun: selectedBun,
    ingredients: selectedIngredients || []
  };

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!selectedBun || orderRequest) return;

    const ingredientsToUse = selectedIngredients || [];
    const orderData = [
      selectedBun._id,
      ...ingredientsToUse.map((item: TIngredient) => item._id),
      selectedBun._id
    ];

    dispatch(createOrder(orderData));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
  };

  useEffect(() => {
    if (currentOrder) {
      dispatch(clearConstructor());
    }
  }, [currentOrder, dispatch]);

  const price = useMemo(() => {
    const bunPrice = selectedBun ? selectedBun.price * 2 : 0;
    const ingredientsToCalculate = selectedIngredients || [];
    const ingredientsPrice = ingredientsToCalculate.reduce(
      (total: number, item: TIngredient) => total + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [selectedBun, selectedIngredients]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={currentOrder}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
