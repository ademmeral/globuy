import { SWRConfig } from 'swr';
import { fetcher } from '@utils/async'

const options = {
  revalidateIfStale: false,
  // revalidateOnMount : false,
  revalidateOnFocus : false,
  revalidateOnReconnect : false,
  // refreshInterval: 2000 * 60,
  errorRetryCount : 2,
  // keepPreviousData : true,
  // fetcher
}

function SwrConfigProvider({ children }) {
  return (
    <SWRConfig value={options}>
      {children}
    </SWRConfig>
  )
}

export default SwrConfigProvider