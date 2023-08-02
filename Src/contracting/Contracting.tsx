//import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  ToastAndroid,
  Text,
  StyleSheet,
  Switch,
  Image,
  TouchableOpacity,
  Pressable,
  Animated,
  Modal

} from "react-native"
import { RFValue } from "react-native-responsive-fontsize";
import Taskscshmonv from '../Taskscshmonv';
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";
import { useSelector, useDispatch } from "react-redux"
import { setTasksCONTRAT, setTasksCONTRATID } from '../redux/actions'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PagerView from 'react-native-pager-view';
const Tab = createMaterialTopTabNavigator();
import uuid from 'react-native-uuid';
import Navbar from '../component/navbar';
import Subprodect from './Subprodect'
import Prodectmyfalse from './ProdectmyFalse'
import Prodectmytrue from './ProdectmyTrue'
import { createStackNavigator } from '@react-navigation/stack';
import ExportExcel from '../component/ecelexport';
import Pdfexpense from '../component/pdfexpense';
import ModelsAbdu from '../component/modelsAbdu'
import ModulsData from '../Modulsdata'
import { NativeModules, Platform } from 'react-native';
// import { locale } from "../Taskscsh";
import  locales,{locale} from "../locale";

// const locale =
//   Platform.OS === 'ios'
//     ? NativeModules.SettingsManager.settings.AppleLocale
//     : NativeModules.I18nManager.localeIdentifier;

const Stack = createStackNavigator();




