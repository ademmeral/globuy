import useSwr from 'swr'
import useSWRMutation from 'swr/mutation'
import { getStorage } from '@handlers/cart'
import { handleSum } from '@handlers/cart';
import { useClientLocation } from './location';
import { useCurrency } from './currencies';
import { toLocaleCurrency } from '@utils/sync';
import { BASE_CURRENCY as from } from './products' 

export const useCart = () => useSwr('/cart', async () => getStorage('cart'));

export const useCartMutation = () => {
  return useSWRMutation('/cart', () => {
    window.localStorage.removeItem('cart')
  })
}

export const useCartSum = () => {
  const { data: location } = useClientLocation('/location');
  const { data: currencies } = useCurrency('/currency');
  const path = location && currencies ? '/cart/sum' : null;
  
  return useSwr(path, () => {
    const { countryCode, currency: to } = location
    const { rates } = currencies;
    const amount = (handleSum(countryCode, to)) * rates[to];
    const config = { to, countryCode, amount, from }
    const localized = toLocaleCurrency(config)
    return localized
  }, { revalidateOnMount: true });
}