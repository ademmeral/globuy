import useSwr from 'swr'
import { fetcher } from '@utils/async';
import { delay } from '@utils/async'

export const useBrands = (params = {}) => {
  return useSwr(
    ['/brands', params], 
    async () => {
      // await delay(1_000_000)
      const result = await fetcher(`/brands/search`, params)
      return result;
    }
  );
};

