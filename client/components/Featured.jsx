import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import ProductInfoArea from '@pages/SingleProduct/InfoArea'
import Product, { ProductFooter } from '@components/Products/Product/Product'
import Error from '@components/Error'
import Scroll from '@components/Scroll'
import FeaturedSkeleton from './Skeletons/Featured';
import { useProducts } from '../hooks/products';
import { useUser } from '../hooks/user';
import '@styles/Featured.css'

function Slider({ children, ...props }) {
  const {data: user, isLoading : userLoading, error: userErr} = useUser('/auth'),
  params = [{ page: 1, limit: 2, userId: user?._id }],
  { data: featureds, isLoading, isValidating, error } = useProducts('/featured', params);

  // if (isLoading || isValidating) return <div className='spinn grid content-center'><Spinner /></div>;
  if (isLoading || isValidating) return <div className='skeleton-wrapper flex'><FeaturedSkeleton /></div>;
  if (error) return <Error error={error} />;
  return (
    <Scroll className='featured flex-col pos-rel' as='div' {...props}>
      {children}
      <Scroll.ButtonPrev className='btn pos-abs abs-y-center arrow arrow-prev'>
        <FaAngleLeft />
      </Scroll.ButtonPrev>
      <Scroll.ButtonNext className='btn pos-abs abs-y-center arrow arrow-next'>
        <FaAngleRight />
      </Scroll.ButtonNext>
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