
import { useSWRConfig } from "swr"
import MinMax from "./MinMax"
import { useRef } from "react";
import { TIMEOUT_XL } from '@constants/constants';
import { useClientLocation } from '@hooks/location'
import { useCurrency } from '@hooks/currencies'

export default function ByPrice() {

  /*
  const handleChange = async e => {
    if (!(location && currency)) return;
    
    const { currentTarget: { value } } = e
    clearTimeout(timeout.current);

    const { currency: cc } = location,
      { rates } = currency,
      price = +value / rates[cc];

    timeout.current = setTimeout(async () => {
      const params = { price }
      const result = await mutate(
        `/products/query`,
        prev => [...prev.filter((obj) => Object.keys(obj)[0] !== 'price'), params],
        { revalidate: false }
      )
    }, TIMEOUT_XL)
  }
  */

  return (
    <div className="by-price flex-col">
      <button  type="button" className="heading">By Price</button>
      {/* <input type="number" name="price" placeholder="Exact Price" onInput={handleChange}/> */}
      <MinMax />
    </div>
  )
}