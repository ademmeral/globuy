import { memo, useRef, useState } from 'react';
import { mutate } from 'swr';
import { useSWRConfig } from 'swr';

let Checkbox = ({ queryVal, queryKey }) => {
  const { cache } = useSWRConfig();
  const exists = cache.get('/products/query')?.data;
  const [checked, setChecked] = useState(
    exists.some( param => (queryKey in param) && param[queryKey] === queryVal )
  ) 

  const handleChange = async e => {
    setChecked(!checked)
    if (e.target.checked)
      mutate(
        '/products/query',
        prev => [
          ...prev.filter(q => q[queryKey] !== e.target.name), 
          { [queryKey]: e.target.name }
        ],
        { revalidate: false }
      )
    else mutate(
      '/products/query',
      prev => prev.filter(q => q[queryKey] !== e.target.name),
      { revalidate: false }
    );
  }

  return (
    <label className="flex align-center">
      <input name={queryVal} type="checkbox" checked={checked} onChange={handleChange} />
      <span>{queryVal}</span>
    </label>
  )
}

export default memo(Checkbox)