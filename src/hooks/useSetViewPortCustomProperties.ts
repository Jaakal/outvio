import { useEvent, useMount } from 'react-use';
import { useCallback } from 'react';
import { debounce } from 'lodash-es';

export function useSetViewportCustomProperties(): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(
    debounce(() => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      );
    }, 200),
    []
  );

  useEvent('resize', callback);

  useMount(() => {
    callback();
  });
}
