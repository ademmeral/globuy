import React, { createElement, useState, useEffect, useCallback } from 'react'
import LazyMedia from '@components/LazyMedia';
import Spinner from '@components/Spinner';
import { cachedSrc } from '@utils/async';
import { timer } from '@utils/sync';
import { STORY_PLAYER_EVENTS as EVENTS } from "@utils/xtarget";
import { useStoryContext } from '@contexts/StoryProvider';

function Image({ children, as = 'figure', idx, source, ...props }) {
  const [_src, setSrc] = useState(''),
    { currentIndex: curr, setCurrentIndex, sources, isActive } = useStoryContext(),
    { type, src, duration, fallback } = source,
    { start, stop, reset, end } = useCallback(timer((elapsedTotal) => {

      let _dur = (duration || 5) * 1000;
      const w = Math.min(100, (elapsedTotal / _dur) * 100);

      EVENTS.emit(`SET_WIDTH_${curr}`, w);

      if (elapsedTotal >= _dur )
        setCurrentIndex(Math.min(curr + 1, sources.length - 1));

    }, 100), [])

  useEffect(() => {
    EVENTS.emit(`SET_WIDTH_${curr}`, 0);
    cachedSrc(src)
      .then(setSrc)
      .catch(console.log)
    
    const handleTimeReset = () => { reset(); EVENTS.emit(`SET_WIDTH_${curr}`, 0); };
    const handleTimeEnd = () => { end(); EVENTS.emit(`SET_WIDTH_${curr}`, 100); };

      EVENTS.on(`SET_TIME_RESET_${curr}`, handleTimeReset);
      EVENTS.on(`SET_TIME_END_${curr}`, handleTimeEnd);
  
    return () => {
      reset();
      EVENTS.off(`SET_TIME_RESET_${curr}`, handleTimeReset);
      EVENTS.off(`SET_TIME_END_${curr}`, handleTimeEnd);
    }
  }, [])

  useEffect(() => {
    if (!_src) return;
    if (!isActive) return stop();
    start();
    return () => stop();
  }, [_src, isActive])

  if (!_src) return <Spinner style={{ width: '64px', height: '64px', borderWidth: '4px' }} />;
  return createElement(
    as,
    props,
    <LazyMedia
      as='img'
      fallback={fallback}
      source={_src}
    />,
    children
  )
}

export default Image