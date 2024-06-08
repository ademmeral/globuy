import api from '@api/api';
import { CustomError } from './sync';

export default class Order{
  _state;
  constructor(){
    this.cancelledOrder = new CancelOrder(this)
    this.paymentPending = new PaymentPending(this);
    this.orderBeingPrepared = new OrderBeingPrepared(this);
    this.orderShipped = new OrderShipped(this);

    this.setState(this.paymentPending)
  }
  getState(){
    return this._state
  }
  setState(s){
    this._state = s
  }
  async dispatchOrder(payload){
    try {
      const { data: result } = await api.post('/orders', { data: payload });
      const products = payload.map(o => {
        const found = result.find(ord => ord.product === o.product)
        return { ...o, order: found?._id }
      })
      return products;
    } catch (err) {
      throw new CustomError('OrderError', err.message)
    }
  }
}

class PaymentPending{

  constructor(order){
    this.order = order;
  }
  
  cancelOrder(){
    console.log('Cancelling your unpaid order...')
    this.order.setState(this.order.cancelledOrder)
  }
  verifyPayment(){
    console.log('Payment verified. Shipping soon...');
    this.order.setState(this.order.orderBeingPrepared);
  }
  async dispatchPayment(products){
    try {
      console.log('Payment verified. Shipping soon...');
      const { data  } = await api.post('/payments', { data: products });
      this.verifyPayment();
      return data;
    } catch (err) {
      throw new CustomError('PaymentError', err.message);
    }
  }
  shipOrder(){
    console.log('We cannot ship the order when payment is pending!')
  }
}

class CancelOrder{
  constructor(order){
    this.order = order
  }
  cancelOrder(){
    console.log('Your order has already been cancelled!')
  }
  verifyPayment(){
    console.log('You cannot verify order that has been cancelled!');
  }
  shipOrder(){
    console.log('We cannot ship order that has been cancelled!')
  }
}

class OrderBeingPrepared{
  constructor(order){
    this.order = order
  }
  cancelOrder(){
    console.log('Cancelling your order...')
    this.order.setState(this.order.orderBeingPrepared);
  }
  verifyPayment(){
    console.log('Your payment is already verified!');
  }
  shipOrder(){
    console.log('Shipping you order now...')
    this.order.setState(this.order.orderShipped);
  }
}

class OrderShipped{
  constructor(order){
    this.order = order
  }
  cancelOrder(){
    console.log('You cannot cancel order, already shipped!')
  }
  verifyPayment(){
    console.log('You canot verify, already shipped!');
  }
  shipOrder(){
    console.log('You canot re-ship, already shipped!');  }
}

const newInst = new Order();

// newInst.getState().verifyPayment();
// newInst.getState().shipOrder();
// newInst.getState().cancelOrder();

console.log(
  `Order state:`, newInst.getState().constructor.name
)