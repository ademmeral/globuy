import ByPrice from './ByPrice'
import ByBrand from './ByBrand'
import ByCategory from './ByCategory'
import ByStars from './ByStars'
import { useSWRConfig } from 'swr'

function FilterArea() {
  const { mutate } = useSWRConfig();

  const handleReset = () => {
    mutate('/products/query', [], { revalidate: false });
  }

  return (
    <aside className="filter-area flex-col justify-btw hide-scroll">
      <ByBrand />
      <ByCategory />
      <ByStars />
      <ByPrice />
      <button  type="button" className="reset btn-underline" onClick={handleReset}>
        <small>Reset</small>
      </button>
    </aside>
  )
}

export default FilterArea