import { mutate } from 'swr';

const config = { countryCode: 'TR', currency: 'TRY' }

export const getStorage = (name) => 
  JSON.parse(window.localStorage.getItem(name)) || [];

export const setStorage = (name, payload) => {
  let cart = getStorage(name);
  const found = cart.find(item => item._id === payload._id);

  if (!found) {
    cart = cart.concat([{ ...payload, qty: 1 }]);
    window.localStorage.setItem(name, JSON.stringify(cart));
  } else setQty(name, payload._id, found.qty + 1);
  mutate(`/${name}`, cart);
  mutate(`/${name}/sum`, () => handleSum(config));
  return cart;
}

export const deleteFromStorage = (name, id) => {
  const filtered = getStorage(name).filter(prd => prd._id !== id);
  window.localStorage.setItem('cart', JSON.stringify(filtered));
  mutate(`/${name}`, filtered);
  mutate(`/${name}/sum`, () => handleSum(config));
  return filtered;
}

export const setQty = (name, id, qty) => {
  const cart = getStorage(name)
  const idx = cart.findIndex(item => item._id === id);
  cart[idx] = { ...cart[idx], qty }
  window.localStorage.setItem(
    name, 
    JSON.stringify(cart)
  );
  mutate(`/${name}`, cart);
  mutate(`/${name}/sum`, () => handleSum(config));
}

export const handleSum = () => {
  const products = getStorage('cart');
  const sum = products.reduce((acc, p) => {
    return acc + (+p.price * +p.qty);
  }, 0).toFixed(2);
  return sum;
}