import api from '@api/api'
import { setParams } from '@utils/sync';
import { CACHE } from './sync';

export function delay(ms, _resolve = true){
  return new Promise((resolve, reject) => {
    if (_resolve)
      setTimeout(resolve, ms)
    else
      setTimeout(reject, ms)
  });
};

export const promisify = async (callback, delayMs, ...args) => {
  if (delayMs) await delay(delayMs)
    return await new Promise((resolve, reject) => {
    try {
      resolve(callback(...args));
    } catch (err) {
      reject(err);
    }
  })
}

export const fetcher = async (url, params = []) => {
    params = setParams(params);
    // await delay(50_000)
    const result = (await api.get(`${url}?${params}`))?.data;
    return result;
}

export const fetchTotal = async (...args) => (await api.head(...args)).headers.get('Content-Length');

export async function cachedSrc(src){
  try {
    const found = CACHE.get(src);
    if (found) return found;
    const blob = await (await fetch(src)).blob();
    const burl = URL.createObjectURL(blob);
    CACHE.set(src, burl);
    return burl;
  } catch (err) {
    console.log(err)
  }
}