import { memo, useEffect, useRef, useState } from 'react';
import { mutate } from 'swr';
import { useProductsQuery } from '@hooks/products';
import { TIMEOUT_MD } from '../../../constants/constants';

let Checkbox = ({ queryVal, queryKey }) => {
  const { data: queries } = useProductsQuery();
  const [checked, setChecked] = useState(
    queries.some( param => (queryKey in param) && param[queryKey] === queryVal )
  );

  useEffect(() => {
    setChecked(
      queries.some( param => (queryKey in param) && param[queryKey] === queryVal )
    );
  }, [queries])

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