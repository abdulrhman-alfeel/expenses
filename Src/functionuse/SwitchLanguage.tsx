import Text_Arabic from '../data/DataTextArabic';
import Text_English from '../data/DataTextEnglish';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useEffect} from 'react';

import {setLanguage, setLanguageSign, setDark} from '../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
export default function useSwitchLanguage() {
  const {Language} = useSelector(state => state.userReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLanguage(Text_Arabic));
    getLanguage('language');
    getLanguage('dark');
  }, []);

  const dolars = [
    {label: Language.AmericandollarShort, value: 1},
    {label: Language.RialSudiaShort, value: 2},
    {label: Language.RialYemeniShort, value: 3},
  ];
  const getLanguage = key => {
    try {
      AsyncStorage.getItem(key).then(value => {
        const newIron = JSON.parse(value);
        if (newIron && typeof newIron === 'object') {
          if (key === 'language') {
            dispatch(setLanguageSign(newIron?.language));
            if (newIron?.language === 'en') {
              dispatch(setLanguage(Text_English));
            } else {
              dispatch(setLanguage(Text_Arabic));
            }
          } else {
            dispatch(setDark(newIron.type));
          }
        }
        console.log(newIron, 'get');
      });
    } catch (err) {
      console.log(err);
    }
  };
  const changingLanguage = (key, newIron) => {
    try {
      AsyncStorage.setItem(key, JSON.stringify(newIron)).then(() => {
        if (key === 'language') {
          dispatch(setLanguageSign(newIron.language));
          if (newIron.language === 'en') {
            dispatch(setLanguage(Text_English));
          } else {
            dispatch(setLanguage(Text_Arabic));
          }
        } else {
          dispatch(setDark(newIron.type));
        }
      });
      console.log(newIron);
    } catch (err) {
      console.log(err);
    }
  };

  return {changingLanguage, dolars};
}
