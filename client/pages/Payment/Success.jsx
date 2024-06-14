import React, { useEffect, useRef} from 'react'
import { CgCheckO } from "react-icons/cg";
import { useCopyText } from '@hooks/hooks';
import { useCartSum } from '@hooks/cart'
import { useCartMutation } from '@hooks/cart';
import { useNavigate } from 'react-router-dom'
import '@styles/Payment.css';

const TitleRow = ({title}) => {
  return (
    <div className='row flex justify-btw align-center'>
      <h3>{title}</h3>
      <h3>:</h3>
    </div>
  )
}

const CopiableText = ({ text }) => {
  const handleCopy = useCopyText('.copiable');

  return (
    <div className='no-flow copiable-wrapper grid align-center'>
      <p className='text row might-long hide-scroll copiable'>
        {text}
      </p>
      <button  type="button" className='copy-btn btn' onClick={handleCopy}>
        Copy
      </button>
    </div>
  )
}

function Success() {
  const { trigger } = useCartMutation();
  const { mutate } = useCartSum();
  const navigate = useNavigate();
  const timeout = useRef(0);

  useEffect(() => {
    trigger();
    mutate(0);
    timeout.current = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => { clearTimeout(timeout.current) }
  }, [])

  return (
    <article className='payment success container payment-container self-center m-center flex-col justify-btw'>
      <header className='flex content-center header'>
        <CgCheckO size={56} />
        <h1>Latest Payment Successful</h1>
      </header>
      <p className='text-center'>Your payment has been accepted successfully 😊</p>
    </article>
  )
}

export default Success