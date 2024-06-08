import useSwr from 'swr'
import { fetcher } from '@utils/async'
import { useUser } from './user';
import { useClientLocation } from './location';
import { useCurrency } from './currencies';
import { toLocaleCurrency } from '@utils/sync';
import { delay } from '@utils/async'

export const BASE_CURRENCY = 'USD';

export const useProductsQuery = () => useSwr('/products/query', () => []);

export const useProducts = (slug = '', params, shouldFetch = true) => {
  const { data: location } = useClientLocation('/location')
  const { data: currencies } = useCurrency();
  const path = shouldFetch && params?.length && location && currencies 
    ? [`/products`, params]
    : null;

  return useSwr(
    path,
    async () => {
      // await delay(1_000_000_000)
      const { countryCode, currency: to } = location,
      { rates } = currencies,
      data = await fetcher(`/products${slug}`, params),
      config = {
        from: BASE_CURRENCY, to, countryCode,
        amount: rates[BASE_CURRENCY] * rates[to],
      };

      return data.map(p => {
        const amount = config.amount * p.price;
        const priceByLocation = toLocaleCurrency({ ...config, amount })
        return ({ ...p, priceByLocation });
      })
    }
  );
};

export const useSingleProduct = (pid = '') => {
  const { data: location } = useClientLocation('/location')
  const { data: currencies } = useCurrency('/currency');
  
  return useSwr(
    location && currencies && pid ? `/products/${pid}` : null, 
    async (url) => {
      const { countryCode, currency: to } = location
      const { rates } = currencies;

      const config = {
        from: BASE_CURRENCY, to, countryCode,
        amount: rates[BASE_CURRENCY] * rates[to],
      }

      const data = await fetcher(url);
      const amount = config.amount * data.price;
      const priceByLocation = toLocaleCurrency({ ...config, amount })

      return { ...data, priceByLocation };
    }
  );
};