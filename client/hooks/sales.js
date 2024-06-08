import useSwr from 'swr'
import { fetcher } from '@utils/async';

export const useSales = (params = []) =>
  useSwr(params ? ['/sales', ...params] : null, async () => fetcher(`/sales`, params));

export const useSalesQuery = (params = []) => {
  return useSwr(`/sales/query`, async () => params);
}