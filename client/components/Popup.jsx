import { Fragment, createContext, createElement, useContext, useEffect, useRef, useState } from "react"
import { flatten } from '@utils/sync';
import '@styles/Overlay.css';

const OverlayContext = createContext(null);

function Popup({ children, as = Fragment, ...props }) {
  const ref = useRef();

  const _children = flatten(
    children,
    c => typeof c === 'function' ? c(ref) : c
  );

  return createElement(
    as, 
    props, 
    <OverlayContext.Provider value={ref}>
      {_children}
    </OverlayContext.Provider>
  )
}

function Dialog({ children, as = 'dialog', ...props }) {
  const ref = useContext(OverlayContext);
  return createElement(
    as,
    { ...props, ref, open: false },
    children,
  )
}

function Close({ children, as = 'button', ...props }) {
  const ref = useContext(OverlayContext);
  return createElement(
    as,
    { ...props, onClick: () => { ref.current.close() } },
    children,
  )
}
function Open({ children, as = 'button', ...props }) {
  const ref = useContext(OverlayContext);
  return createElement(
    as,
    { ...props, onClick: () => ref.current.show() },
    children,
  )
}


Popup.Close = Close;
Popup.Open = Open;
Popup.Dialog = Dialog;
export default Popup