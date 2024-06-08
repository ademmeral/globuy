import React, { useLayoutEffect} from 'react'
import Spinner from '@components/Spinner'
import Error from '@components/Error'
import { CgCheckO } from "react-icons/cg";
import { useCartMutation, useCartSum } from '@hooks/cart'
import { useSuccessPayment } from '@hooks/payments';
import { useCopyText } from '@hooks/hooks';
import { capitalize } from '@utils/sync';
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
  const { data: payment, error: paymentErr, isLoading: paymentLoading } = useSuccessPayment();
  const { trigger } = useCartMutation();
  const { mutate } = useCartSum();
  
  useLayoutEffect(() => {
    trigger();
    mutate(0);
  }, [])

  if (paymentLoading) return <Spinner />;
  else if (paymentErr) return <Error error={paymentErr} />;
  if (!payment) return;
  return (
    <article className='payment success container payment-container self-center m-center flex-col justify-btw'>
      <header className='flex content-center header'>
        <CgCheckO size={56} />
        <h1>Latest Payment Successful</h1>
      </header>
      <p className='text-center'>Your payment has been accepted successfully 😊</p>
      <footer className='grid m-center'>
        <div className="col col-left grid">
          <TitleRow title={'Method'}/>
          <TitleRow title={'Currency'}/>
          <TitleRow title={'Transaction ID'}/>
          <TitleRow title={'Total Items'}/>
          <TitleRow title={'Amount'}/>
        </div>
        <div className="col col-right grid no-flow">
          <p className='text row'>{capitalize(payment.method)}</p>
          <p className='text row'>{payment.currency}</p>
          <CopiableText text={payment.transactionId}/>
          <p className='text row'>{payment.totalItem}</p>
          <p className='text row'>{payment.sum}</p>
        </div>
      </footer>
    </article>
  )
}

export default Success