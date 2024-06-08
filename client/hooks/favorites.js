import useSwr from 'swr'
import { useUser } from './user'
import { useClientLocation } from './location';
import { useCurrency } from './currencies';
import { toLocaleCurrency } from '@utils/sync';
import { BASE_CURRENCY } from './products';

export const useFavs = () => {
  const { data: user } = useUser('/auth')
  const { data: location } = useClientLocation('/location')
  const { data: currencies } = useCurrency();

  const swr = useSwr(
    user && location && currencies ? '/favs' : null,
    () => user.favorites
      .map(f => {
        const { countryCode, currency: to } = location;
        const { rates } = currencies;

        const config = {
          from: BASE_CURRENCY, to, countryCode,
          amount: rates[BASE_CURRENCY] * rates[to],
        };

        const amount = config.amount * f.product.price;
        const priceByLocation = toLocaleCurrency({ ...config, amount })
        return ({ ...f, product: { ...f.product, priceByLocation } });
        
      }),
  );
  return { ...swr, user }
}