import { toast } from 'react-toastify';
import qs from 'qs';
import { MEDIA } from './media';

export const camelCase = (text) =>
  `${text.split(' ')[0]}${text.split(' ')[1][0].toUpperCase()}${text.split(' ')[1].slice(1)}`;

export function $enum(object){
  const enumerated = {};
  for (const k in object){
    if (isNaN(object[k]))
      throw new Error('Enum should consist of key/number pairs!');
    enumerated[k] = object[k]
    enumerated[object[k]] = k;
  }
  object = null;
  return enumerated;
}

export const showToast = {
  id: 1,
  loading : (text) => {
    showToast.id = toast.loading(text || 'Please wait...')
  },
  updateSuccess: (text) => {
    toast.update(showToast.id, {
      type: 'success',
      render: text || 'Updated successfully 🙃',
      isLoading : false,
      autoClose : 2000
    })
  },
  updateError : (text) => {
    toast.update(showToast.id, {
      type: 'error',
      render: text || 'An error has occured 😒',
      isLoading: false,
      autoClose : 2000
    })
  },
  success : (text) => {
    toast.success(text || 'Success 🙃')
  },
  error : (text) => {
    toast.error(text || 'An error has occured 😒')
  },
  warn : (text = '') => {
    toast.warn(
      text || 'It is rainy today. Do not forget to take you umbrella 🌧️',
      { position: 'top-right', autoClose : 24000 }
    )
  },
  promise: (fnWithCall, pending, success, error) => {
    toast.promise(
      fnWithCall,{
        pending : pending || 'Please wait...',
        success : success || 'Updated successfully 🙃',
        error : error || 'An error has occured 😒'
      }
    )
  },
  dissmiss: () => { toast.dismiss(showToast.id) },
  dissmissAll: () => { toast.dismiss() },
}

export const id = () => crypto.randomUUID().replaceAll('-', '');

export const exclude = (object, ...args) => {
  if (Array.isArray(object))
    return object.filter(item => !args.includes(item))
  else if (object.constructor.name === 'Object')
    return Object.fromEntries(
      Object.entries(object)
        .filter(([k, v]) => !args.includes(k)
        )
    )
  else return object;
}
export const includes = (object, ...args) => {
  if (Array.isArray(object))
    return object.filter(item => args.includes(item))
  else if (object.constructor.name === 'Object')
    return Object.fromEntries(
      Object.entries(object)
        .filter(([k, v]) => args.includes(k)
        )
    )
  else return object;
}

export const lineClamp = (text, limit) => {
  if (!text || isNaN(limit)) 
    throw new Error('Text must be in type of string and limit, number!');
  if (text.length <= limit) return text;
  const handled = `${text.slice(0, +limit + 1).trim()}`;
  return handled.endsWith('.') ? `${handled}..` : `${handled}...`
}

export const calcRating = (ratings /* array */) => {
  if (!ratings?.length) return 0;
    const total = ratings.reduce((acc, curr) => acc + curr.star, 0);
    const average = total / ratings.length;
    const scaledRating = (average / 5) * 5;
    
    const result = Math.min(Math.max(scaledRating, 0), 5);
    return +result.toFixed(1);
}
export const calcSum = (products = []) => {
  const sum = products.reduce((acc, p) => acc + +p.price * p.qty, 0);

  return Intl.NumberFormat('tr-TR', {
    style : 'currency',
    currency : 'TRY'
  }).format(sum);
}
export const capitalize = text => {
  if (!text) throw new Error('Parameter must be in type of string!');
  return text[0].toUpperCase() + text.slice(1);
}
export const capitalizeAll = text => {
  if (!text) throw new Error('Parameter must be in type of string!');
  return text.split(' ').map(capitalize).join(' ');
}

export const flatten = (object, callback) => [].concat(object).flatMap(callback);

export const toLocaleCurrency = (config /* to, amount, countryCode */) => {
  const { to, amount, countryCode, fixTo } = config;
  if (!( amount && !isNaN(amount) && to && countryCode)) return;
  const fixed = +amount.toFixed(fixTo || 2);
  const converted =  new Intl.NumberFormat(
    countryCode,
    { style: 'currency', currency: to }
  ).format(fixed);
  return converted
}

export function cleanObject(obj){
  if (!(obj instanceof Object)) return;
  return Object.fromEntries(
    Object.entries(obj).filter(([k, v]) => !!v)
  );
}

export const setParams = params => 
  params instanceof Array
    ? params.map(
      p => decodeURIComponent(qs.stringify(cleanObject(p)))
    ).join('&')
    : params instanceof Object
      ? decodeURIComponent(qs.stringify(cleanObject(params)))
      : '';

export class CustomError extends Error{
  constructor(name, message){
    super(message);
    this.name = name;
    this.message = message;
  }
}

export const pick = (object /* object literal */, props) => {
  if (!(object.constructor.name !== 'Object')) 
    throw new Error('Parameter must be an object literal');
  return Object.fromEntries(
    Object.entries(object).filter(([k,v]) => props.includes(k))
  )
}

export function itemsAreSame(array){
  if (!Array.isArray(array))
    throw new Error('Parameter must be in type of array!');

  for (let i = 0; i < array.length; i++){
    const el = JSON.stringify(array.splice(i, 1)[0]);
    for (const it of array)
      if (el !== JSON.stringify(it)) return false;
  }
  return true;
}

export const pickFloatFromString = (string, decimalLength = 2) => {
  const digits = string.match(/\d+/g).join('').slice(0, -decimalLength);
  const decimals = string.match(/\d+/g).join('').slice(-decimalLength);
  return parseFloat(`${digits}.${decimals}`);
}

export const CACHE = new Map();

export const timer = (callback, duration) => {
  let id,
  startTime = performance.now(),
  triggerTime = performance.now(),
  elapsedTotal = 0;

  const run = currentTime => {
    const elapsed = currentTime - startTime;
    if (elapsed >= duration)
    {
      callback(elapsedTotal, triggerTime)
      startTime = currentTime;
      elapsedTotal += elapsed;
    }
    id = requestAnimationFrame(run);
  }
  return {
    start: function () {
      startTime = performance.now();
      id = requestAnimationFrame(run);
    },
    stop: () => { cancelAnimationFrame(id) },
    reset : () => {
      cancelAnimationFrame(id)
      startTime = performance.now(),
      triggerTime = performance.now(),
      elapsedTotal = 0;
    },
    end: (deadline) => {
      cancelAnimationFrame(id);
      elapsedTotal = deadline;
    }
  }
}

export function setPhotos(account, photos, transformType){
  return photos.map(
    ph => {
    try {
      let modified = `/${MEDIA.ACCOUNT(account)}/${MEDIA[transformType]}/${ph.public_id}.${ph.format}`
      modified = `${MEDIA.BASE_PATH}/${modified}`.replace(/\/{2,}/g, '/');
      return modified
    } catch (err) {
      console.log(ph, err)
    }
  }).filter(Boolean)
}