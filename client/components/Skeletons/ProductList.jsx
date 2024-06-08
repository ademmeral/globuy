import ProductSkeleton from './Product';

function ProductList({ amount }) {
  const arr = [...Array(amount).keys()];
  return (
    <div className='products-wrapper wrapper no-flow flex-col'>
      <div className="skeleton title big" />
      <div className='products-skeleton flex hide-scroll'>
        {
          arr.map(k => <ProductSkeleton key={k} />)
        }
      </div>
    </div>
  )
}

export default ProductList