import Product from '@components/Products/Product/Product'
import { useFavs } from '@hooks/favorites'
import '@styles/Cart.css'
import '@styles/Favorites.css'

function Favorites() {
  const { data: favs } = useFavs();

  const favList = (
    <ul className="fav-list flex-col hide-scroll">
      {
        (favs || []).map(f => (
          <Product
            key={f.product._id}
            product={f.product}
            className='flex cart-product justify-btw'
            lineClamp={2}
          />
        ))
      }
    </ul>
  );

  const noFav = <h2 className='no-item text-center'>There is no products in your favorites 😒</h2>

  return (
    <div className="favs-container container">
      {favs && favs.length ? favList : noFav}
    </div>
  )
}

export default Favorites