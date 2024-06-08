import React, { createElement, useEffect, useState } from 'react'
import { useStoryContext } from '@contexts/StoryProvider';
import { STORY_PLAYER_EVENTS as EVENTS } from "@utils/xtarget";

function StickList({ children, as = 'ul', ...props }) {
  const { sources } = useStoryContext();

  return createElement(
    as,
    props,
    sources.map((_,i) => (
      <StickOuter key={i} idx={i} />
    ))
  )
}

export default StickList;

export function StickOuter({ children, as = 'div', idx, ...props }) {
  const { config, } = useStoryContext();

  const color = config?.stickColor
    ? config.stickColor.length < 5 && config.stickColor[0] === '#'
      ? config.stickColor.padEnd(7, config.stickColor.slice(1))
      : config.stickColor
    : '#ffffff';

  return createElement(
    as,
    { ...props, style: { backgroundColor: `${color}66` } },
    <StickInner backgroundColor={color} as={as} idx={idx}/>,
    children,
  )
}

export const StickInner = ({ as = 'div', idx, backgroundColor: bg, ...props }) => {
  const { currentIndex, } = useStoryContext();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleWidth = e => setWidth(e.detail);
    EVENTS.on(`SET_WIDTH_${idx}`, handleWidth)
    return () => {
      EVENTS.off(`SET_WIDTH_${idx}`, handleWidth);
    }
  }, [])

  return createElement(
      as,
      { 
        ...props, 
        style: { backgroundColor : `${bg}cc`, width: `${width}%` }, 
        hidden: currentIndex !== idx && width < 1
      },
      null
    )
};