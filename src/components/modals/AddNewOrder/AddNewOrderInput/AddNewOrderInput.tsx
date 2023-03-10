import {
  useState,
  useCallback,
  InputHTMLAttributes,
  ReactElement,
} from 'react';
import Input from '../../../form/Input/Input';
import styles from './AddNewOrderInput.module.scss';
import classNames from 'classnames';

type AddNewOrderInputProps = {
  label: string;
  className: string;
} & InputHTMLAttributes<HTMLInputElement>;

function AddNewOrderInput({
  label,
  name,
  className,
  type = 'text',
  ...otherProps
}: AddNewOrderInputProps): ReactElement {
  const [value, setValue] = useState<string>('');

  const onChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  }, []);

  return (
    <div className={classNames(styles.element, className)}>
      <label className='copy-03' htmlFor={name}>
        {label}
      </label>
      <Input
        className={styles.input}
        name={name}
        type={type}
        placeholder={label}
        value={value}
        onChange={onChange}
        {...otherProps}
      />
    </div>
  );
}

export default AddNewOrderInput;
