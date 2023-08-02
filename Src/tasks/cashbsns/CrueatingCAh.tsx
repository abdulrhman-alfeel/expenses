//import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  View,
  ToastAndroid,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  Modal,
  Pressable
} from "react-native"
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";

import { useSelector, useDispatch } from "react-redux"
import { setTasksCsh, setTasksCshID, setTasksCshConver } from '../../redux/actions'
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from "@react-native-community/checkbox";
import PushNotification from "react-native-push-notification";
import uuid from 'react-native-uuid';
import Moduls from '../../component/moduls'
import { phonecall } from '../../component/exportfunction'
import { searchinpro } from "../My_profile";
import { useFocusEffect } from "@react-navigation/native";
import PushCash from '../../component/cashing/dushCash'
import Pdfexpense from '../../component/pdfexpense'
import ExportExcel from '../../component/ecelexport'
import ModulsData from '../../Modulsdata'
import ModelsAbdu from '../../component/modelsAbdu';
import  locales,{locale}  from "../../locale";
// import { locale } from '../../Taskscsh';
export default function CrueatingCAh({ navigation }) {
  const { tasksCSH, tasksCSHID, tasksConver } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [pagSec, setPagSec] = useState('CrueatingCAh');
  const [bellmodel, setBellmodel] = useState(false);
  const [bellmodels, setBellmodels] = useState(false);
  const [meneu, setMenu] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
navigation.addListener('focus', () => {
      setPagSec('CrueatingCAh');
      setCount(0)
    })
 
  }, [navigation])
 


  const renderItem = useCallback(({ item, index }) => (
    <View key={index} style={styles.tasksbox} >
      <TouchableOpacity onPress={() => {
        dispatch(setTasksCshID(item.ID))
        navigation.navigate("Subprodect")
      }} style={styles.item_row}>
        <View style={styles.item_body}>
          <View style={styles.contenersbox}>
            <View style={styles.zersection}>
              <FontAwesome5 name="users" size={30} color={item.caseused === 'دفع' || item.caseused === "To push" ? colors.PREMREY : colors.RED} />
              <Text style={styles.texttask} numberOfLines={1}>{locale === "ar_MA" ? item.caseused === 'دفع' ? "الدائن" : "المدين" : item.caseused === "To push" ? "Creditor" : " Debtor"}</Text>
            </View>
            <View style={styles.onsection}>
              <Text style={styles.texttask} numberOfLines={1}>{item.caseuTarg}</Text>
              <View style={[{ width: '60%' }, styles.onsectionsub]}>
                <Text style={styles.texttask} numberOfLines={1}>{item.codm}</Text>
                <Text style={styles.texttask} numberOfLines={1}>{parseInt(item.SumCash).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
              </View>
            </View>
            <View style={styles.towsection}>
              <Text style={styles.texttask} numberOfLines={1}>{locale === "ar_MA" ? "المدفوع" : "Paid"}:</Text>
              <View style={[{ width: '60%' }, styles.targ]}>
                <Text style={styles.texttask} numberOfLines={1}>{parseInt(item.DescPush).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                <Text style={styles.texttask} numberOfLines={1}>{item.codm}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => {
              item.phone.length > 0 ? phonecall(item.phone) : ToastAndroid.showWithGravity(' لايوجد لديه رقم جوال',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
            }} style={{ marginHorizontal: RFValue(10) }}>
              <FontAwesome5 name="phone" size={20} color={item.caseused === 'دفع' ? colors.PREMREY : colors.RED} />
            </TouchableOpacity>
          </View>
          <View style={styles.Datanew}>
            <Text style={styles.textdesc} numberOfLines={1}> S: {item.selectedStartDateS}</Text>
            <Text style={styles.textdesc} numberOfLines={1}> F:  {item.selectedStartDateF}  </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  ), []);
  let options = {}
  {
    if(meneu) {
    const filteCash = tasksConver.filter(item => item.IDCUST === tasksCSHID || item.idConver === tasksCSHID);
    const lest_Cash = filteCash[filteCash.length - 1];
      options = {
        html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <Style>
    body{
      width:95%
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
    padding: 2px;
    text-align: center;
    font-family:'Tajawal';
    font-size: 13px;
    border-bottom: 1px solid #ccc;
    font-weight: bold;
    }
    </Style>
    <body>
                  <table>
                            <thead>
                                <tr>
                             <thead>
                                    <tbody>
                                        <tr>
                                            <!-- the cell we want to combine -->
                                            <th scope="col" rowspan="2">${locale === 'ar_MA' ? "تاريخ اخر عملية سداد" : "Last payment date"}</th>
                                            <th scope="col" rowspan="2">${locale === 'ar_MA' ? "المبلغ المدفوع حتى الان" : "amount paid so far"}</th>
                                            <th scope="col" rowspan="2">${locale === 'ar_MA' ? "تاريخ بدء الدين" : "Debt start date"}</th>
                                            <th scope="col" rowspan="2">${locale === 'ar_MA' ? "المبلغ الكلي للدين" : "Total amount of debt"}</th>
                                            <th scope="col" rowspan="2">${locale === 'ar_MA' ? "الاسم" : "name"}</th>
                                            <th scope="col" rowspan="2">${locale === 'ar_MA' ? "الفئة" : "class"}</th>
                                            <th scope="col" rowspan="2">${locale === 'ar_MA' ? "م" : "M"}</th>
                                        </tr>
                                 
                                    </tbody>
    
                            </thead>
                            </tr>         
                            <tbody>
                            ${tasksCSH.map((pic, index) =>
          ` <tr >
                                <td>${lest_Cash?.TiemPUSH.length > 0 ? lest_Cash.TiemPUSH : null}</td>
                                <td>${pic.codm + parseInt(pic.DescPush).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                <td>${new Date(pic.selectedStartDateS).toDateString()}</td>
                                <td>${pic.codm + parseInt(pic.SumCash).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                <td>${pic.caseuTarg}</td>
                                <td>${pic.caseused}</td>
                                <th scope="row">${index + 1}</th>
                            </tr>`
        )}
                            </tbody>
                            <!-- tm-app-feature-header -->
                        </table>                 
    </body>
    </html>`,
        fileName: `Exprenss_ALLCash_pdf_${count}`,
        // directory:RNFS.DownloadDirectoryPath ,
        directory: 'Documents',
        // directory: 'Download',
      }
    }
    
  }
  let arrays = [];
  const arraPrss = () => {
    const filteCash = tasksConver.filter(item => item.IDCUST === tasksCSHID || item.idConver === tasksCSHID);
    const lest_Cash = filteCash[filteCash.length - 1];
    tasksCSH.map((pic, index) => (
      locale === 'ar_MA' ?
        arrays.push({
          "تاريخ اخر عملية سداد": lest_Cash?.TiemPUSH,
          "المبلغ المدفوع حتى الان": pic.codm + parseInt(pic.DescPush).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
          "تاريخ بدء الدين": pic.selectedStarateS,
          "المبلغ الكلي للدين": pic.codm + parseInt(pic.SumCash).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
          "الاسم": pic.caseuTarg,
          "الفئة": pic.caseused,
          "م": index + 1
        })
        :
        arrays.push({
          "Last payment date": lest_Cash?.TiemPUSH,
          "Amount paid so far": pic.codm + parseInt(pic.DescPush).toFixed(2).replace(/(d)(?=(d{3})+(?! d))/g, '$1,'),
          "Debt Start Date": pic.selectedStarateS,
          "Total amount of debt": pic.codm + parseInt(pic.SumCash).toFixed(2).replace(/(d)(?=(d{3})+(?! d))/g, '$1,'),
          "Name": pic.caseuTarg,
          "Category": pic.caseused,
          "m": index + 1
        })
    ))


  }

  return (
    <>
      <View style={styles.body}>
        <View style={styles.senction3}>
          <Pressable android_ripple={{ color: colors.WHITE }} onPress={() => {
            setPagSec('CrueatingCAh');
          }} style={[pagSec == 'CrueatingCAh' ? styles.conter : null, styles.contsec]}>
            <Text style={styles.text}>{locale === 'ar_MA' ? "الحالية" : "Current"}</Text>
          </Pressable>
          <Pressable android_ripple={{ color: colors.YALO }}
            onPress={() => {
              dispatch(setTasksCshID(uuid.v4()))
              navigation.navigate("Taskscsh")
            }}
            style={styles.buttomadd}>
            <Text style={styles.textadd}>{locale === 'ar_MA' ? "أضف" : "Add"}</Text>
          </Pressable>
          <Pressable android_ripple={{ color: colors.WHITE }} onPress={() => {
            setPagSec('Fanshing');
          }} style={[pagSec == 'Fanshing' ? styles.conter : null, styles.contsec]}>
            <Text style={styles.text}>{locale === 'ar_MA' ? "المنتهيه" : "Ended"}</Text>
          </Pressable>

        </View>
        {bellmodel == true ? <PushCash IDCSHING={uuid.v4()} givinit={locale === 'ar_MA' ? 'إضافة' : "add"} pushcash={bellmodel} Pushsetfalse={setBellmodel} /> : null}
        <Pressable android_ripple={{ color: colors.WHITE }} style={styles.buttomCah} onPress={() => setBellmodel(true)}>
          <Text style={styles.textbot}>{locale === 'ar_MA' ? "تسديد" : "Payment"}</Text>
        </Pressable>
        <TouchableOpacity onPress={() => setMenu(true)} style={styles.bell}>
          <FontAwesome5 style={styles.iconmessage} name="grip-horizontal" color={colors.CURRENT} size={18} />
        </TouchableOpacity>
        {bellmodels ? <ModelsAbdu setBellmodel={setBellmodels} bellmodel={bellmodels} /> : null}
        <Modal
          visible={meneu}
          transparent
          onRequestClose={() => setMenu(false)}
          animationType='fade'
          hardwareAccelerated={true}>
          <TouchableOpacity onPress={() => setMenu(false)} style={styles.centered_menu}>
            <Pressable onPress={() => setMenu(true)} style={styles.menu_mod1al}>
              <View style={styles.menu_body}>
                {
                  tasksCSH.length > 0 ?
                    <Pdfexpense onprestyle={styles.bottom_1} text={styles.text_menu} options={options} onpressfale={() => {
                      setCount(count + 1);
                      setMenu(false);
                    }} />
                    :
                    <TouchableOpacity
                      onPress={() => {
                        ToastAndroid.showWithGravity(locale === 'ar_MA'?'لايوجد لديك ديون مسجلة':"You have no registered debts", ToastAndroid.CENTER, ToastAndroid.SHORT)
                        setMenu(false);
                      }} style={styles.bottom_1}>
                      <Text style={styles.text_menu}>{locale === 'ar_MA' ? "تحويل PDF" : "PDF Converter"}</Text>
                    </TouchableOpacity>
                }
                {
                  tasksCSH.length > 0 ?
                    <ExportExcel onprestyle={styles.bottom_1} text={styles.text_menu} caseuTarg={`Exprenss_AllCovente_${count}`} options={arrays} onpressecel={() => { arraPrss(); setMenu(false); }} />
                    :
                    <TouchableOpacity
                      onPress={() => {
                        ToastAndroid.showWithGravity(locale === 'ar_MA'?'لايوجد لديك ديون مسجلة':"You have no registered debts", ToastAndroid.CENTER, ToastAndroid.SHORT)
                        setMenu(false);
                      }} style={styles.bottom_1}>
                      <Text style={styles.text_menu}>{locale === 'ar_MA' ? "تحويل excel" : "excel Converter"}</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity
                  onPress={() => {
                    setBellmodels(true)
                    setMenu(false);
                  }} style={styles.bottom_1}>
                  <Text style={styles.text_menu}>{locale === 'ar_MA' ? "التواصل بالدعم" : "Connect with support"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ModulsData')
                    setMenu(false);
                  }} style={styles.bottom_1}>
                  <Text style={styles.text_menu}>{locale === 'ar_MA' ? "تعليمات وارشادات" : "Instructions & Guidelines"}</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </TouchableOpacity>
        </Modal>

        <FlatList
          data={tasksCSH.filter(item => (pagSec == 'Fanshing' ? item.Done === true : item.Done === false))}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,

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
    // bottom:RFValue(30),
    // right:RFValue(-50),
    backgroundColor: colors.GREYD
  },
  buttomadd: {
    justifyContent: "center",
    alignItems: 'center',
    flex: 2,
    marginHorizontal: RFValue(10),
    borderRadius: RFValue(60),
    backgroundColor: colors.CURRENT
  },
  tasksbox: {
    flexDirection: 'row',
    width: RFValue(320),
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(8),
    padding: RFValue(5),
    backgroundColor: colors.WHITE,
    justifyContent: "center",
    alignItems: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: RFValue(10),
    elevation: RFValue(1)
  },
  item_row: {
    width: RFValue(290),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  item_body: {
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'space-around'
  },
  contenersbox: {
    width: RFValue(300),
    marginVertical: RFValue(5),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    alignItems: 'center'
  },
  foders: {
    width: '95%',
    borderTopWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  foderchedk: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  textfoders: {
    color: colors.BLACK,
    fontSize: RFValue(12),
    marginTop: RFValue(10),
    fontFamily: fonts.CAIROREGULARK,
    textAlign: 'center',
    marginHorizontal: RFValue(5)
  },
  delet: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  Datanew: {
    width: '95%',
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
    alignSelf: 'center'
  },
  texttask: {
    color: '#000000',
    fontSize: RFValue(12),
  },
  textdesc: {
    color: colors.BLACK,
    fontSize: RFValue(10),
    margin: RFValue(2),
  },
  zersection: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  onsection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  onsectionsub: {
    flexDirection: 'row-reverse'
  },
  towsection: {
    flex: 1,
    // borderWidth:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  targ: {
    flexDirection: 'row'
  },
  centered_view: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: 'center',
    alignItems: 'center'
  },
  centered_menu: {
    flex: 1,
    justifyContent: 'flex-start',
    // backgroundColor: "#00000009"
  },
  menu_mod1al: {
    width: RFValue(150),
    backgroundColor: colors.WHITE,
    height: RFValue(200),
    borderRadius: RFValue(10),
    marginHorizontal: RFValue(10),
    marginTop: RFValue(30),
    top: RFValue(100),
    alignSelf: 'flex-start',
  },
  menu_body: {
    flex: 1,
    height: RFValue(150),
    justifyContent: 'space-around',
    alignItems: 'center'
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
  bell: {
    // marginHorizontal: RFValue(10),
    position: 'absolute',
    alignSelf: 'flex-start',
    alignItems: 'center',
    left: -5,
    width: 35,
    height: 50
  },
  iconmessage: {
    // width:15,
    height: 25,
    top: RFValue(10)
  },
  senction3: {
    // padding:RFValue(5),
    // paddingHorizontal:RFValue(15),
    padding: RFValue(4),
    marginHorizontal: RFValue(25),
    marginVertical: RFValue(5),
    marginBottom: RFValue(10),
    borderRadius: RFValue(5),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.YALO
  },
  conter: {
    flex: 2,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contsec: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.CAIROREGULARK,
    color: colors.CURRENT,
    fontSize: RFValue(13)
  },
  textadd: {
    fontFamily: fonts.CAIROREGULARK,
    color: colors.WHITE,
    fontSize: RFValue(13)
  },
  buttomCah: {
    justifyContent: "center",
    alignItems: 'center',
    width: RFValue(100),
    height: RFValue(30),
    borderRadius: RFValue(30),
    right: 15,
    backgroundColor: colors.CURRENT
  },
  textbot: {
    color: colors.WHITE,
    fontFamily: fonts.CAIROREGULARK
  },
})