import api from '@api/api';
import { mutate } from 'swr'

export const logout = async () => {
  await api.get('user/logout')
  await mutate('/user/auth', null, { rollbackOnError: true })
  await mutate('/favs', null, { rollbackOnError: true })
  return null;
}
export const login = async (formData) => {
  const { data } = await api.post('/user/login', formData);
  await mutate('/user/auth', data, { rollbackOnError: true })
  await mutate('/favs', data.favorites, { rollbackOnError: true })
}
export const register = async (formData) => {
  const { data } = await api.post('/user/register', formData);
  mutate('/user/auth', data, { rollbackOnError: true })
}

export const auth = async (url) => (await api.get(url).data);