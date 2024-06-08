import { MEDIA } from "@utils/media";
import { setStorage } from '@handlers/cart';
import Rating from "./Rating";
import FavIcon from "./FavButton";
import Lightbox from "@components/Lightbox";
import { NavLink } from 'react-router-dom'
import LazyMedia from "@components/LazyMedia";
import { setPhotos } from "../../../utils/sync";

export function AddToCartBtn({ children, product, ...props }) {
  return (
    <button type='button' className="btn-red btn" onClick={() => setStorage('cart', product)} {...props}>
      {children ? children : 'Add to Cart'}
    </button>
  )
}

export function ViewBtn({ pid }) {
  return (
    <button type='button' className="btn-red btn">
      <NavLink to={`/products/${pid}/desc`}>
        View
      </NavLink>
    </button>
  )
}


export function ProductFooter({ product }) {

  return (
    <footer className="btns text-no-wrap flex justify-btw align-center">
      <AddToCartBtn product={product} />
      <ViewBtn pid={product._id} />
    </footer>
  )
}

function Product({ children, product, lightbox = false, lineClamp = 1, ...props }) {
  const { stock, priceByLocation, title, desc, photos, _id: pid } = product;

  const setSrc = !lightbox ? setPhotos('product', product.photos, 'CARD') : ''
  const placeholder = !lightbox ? setPhotos('product', product.photos, 'PLACEHOLDER') : ''

  return (
    <li className="product grid" {...props}>
      {
        lightbox ? <Lightbox photos={photos} /> : (
          <figure className='img pos-rel' >
            <LazyMedia fallback={placeholder[0]} source={setSrc[0]} alt="" />
            <FavIcon product={product} />
          </figure>
        )
      }
      <article className="article flex-col justify-btw">
        <div className="title-desc">
          <h4 className={`title clamp clamped-${lineClamp}`}>{title}</h4>
          <p className={`desc clamp clamped-${lineClamp}`}>
            <small>{desc}</small>
          </p>
        </div>
        <div className="price-stock flex justify-btw align-center">
          <h4>{priceByLocation}</h4>
          <small>{`Stock : ${stock}`}</small>
        </div>
        <Rating product={product} />
        {children ? children : <ProductFooter product={product} />}
      </article>
    </li>
  )
}

export default Product