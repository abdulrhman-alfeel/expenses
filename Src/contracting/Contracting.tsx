//import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  ToastAndroid,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Pressable,
  Animated,
  Modal,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Taskscshmonv from '../Taskscshmonv';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useSelector, useDispatch} from 'react-redux';
import {setTasksCONTRAT, setTasksCONTRATID} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PagerView from 'react-native-pager-view';
const Tab = createMaterialTopTabNavigator();
import uuid from 'react-native-uuid';
import Navbar from '../component/navbar';
import Subprodect from './Subprodect';
import Prodectmyfalse from './ProdectmyFalse';
import Prodectmytrue from './ProdectmyTrue';
// import {createStackNavigator} from '@react-navigation/stack';
import ExportExcel from '../component/ecelexport';
import Pdfexpense from '../component/pdfexpense';
import ModelsAbdu from '../component/modelsAbdu';
// import { locale } from "../Taskscsh";
import locales, {locale} from '../locale';
import usehtmlContractuse from '../functionuse/contractuse/htmlContractuse';
import useSwitchLanguage from '../functionuse/SwitchLanguage';
import {tost} from '../functionuse/contractuse/expTemplet';
import useEnquryLanguag from '../functionuse/EnquryLanguag';

// const Stack = createStackNavigator();

function MyTabBar({state, descriptors, navigation, position}) {
  // const fadeAnim = useRef(new Animated.Value(0)).current;
  // Animated.timing(fadeAnim, {
  //   toValue: 1,
  //   duration: 500,
  //   useNativeDriver: true, // <-- Add this
  // }).start();
  const dispatch = useDispatch();
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (route.name === 'Taskscshmonv') {
            dispatch(setTasksCONTRATID(uuid.v4()));
          }
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          // outputRange: [20,8,6],
          // extrapolate:'extend'
          outputRange: inputRange.map(i => (i === index ? 1 : 3)),
        });

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={
              route.name === 'Subprodect'
                ? {display: 'none'}
                : {
                    flex: 1,
                    marginHorizontal: RFValue(5),
                    justifyContent: 'center',
                    marginVertical: RFValue(10),
                    borderBottomWidth: isFocused ? RFValue(2) : 0,
                    padding: RFValue(5),
                    backgroundColor:
                      route.name === 'Taskscshmonv'
                        ? colors.YALO
                        : colors.ORANGE,
                    borderRadius: route.name === 'Taskscshmonv' ? 100 : 0,
                  }
            }>
            <Animated.Text
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                color:
                  route.name === 'Taskscshmonv' ? colors.CURRENT : colors.BLACK,
              }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export let searching = '';
