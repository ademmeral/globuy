import { useEffect, useRef, useState } from 'react';
import { mutate } from 'swr';
import { TIMEOUT_MD } from '@constants/constants';

function Search() {
  const timeout = useRef(0);
  const [param, setParam] = useState({});

  useEffect(() => {
    timeout.current = setTimeout(async () => {

      const filtered = array => (array || []).filter(obj => !obj.hasOwnProperty('title'))

      if (!Object.values(param).length)
        await mutate(
          'products/query',
          prev => filtered(prev),
          { revalidate: false }
        )
      else await mutate(
        `/products/query`,
        prev => [...filtered(prev), param],
        { revalidate: false }
      );
    }, TIMEOUT_MD);

    return () => {
      clearTimeout(timeout.current);
    }
  }, [param])

  const handleChange = async e => {
    const { target: { value, name } } = e;
    setParam({ ...param, [name]: value });
  };

  return (
    <label className="search-area">
      <input type="search" name='title' placeholder="Search" onInput={handleChange} />
    </label>
  )
}

export default Search