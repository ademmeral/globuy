import useSwr from 'swr'
import { fetcher } from '@utils/async'

export const useUser = (params) => useSwr(`/user${params}`, fetcher)