import { useCallback, useMemo, useRef, useState } from 'react';

const CONTROLS_HIDE_DELAY = 3000;

export const useTapShow = (delay: number = CONTROLS_HIDE_DELAY) => {
  const controlsTimerRef = useRef<number>();
  const controlsRef = useRef(null);
  const [showControls, setShowControls] = useState(false);

  const handleClick = useCallback(() => {
    window.clearTimeout(controlsTimerRef.current);

    if (!showControls) {
      controlsTimerRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, delay);
    }

    setShowControls(!showControls);
  }, [showControls]);

  const handleMouseOver = useCallback(() => {
    window.clearTimeout(controlsTimerRef.current);
  }, []);

  const handleMouseOut = useCallback(() => {
    controlsTimerRef.current = window.setTimeout(() => {
      setShowControls(false);
    }, delay);
  }, []);

  return useMemo(() => ({
    ref: controlsRef,
    show: showControls,
    handleClick,
    handleMouseOver,
    handleMouseOut,
  }), [
    controlsRef,
    showControls,
    handleClick,
    handleMouseOver,
    handleMouseOut
  ]);
};
