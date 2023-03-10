import {
  Dispatch,
  SetStateAction,
  useCallback,
  type ReactElement,
} from 'react';
import IconButton from '../../buttons/IconButton/IconButton';
import { ReactComponent as ArrowLeftIcon } from '../../../assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from '../../../assets/icons/arrow-right.svg';
import classNames from 'classnames';
import styles from './Paginator.module.scss';
import translations from '../../../translations/en.json';

type PaginatorProps = {
  className: string;
  currentIndex: number;
  length: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
};

function Paginator({
  className,
  currentIndex,
  length,
  setCurrentIndex,
}: PaginatorProps): ReactElement {
  const { previous, next } = translations.allOrders.cta;

  const onIncrement = useCallback(() => {
    setCurrentIndex((state) => Math.min(state + 1, length - 1));
  }, [setCurrentIndex, length]);

  const onDecrement = useCallback(() => {
    setCurrentIndex((state) => Math.max(state - 1, 0));
  }, [setCurrentIndex]);

  return (
    <div className={classNames('copy-02', styles.element, className)}>
      <IconButton
        className={styles.arrowButton}
        icon={ArrowLeftIcon}
        aria-label={previous.label}
        onClick={onDecrement}
        disabled={currentIndex === 0}
      />

      <div className={styles.dotsWrapper}>
        <span
          className={classNames(
            styles.dotsElement,
            currentIndex !== 0 && styles.isNotActive
          )}
        >
          1
        </span>
        <span
          className={classNames(
            styles.dotsElement,
            (currentIndex < 2 || length < 4) && styles.isHidden
          )}
        >
          ...
        </span>
        <span
          className={classNames(
            styles.dotsElement,
            (currentIndex === 0 || currentIndex === length - 1) &&
              styles.isNotActive,
            (currentIndex === 0 || currentIndex > length - 2) &&
              length !== 3 &&
              styles.isHidden
          )}
        >
          {Math.max(Math.min(length - 1, currentIndex + 1), 2)}
        </span>
        <span
          className={classNames(
            styles.dotsElement,
            (currentIndex > length - 3 || length < 4) && styles.isHidden
          )}
        >
          ...
        </span>
        <span
          className={classNames(
            styles.dotsElement,
            currentIndex !== length - 1 && styles.isNotActive,
            length === 1 && styles.isHidden
          )}
        >
          {length}
        </span>
      </div>

      <IconButton
        className={styles.arrowButton}
        icon={ArrowRightIcon}
        aria-label={next.label}
        onClick={onIncrement}
        disabled={currentIndex === length - 1}
      />
    </div>
  );
}

export default Paginator;
