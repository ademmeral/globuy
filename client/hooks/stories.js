import useSwr from 'swr'
import useSwrMutation from 'swr/mutation'
import { fetcher } from '@utils/async';
import api from '@api/api';

export const useStories = (params = []) =>
  useSwr(['/stories', ...params], async () => fetcher(`/stories`, params), { revalidateOnMount: true });

export const useSingleStory = (sid) => 
  useSwr(['/stories/', sid], async () => fetcher(`/stories/${sid}`));

export const useStoriesMut = () => {
  return useSwrMutation(
    '/stories/single',
    async (_, { arg: payload }) => {
      const { data: result } = await api.post('/stories/single', payload)
      return result;
    }
  );
}