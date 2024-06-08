import { useRef } from "react";
import { useSWRConfig } from "swr";
import { TIMEOUT_XL } from '@constants/constants';

export default function Search(){
  const { mutate } = useSWRConfig(),
  timeout = useRef(0),
    handleChange = e => {
      const title = e.currentTarget.value;
      clearTimeout(timeout.current);
      timeout.current = setTimeout(async () => {
        await mutate(
          '/sales/query',
          prev => prev.filter(obj => !Object.keys(obj).includes('title')).concat({ title }),
          { revalidate: false })
      }, TIMEOUT_XL)
  }
  return (
    <div className="search">
      <input type="search" placeholder="Search..." onInput={handleChange}/>
    </div>
  )
}
