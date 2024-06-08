import useSwr, { useSWRConfig } from 'swr'
import useSwrMutation from 'swr/mutation'
import { useUser} from '@hooks/user'
import { useClientLocation} from '@hooks/location'
import api from '@api/api';
import { pickFloatFromString, setParams } from '@utils/sync';
import { fetcher } from '@utils/async';

export const useOrder = (params = []) => {
  const { data: usr } = useUser('/auth');
  const url = usr ? `/orders/single` : null;
  params = url ? [...params, { userId: usr._id }] : []
  const path = params.length ? [`/orders/latest`, ...params] : null;

 return useSwr(path, async () => fetcher(url, params));
}

export const useOrdersMutation = (params = []) => {
  const { data: user } = useUser('/auth');
  const { data: location } = useClientLocation();

  params = user ? [...params, { userId: user._id }] : []
  params = setParams(params);
  const path = user && location ? ['/orders', params] : null;

  return useSwrMutation(path, async (_, { arg: products }) => {
    if (!products) return;
    let orders = products.map(({ _id: product, qty, priceByLocation, price }) => {
      return {
        user: user._id,
        product, qty, price,
        priceByCurrency: pickFloatFromString(priceByLocation),
        currency: location.currency,
        method: 'card',
        address: "47 W 13th St, New York, NY 10011, USA",
      }
    });
    const { data: result } = await api.post(`/orders?${params}`, { data: orders });
    orders = orders.map(o => {
      const found = result.find(ord => ord.product === o.product)
      return { ...o, order: found?._id }
    })
    return orders;
  }, { revalidate: false, populateCache: true })

};