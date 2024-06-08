import { createElement } from "react"
import { useStoryContext } from "@contexts/StoryProvider";
import { STORY_PLAYER_EVENTS as EVENTS } from "@utils/xtarget";

export function Play({ children, as = 'div', ...props }) {
  const ctx = useStoryContext();

  return createElement(
    as,
    { ...props, role:'button', onClick: () => ctx.setIsActive(true) },
    [children].flatMap((c, i) => typeof c === 'function' ? { ...c(ctx), key: i } : c)
  )
}

export function Pause({ children, as = 'div', ...props }) {
  const ctx = useStoryContext();

  return createElement(
    as,
    { ...props, role:'button', onClick: () => ctx.setIsActive(false) },
    [children].flatMap((c, i) => typeof c === 'function' ? { ...c(ctx), key: i } : c)
  )
}

export function PlayPause({ children, as = 'div', ...props }) {
  const ctx = useStoryContext();
  return createElement(
    as,
    { ...props, role:'button', onClick: () => ctx.setIsActive(p => !p) },
    [children].flatMap((c, i) => typeof c === 'function' ? { ...c(ctx), key: i } : c)
  )
}

export function Next({ children, as = 'div', ...props }) {
  const { currentIndex: curr, setCurrentIndex: setCurr, sources: { length: len } } = useStoryContext();

  const handleClick = () => {
    if (!(curr < (len - 1))) return;
    EVENTS.emit(`SET_WIDTH_${curr}`, 100);
    setCurr(p => Math.min(len - 1, p + 1))
  }
  return createElement(
    as,
    {
      ...props,
      role:'button',
      onClick: handleClick
    },
    [children].flatMap((c, i) => typeof c === 'function' ? { ...c(ctx), key: i } : c)
  )
}
// EVENTS.emit(`SET_TIME_RESET_${ctx.currentIndex}`);
export function Prev({ children, as = 'div', ...props }) {
  const { currentIndex: curr, setCurrentIndex: setCurr } = useStoryContext();
  const handleClick = () => {
    if (!(curr > 0)) return;
    EVENTS.emit(`SET_WIDTH_${curr}`, 0);
    setCurr(p => Math.max(0, p - 1))
  }
  return createElement(
    as,
    {
      ...props,
      role:'button',
      onClick: handleClick
    },
    [children].flatMap((c, i) => typeof c === 'function' ? { ...c(ctx), key: i } : c)
  )
}

export function Reset({ children, as = 'div', ...props }) {
  const ctx = useStoryContext();
  const handleClick = () => {
    EVENTS.emit(`SET_TIME_RESET_${ctx.currentIndex}`);
  }
  return createElement(
    as,
    {
      ...props,
      role:'button',
      onClick: handleClick
    },
    [children].flatMap((c, i) => typeof c === 'function' ? { ...c(ctx), key: i } : c)
  )
}

export function Finish({ children, as = 'div', ...props }) {
  const ctx = useStoryContext();
  const handleClick = () => {
    EVENTS.emit(`SET_TIME_END_${ctx.currentIndex}`);
  }
  return createElement(
    as,
    {
      ...props,
      role:'button',
      onClick: handleClick
    },
    [children].flatMap((c, i) => typeof c === 'function' ? { ...c(ctx), key: i } : c)
  )
}

export function Audio({ children, as = 'div', ...props }) {
  const ctx = useStoryContext(),
    { currentIndex: curr, sources: srcs, setIsMuted } = ctx;


  const shouldHide = srcs[curr]?.type &&
    !['audio', 'video'].includes(srcs[curr]?.type.split('/')[0]);
  if (shouldHide) return;

  return createElement(
    as,
    {
      ...props,
      role:'button',
      onClick: () => setIsMuted(p => !p)
    },
    [children].flatMap((c, i) => typeof c === 'function' ? { ...c(ctx), key: i } : c)
  )
}


export default function Controllers({ children, as = 'ul', ...props }) {
  return createElement(
    as,
    props,
    children
  )
}

Controllers.Prev = Prev
Controllers.Next = Next
Controllers.Play = Play
Controllers.Pause = Pause
Controllers.Reset = Reset
Controllers.Finish = Finish
Controllers.PlayPause = PlayPause
Controllers.Audio = Audio