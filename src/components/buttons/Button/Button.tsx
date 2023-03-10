import { ReactElement, ButtonHTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

export type ButtonProps = {
  disableFocus?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  className,
  children,
  disableFocus,
  ...otherProps
}: PropsWithChildren<ButtonProps>): ReactElement {
  return (
    <button
      className={classNames(styles.button, className)}
      tabIndex={disableFocus ? -1 : undefined}
      {...(otherProps as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

export default Button;
