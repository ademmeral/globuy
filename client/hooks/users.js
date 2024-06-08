import useSwr from 'swr';
import { fetcher, totalFetcher } from '@utils/async'

export const useUsers = (params) => useSwr(`/users${params}`, fetcher);
export const useUsersTotal = (params) => useSwr(`/users${params}`, totalFetcher);