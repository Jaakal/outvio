import classNames from 'classnames';
import { type ReactElement, type PropsWithChildren } from 'react';
import Button, { type ButtonProps } from '../Button/Button';
import styles from './PrimaryButton.module.scss';

type PrimaryButtonProps = {} & ButtonProps;

function PrimaryButton({
  children,
  className,
  ...otherProps
}: PropsWithChildren<PrimaryButtonProps>): ReactElement {
  return (
    <Button
      className={classNames('copy-04', styles.element, className)}
      {...otherProps}
    >
      {children}
    </Button>
  );
}

export default PrimaryButton;
