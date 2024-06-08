import api from '@api/api';

export const MEDIA = {
  BASE_PATH : `https://res.cloudinary.com`,
  ACCOUNT : (key) => 
    key === 'user' 
      ? 'doqhuzapr' : key === 'product' 
        ? 'duoklvmeh' : 'duoklvmeh',
  ACTION : `image/upload`,
  THUMB : `c_fill,h_40,w_40`, 
  SLIDER : `c_fill,h_420,ar_4:3`,
  CARD : `c_fill,h_96,w_96`,
  PLACEHOLDER: 'c_fill,h_40,w_40,e_blur:400,q_25,ar_1:1',
  STORY : 'c_fill,w_240,ar_3:5',
}

export function capture(vid){
  const canvas = document.createElement('canvas'),
  video = document.getElementById(vid);
  canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  return canvas;
}