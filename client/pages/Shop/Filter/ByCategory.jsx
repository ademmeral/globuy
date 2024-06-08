import { useState, useRef } from 'react';
import { useCategories } from "@hooks/categories";
import Checkbox from './Checkbox'
import Spinner from '@components/Spinner'
import { TIMEOUT_XL } from '@constants/constants'

const CategoriesCheckboxes = ({ params }) => {
  const { data: categories, isLoading, error, mutate } = useCategories(params);
  
  if (isLoading)
    return <Spinner style={{ width: '48px', height: '48px', borderWidth: '2px' }} />;
  if (error) return <Error error={error} />;
  if (!categories) return;

  const queryVals = categories.map(c => c.name);
  return (
    <div className="checkboxes flex-col hide-scroll">
      {
        (queryVals || []).map((qv, i) =>
          <Checkbox key={`category_${qv}_${i + 1}`} /* key is important */ queryVal={qv} queryKey={'category'} />
        )
      }
    </div>
  )
}

export default function ByCategory(){
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
      <button  type="button" className="heading">By Category</button>
      <input type="search" placeholder='Categories' onChange={handleChange} />
      <CategoriesCheckboxes params={params}/>
    </div>
  )
};