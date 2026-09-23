import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { OrderInfoUI, Preloader } from '@ui';

import { useDispatch, useSelector } from '../../services/store';

import { selectIngredients } from '../../services/selectors/ingredientsSelectors';

import {
  selectCurrentOrder,
  selectFeedOrders,
  selectProfileOrders
} from '../../services/selectors/feedSelectors';

import {
  clearCurrentOrder,
  getOrderByNumber
} from '../../services/slices/feedSlice';

import type { TIngredient } from '@utils-types';

export const OrderInfo = (): React.JSX.Element => {
  const { number } = useParams();

  const dispatch = useDispatch();

  const ingredients = useSelector(selectIngredients);
  const feedOrders = useSelector(selectFeedOrders);
  const profileOrders = useSelector(selectProfileOrders);
  const currentOrder = useSelector(selectCurrentOrder);

  const orderNumber = Number(number);

  const orderFromLists =
    feedOrders.find((order) => order.number === orderNumber) ??
    profileOrders.find((order) => order.number === orderNumber);

  const orderData =
    orderFromLists ??
    (currentOrder?.number === orderNumber
      ? currentOrder
      : null);

  useEffect(() => {
    if (!Number.isNaN(orderNumber) && !orderData) {
      dispatch(getOrderByNumber(orderNumber));
    }
  }, [dispatch, orderNumber, orderData]);

  useEffect(
    () => () => {
      dispatch(clearCurrentOrder());
    },
    [dispatch]
  );

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) {
      return null;
    }

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = Record<
      string,
      TIngredient & { count: number }
    >;

    const ingredientsInfo = orderData.ingredients.reduce(
      (
        acc: TIngredientsWithCount,
        ingredientId: string
      ) => {
        if (acc[ingredientId]) {
          acc[ingredientId].count++;
          return acc;
        }

        const ingredient = ingredients.find(
          (item) => item._id === ingredientId
        );

        if (ingredient) {
          acc[ingredientId] = {
            ...ingredient,
            count: 1
          };
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (sum, ingredient) =>
        sum + ingredient.price * ingredient.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};