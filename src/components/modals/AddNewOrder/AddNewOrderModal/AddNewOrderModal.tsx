import { type ReactElement, useRef } from 'react';
import classNames from 'classnames';
import AddNewOrderInput from '../AddNewOrderInput/AddNewOrderInput';
import PrimaryButton from '../../../buttons/PrimaryButton/PrimaryButton';
import IconButton from '../../../buttons/IconButton/IconButton';
import AddNewOrderSelectBox from '../AddNewOrderSelectBox/AddNewOrderSelectBox';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/close.svg';
import translation from '../../../../translations/en.json';
import { InputType } from '../../../../data/enums/InputType';
import { useAppSelector } from '../../../../hooks/store';
import {
  useModalFocusTrap,
  useOnModalClose,
  useOnFormSubmit,
} from './AddNewOrderModal.hooks';
import {
  type InputAttributeType,
  type InputTypes,
  type InputMinimalValueType,
  type InputPatternsType,
} from './AddNewOrderModal.types';
import styles from './AddNewOrderModal.module.scss';

const inputTypes: InputTypes = {
  id: InputType.Number,
  date: InputType.Text,
  total: InputType.Number,
  quantity: InputType.Number,
};

const inputMinimalValues: InputMinimalValueType = {
  id: 0,
  total: 0,
  quantity: 0,
};

const inputPatterns: InputPatternsType = {
  date: '(?:20)[0-9]{2}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3]):(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]):(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]).[0-9]{3}Z',
};

function AddNewOrderModal(): ReactElement {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const { isAddNewOrderModalVisible } = useAppSelector((state) => state.app);
  const {
    mainHeading,
    form: { inputs, submit },
    cta: { close },
  } = translation.addNewOrder;

  const onModalClose = useOnModalClose();
  const onFormSubmit = useOnFormSubmit();
  useModalFocusTrap(elementRef.current);

  return (
    <div
      className={classNames(
        styles.element,
        isAddNewOrderModalVisible && styles.isVisible
      )}
      ref={elementRef}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={'heading-01'}>{mainHeading}</h2>
          <IconButton
            className={styles.closeButton}
            icon={CloseIcon}
            aria-label={close.label}
            onClick={onModalClose}
          />
        </div>

        <form
          className={classNames(styles.addNewOrderForm)}
          onSubmit={onFormSubmit}
        >
          {Object.entries(inputs).map(([key, value]) => {
            return (
              <AddNewOrderInput
                className={styles.addNewOrderInput}
                label={value}
                name={key}
                type={inputTypes[key as keyof InputAttributeType]}
                min={inputMinimalValues[key as keyof InputAttributeType]}
                pattern={inputPatterns[key as keyof InputAttributeType]}
                key={`add-new-order-input-${key}`}
                required
              />
            );
          })}

          <AddNewOrderSelectBox className={styles.statusSelectBox} />

          <PrimaryButton
            className={styles.submitButton}
            aria-label={submit.label}
            type='submit'
          >
            {submit.label}
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}

export default AddNewOrderModal;
