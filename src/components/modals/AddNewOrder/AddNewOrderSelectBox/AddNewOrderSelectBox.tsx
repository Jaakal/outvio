import { ReactElement } from 'react';
import SelectBox from '../../../form/select-box/SelectBox';
import styles from './AddNewOrderSelectBox.module.scss';
import translation from '../../../../translations/en.json';
import { OrderStatus } from '../../../../data/enums/OrderStatus';
import classNames from 'classnames';

type AddNewOrderSelectBoxProps = {
  className: string;
};

function AddNewOrderSelectBox({
  className,
}: AddNewOrderSelectBoxProps): ReactElement {
  const {
    form: { selectBox },
  } = translation.addNewOrder;

  return (
    <div className={classNames(styles.element, className)}>
      <label className='copy-03' htmlFor={'status'}>
        {selectBox.status}
      </label>
      <SelectBox
        className={styles.selectBox}
        name={'status'}
        label={selectBox.status}
        options={OrderStatus}
      />
    </div>
  );
}

export default AddNewOrderSelectBox;
