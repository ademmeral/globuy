import React from 'react'

function Featured() {
  return (
    <div className='featured flex'>
      <div className="skeleton pulse img-big" />
      <article className='flex-col'>
        <header>
          <h2 className="skeleton pulse title big" />
          <p className="skeleton pulse text desc" />
        </header>
        <div className='flex justify-btw align-center'>
          <h2 className="skeleton pulse title" />
          <p className="skeleton pulse text desc" />
        </div>
        <div>
          <h2 className="skeleton pulse title" />
          <p className="skeleton pulse text" />
        </div>
        <footer>
          <h2 className="skeleton pulse title" />
          <p className="skeleton pulse text" />
        </footer>
      </article>
    </div>
  )
}

export default Featured