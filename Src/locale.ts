import {NativeModules, Platform} from 'react-native';

export let locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;
const locales = localet => {
  return (locale = localet);
};
export default locales;
