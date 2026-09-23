import { useEffect, useState } from 'react';

import { FeedUI } from '@ui-pages';
import { Preloader } from '@ui';

import { useDispatch, useSelector } from '../../services/store';
import { getFeed } from '../../services/slices/feedSlice';


export const Feed = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const orders = useSelector(
    (state) => state.feed.orders
  );

  const [isInitialLoading, setIsInitialLoading] =
    useState(true);

  useEffect(() => {
    dispatch(getFeed()).finally(() => {
      setIsInitialLoading(false);
    });
  }, [dispatch]);

  const handleGetFeeds = (): void => {
    dispatch(getFeed());
  };

  if (isInitialLoading || !orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={handleGetFeeds}
    />
  );
};