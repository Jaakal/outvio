import { type ReactElement, useState, useRef } from 'react';
import AllOrdersOrder from '../AllOrdersOrder/AllOrdersOrder';
import Paginator from '../../../general/Paginator/Paginator';
import translation from '../../../../translations/en.json';
import styles from './AllOrdersTable.module.scss';
import AllOrdersSortOrdersControl from '../AllOrdersSortControl/AllOrdersSortControl';
import classNames from 'classnames';
import { CurrentSortKey } from '../../../../store/features/appSlice';
import { useFilteredOrders, useUpdateCurrentTab } from './AllOrdersTable.hooks';

type AllOrdersTableProps = {
  className: string;
};

function AllOrdersTable({ className }: AllOrdersTableProps): ReactElement {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const pageLength = useRef<number>(10);
  const { tableHeadings } = translation.allOrders;

  const filteredOrders = useFilteredOrders();
  useUpdateCurrentTab(setCurrentTab);

  return (
    <div className={classNames(styles.element, className)}>
      <div className={styles.scrollContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {Object.entries(tableHeadings).map(([key, value]) => {
                return (
                  <AllOrdersSortOrdersControl
                    label={value}
                    sortKey={key as keyof CurrentSortKey}
                    key={`all-orders-table-${key}`}
                  />
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filteredOrders
              .slice(
                pageLength.current * currentTab,
                pageLength.current * currentTab + pageLength.current
              )
              .map((order) => (
                <AllOrdersOrder
                  className={styles.order}
                  {...order}
                  key={`all-orders-order-${order.id}`}
                />
              ))}
          </tbody>
        </table>
      </div>

      <Paginator
        className={styles.paginator}
        currentIndex={currentTab}
        setCurrentIndex={setCurrentTab}
        length={Math.ceil(filteredOrders.length / 10)}
      />
    </div>
  );
}

export default AllOrdersTable;
