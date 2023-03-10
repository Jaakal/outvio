import { useLayoutEffect, useRef } from 'react';
import { type Order } from '../components/modals/AllOrders/AllOrdersTable/AllOrdersTable.types';
import { Currency } from '../data/enums/Currency';
import { OrderStatus } from '../data/enums/OrderStatus';
import { useAppDispatch } from './store';
import ordersData from '../data/orders.json';
import { addOrders } from '../store/features/orderSlice';
import { currencySign } from '../data/currency-sign/CurrencySign.data';

type OrderData = { [key in keyof Order]: string };

export const parseOrderJson = (
  order: Omit<OrderData, 'formattedDate' | 'formattedTotal'>
): Order => {
  const formattedDateValues = order.date.split(' ')[0].split('-');
  const formattedDate = formattedDateValues.reverse().join('.');
  const total = +order.total;

  return {
    id: +order.id,
    total,
    currency: order.currency as Currency,
    quantity: +order.quantity,
    status: order.status as OrderStatus,
    date: order.date,
    formattedDate,
    formattedTotal: `${currencySign[order.currency as Currency]}${total}`,
  };
};

export const useOrders = (): void => {
  const isParsed = useRef<boolean>(false);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!isParsed.current && dispatch) {
      isParsed.current = true;

      const parsedOrders = ordersData.map((orderData) =>
        parseOrderJson(orderData)
      );

      dispatch(addOrders(parsedOrders));
    }
  }, [dispatch]);
};
