import useSwr from 'swr'
import useSwrMutation from 'swr/mutation'
import api from '@api/api';
import { fetcher } from '@utils/async';
import { useClientLocation } from '@hooks/location';
import { useOrder } from './orders';

export const usePayments = (_params = []) => {
  const { data: order } = useOrder()
  const path = order ? ['/payments', ..._params, { order: order._id }] : null;
  return useSwr(
    path,
    async () => fetcher(`/payments`, path)
  )
};

export const usePaymentsMutation = (params = '') => {

  return useSwrMutation(['/payments', params], async (_, { arg : orders }) => {
    if (!orders) return;
    const { data } = await api.post('/payments', { data: orders });
    return data;
  }, { revalidate: false, populateCache: true });
}

export const useSuccessPayment = (_params = []) => {
  const { data: payments } = usePayments();
  const { data: location } = useClientLocation();
  const path = payments && location ? ['/payments/success', ..._params] : null;

  return useSwr(path, () => {
    const { countryCode } = location;
    // error handling, when a currency is different from any others

    const { currency, transactionId, method, tax, shippingPrice } = payments[0];
    const sum = payments.reduce((acc, curr) => acc + (curr.priceByCurrency * curr.qty), 0);
    const converted = new Intl.NumberFormat(
      countryCode,
      { style: 'currency', currency }
    ).format(sum);
    const totalItem = payments.reduce((acc, curr) => acc + curr.qty ,0)

    const result = { 
      sum: converted, currency, totalItem, 
      transactionId, method, tax, shippingPrice
    };
    return result;

  });
}