export default function Contracting({navigation}) {
  const {tasksCONTRAT, Languagesign, darkmode, Language} = useSelector(
    state => state.userReducer,
  );
  const {Leftn, ExpiredPage, CurrentPage} = useEnquryLanguag();
  const dispatch = useDispatch();
  const [paglocle, setPagLaocl] = useState(false);
  const [bellmodel, setBellmodel] = useState(false);
  const [meneu, setMenu] = useState(false);
  const [search, setSearch] = useState('');
  const [dark, setDark] = useState(false);
  const {htmlContractuse, arraPrssAll} = usehtmlContractuse();
  const {changingLanguage} = useSwitchLanguage();
  //  locale = paglocle ?'ar_MA':'en_US';

  useEffect(() => {
    getTasks();
    searching = search;
    // addlangogl()
  }, [search]);
  const data = useMemo(() => {
    locales(!paglocle ? 'ar_MA' : 'en_US');
  }, [paglocle]);

  const getTasks = async () => {
    await AsyncStorage.getItem('TasksCONTRAT').then(tasks => {
      const Taskstody = JSON.parse(tasks);
      if (Taskstody && typeof Taskstody === 'object') {
        dispatch(setTasksCONTRAT(Taskstody));
      }
    });
  };

  const LagnguageSwitch = () => {
    if (Languagesign === 'ar') {
      changingLanguage('language', {language: 'en'});
    } else {
      changingLanguage('language', {language: 'ar'});
    }
  };
  const darkSwitch = () => {
    if (darkmode === 'light') {
      changingLanguage('dark', {type: 'dark'});
    } else {
      changingLanguage('dark', {type: 'light'});
    }
  };
  return (
    <>
      <Modal
        visible={meneu}
        transparent
        onRequestClose={() => setMenu(false)}
        animationType="fade"
        hardwareAccelerated={true}>
        <TouchableOpacity
          onPress={() => setMenu(false)}
          style={styles.centered_menu}>
          <Pressable
            onPress={() => setMenu(true)}
            style={[styles.menu_mod1al, {alignSelf: Leftn()}]}>
            <View style={styles.menu_body}>
              {tasksCONTRAT.length > 0 ? (
                <Pdfexpense
                  onprestyle={styles.bottom_1}
                  text={styles.text_menu}
                  options={meneu ? htmlContractuse(locale) : {}}
                  onpressfale={() => {
                    setMenu(false);
                  }}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    tost(Language.you_have_no_recorded_expenses);
                    setMenu(false);
                  }}
                  style={styles.bottom_1}>
                  <Text style={styles.text_menu}>{Language.PDF_Converter}</Text>
                </TouchableOpacity>
              )}
              {tasksCONTRAT.length > 0 ? (
                <ExportExcel
                  onprestyle={styles.bottom_1}
                  text={styles.text_menu}
                  caseuTarg={`Exprenss_AllCovente_${new Date().toDateString()}`}
                  options={arraPrssAll(locale)}
                  onpressecel={() => {
                    setMenu(false);
                  }}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    tost(Language.you_have_no_recorded_expenses);

                    setMenu(false);
                  }}
                  style={styles.bottom_1}>
                  <Text style={styles.text_menu}>
                    {Language.excel_Converter}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => {
                  setBellmodel(true);
                  setMenu(false);
                }}
                style={styles.bottom_1}>
                <Text style={styles.text_menu}>
                  {Language.Connect_With_support}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ModulsData');
                  setMenu(false);
                }}
                style={styles.bottom_1}>
                <Text style={styles.text_menu}>
                  {Language.Instructions_Guidelines}
                </Text>
              </TouchableOpacity>
              <Text>{Language.change_the_language}</Text>
              <Switch
                value={paglocle}
                onChange={() => {
                  setPagLaocl(!paglocle);
                  LagnguageSwitch();
                }}
              />
              <Text>{Language.ChangeDarkMode}</Text>
              <Switch
                value={dark}
                onChange={() => {
                  setDark(!dark);
                  darkSwitch();
                }}
              />
            </View>
          </Pressable>
        </TouchableOpacity>
      </Modal>
      {bellmodel ? (
        <ModelsAbdu setBellmodel={setBellmodel} bellmodel={bellmodel} />
      ) : null}

      <Navbar
        onprsslist={() => setMenu(true)}
        search={search}
        onChange={value => setSearch(value)}
      />
      <PagerView style={styles.pagerView} initialPage={0}>
        <Tab.Navigator
          tabBar={props => <MyTabBar {...props} />}
          initialRouteName="Prodectmyfalse"
          screenOptions={({route}) => ({
            tabBarLabelStyle: {
              color: colors.BLACK,
              fontFamily: fonts.CAIROSEMILBOLD,
            },
            tabBarIndicatorStyle: {backgroundColor: colors.PREMREY},
            tabBarStyle: route.name === 'Subprodect' ? {display: 'none'} : null,
          })}>
          <Tab.Screen
            name={
              CurrentPage() === 'Prodectmyfalse'
                ? 'Prodectmyfalse'
                : 'Prodectmytrue'
            }
            component={
              CurrentPage() === 'Prodectmyfalse'
                ? Prodectmyfalse
                : Prodectmytrue
            }
            options={{
              tabBarLabel:
                CurrentPage() === 'Prodectmyfalse'
                  ? Language.Current_expenses
                  : Language.Expired_Expenses,
            }}
          />
          <Tab.Screen name="Subprodect" component={Subprodect} />
          <Tab.Screen
            name="Taskscshmonv"
            component={Taskscshmonv}
            options={{
              tabBarLabel: Language.Add_an_account,
            }}
          />
          <Tab.Screen
            name={
              ExpiredPage() === 'Prodectmytrue'
                ? 'Prodectmytrue'
                : 'Prodectmyfalse'
            }
            component={
              ExpiredPage() === 'Prodectmytrue' ? Prodectmytrue : Prodectmyfalse
            }
            options={{
              tabBarLabel:
                ExpiredPage() === 'Prodectmytrue'
                  ? Language.Expired_Expenses
                  : Language.Current_expenses,
            }}
          />
        </Tab.Navigator>
      </PagerView>
    </>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },

  senction3: {
    padding: RFValue(5),
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.GREYD,
  },
  conter: {
    borderBottomWidth: 3,
    borderBottomColor: colors.WHITE,
    borderRadius: 2,
  },
  text: {
    color: colors.WHITE,
  },
  body: {
    // flex: 1,
    //borderWidth:RFValue(10),
  },
  plus: {
    position: 'absolute',
    top: RFValue(20),
  },
  buttom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: RFValue(20),
    height: RFValue(50),
    borderRadius: RFValue(60),
    position: 'absolute',
    top: -10,
    zIndex: 1,
    // bottom:RFValue(30),
    // right:RFValue(-50),
    backgroundColor: colors.GREYD,
  },
  tasksbox: {
    flexDirection: 'row',
    width: RFValue(290),
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(8),
    padding: RFValue(1),
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: RFValue(10),
    elevation: RFValue(1),
  },
  item_row: {
    width: RFValue(250),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkTask: {
    position: 'relative',
    marginHorizontal: RFValue(5),
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: RFValue(60),
    height: RFValue(60),
    borderRadius: RFValue(60),
    bottom: RFValue(30),
    right: RFValue(-50),

    borderColor: colors.BLACK,
  },
  item_body: {
    flex: 1,
  },
  delet: {
    width: RFValue(50),
    height: RFValue(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  texttask: {
    color: '#000000',
    fontSize: RFValue(16),
    margin: RFValue(2),
  },
  textdesc: {
    color: '#999999',
    fontSize: RFValue(12),
    margin: RFValue(2),
  },

  centered_menu: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: RFValue(40),
    top: RFValue(5),

    backgroundColor: '#00000009',
  },
  menu_mod1al: {
    width: RFValue(150),
    backgroundColor: colors.WHITE,
    height: RFValue(200),
    borderRadius: RFValue(10),
    marginHorizontal: RFValue(10),
    top: RFValue(-30),
  },
  menu_body: {
    flex: 1,
    height: RFValue(150),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  menu_button: {
    flexDirection: 'row',
    height: RFValue(50),
  },
  bottom_1: {
    width: '100%',
    marginVertical: RFValue(5),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.BACKGRUONDPAG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_menu: {
    fontFamily: fonts.CAIROREGULARK,
    color: colors.CURRENT,
  },
  centered_Abdu: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000099',
  },
  Abdu_mod1al: {
    width: RFValue(300),
    backgroundColor: colors.WHITE,
    height: RFValue(150),
    borderRadius: RFValue(10),
    marginHorizontal: RFValue(10),
    top: RFValue(-30),
    alignSelf: 'center',
  },
  Abdu_body: {
    flex: 1,
    height: RFValue(150),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  Abdu_button: {
    flexDirection: 'row',
    height: RFValue(50),
  },
  bottom_1_Abdu: {
    width: '50%',
    marginVertical: RFValue(5),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRadius: RFValue(15),
    backgroundColor: colors.BACKGRUONDPAG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_Abdu: {
    fontFamily: fonts.CAIROREGULARK,
    color: colors.CURRENT,
  },
});

/*
 
 
 
 
 
 
<Text>welcome {name}</Text>
     <Text>AGE {age}</Text>
     <TextInput
     style={style.input}
     onChangeText={(value)=>setName(value)}
     placeholder='Enter'
     value={name}
     />
     <TextInput
     style={style.input}
     onChangeText={(value)=>setAge(value)}
     placeholder='Enter'
     value={age}
     />
     <ConstomBtom 
     title="updut"
     color='#f0f'
     onpress={uputfuncbtom}/>
     <ConstomBtom 
     title="remove"
     color='#555'
     onpress={remofuncbtom}/>
*/
