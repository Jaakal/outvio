import classNames from 'classnames';
import { type ReactElement } from 'react';
import Button, { type ButtonProps } from '../Button/Button';
import styles from './SortOrdersButton.module.scss';
import { ReactComponent as ArrowDownIcon } from '../../../assets/icons/arrow-down.svg';
import { ReactComponent as ArrowUpIcon } from '../../../assets/icons/arrow-up.svg';
import { CurrentSortKey, SortFilter } from '../../../store/features/appSlice';

type SortOrdersButtonProps = {
  sortKey: keyof CurrentSortKey;
  sortFilter: SortFilter | null;
} & ButtonProps;

function SortOrdersButton({
  className,
  children,
  sortKey,
  sortFilter,
  ...otherProps
}: SortOrdersButtonProps): ReactElement {
  return (
    <Button className={classNames(styles.element, className)} {...otherProps}>
      <div className={styles.arrowIconsWrapper}>
        <div
          className={classNames(
            styles.arrowIconWrapper,
            sortFilter?.currentSortKey === sortKey &&
              sortFilter.isAscending &&
              styles.isHidden
          )}
        >
          <ArrowUpIcon />
        </div>
        <div
          className={classNames(
            styles.arrowIconWrapper,
            sortFilter?.currentSortKey === sortKey &&
              !sortFilter.isAscending &&
              styles.isHidden
          )}
        >
          <ArrowDownIcon />
        </div>
      </div>
    </Button>
  );
}

export default SortOrdersButton;
