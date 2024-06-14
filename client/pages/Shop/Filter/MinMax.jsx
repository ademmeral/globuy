import { useEffect, useRef, useState } from 'react';
import { TIMEOUT_XL } from '@constants/constants';
import { cleanObject } from '@utils/sync';
import { mutate } from 'swr';
import { useClientLocation } from '@hooks/location'
import { useCurrency } from '@hooks/currencies'
import { useProductsQuery } from '@hooks/products';

export default function MinMax() {
  const timeout = useRef(0);
  const [values, setValues] = useState({})
  const { data: queries } = useProductsQuery();
  const { data: location, isLoading: locLoading, error: locErr } = useClientLocation();
  const { data: currency, isLoading: currLoading, error: currErr } = useCurrency();
  const ref = useRef();

  useEffect(() => {
    if (!(queries && ref.current)) return;
    console.log(queries);
    if (!queries?.length)
    {
      Array.from(ref.current.querySelectorAll('input'))
        .forEach(element => {
          element.value = ''
        });
      setValues({})
    }
  }, [queries])

  const handleInput = async e => {
    if (!(location && currency)) return;
    
    const { currentTarget: { value, name } } = e
    clearTimeout(timeout.current);

    const { currency: cc } = location,
      { rates } = currency;

    const _values = cleanObject({ ...values, [name]: Math.round(+value / rates[cc]) });
    setValues(_values);
    
    timeout.current = setTimeout(async () => {
      await mutate(
        `/products/query`,
        prev => [
          ...prev.filter( q => Object.keys(q).some( k => !k.startsWith('price') ) ), 
          Object.values(_values).length ? _values : null
        ].filter(Boolean),
        { revalidate: false }
      );
    }, TIMEOUT_XL)
  }

  return (
    <div className="inputs flex-col" ref={ref}>
      <label className="grid align-center">
        <span>Min</span>
        <input type="number" name='price[$gt]' placeholder="Your Currency" onInput={handleInput} />
      </label>
      <label className="grid align-center">
        <span>Max</span>
        <input type="number" name='price[$lt]' placeholder="Your Currency" onInput={handleInput} />
      </label>
    </div>
  )
}