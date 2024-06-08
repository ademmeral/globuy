import { setQty, deleteFromStorage } from '@handlers/cart';
import Product, { ViewBtn } from './Product';

function CartProduct({ children, product, ...props }) {
  const { _id: id, } = product;

  const handleChange = e => {
    const val = e.target.value;
    if (val < 1) e.target.value = 1;
    setQty('cart', id, +e.target.value);
  }

  return (
    <Product className='cart-product flex justify-btw' product={product} lineClamp={2} {...props}>
      {
        children ? children : (
          <footer className="btns flex">
            <input type="number" defaultValue={product?.qty || 1} onChange={handleChange} min={1} max={product.stock} />
            <ViewBtn pid={product._id} />
            <button  type="button" className="del-btn btn btn-red" onClick={() => deleteFromStorage('cart', id)}>
              Delete
            </button>
          </footer>
        )
      }
    </Product>
  )
}

export default CartProduct;