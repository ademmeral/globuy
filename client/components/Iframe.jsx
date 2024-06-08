import React from 'react'
import '@styles/Iframe.css';

function Iframe({src}) {
  return (
    <iframe src={src} className='pos-abs abs-center' />
  )
}

export default Iframe