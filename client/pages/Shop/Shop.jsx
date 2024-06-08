import FilterArea from "./Filter/FilterArea"
import ShopProducts from './Products'
import Search from './Search'
import '@styles/Products.css'
import '@styles/Shop.css'

function Shop() {
  return (
    <section className="section shop-section">
      <div className="shop-container flex-col">
        <Search />
        <div className="shop-hero flex hide-scroll">
          <FilterArea />
          <ShopProducts />
        </div>
      </div>
    </section>
  )
}

export default Shop