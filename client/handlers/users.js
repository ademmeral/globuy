import api from '@api/api';

export const register = async (url, formData) => {
  return await api.post(url, formData);
}