function MyTabBar({ state, descriptors, navigation, position }) {
  // const fadeAnim = useRef(new Animated.Value(0)).current;
  // Animated.timing(fadeAnim, {
  //   toValue: 1,
  //   duration: 500,
  //   useNativeDriver: true, // <-- Add this
  // }).start();
  const dispatch = useDispatch();
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (route.name === "Taskscshmonv") {
            dispatch(setTasksCONTRATID(uuid.v4()));
          }
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });

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
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}

            style={route.name === "Subprodect" ? { display: 'none' } : {
              flex: 1, marginHorizontal: RFValue(5), justifyContent: 'center', marginVertical: RFValue(10), borderBottomWidth: isFocused ? RFValue(2) : 0, padding: RFValue(5),
              backgroundColor: route.name === 'Taskscshmonv' ? colors.YALO : colors.ORANGE,
              borderRadius: route.name === 'Taskscshmonv' ? 100 : 0
            }}
          >
            <Animated.Text style={{ justifyContent: 'center', alignSelf: 'center', fontFamily: fonts.CAIROREGULARK, color: route.name === 'Taskscshmonv' ? colors.CURRENT : colors.BLACK }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


export let searching = ''
export default function Contracting({ navigation }) {
  const {tasksCONTRAT } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [paglocle, setPagLaocl] = useState(false);
  const [bellmodel, setBellmodel] = useState(false);
  const [meneu, setMenu] = useState(false);
  const [count, setCount] = useState(0)
  const [search, setSearch] = useState('');
//  locale = paglocle ?'ar_MA':'en_US';





  useEffect(() => {
    getTasks();
    searching = search;
    console.log(locale);
    // addlangogl()
  }, [search])
const data = useMemo(()=>{  locales(!paglocle ?'ar_MA':'en_US');},[paglocle])


  // const addlangogl =()=>{ 
  //   try{
  //       AsyncStorage.getItem('Locallangoeg').then((value)=>{
  //         const langoer = JSON.parse(value);
  //         locales(langoer.locale,langoer.switch);
  //         // langoer == 'ar_MA' ? setPagLaocl(false): setPagLaocl(true);
  //         console.log(paglocle)
  //       })
  //   }catch(err){console.log(err)}
  // }

  const getTasks = () => {
    AsyncStorage.getItem('TasksCONTRAT').then(tasks => {
      const Taskstody = JSON.parse(tasks);
      if (Taskstody && typeof Taskstody === 'object') {
        dispatch(setTasksCONTRAT(Taskstody))
      }
    })
  }


  let options ={}
{meneu?
 options = {
    html: `
    <!DOCTYPE html>
    <html lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <Style>
      body{
          width: 95%;
          margin: auto;
          margin-top: 35px;
      }
      table {
      border-collapse: collapse;
      width: 90%;
      color: #333;
      font-family: Arial, sans-serif;
      font-size: 8px;
      text-align: left;
      padding: 5px;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      margin: auto;
      margin-top: 10px;
      margin-bottom: 10px;
    } 
    table th {
    background-color: #447dee;
    color: #fff;
    font-weight: bold;
    font-family:'Tajawal';
    font-size: 13px;
    padding: 3px;
    text-transform: uppercase;
    /* letter-spacing: 1px; */
    text-align: center;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #ccc;
    }
    table tr:nth-child(even) td {
    background-color: #f2f2f2;
    }
    table tr:hover td {
    background-color: #ffedcc;
    }
    table td {
    background-color: #fff;
    padding: 3px;
    text-align: center;
    font-family:'Tajawal';
    font-size: 11px;
    border-bottom: 1px solid #ccc;
    font-weight: bold;
    }
    .footer{
      height: 70px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 100px;
    
    }
    .namedata{
      display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height:70%;
    padding: 5px;
    }
    h4{
      font-family:'Tajawal';
    }
    h5 {
      font-family:'Tajawal';
      margin: auto;
    }
    p{
      margin: 5px;
      font-family:'Tajawal';
    }
    span{
      height: 80%;
      margin: auto;
      margin-left: 10px;
      text-align: center;
    }
    </Style>
    <body>
      <table>
           <thead>
                              <tr>
                                  <thead>
                                  ${locale == 'ar_MA' ?
                                  `            <tbody>
                                                                <th style="text-align: center;border-color: #333;"  colspan="8">كشف تفصيلي عن الحساب</th>
                                                                   <tr>
                                                                       <th style="text-align: center;border-color: #333;"  colspan="3">الاجمالي</th>
                                                                       <th scope="col" rowspan="2">حالة الحساب</th>
                                                                       <th scope="col" rowspan="2">الوقت</th>
                                                                       <th scope="col" rowspan="2">تاريخ </th>
                                                                       <th scope="col" colspan="2"  rowspan="2">اسم/رقم الحساب</th>        
                                                                       <!-- rowspan="2" هذه للدمج عمودي -->
                                                                   </tr>
                                                                   <th scope="col">بالريال السعودي</th>
                                                                   <th scope="col">بالدولار</th>
                                                                   <th scope="col">بالريال اليمني</th>                                      
                                                               </tbody>`
                                  :
                      
                                  `  <tbody>
                      <th style="text-align: center;border-color: #333;" colspan="8">Detailed account statement</th>
                      <tr>
                      <th style="text-align: center;border-color: #333;" colspan="3">total</th>
                      <th scope="col" rowspan="2">Account status</th>
                      <th scope="col" rowspan="2">time</th>
                      <th scope="col" rowspan="2">date </th>
                      <th scope="col" colspan="2" rowspan="2">Account name/number</th> 
                      <!-- rowspan="2" this is for vertical merge -->
                      </tr>
                      <th scope="col"> Saudi Riyal</th>
                      <th scope="col">in dollars</th>
                      <th scope="col"> Yemeni rial</th> 
                      </tbody>`}
                                 ${tasksCONTRAT.map((pic, index) =>                 
                                    ` <tr>
                                         <td>${parseInt(pic.SumِSR).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                         <td>${parseInt(pic.SumDollar).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                         <td>${parseInt(pic.SumِYR).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                         <td>${pic.Done === false ? 'نشطة' : 'منتهيه'}</td>
                                         <td>${pic.Timeminet}</td>
                                         <td>${pic.Datetiem}</td>
                                         <td colspan='2'>${pic.sectionidnfy}</td>
                                         <td>${index +1}</td>
                                 </tr>  ` 
                                   ).join('')}           
                                 </tbody>
                              <tr>
                              </table>
                          </table>
                          <!-- tm-app-feature-header -->
             <footer class="footer">
              <div class="namedata">
              <h4>BY:</h4>
              <span>
              <h5>م:عبدالرحمن محمد الفيل</h5>
              <h5>Abdulrhman mohammed AlFil</h5>
          </span>
            </div>
              <div class="namedata">
              <P>phon:775227593</P>
              <P>phon:718295860</P>
          </div>
             </footer>
    </body>
    </html>
   `,
    fileName: `Exprenss_contract_pdf_${count}`,
    directory: 'Documents',
  }
:
null;}
let arrays = []
const arraPrss =()=>{
  tasksCONTRAT.map((pic, index) => (
    locale === 'ar_MA'
    ?
    arrays.push({
      " اجمالي الحساب بالريال اليمني": parseInt(pic.SumِYR).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      "اجمالي الحساب بالريال السعودي ": parseInt(pic.SumِSR).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      "اجمالي الحساب بالدولار ": parseInt(pic.SumDollar).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      "حالة الحساب": pic.Done === false ? 'نشطة' : 'منتهيه',
      "وقت انشاء الحساب": pic.Timeminet,
      "تاريخ انشاء الحساب": pic.Datetiem,
      "اسم/رقم الحساب": pic.sectionidnfy,
    })
    :
    arrays.push({
      "Total account in Yemeni riyals": parseInt(pic.SumYR).toFixed(2).replace(/(d)(?=(d{3})+(?! d))/g, '$1,'),
      "Total Account in Saudi Riyals": parseInt(pic.SumSR).toFixed(2).replace(/(d)(?=(d{3})+(?! d))/g, '$1,'),
      "Total Account in Dollars": parseInt(pic.SumDollar).toFixed(2).replace(/(d)(?=(d{3})+(?! d))/g, '$1,'),
      "Account Status": pic.Done === false ? 'active' : 'finished',
      "Account creation time": pic.Timeminet,
      "Account Creation Date": pic.Datetiem,
      "Account Name": pic.sectionidnfy,
    })
  ))}
  return (
    <>
      <Modal
        visible={meneu}
        transparent
        onRequestClose={() => setMenu(false)}
        animationType="fade"
        hardwareAccelerated={true} >
        <TouchableOpacity onPress={() => setMenu(false)} style={styles.centered_menu}>
       
          <Pressable onPress={() => setMenu(true)} style={styles.menu_mod1al}>
            <View style={styles.menu_body}>
            {
                  tasksCONTRAT.length > 0 ?
                    <Pdfexpense onprestyle={styles.bottom_1} text={styles.text_menu} options={options} onpressfale={() => {
                      setCount(count + 1);
                      setMenu(false);
                    }} />
                    :
                    <TouchableOpacity
                      onPress={() => {
                        ToastAndroid.showWithGravity(locale == 'ar_MA'?'لايوجد لديك نفقات مسجلة':"You have no recorded expenses", ToastAndroid.CENTER, ToastAndroid.SHORT)
                        setMenu(false);
                      }} style={styles.bottom_1}>
                      <Text style={styles.text_menu}>{locale === 'ar_MA' ? "تحويل PDF" : "PDF Converter"}</Text>
                    </TouchableOpacity>
                }
                {
                  tasksCONTRAT.length > 0 ?
                    <ExportExcel onprestyle={styles.bottom_1} text={styles.text_menu} caseuTarg={`Exprenss_AllCovente_${count}`} options={arrays} onpressecel={() => { arraPrss(); setMenu(false); }} />
                    :
                    <TouchableOpacity
                      onPress={() => {
                        ToastAndroid.showWithGravity(locale == 'ar_MA'?'لايوجد لديك نفقات مسجلة':"You have no recorded expenses", ToastAndroid.CENTER, ToastAndroid.SHORT)
                        setMenu(false);
                      }} style={styles.bottom_1}>
                      <Text style={styles.text_menu}>{locale === 'ar_MA' ? "تحويل excel" : "excel Converter"}</Text>
                    </TouchableOpacity>
                }
                 <TouchableOpacity
                onPress={() => {
                  setBellmodel(true)
                  setMenu(false);
                }} style={styles.bottom_1}>
                <Text style={styles.text_menu}>{locale=='ar_MA'?"التواصل بالدعم":"Connect with support"}</Text>
              </TouchableOpacity>
    <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ModulsData')
                  setMenu(false);
                }} style={styles.bottom_1}>
                <Text style={styles.text_menu}>{locale=='ar_MA'?"تعليمات وارشادات":"Instructions & Guidelines"}</Text>
              </TouchableOpacity>
              <Text>لتغيير اللغة</Text>
              <Switch  value={paglocle} onChange={() =>{ setPagLaocl(!paglocle);data}} />
            </View>
          </Pressable>
        </TouchableOpacity>
      </Modal>
<ModelsAbdu setBellmodel={setBellmodel} bellmodel={bellmodel}/>
      <Navbar onprsslist={()=>setMenu(true)} search={search} onChange={(value) => setSearch(value)} />
      <PagerView style={styles.pagerView} initialPage={0}>
        <Tab.Navigator
          tabBar={(props) => <MyTabBar {...props} />}
          initialRouteName="Prodectmyfalse"
          screenOptions={({ route }) => ({
            tabBarLabelStyle: { color: colors.BLACK, fontFamily: fonts.CAIROSEMILBOLD, },
            tabBarIndicatorStyle: { backgroundColor: colors.PREMREY },
            tabBarStyle: route.name === "Subprodect" ? { display: 'none' } : null,
          })}>
          <Tab.Screen
            name="Prodectmyfalse" component={Prodectmyfalse}
            options={{ tabBarLabel: locale ===  "ar_MA"?'النفقات الحالية':'current expenses' }}
          />
          <Tab.Screen name="Subprodect" component={Subprodect} />
          <Tab.Screen name="Taskscshmonv" component={Taskscshmonv} options={{ tabBarLabel:locale ===  "ar_MA"? 'أضف حساب':"Add an account" }} />
          <Tab.Screen name="Prodectmytrue" component={Prodectmytrue}
            options={{ tabBarLabel: locale ===  "ar_MA"?'النفقات المنتهيه' :'expired expenses' }}
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
    backgroundColor: colors.GREYD
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
    top: RFValue(20)
  },
  buttom: {
    justifyContent: "flex-end",
    alignItems: 'center',
    width: RFValue(20),
    height: RFValue(50),
    borderRadius: RFValue(60),
    position: 'absolute',
    top: -10,
    zIndex: 1,
    // bottom:RFValue(30),
    // right:RFValue(-50),
    backgroundColor: colors.GREYD
  },
  tasksbox: {
    flexDirection: 'row',
    width: RFValue(290),
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(8),
    padding: RFValue(1),
    backgroundColor: colors.WHITE,
    justifyContent: "center",
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: RFValue(10),
    elevation: RFValue(1)
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
    justifyContent: "flex-end",
    alignItems: 'center',
    width: RFValue(60),
    height: RFValue(60),
    borderRadius: RFValue(60),
    bottom: RFValue(30),
    right: RFValue(-50),

    borderColor: colors.BLACK
  },
  item_body: {
    flex: 1
  },
  delet: {
    width: RFValue(50),
    height: RFValue(50),
    justifyContent: 'center',
    alignItems: 'center'

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
    flex:1,
    justifyContent: 'flex-start',
    marginTop:RFValue(40),
    top:RFValue(5),

    backgroundColor: "#00000009"
  },
  menu_mod1al: {
    width: RFValue(150),
    backgroundColor: colors.WHITE,
    height: RFValue(200),
    borderRadius: RFValue(10),
    marginHorizontal: RFValue(10),
    top:RFValue(-30),
    alignSelf: 'flex-start',

  },
  menu_body: {
    flex: 1,
    height: RFValue(150),
    justifyContent: 'space-around',
    alignItems: 'center'
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
    justifyContent: 'center'
  },
  text_menu: {
    fontFamily: fonts.CAIROREGULARK,
    color: colors.CURRENT

  },
  centered_Abdu: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: "#00000099"
  },
  Abdu_mod1al: {
    width: RFValue(300),
    backgroundColor: colors.WHITE,
    height: RFValue(150),
    borderRadius: RFValue(10),
    marginHorizontal: RFValue(10),
    top:RFValue(-30),
    alignSelf: 'center',

  },
  Abdu_body: {
    flex: 1,
    height: RFValue(150),
    justifyContent: 'space-around',
    alignItems: 'center'
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
    borderRadius:RFValue(15),
    backgroundColor: colors.BACKGRUONDPAG,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text_Abdu: {
    fontFamily: fonts.CAIROREGULARK,
    color: colors.CURRENT

  },


}

)

















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