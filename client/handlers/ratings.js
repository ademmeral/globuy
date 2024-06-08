import api from '@api/api'

export const rate = async (payload) => {
  if (!payload.userId) return null;
  const { data } = await api.post(`/ratings/single`, payload)
  return data;
}

export const getRatings = async (pid) => (await api.get(`/ratings?product=${pid}`))?.data