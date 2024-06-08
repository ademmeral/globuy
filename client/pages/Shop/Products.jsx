import { useProducts } from "@hooks/products"
import { useProductsQuery } from '@hooks/products';
import Product from '@components/Products/Product/Product'
import Spinner from '@components/Spinner'
import Error from '@components/Error'

export default function ShopProducts(){
  const { data: queries } = useProductsQuery();
  const params = [{ page: 1, limit: 20 }, ...(queries || [])]
  const { data: products, isLoading, error, mutate } = useProducts(`/search`, params)

  const className = `shop-products flex hide-scroll hide-scroll`
  if (isLoading) return <div className={className}><Spinner /></div>;
  if (error) return <div className={className}><Error error={error} /></div>;
  return (
    <ul className={className}>
      {
        (products || []).map(p => (
          <Product key={p._id} product={p} />
        ))
      }
    </ul>
  )
}
