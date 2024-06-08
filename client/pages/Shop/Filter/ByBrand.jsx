import { useEffect, useRef, useState } from 'react';
import { useBrands } from '@hooks/brands'
import Spinner from '@components/Spinner';
import Error from '@components/Error';
import Checkbox from './Checkbox'
import { TIMEOUT_XL } from '@constants/constants';

const BrandsCheckboxes = ({ params }) => {
  const { data: brands, isLoading, error, mutate } = useBrands(params);

  if (isLoading)
    return <Spinner style={{ width: '48px', height: '48px', borderWidth: '2px' }} />;
  if (error) return <Error error={error} />;
  if (!brands) return;

  const queryVals = brands.map(b => b.name);
  return (
    <div className="checkboxes flex-col hide-scroll">
      {
        (queryVals || []).map((qv, i) =>
          <Checkbox key={`brand_${qv}_${i + 1}`} /* key is important */ queryVal={qv} queryKey={'brand'} />
        )
      }
    </div>
  )
}

export default function ByBrand() {
  const timeout = useRef(0);
  const [params, setParams] = useState({ page: 1, limit: 5})

  const handleChange = async e => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() =>
      setParams({ ...params, name: e.target.value }),
      TIMEOUT_XL
    )
  }

  return (
    <div className="filter-by flex-col">
      <button  type="button" className="heading">By Brand</button>
      <input type="search" placeholder='Brands' onChange={handleChange} />
      <BrandsCheckboxes params={params}/>
    </div>
  )
};