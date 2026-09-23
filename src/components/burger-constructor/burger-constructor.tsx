import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { BurgerConstructorUI } from '@ui';

import type { TConstructorIngredient } from '@utils-types';

import { useDispatch, useSelector } from '../../services/store';

import {
  createOrder,
  clearOrder
} from '../../services/slices/orderSlice';

import {
  clearConstructor
} from '../../services/slices/constructorSlice';

import {
  getFeed,
  getProfileOrders
} from '../../services/slices/feedSlice';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bun = useSelector(
    (state) => state.burgerConstructor.bun
  );

  const ingredients = useSelector(
    (state) => state.burgerConstructor.ingredients
  );

  const orderRequest = useSelector(
    (state) => state.order.orderRequest
  );

  const orderModalData = useSelector(
    (state) => state.order.orderModalData
  );

  const isAuthenticated = useSelector(
    (state) => state.auth.user !== null
  );

  const constructorItems = {
    bun,
    ingredients
  };

  const onOrderClick = (): void => {
    if (!constructorItems.bun || orderRequest) {
      return;
    }

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (item) => item._id
      ),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientIds)).then((action) => {
      if (createOrder.fulfilled.match(action)) {
        dispatch(clearConstructor());

        dispatch(getFeed());
        dispatch(getProfileOrders());
      }
    });
  };

  const closeOrderModal = (): void => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (
          sum: number,
          ingredient: TConstructorIngredient
        ) => sum + ingredient.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};