import { OrderStatusUI } from '@ui';

import type { OrderStatusProps } from './type';

const statusText: { [key: string]: string } = {
  pending: 'Готовится',
  done: 'Выполнен',
  created: 'Создан',
};

export const OrderStatus = ({
  status
}: OrderStatusProps): React.JSX.Element => {
  let textStyle = '';

  switch (status) {
    case 'pending':
      textStyle = '#E52B1A';
      break;

    case 'done':
      textStyle = '#00CCCC';
      break;

    case 'created':
      textStyle = '#F2F2F3';
      break;
  }

  return (
    <OrderStatusUI
      textStyle={textStyle}
      text={statusText[status]}
    />
  );
};