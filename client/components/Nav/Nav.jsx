import { AiOutlineHome, AiOutlineShopping, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import classNames from 'classnames';
import LinkItem from '../LinkItem';
import FavoritesLink from './FavoritesLink';
import CartLink from './CartLink';
import NavFooter from './Footer';
import { useClickOut } from '@hooks/hooks'
import { useState } from 'react';
import '@styles/Nav.css';


function Nav() {
  const [ref, isOut] = useClickOut()  

  const className = classNames(
    'nav flex-col align-start justify-btw pos-sticky',
    { expand: !isOut }
  )

  return (
    <nav className={className}>
      <button  type="button" className='toggle flex justify-start' ref={ref}>
        {isOut ? <AiOutlineMenu /> : <AiOutlineClose />}
      </button>
      <ul className='routes flex-col'>
        <LinkItem path={'home'}>
          <AiOutlineHome />
        </LinkItem>
        <LinkItem path={'shop'}>
          <AiOutlineShopping />
        </LinkItem>
        <CartLink/>
        <FavoritesLink/>
      </ul>
      <NavFooter />
    </nav>
  )
}

export default Nav