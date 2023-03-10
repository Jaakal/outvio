import { useCallback, useState, type ReactElement } from 'react';
import classNames from 'classnames';
import styles from './SelectBox.module.scss';

type Options = { [key in string]: string };

type SelectBoxProps = {
  className: string;
  label: string;
  name: string;
  options: Options;
  defaultValue?: string;
};

function SelectBox({
  className,
  name,
  options,
  defaultValue,
  label,
}: SelectBoxProps): ReactElement {
  const [value, setValue] = useState<string>(
    defaultValue ?? Object.values(options)[0]
  );

  const onChange = useCallback((event: React.FormEvent<HTMLSelectElement>) => {
    setValue(event.currentTarget.value);
  }, []);

  return (
    <div className={classNames('copy-03', className, styles.element)}>
      <select
        className={styles.selectBox}
        aria-label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        {Object.entries(options).map(([key, option]) => (
          <option value={option} key={`order-status-${key}`}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectBox;
