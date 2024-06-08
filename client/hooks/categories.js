import useSwr from 'swr'
import { fetcher } from '@utils/async'

export const useCategories = (params = {}) => {
  const swr = useSwr(
    ['/categories', params], 
    async () => fetcher(`/categories/search`, params)
  );
  return swr
}