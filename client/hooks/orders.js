import useSwr from 'swr'
import useSwrMutation from 'swr/mutation'
import { useUser} from '@hooks/user'
import { useClientLocation} from '@hooks/location'
import api from '@api/api';
import { setParams } from '@utils/sync';
import { fetcher } from '@utils/async';
import { useCurrency } from './currencies';

export const useOrder = (slug= '', params = []) => {
  const path = params.length ? [`/orders`, ...params] : null;

 return useSwr(path, async () => fetcher(`/${url}${slug}`, params));
}

export const useOrdersMutation = (slug = '') => {
  const { data: location } = useClientLocation();
  const { data: currencies } = useCurrency()

  const path = location && currencies ? ['/orders', slug] : null;

  return useSwrMutation(path, async (_, { arg }) => {
    if (!arg) return;
    const { currency } = location;
    const { rates } = currencies;

    let orders = arg.products.map(({ _id: product, qty, price, photos, title }) => {
      return {
        product, qty, price, photo : photos[0].url, title,
        priceByCurrency: price * rates[currency], currency
      }
    });
    const { data: result } = await api.post(`/orders${slug}`, { ...arg, products: orders });
    return result;
  }, { revalidate: false, populateCache: true })

};