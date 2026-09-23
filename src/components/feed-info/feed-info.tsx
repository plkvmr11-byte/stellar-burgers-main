import { FeedInfoUI } from '@ui';

import type {
  TFeedState,
  TOrder
} from '@utils-types';

import { useSelector } from '../../services/store';

import {
  selectFeedError,
  selectFeedLoading,
  selectFeedOrders,
  selectFeedTotal,
  selectFeedTotalToday
} from '../../services/selectors/feedSelectors';

const getOrders = (
  orders: TOrder[],
  status: string
): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo = (): React.JSX.Element => {
  const orders = useSelector(selectFeedOrders);
  const total = useSelector(selectFeedTotal);
  const totalToday = useSelector(selectFeedTotalToday);
  const isLoading = useSelector(selectFeedLoading);
  const error = useSelector(selectFeedError);

  const feed: TFeedState = {
    orders,
    total,
    totalToday,
    isLoading,
    error
  };

  const readyOrders = getOrders(
    orders,
    'done'
  );

  const pendingOrders = getOrders(
    orders,
    'pending'
  );

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};