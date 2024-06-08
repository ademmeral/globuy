import useSwr from 'swr'
import { getRatings } from '@handlers/ratings';

export const useRatings = (product, shouldFetch = false) => {
  const { _id: pid } = product;
  const swr = useSwr(pid ? `${pid}/ratings` : null, async () => {
    return shouldFetch 
      ? await getRatings(pid)
      : product.ratings;
  });
  return swr;
}