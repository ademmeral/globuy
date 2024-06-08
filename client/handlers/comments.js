import api from '@api/api'

export const getComments = async (pid) => {
  return (await api.get(`/comments?productId=${pid}`))?.data;
}
export const addComment = async (payload) => {
  if (!payload) return;
  const result = (await api.post(`/comments`, payload))?.data;
  return result;
}
export const deleteComment = async (cid) => {
  if (!cid) return;
  return (await api.delete(`/comments/${cid}`))?.data;
}
export const updateComment = async (cid, payload) => {
  if (!cid) return;
  return (await api.put(`/comments/${cid}`, payload)).data;
}