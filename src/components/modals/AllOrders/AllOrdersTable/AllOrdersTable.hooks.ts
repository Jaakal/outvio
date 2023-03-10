import { useMemo } from 'react';
import { useUpdateEffect } from 'react-use';
import { useAppSelector } from '../../../../hooks/store';
import { type Order, type StatusWeights } from './AllOrdersTable.types';
import { OrderStatus } from '../../../../data/enums/OrderStatus';

const statusWeights: StatusWeights = {
  [OrderStatus.New]: 0,
  [OrderStatus.InTransit]: 1,
  [OrderStatus.Delivered]: 2,
};

export const useFilteredOrders = (): Array<Order> => {
  const orders = useAppSelector((state) => state.orders.value);
  const { searchFilter, sortFilter } = useAppSelector((state) => state.app);

  return useMemo((): Array<Order> => {
    let _orders = [...orders];

    if (searchFilter) {
      const { keys, value } = searchFilter;

      _orders = _orders.filter((order) => {
        for (const key of keys!) {
          if (order[key as keyof Order] === value) {
            return true;
          }
        }

        return false;
      });
    }

    if (!sortFilter) return _orders;

    const { currentSortKey, isAscending } = sortFilter;
    const comparatorMultiplierOne = isAscending ? 1 : -1;
    const comparatorMultiplierTwo = comparatorMultiplierOne * -1;

    if (['id', 'total', 'quantity'].includes(currentSortKey)) {
      return _orders.sort((orderOne: Order, orderTwo: Order) => {
        const comparatorValueOne =
          comparatorMultiplierOne * (orderOne[`${currentSortKey}`] as number);
        const comparatorValueTwo =
          comparatorMultiplierTwo * (orderTwo[`${currentSortKey}`] as number);
        return comparatorValueOne + comparatorValueTwo;
      });
    }

    if (currentSortKey === 'date') {
      return _orders.sort((orderOne: Order, orderTwo: Order) => {
        const comparatorValueOne =
          comparatorMultiplierOne *
          Date.parse(orderOne[`${currentSortKey}`] as string);
        const comparatorValueTwo =
          comparatorMultiplierTwo *
          Date.parse(orderTwo[`${currentSortKey}`] as string);
        return comparatorValueOne + comparatorValueTwo;
      });
    }

    return _orders.sort((orderOne: Order, orderTwo: Order) => {
      const comparatorValueOne =
        comparatorMultiplierOne *
        statusWeights[orderOne[`${currentSortKey}`] as OrderStatus];
      const comparatorValueTwo =
        comparatorMultiplierTwo *
        statusWeights[orderTwo[`${currentSortKey}`] as OrderStatus];
      return comparatorValueOne + comparatorValueTwo;
    });
  }, [sortFilter, orders, searchFilter]);
};

export const useUpdateCurrentTab = (
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
): void => {
  const orders = useAppSelector((state) => state.orders.value);
  const { searchFilter } = useAppSelector((state) => state.app);

  useUpdateEffect(() => {
    setCurrentPage(0);
  }, [searchFilter, orders]);
};
