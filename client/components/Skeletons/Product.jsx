import React from 'react'
import '@styles/Skeletons.css';

function Product() {
  return (
    <div className='product'>
      <div className="skeleton img" />
      <div className='flex justify-btw align-center'>
        <div className="skeleton title" />
        <div className="skeleton title" />
      </div>
      <div className='flex justify-btw align-center'>
        <div className='skeleton title' />
        <div className="skeleton title" />
      </div>
    </div>
  )
}

export default Product