import { useEffect, useRef } from 'react';

export function useHandleOutsideClick(callback) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener('click', handleClickOutside);

    return function cleanup() {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [callback]);

  return ref;
}


