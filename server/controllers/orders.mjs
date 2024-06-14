import Order from '../models/order.mjs'
import Stripe from 'stripe'
import { CustomError } from '../utils/utils.mjs';


const st = Stripe(process.env.STRIPE_SECRET)
const wsec = process.env.STRIPE_WEBHOOK_SECRET;
let ids = [];

// SINGLE
export async function addOne(session) {
  try {
    const created = await Order.create(session);
    return created;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getOne(req, res) {
  try {
    const found = await Order.findById(req.params?.id);
    return res.status(201).json(found);
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`)
  }
}

// MULTI
export async function getMany(req, res) {
  try {
    const found = await Order.find(req.query)
      .skip(req.query.skip).limit(req.query.limit);
    return res.status(201).json(found);
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`)
  }
}

// CHECKOUT
export const checkout = async (req, res) => {
  try {
    ids = req.body.products.map(p => ({ product: p.product }));
    const session = await st.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.products.map(({ priceByCurrency, qty, title, photo, currency }) => (
        {
          price_data:
          {
            product_data: { name: title, images: [photo] },
            currency,
            unit_amount: Math.round(+priceByCurrency * 100),
          },
          quantity: qty,
        }
      )),
      mode: 'payment',
      phone_number_collection: { enabled: true },
      billing_address_collection: 'required',
      success_url: `${process.env.CLIENT}/payment/success?sid={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT}/payment/failed`,
    });
    return res.status(200).send(session.url);
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${new CustomError('PaymentError', err.message)}`);
  }
}

export const checkoutWebhook = async (req, res) => { 
  const sig = req.headers['stripe-signature'];
  let event;
  
  try {
    event = st.webhooks.constructEvent(req.body, sig, wsec);
  } catch (err) {
    console.log(err);
    return res.status(500).send(`WebhookError: ${err.message}`)
  }
  if (event.type === 'checkout.session.completed'){
    const { 
      payment_intent: paymentId, id: customerId, payment_status: paymentStatus, 
      customer_details: customerDetails, currency,
    } = event.data.object;
    addOne({ paymentId, customerDetails, customerId, paymentStatus, currency, products: ids });
  }
    
  return res.status(200).end();
}