import { ReactElement, useState } from 'react';
import translation from '../../../../translations/en.json';
import Input from '../../../form/Input/Input';
import IconButton from '../../../buttons/IconButton/IconButton';
import { ReactComponent as SpyGlass } from '../../../../assets/icons/spy-glass.svg';
import { useOnSearchChange, useOnSubmit } from './AllOrdersSearch.hooks';
import styles from './AllOrdersSearch.module.scss';

function AllOrdersSearch(): ReactElement {
  const [searchValue, setSearchValue] = useState<string>('');
  const { label } = translation.allOrders.form.submit;

  const onChange = useOnSearchChange(setSearchValue);
  const onSubmit = useOnSubmit();

  return (
    <form className={styles.element} onSubmit={onSubmit}>
      <Input
        className={styles.searchInput}
        type='text'
        name='search'
        pattern='[0-9]+|New|In transit|Delivered|(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).(?:20)[0-9]{2}'
        aria-label={label}
        placeholder={label}
        value={searchValue}
        onChange={onChange}
      />
      <IconButton
        className={styles.searchButton}
        type='submit'
        aria-label={label}
        icon={SpyGlass}
      />
    </form>
  );
}

export default AllOrdersSearch;
