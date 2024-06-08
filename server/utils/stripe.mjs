import stripe from 'stripe'
import { flatten } from './utils.mjs'

class PaymentError extends Error {
  constructor(message) {
    super(message)
    this.name = 'PaymentError'
    this.message = message
  }
}

const st = stripe(process.env.STRIPE_SECRET)

export const checkout = async (config = {}) => {
  const { data } = config;
  try {
    const session = await st.checkout.sessions.create({
      payment_method_types : ['card'],
      mode: 'payment',
      line_items: data.map(({ product, currency, priceByCurrency, qty }) => (
        {
          price_data:
          {
            product_data: { name: `${product}_${priceByCurrency}_${qty}` }, 
            currency, 
            unit_amount : Math.round(priceByCurrency * 100)
          },
          quantity : qty, 
        }
      )),
      success_url : `${process.env.CLIENT_DOMAIN}${config.successPath}`,
      cancel_url : `${process.env.CLIENT_DOMAIN}${config.cancelPath}`,
    })
    return session;
  } catch (err) {
    console.log(err)
    throw new PaymentError(err.message);
  }
}