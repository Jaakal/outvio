import { ReactElement } from 'react';
import AllOrdersHeader from '../AllOrdersHeader/AllOrdersHeader';
import AllOrdersTable from '../AllOrdersTable/AllOrdersTable';
import styles from './AllOrdersModal.module.scss';

function AllOrdersModal(): ReactElement {
  return (
    <div className={styles.element}>
      <AllOrdersHeader />
      <AllOrdersTable className={styles.allOrdersTable} />
    </div>
  );
}

export default AllOrdersModal;
