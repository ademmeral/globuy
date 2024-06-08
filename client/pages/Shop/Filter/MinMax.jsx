import { useRef, useState } from 'react';
import { TIMEOUT_XL } from '@constants/constants';
import { cleanObject } from '@utils/sync';
import { mutate } from 'swr';
import { useClientLocation } from '@hooks/location'
import { useCurrency } from '@hooks/currencies'

export default function MinMax() {
  const timeout = useRef(0);
  const [values, setValues] = useState({})
  const { data: location, isLoading: locLoading, error: locErr } = useClientLocation();
  const { data: currency, isLoading: currLoading, error: currErr } = useCurrency();

  const handleInput = async e => {
    if (!(location && currency)) return;
    
    const { currentTarget: { value, name } } = e
    clearTimeout(timeout.current);

    const { currency: cc } = location,
      { rates } = currency;

    timeout.current = setTimeout(async () => {
      const _values = cleanObject({ ...values, [name]: Math.round(+value / rates[cc]) });
      setValues(_values);
      await mutate(
        `/products/query`,
        prev => [
          ...prev.filter( q => Object.keys(q).some( k => !k.startsWith('price') ) ), 
          Object.values(_values).length ? _values : null
        ].filter(Boolean),
        { revalidate: false }
      );
      console.log(_values)
    }, TIMEOUT_XL)
  }

  return (
    <div className="inputs flex-col">
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