import { ReactElement } from 'react';
import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

export type InputProps = {
  className: string;
} & InputHTMLAttributes<HTMLInputElement>;

function Input({ className, ...otherProps }: InputProps): ReactElement {
  return (
    <input
      className={classNames('copy-03', styles.element, className)}
      {...otherProps}
    />
  );
}

export default Input;
