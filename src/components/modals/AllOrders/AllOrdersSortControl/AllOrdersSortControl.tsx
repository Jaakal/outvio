import { type ReactElement, useCallback } from 'react';
import classNames from 'classnames';
import SortOrdersButton from '../../../buttons/SortOrdersButton/SortOrdersButton';
import styles from './AllOrdersSortControl.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/store';
import {
  setSortFilter,
  CurrentSortKey,
} from '../../../../store/features/appSlice';
import { useDeviceStateTracker } from '../../../../hooks/useDeviceStateTracker';
import variables from '../../../../data/shared-variables/shared-variables.internal.json';
import { DeviceStateType } from '../../../../hooks/useDeviceStateTracker';
import translations from '../../../../translations/en.json';

const { deviceState: DeviceState } = variables as {
  deviceState: DeviceStateType;
};

type AllOrdersSortOrdersControlType = {
  label: string;
  sortKey: keyof CurrentSortKey;
};

function AllOrdersSortOrdersControl({
  label,
  sortKey,
}: AllOrdersSortOrdersControlType): ReactElement {
  const dispatch = useAppDispatch();
  const sortFilter = useAppSelector((state) => state.app.sortFilter);
  const deviceState = useDeviceStateTracker();
  const { sortOrders } = translations.allOrders.cta;

  const onSortOrders = useCallback(() => {
    const _sortFilter = {
      currentSortKey: sortKey,
      isAscending:
        !sortFilter || sortFilter.currentSortKey !== sortKey
          ? true
          : !sortFilter.isAscending,
    };

    dispatch(setSortFilter(_sortFilter));
  }, [dispatch, sortKey, sortFilter]);

  return (
    <th>
      <div className={styles.contentWrapper}>
        <span className={classNames('copy-02', styles.label)}>
          {deviceState < DeviceState.SMALL
            ? label.replace('Order ', '')
            : label}
        </span>
        <SortOrdersButton
          sortKey={sortKey}
          aria-label={`${sortOrders.label} ${label}`}
          sortFilter={sortFilter}
          onClick={onSortOrders}
        />
      </div>
    </th>
  );
}

export default AllOrdersSortOrdersControl;
