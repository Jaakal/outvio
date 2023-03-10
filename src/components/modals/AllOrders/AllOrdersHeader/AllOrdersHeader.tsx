import { ReactElement, useCallback } from 'react';
import AllOrdersSearch from '../AllOrdersSearch/AllOrdersSearch';
import styles from './AllOrdersHeader.module.scss';
import translation from '../../../../translations/en.json';
import IconButton from '../../../buttons/IconButton/IconButton';
import { useAppDispatch } from '../../../../hooks/store';
import { setIsAddNewOrderModalVisible } from '../../../../store/features/appSlice';
import { ReactComponent as Plus } from '../../../../assets/icons/plus.svg';
import classNames from 'classnames';

function AllOrdersHeader(): ReactElement {
  const dispatch = useAppDispatch();
  const {
    mainHeading,
    cta: {
      addNewOrder: { label },
    },
  } = translation.allOrders;

  const onAddNewOrder = useCallback(() => {
    dispatch(setIsAddNewOrderModalVisible(true));
  }, [dispatch]);

  return (
    <div className={styles.element}>
      <h2 className={classNames('heading-01', styles.mainHeading)}>
        {mainHeading}
      </h2>
      <div className={styles.spacer} />
      <AllOrdersSearch />
      <IconButton
        className={styles.addNewOrderButton}
        icon={Plus}
        aria-label={label}
        onClick={onAddNewOrder}
      />
    </div>
  );
}

export default AllOrdersHeader;
