import { useEffect, useState } from 'react';

export const useViewport = () => {
  const [state, setState] = useState({
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth
  });

  useEffect(() => {
    const listener = () => {
      setState({
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth
      });
    };

    document.addEventListener('resize', listener);

    return () => document.removeEventListener('resize', listener);
  }, []);

  return state;
};
