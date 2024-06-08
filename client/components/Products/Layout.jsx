import useSWR from "swr";
import ProductList from "./ProductList";
import Spinner from "@components/Spinner";
import { fetcher } from '@utils/async'
import '@styles/Products.css';

function ProductsLayout({ children }) {
  const params = [{ page: 1, limit: 10 }];
  const path = ['/categories', params]
  const { data: ctgs, error } = useSWR(path, async () => fetcher(path[0], params));

  if (error) return <Error error={error} />;
  if (!ctgs) return;
  return (
    <div className="products-layout">
      {children}
      {
        ctgs.map(c => {
          return (
            <ProductList key={c._id} param={c.name}>
              <h2>{c.name}</h2>
            </ProductList>
          )
        })
      }
    </div>
  )
}

export default ProductsLayout