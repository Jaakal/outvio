import { useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import {
  setIsAddNewOrderModalVisible,
  setSortFilter,
  setSearchFilter,
} from '../../../../store/features/appSlice';
import { useAppSelector, useAppDispatch } from '../../../../hooks/store';
import { addOrder } from '../../../../store/features/orderSlice';
import { parseOrderJson } from '../../../../hooks/useOrders';
import { type EventTarget } from './AddNewOrderModal.types';
import useFocusTrap from '../../../../hooks/useFocusTrap';

export const useModalFocusTrap = (element: HTMLDivElement | null): void => {
  const { isAddNewOrderModalVisible } = useAppSelector((state) => state.app);
  const { activate, deactivate } = useFocusTrap([element]);

  useUpdateEffect(() => {
    if (isAddNewOrderModalVisible) {
      activate();
    } else {
      deactivate();
    }
  }, [isAddNewOrderModalVisible]);
};

export const useOnModalClose = (): (() => void) => {
  const dispatch = useAppDispatch();

  return useCallback(() => {
    dispatch(setIsAddNewOrderModalVisible(false));
  }, [dispatch]);
};

export const useOnFormSubmit = (): ((
  event: React.FormEvent<HTMLFormElement> & EventTarget
) => void) => {
  const dispatch = useAppDispatch();

  return useCallback(
    (event: React.FormEvent<HTMLFormElement> & EventTarget) => {
      event.preventDefault();

      const { id, date, total, quantity, status } = event.target;

      const newOrder = {
        id: id.value,
        date: date.value,
        total: total.value,
        quantity: quantity.value,
        status: status.value,
        currency: 'EUR',
      };

      dispatch(addOrder(parseOrderJson(newOrder)));
      dispatch(setIsAddNewOrderModalVisible(false));
      dispatch(setSortFilter(null));
      dispatch(setSearchFilter(null));
    },
    [dispatch]
  );
};
