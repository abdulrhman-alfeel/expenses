import React ,{createContext} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeModules, Platform } from 'react-native';

export let locale=   Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;
;
const locales =(localet)=>{
return locale = localet;
};
export  default locales;