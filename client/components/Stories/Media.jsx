import React, { createElement, useEffect, useMemo, useRef, useState } from 'react'
import LazyMedia from '@components/LazyMedia';
import Spinner from '@components/Spinner'
import { useStoryContext } from '@contexts/StoryProvider';
import { cachedSrc } from '@utils/async';
import { STORY_PLAYER_EVENTS as EVENTS } from "@utils/xtarget";

function Media({ children, as = 'figure', idx, source, ...props }) {
  const { type, src, duration, fallback } = source,
    { 
      isActive, isMuted, currentIndex: curr, setCurrentIndex: setIdx, 
      sources, isBuffering, setIsBuffering,
    } = useStoryContext(),
    isVideo = type && type.startsWith('video'),
    isAudio = type && type.startsWith('audio'),
    neither = !(isAudio || isVideo);
  if (neither) return;

  const [_src, setSrc] = useState(''),
  ref = useRef();

  useEffect(() => {
    EVENTS.emit(`SET_WIDTH_${curr}`, 0);

    cachedSrc(src)
      .then(setSrc)
      .catch(console.log);

    const handleTimeReset = () => { 
      const target = ref.current?.firstElementChild;
      target.currentTime = 0;
    };
    const handleTimeEnd = () => {
      const target = ref.current?.firstElementChild;
      target.currentTime = target.duration;
    };
    EVENTS.on(`SET_TIME_RESET_${curr}`, handleTimeReset);
    EVENTS.on(`SET_TIME_END_${curr}`, handleTimeEnd);

  return () => {
    EVENTS.off(`SET_TIME_RESET_${curr}`, handleTimeReset);
    EVENTS.off(`SET_TIME_END_${curr}`, handleTimeEnd);
  }
  }, []);

  useEffect(() => {
    const target = ref.current?.firstElementChild;
    if (!target) return;
    if (isActive) target.play()
    else target.pause();
  }, [isActive])

  const handleTiming = async () => {
    const target = ref.current?.firstElementChild;
    if (!target) return;
    
    const _dur = Math.min(duration || 10, target.duration),
    width = Math.min(100, (target.currentTime / _dur) * 100);
    
    EVENTS.emit(`SET_WIDTH_${curr}`, width);

    if (target.currentTime >= _dur){
      await target.pause();
      target.currentTime = target.duration;
      setIdx(Math.min(curr + 1, sources.length - 1))
    }
  },
  handleWaiting = () => setIsBuffering(true),
  handleCanPlay = () => setIsBuffering(false);

  if (!_src) return <Spinner style={{ width: '64px', height: '64px', borderWidth: '4px' }} />;
  return createElement(
    as,
    { ...props, ref },
    <LazyMedia
      as={isVideo ? 'video' : 'audio'}
      source={_src}
      autoPlay={isActive}
      muted={isMuted}
      onTimeUpdate={handleTiming}
      onWaiting={handleWaiting}
      onCanPlay={handleCanPlay}
      onDoubleClick={() => EVENTS.emit(`SET_TIME_RESET_${curr}`)}
    >
      <h3>{`Does not support video/audio (!)`}</h3>
    </LazyMedia>,
    isBuffering ? <span>Buffering...</span> : null
  );

};

export default Media