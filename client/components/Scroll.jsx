import React, { Fragment, createContext, createElement, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { smoothScroll } from '@utils/scroll';
import { flatten } from '@utils/sync.js';
import { GAP_MD, TIMEOUT_MD } from '@constants/constants';

const ScrollContext = createContext(null);

function Scroll({ children, as = Fragment, config = {}, ...props }) {
  const ref = useRef();

  const CONFIG = useMemo(() => ({
    duration: 1000,
    targetPos: 0,
    direction : 'x',
    ...config,
  }), [config])
  
  const _children = flatten(children, (c) => c);
  return createElement(
    as,
    props,
    <ScrollContext.Provider value={{ ref, CONFIG }}>
      {_children}
    </ScrollContext.Provider>
  )
}

function ButtonPrev({ children, ...props }) {
  const { ref, CONFIG } = useContext(ScrollContext);
  const { direction } = CONFIG
  const [shouldHide, setHide] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const timeout = useRef(0)

  useEffect(() => {
    if (!ref.current) return;
    if (!ref.current.classList.contains('x-mandatory'))
      ref.current.classList.add('x-mandatory');

    const handleScroll = e => {
      setDisabled(true);
      clearTimeout(timeout.current);
      if (direction === 'x')
        setHide(ref.current.scrollLeft < GAP_MD)
      else if (direction === 'y')
        setHide(ref.current.scrollTop < GAP_MD);

      timeout.current = setTimeout(() => setDisabled(false), TIMEOUT_MD);
    };
    ref.current.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll)

    return () => {
      if (!ref.current) return;
      ref.current.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const handleClick = e => {
    let expected;
    if (direction === 'x') {
      const { current: c } = ref
      expected = direction === 'x' 
        ? c.scrollLeft - c.offsetWidth
        : c.scrollTop - c.offsetHeight;
    }
    const targetPos = Math.round(Math.max(0, expected));
    smoothScroll({ ...CONFIG, targetPos, element: ref.current })
  }
  if (shouldHide) return;
  return (
    <button  type="button" {...props} disabled={disabled} onClick={handleClick}>
      {children}
    </button>
  )
}

function ButtonNext({ children, ...props }) {
  const { ref, CONFIG } = useContext(ScrollContext);
  const { direction } = CONFIG
  const [shouldHide, setHide] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const timeout = useRef(0)

  useEffect(() => {
    if (!ref.current) return;
    if (!ref.current.classList.contains(`${direction}-mandatory`))
      ref.current.classList.add(`${direction}-mandatory`);
    if (direction === 'x' && ref.current.scrollWidth <= ref.current.offsetWidth) 
      setHide(true);
    if (direction === 'y' && ref.current.scrollHeight <= ref.current.offsetHeight) 
      setHide(true);
    
    const handleScroll = e => {
      setDisabled(true);
      clearTimeout(timeout.current);
      const target = ref.current;
      // don't work properly when destructing
      const sw = target.scrollWidth;
      const sh = target.scrollHeight;
      const sl = target.scrollLeft;
      const st = target.scrollTop;
      const ow = target.offsetWidth;
      const oh = target.offsetHeight;
      if (direction === 'x')
        setHide(sl + ow >= (sw - GAP_MD))
      else if (direction === 'y')
        setHide(st + oh >= (sh - GAP_MD));
      timeout.current = setTimeout(() => setDisabled(false), TIMEOUT_MD)
    };
    ref.current.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      if (!ref.current) return;
      ref.current.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll);
    }
  }, [])

  const handleClick = e => {
    const { current: c } = ref
    const expected = c.scrollLeft + c.offsetWidth;
    const targetPos = Math.round(
      Math.min(
        (direction === 'x' ? c.scrollWidth : c.scrollHeight), 
        expected
      )
    );
    smoothScroll({ ...CONFIG, targetPos, element: ref.current });
  }
  if (shouldHide) return;
  return (
    <button  type="button" {...props} disabled={disabled} onClick={handleClick}>
      {children}
    </button>
  )
}

function List({ children, as = 'menu', ...props }) {
  const { ref } = useContext(ScrollContext);
  return createElement(as, { ...props, ref }, children)
}


Scroll.ButtonPrev = ButtonPrev;
Scroll.ButtonNext = ButtonNext;
Scroll.List = List;

export default Scroll