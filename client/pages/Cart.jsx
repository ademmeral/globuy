import { useCart, useCartSum } from '@hooks/cart'
import { BiErrorCircle } from "react-icons/bi";
import CartProduct from '@components/Products/Product/CartProduct';
import Spinner from '@components/Spinner'
import Error from '@components/Error'
import { useOrdersMutation } from '@hooks/orders';
import '@styles/Cart.css';

const Sum = () => {
  const { data: sum, error, isLoading } = useCartSum()
  if (isLoading) return <Spinner style={{ width: '40px', height: '40px', borderWidth: '4px' }} />;
  if (error) return <BiErrorCircle size={40}/>
  return <h2 className="cart-total">{sum || 0}</h2>
}

function Cart() {
  const { data: products, isLoading: cartLoading, error : cartErr, location, currencies } = useCart();
  const { trigger, error } = useOrdersMutation('/checkout');

  const handleSubmit = async () => {
    try {
      const url = await trigger({ products })
      window.location.href = url;
    } catch (err) {
      console.log(err);
    }
  }
  if (cartLoading || location.isLoading || currencies.isLoading) 
    return <Spinner />;
  if (cartErr || location.error || currencies.error) 
    return <Error error={cartErr || location.error || currencies.error} />;

  const productList = (
    <ul className="cart-item-list flex-col hide-scroll">
      {
        products.map(p => (
          <CartProduct product={p} key={p._id} />
        ))
      }
    </ul>
  );
  const noProduct = <h2 className='no-item self-center'>There is no products in the cart 😒</h2>

  return (
    <div className='cart-container container flex-col justify-btw'>
      {products && products.length ? productList : noProduct}
      {
        <footer className="cart-footer flex justify-btw align-center">
          <button
            disabled={!products || !products?.length || cartLoading}
            className="checkout-btn btn-dark btn"
            onClick={handleSubmit}
          >Checkout</button>
          <article className="cart-sum flex align-center">
            <h4>Total</h4>
            <h4>:</h4>
            <Sum />
          </article>
        </footer>
      }
    </div>
  )
}

export default Cart