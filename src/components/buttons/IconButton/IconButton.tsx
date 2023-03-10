import { type FC, type ReactElement } from 'react';
import Button, { type ButtonProps } from '../Button/Button';
import classNames from 'classnames';
import styles from './IconButton.module.scss';

type IconButtonProps = {
  icon: FC;
} & ButtonProps;

function IconButton({
  icon: Icon,
  className,
  ...otherProps
}: IconButtonProps): ReactElement {
  return (
    <Button className={classNames(styles.element, className)} {...otherProps}>
      <Icon />
    </Button>
  );
}

export default IconButton;
