import { useSingleProduct } from "@hooks/products";
import Product, { AddToCartBtn } from '@components/Products/Product/Product'
import { Outlet, useOutletContext } from "react-router";
import Tabs from "./Tabs";
import Spinner from '@components/Spinner'
import Error from '@components/Error'
import '@styles/SingleProduct.css'
import InfoArea from "./InfoArea";

const links = {
  desc: 'Description',
  comments: 'Comments',
  related: 'Related'
}

export const Description = () => {
  const { desc } = useOutletContext();

  return (
    <article className="desc">
      <p>{desc}</p>
    </article>
  )
}

function SingleProduct() {
  const [,,pid] = window.location.pathname.split('/'); // useLocation cause to render thrice
  const { data, isLoading, error } = useSingleProduct(pid);

  if (isLoading) return <Spinner />;
  if (error) return <Error error={error} />;
  if (!data) return;
  return (
    <section className="single-product-section section">
      <div className="single-product-container container flex-col">
        <Product 
          product={data} 
          className={'single-product flex justify-btw'} 
          lightbox={true}
          >
          <InfoArea product={data}/>
          <AddToCartBtn product={data} className='btn btn-red' />
        </Product>
        <Tabs links={links} />
        <Outlet context={data} />
      </div>
    </section>
  )
}

export default SingleProduct