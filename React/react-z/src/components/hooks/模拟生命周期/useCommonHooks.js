
import { useState, useEffect, useRef } from 'react';

function useCommonHooks() {
  const [isMounted, setIsMounted] = useState(false);
  const mounting = useRef(true);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
    return () => setIsMounted(false);
  }, []);

  const useMount = fn => useEffect(() => void fn(), []);

  const useUnmount = fn => useEffect(() => fn, []);

  const useUpdate = fn =>
    useEffect(() => {
      if (mounting.current) {
        mounting.current = false;
      } else {
        fn();
      }
    });

  const useForceUpdate = () => useState(0)[1];

  return {
    isMounted,
    useMount,
    useUnmount,
    useUpdate,
    useForceUpdate,
  };
}

export default useCommonHooks;
