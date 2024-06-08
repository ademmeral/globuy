import { createElement, useCallback, useEffect } from 'react'
import { useStoryContext } from '@contexts/StoryProvider';
import { timer } from '@utils/sync';
import { STORY_PLAYER_EVENTS as EVENTS} from '@utils/xtarget'

function Text({ children, as = 'li', idx, source, ...props }) {
  const { currentIndex: curr, setCurrentIndex, sources, isActive } = useStoryContext(),
    { duration } = source,
    { start, stop, reset } = useCallback(timer((elapsedTotal) => {

      let _dur = (duration || 5) * 1000;
      const w = Math.min(100, (elapsedTotal / _dur) * 100);

      EVENTS.emit(`SET_WIDTH_${curr}`, w)

      if (elapsedTotal >= duration * 1000)
        setCurrentIndex(Math.min(curr + 1, sources.length - 1));

    }, 100), [])

  useEffect(() => {
    return () => { reset(); }
  }, [])

  useEffect(() => {
    if (!isActive) return stop();
    start();
    return () => { stop() }
  }, [isActive])

  return createElement(
    'p',
    props,
    source.src,
    children,
  );
}

export default Text