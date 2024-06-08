import Product from './Product/Product';
import Error from '@components/Error'
import Scroll from '@components/Scroll';
import { useLazyProducts } from '@hooks/hooks';
import ProductListSkeleton from '@components/Skeletons/ProductList';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

export function ProductList({ children, param, ...props }) {
  const path = [{ category: param, page: 1, limit: 8 }];
  const { isLoading, error, data, ref } = useLazyProducts(path, { treshold: 0.25 });
  
  if (error) return <Error error={error} />;
  if (isLoading) return <ProductListSkeleton amount={5} />;
  return (
    <div className='products-wrapper flex-col' {...props} ref={ref}>
      {data ? children : null}
      <div className='pos-rel'>
        <Scroll>
          <Scroll.ButtonPrev className='flex align-center arrow arrow-prev pos-abs'>
            <FaAngleLeft />
          </Scroll.ButtonPrev>
          <Scroll.ButtonNext className='flex align-center arrow arrow-next pos-abs'>
            <FaAngleRight />
          </Scroll.ButtonNext>
          <Scroll.List className='products flex hide-scroll'>
            {
              (data || []).map((p, i) => (
                <Product key={p._id} product={p} />
              ))
            }
          </Scroll.List>
        </Scroll>
      </div>
    </div>
  )
}

export default ProductList