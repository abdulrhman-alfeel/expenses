import {ToastAndroid} from 'react-native';

export const tost = text =>
  ToastAndroid.showWithGravity(text, ToastAndroid.CENTER, ToastAndroid.LONG);

export const Tofixed = text =>
  parseInt(text)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
