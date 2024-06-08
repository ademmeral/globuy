import { createElement, useEffect, useState } from 'react'

function Indicators({ children, as = 'div', ...props }) {
  return createElement(
    as,
    props,
    children
  )
}

export default Indicators;

const Views = ({ children, as = 'div', ...props }) => {
  const [views, setViews] = useState(0);

  return createElement(
    as,
    props,
    [children].flatMap(
      (c, i) => typeof c === 'function'
        ? { ...c({ views, setViews }), key: i }
        : c
    ),
  )
}
const Likes = ({ children, as = 'button', liked = false, ...props }) => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(liked);

  return createElement(
    as,
    { ...props, onClick: () => setIsLiked(!isLiked) },
    [children].flatMap(
      (c, i) => typeof c === 'function'
        ? { ...c({ isLiked, setIsLiked, likes, setLikes }), key: i }
        : c
    ),
  )
}

Indicators.Views = Views;
Indicators.Likes = Likes;