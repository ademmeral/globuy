import api from '@api/api'

export const getFavorites = async uid => (await api.get(`/favorites?userId=${uid}`)).data;
export const getFavoritesTotal = async uid => +(await api.head(`/favorites?userId=${uid}`)).headers.get('Content-Length');

export const addToFavs = async (payload) => {
  if (!payload) return;
  const { data } = await api.post(`/favorites`, payload);
  return data
}
export const delFromFavs = async (fid /* fav id */) => {
  if (!fid) return;
  const { data } = await api.delete(`/favorites/${fid}`);
  return data
}

export const getSingleFav = async (fid) => (await api.get(`/favorites/${fid}`)).data;

export const toggleFav = async (payload) => (await api.patch(`/favorites`, payload)).data