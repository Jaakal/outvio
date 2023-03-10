import { useCallback } from 'react';
import { useAppDispatch } from '../../../../hooks/store';
import { setSearchFilter } from '../../../../store/features/appSlice';
import { type SearchFilter } from '../../../../store/features/appSlice';

type EventTarget = { target: { search: { value: string } } };

export const useOnSearchChange = (
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
): ((event: React.FormEvent<HTMLInputElement>) => void) => {
  return useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      setSearchValue(event.currentTarget.value);
    },
    [setSearchValue]
  );
};

export const useOnSubmit = (): ((
  event: React.FormEvent<HTMLFormElement> & EventTarget
) => void) => {
  const dispatch = useAppDispatch();

  return useCallback(
    (event: React.FormEvent<HTMLFormElement> & EventTarget) => {
      event.preventDefault();

      const { value } = event.target.search;

      let newSearchFilter: SearchFilter | null = null;

      if (/^\d+$/.test(value)) {
        newSearchFilter = {
          keys: ['id', 'total', 'quantity'],
          value: +value,
        };
      } else if (value.indexOf('.') !== -1) {
        newSearchFilter = {
          keys: ['formattedDate'],
          value: value,
        };
      } else if (value.length > 0) {
        newSearchFilter = {
          keys: ['status'],
          value: value,
        };
      }

      dispatch(setSearchFilter(newSearchFilter));
    },
    [dispatch]
  );
};
