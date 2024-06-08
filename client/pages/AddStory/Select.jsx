import { useSales, useSalesQuery } from "@hooks/sales";
import { BiErrorCircle } from "react-icons/bi";
import { flatten } from "@utils/sync";
import { useUser } from '@hooks/user';
import { useEffect, useState } from "react";
import { STORY_SUBMIT_EVENTS as EVENTS} from '@utils/xtarget'

function SubmitButton({ length }) {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const handleDisabled = e => {
      setDisabled(e.detail && length)
    }
    EVENTS.on('SET_SUBMIT', handleDisabled)
    return () => {
      EVENTS.off('SET_SUBMIT', handleDisabled)
    }
  }, [])
  return (
    <button
      type="submit"
      className="btn-red btn self-center"
      disabled={disabled}
    >Submit
    </button>
  )
}

export default function Select({ children }) {
  const { data: user, isLoading: userLoading, error: userErr } = useUser('/auth'),
  { data: query, isLoading: queryLoading, error: queryErr } = useSalesQuery(),

  params = user?._id
    ? [
      { page: 1, limit: 10, userId: user?._id },
      ...flatten(query, q => q)
    ] : null,
  { data: sales, isLoading: salesLoading, isValidating: salesValidating, error: salesErr } = useSales(params),
  products = (sales || []).map(s => s?.product),
  title = 'Select a product that you already have gotten',
  noItem = 'No item found you have gotten';


  return (
    <div className="selection-wrapper wrapper grid">
      <h2>{
        salesLoading || salesValidating || queryLoading || userLoading
          ? 'Loading' : salesErr || queryErr || userErr
            ? <BiErrorCircle size={32}/>
            : sales?.length
              ? title
              : noItem
      }</h2>
      <ul>
        {
          products.map(p => (
            <li key={p?._id}>
              <label htmlFor={`select-product_${p._id}`} className="grid align-center" name='group1'>
                <span>{p.title}</span>
                <input type="radio" name={'product'} value={p._id} id={`select-product_${p._id}`} />
              </label>
            </li>
          ))
        }
      </ul>
      <SubmitButton length={sales?.length} />
    </div>
  )
}