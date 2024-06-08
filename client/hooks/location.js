import useSwr from 'swr'
import { getLocation } from '@handlers/location';

export const useClientLocation = () => useSwr('/location', getLocation)