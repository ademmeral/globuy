import React, { createElement } from 'react'
import { useStoryContext } from '../../contexts/StoryProvider';

function Buttons({ children }) {
  return children;
}

export default Buttons;

function Close({children, as = 'div', ...props}){
  const { setShouldHide } = useStoryContext();
  return createElement(
    as,
    { ...props, role: 'button', onClick: () => setShouldHide(true) },
    children
  )
}
function Open({children, as = 'div', ...props}){
  const { setShouldHide } = useStoryContext();
  return createElement(
    as,
    { ...props, role:'button', onClick: () => setShouldHide(false) },
    children
  )
}

Buttons.Close = Close;
Buttons.Open = Open;