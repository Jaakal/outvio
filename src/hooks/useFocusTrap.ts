import * as focusTrap from 'focus-trap';
import { useCallback, useRef } from 'react';
import { useUnmount } from 'react-use';

type UseFocusTrap = {
  activate(): void;
  deactivate(): void;
};

const useFocusTrap = (elements: Array<HTMLElement | null>): UseFocusTrap => {
  const trapRef = useRef<focusTrap.FocusTrap | null>(null);

  const activate = useCallback(() => {
    if (!trapRef.current) {
      trapRef.current = focusTrap.createFocusTrap(
        elements as Array<HTMLDivElement>
      );
    }

    trapRef.current.activate();
  }, [elements]);

  const deactivate = useCallback(() => {
    trapRef.current?.deactivate();
  }, []);

  useUnmount(() => {
    deactivate();
  });

  return {
    activate,
    deactivate,
  };
};

export default useFocusTrap;
