import {View, Text, Platform, NativeModules} from 'react-native';
import {useSelector} from 'react-redux';
export default function useEnquryLanguag() {
  const {Languagesign} = useSelector(state => state.userReducer);

  const languageLocal = () => {
    return Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale
      : NativeModules.I18nManager.localeIdentifier;
  };
  //   ar
  const flexS = () => {
    const language = languageLocal();
    // console.log(language,'hhhhi')
    return language.startsWith('ar')
      ? Languagesign === 'en'
        ? 'flex-end'
        : 'flex-start'
      : Languagesign === 'en'
      ? 'flex-start'
      : 'flex-end';
  };
  const rowS = () => {
    const language = languageLocal();
    return language.startsWith('ar')
      ? Languagesign === 'en'
        ? 'row-reverse'
        : 'row'
      : Languagesign === 'en'
      ? 'row'
      : 'row-reverse';
  };
  const rowSexpception = () => {
    const language = languageLocal();
    return language !== 'ar'
      ? Languagesign === 'en'
        ? 'row-reverse'
        : 'row'
      : Languagesign === 'en'
      ? 'row'
      : 'row-reverse';
  };
  const Leftn = () => {
    const language = languageLocal();
    return language.startsWith('ar')
      ? Languagesign === 'en'
        ? 'flex-start'
        : 'flex-end'
      : Languagesign === 'en'
      ? 'flex-end'
      : 'flex-start';
  };

  const iconName = () => {
    const language = languageLocal();
    return language.startsWith('ar')
      ? Languagesign === 'en'
        ? 'arrow-alt-circle-right'
        : 'arrow-alt-circle-left'
      : Languagesign === 'en'
      ? 'arrow-alt-circle-left'
      : 'arrow-alt-circle-right';
  };
  const ExpiredPage = () => {
    const language = languageLocal();
    return language.startsWith('ar')
      ? Languagesign === 'en'
        ? 'Prodectmyfalse'
        : 'Prodectmytrue'
      : Languagesign === 'en'
      ? 'Prodectmytrue'
      : 'Prodectmyfalse';
  };
  const CurrentPage = () => {
    const language = languageLocal();
    return language.startsWith('ar')
      ? Languagesign === 'en'
        ? 'Prodectmytrue'
        : 'Prodectmyfalse'
      : Languagesign === 'en'
      ? 'Prodectmyfalse'
      : 'Prodectmytrue';
  };
  return {
    flexS,
    rowS,
    Leftn,
    rowSexpception,
    iconName,
    ExpiredPage,
    CurrentPage,
    languageLocal,
    
  };
}
