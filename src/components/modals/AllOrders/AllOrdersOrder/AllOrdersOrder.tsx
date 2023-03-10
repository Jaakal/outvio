import { ReactElement } from 'react';
import { type Order } from '../AllOrdersTable/AllOrdersTable.types';
import classNames from 'classnames';
import styles from './AllOrdersOrder.module.scss';

type AllOrdersOrderProps = {
  className?: string;
} & Order;

function AllOrdersOrder({
  className,
  id,
  quantity,
  status,
  formattedDate,
  formattedTotal,
}: AllOrdersOrderProps): ReactElement {
  return (
    <tr className={classNames('copy-03', className)}>
      <td>{id}</td>
      <td>{formattedDate}</td>
      <td>{formattedTotal}</td>
      <td>{quantity}</td>
      <td>
        <span className={styles.statusBackground}>{status}</span>
      </td>
    </tr>
  );
}

export default AllOrdersOrder;
