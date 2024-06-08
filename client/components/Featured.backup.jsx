import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import ProductInfoArea from '@pages/SingleProduct/InfoArea'
import Product, { ProductFooter } from '@components/Products/Product/Product'
import Error from '@components/Error'
import Spinner from '@components/Spinner'
import Scroll from '@components/Scroll'
import { useFeaturedProducts } from '@hooks/products';
import '@styles/Featured.css'

function Slider({ children, ...props }) {
  const params = [{ page: 1, limit: 8 }],
  { data: featureds, isLoading, error } = useFeaturedProducts(params);
  
  if (isLoading) return <div><Spinner /></div>;
  if (error) return <Error error={error} />;
  return (
    <Scroll className='featured flex-col pos-rel' as='div' {...props}>
      {children}
      <Scroll.ButtonLeft className='btn pos-abs abs-y-center arrow arrow-prev'>
        <FaAngleLeft />
      </Scroll.ButtonLeft>
      <Scroll.ButtonRight className='btn pos-abs abs-y-center arrow arrow-next'>
        <FaAngleRight />
      </Scroll.ButtonRight>
      <Scroll.List className='list flex'>
        {
          (featureds || []).map((p, i) => (
            <Product
              key={p._id}
              product={p}
              lightbox={true}
              className={'single-product flex pos-rel'}
            >
              <ProductInfoArea product={p} />
              <ProductFooter product={p} className='btn btn-red' />
            </Product>
          ))
        }
      </Scroll.List>
    </Scroll>
  )
}

export default Slider


// <Lightbox
//   key={p._id}
//   photos={p.photos}
//   className={classNames('lightbox pos-rel flex', { hide: i !== curr })}
// />