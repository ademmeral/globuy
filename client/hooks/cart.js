import useSwr from 'swr'
import useSWRMutation from 'swr/mutation'
import { getStorage } from '@handlers/cart'
import { handleSum } from '@handlers/cart';
import { useClientLocation } from './location';
import { useCurrency } from './currencies';
import { toLocaleCurrency } from '@utils/sync';
import { BASE_CURRENCY as from } from './products' 

export const useCart = () => {
  const location = useClientLocation();
  const currencies = useCurrency();
  const path = location.data && currencies.data ? '/cart' : null
  const swr = useSwr(path, async () => {
    const items = getStorage('cart');
    const result = items.map(i => {

      const { data: loc } = location;
      const { data: curr } = currencies;

      const config = { 
        to: loc.currency, 
        amount: +i.price * curr.rates[loc.currency],
        countryCode : loc.countryCode
      };
      return { ...i, priceByLocation: toLocaleCurrency(config) }
    });
    return result;
  });
  return { ...swr, location, currencies }
};

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
    const amount = +(handleSum(countryCode, to) * rates[to]).toFixed(2);
    const localized = toLocaleCurrency({ to, countryCode, amount })
    return localized
  }, { revalidateOnMount: true });
}