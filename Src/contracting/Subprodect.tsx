//import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
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
  Image,
  NativeModules,
  Platform

} from "react-native"
import { RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from 'react-native-virtualized-view';

import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";
//import ConstomBtom from "./ConstomBtom";
import { useSelector, useDispatch } from "react-redux"
import { setTasksCONTRAT, setTasksCONTRATID } from '../redux/actions'
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from "@react-native-community/checkbox";
import PushNotification from "react-native-push-notification";
import Haderpost from '../component/postprodctmov/haderpost'
import Creattask from '../component/postprodctmov/creattask'
// import { pagSec } from '../../../contracting/prodectmy/prodectmy'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Moduls from '../component/moduls'
import ExportExcel from '../component/ecelexport'
import Pdfexpense from '../component/pdfexpense'
import { Pressable } from "react-native";
import CshmonvModul from "../component/postprodctmov/cshmonvModul "
import uuid from 'react-native-uuid';
import { searching } from './Contracting';
// import { locale } from '../Taskscsh';
import  locales,{locale}  from "../locale";



export const Subprodect = ({ navigation }) => {
  const { tasksCONTRATID, tasksCONTRAT } = useSelector(state => state.userReducer);
  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [bellmodel, setBellmodel] = useState(false);
  const [meneu, setMenu] = useState(false);
  // const [pagSec, setPagSec] = useState('Prodectmy');
  const [carmsu, setCarnsy] = useState('');
  const [idSection, setIdsection] = useState('');
  const [idSectionSub, setIdsectionSub] = useState('');
  const [iddelet, setIddelet] = useState(0);
  //اختيار تعديل الراسل او الفرع
  const [caseused, setCase] = useState("");
  const [bulidEdit, setBualdEdit] = useState(locale === "ar_MA" ? 'إضافة' : 'add')
  const [Addtaskfalse, setAddTsksfalse] = useState(false);
  const [bellmodelMann, setBellmodelMann] = useState(false);
  const [bulid, setBuald] = useState(false);
  const [count, setCount] = useState(0)

  //pdf
  const findTaskss = tasksCONTRAT.find(pic => pic.ID === tasksCONTRATID);
  let filtercars = carmsu.length > 0 ? i => i.arthDath === carmsu : i => i.idHOM === idSection;
  let options = {}
  {
    meneu ?
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
    ${tasksCONTRAT.filter(item => item.ID === tasksCONTRATID).map((pic, index) =>
          `<table>
   
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
                                 </thead>
                                 </tr>         
                                 <tbody>                  
                                     <tr>
                                         <td>${parseInt(pic.SumِSR).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                         <td>${parseInt(pic.SumDollar).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                         <td>${parseInt(pic.SumِYR).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                         <td>${locale == 'ar_MA' ? pic.Done === false ? 'نشطة' : 'منتهيه' : pic.Done === false ? 'Active' : 'Finished'}</td>
                                         <td>${pic.Timeminet}</td>
                                         <td>${pic.Datetiem}</td>
                                         <td>${pic.sectionidnfy}</td>
                                 </tr>            
                                 </tbody>
                              <tr>
                              </table>
                              <table>
                           ${pic.databuld.map((item, index) =>
              `
            <thead>
   ${locale === 'ar_MA' ?
                `<tbody>
            <th style="text-align: center;border-color: #333; background-color:darkblue;"  colspan="8">تفصيل اقسام الحساب</th>
                                        <tr>
                                          <th style="text-align: center;border-color: #333;"  colspan="3">الاجمالي</th>
                                          <th scope="col" rowspan="2">الوقت</th>
                                          <th scope="col" rowspan="2">تاريخ </th>
                                          <th scope="col" rowspan="2">الوصف</th>
                                          <th scope="col"   rowspan="2">اسم/بيان النفقات</th>        
                                          <th scope="col"  rowspan="2">م</th>        
                                      </tr>
                                      <th scope="col">بالريال السعودي</th>
                                      <th scope="col">بالدولار</th>
                                      <th scope="col">بالريال اليمني</th>
                          </tr>         
                          </tbody>`
                :
                `<tbody>
                          <th style="text-align: center;border-color: #333; background-color:darkblue;" colspan="8">Breakdown of account sections</th>
                          <tr>
                          <th style="text-align: center;border-color: #333;" colspan="3">total</th>
                          <th scope="col" rowspan="2">time</th>
                          <th scope="col" rowspan="2">date </th>
                          <th scope="col" rowspan="2">description</th>
                          <th scope="col" rowspan="2">expense name/statement</th> 
                          <th scope="col" rowspan="2">m</th> 
                          </tr>
                          <th scope="col"> Saudi Riyal</th>
                          <th scope="col">in dollars</th>
                          <th scope="col"> Yemeni rial</th>
                          </tr> 
                          </tbody>`
              }
                          </thead>
                          <tbody>
                              <tr >
                                  <td>${parseInt(item.SumِSR).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                  <td>${parseInt(item.SumDollar).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                  <td>${parseInt(item.SumِYR).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                  <td>${item.Timeminet}</td>
                                  <td>${item.Time}</td>
                                  <td>${item.abzrphtion}</td>
                                  <td>${item.sectiontitle}</td>
                                  <td>${index + 1}</td>
                          </tr>                        
     ${locale == 'ar_MA' ? `</tbody>
                          <th style="text-align: center;border-color: #333; "  colspan="6">نفقات القسم</th>
                          <tr>
                              <th style="text-align: center;border-color: #333;" >المبلغ</th>
                              <th scope="col" rowspan="2">الوقت</th>
                              <th scope="col" rowspan="2">تاريخ </th>
                              <th scope="col" rowspan="2">الوصف</th>
                              <th scope="col" rowspan="2">اسم/بيان</th>
                              <th scope="col" rowspan="2">م</th>
                              <!-- rowspan="2" هذه للدمج عمودي -->
                          </tr>
                          <tbody>`
                :
                `                        </tbody>
<th style="text-align: center;border-color: #333; " colspan="6">Department Expenses</th>
<tr>
<th style="text-align: center;border-color: #333;" >amount</th>
<th scope="col" rowspan="2">time</th>
<th scope="col" rowspan="2">date </th>
<th scope="col" rowspan="2">description</th>
<th scope="col" rowspan="2">name/statement</th>
<th scope="col" rowspan="2">m</th>
<!-- rowspan="2" this is for vertical merge -->
</tr>
</tbody>`
              }
                          ${item?.Databes.filter(carmsu.length > 0 ? i => i.arthDath === carmsu : i => i.idHOM === item.id).map((it, index) =>
                ` <tr>
                                  <td>${parseInt(it.sectionpriclabrr).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + it.arthDath}</td>
                                  <td>${it.Timeminet}</td>
                                  <td>${it.TimeSub}</td>
                                  <td>${it.abzrphtion}</td>
                                  <td>${it.sectiontitle}</td>
                                  <td>${index + 1}</td>
                              </tr>
                              </tbody>`
              )} `)}
                          </table>
                          </table>`
        ).join('')}  
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
        fileName: `Exprenss_contract_${findTaskss?.sectionidnfy}pdf_${count}`,
        directory: 'Documents',
      }
      :
      null;
  }


  //excel
  let arrays = []
  const arraPrss = () => {
    tasksCONTRAT.filter(item => item.ID === tasksCONTRATID).map((pic, index) => (
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
    ))
    tasksCONTRAT.find(item => item.ID === tasksCONTRATID)?.databuld.forEach((item, index) => (
      locale === 'ar_MA' ?
        arrays.push({
          "اسم/بيان النفقات": item.sectiontitle,
          "الوصف": item.abzrphtion,
          "تاريخ انشاء قسم النفقات": item.Time,
          "وقت انشاء قسم النفقات": item.Timeminet,
          "اجمالي القسم بالريال اليمني": parseInt(item.SumِYR).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
          "اجمالي القسم بالريال السعودي": parseInt(item.SumِSR).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
          "اجمالي القسم بالدولار ": parseInt(item.SumDollar).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        })
        :
        arrays.push({
          "Expense Name/Statement": item.sectiontitle,
          "description": item.abzrphtion,
          "Expense department creation date": item.time,
          "Expense section creation time": item.Timeminet,
          "Total section in Yemeni rials": parseInt(item.SumYR).toFixed(2).replace(/(d)(?=(d{3})+(?! d))/g, '$1,'),
          "Total Section in Saudi Riyals": parseInt(item.SumSR).toFixed(2).replace(/(d)(?=(d{3})+(?! d))/g, '$1,'),
          "Total section in dollars": parseInt(item.SumDollar).toFixed(2).replace(/(d)(?=(d{3})+(?! d))/g, '$1,')
        })
    ))
    tasksCONTRAT.find(item => item.ID === tasksCONTRATID)?.databuld.forEach((item) => (
      item.Databes.map((it, index) =>
        locale == 'ar_MA' ?
          arrays.push({
            " بيان النفقات الفرعي": it.sectiontitle,
            "الوصف": it.abzrphtion,
            "تاريخ": it.TimeSub,
            "الوقت": it.Timeminet,
            "المبلغ": parseInt(it.sectionpriclabrr).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + it.arthDath,
            "م": index + 1
          })
          :
          arrays.push({
            "Substatement of Expenditure": it.sectiontitle,
            "Description": it.abzrphtion,
            "date": it.TimeSub,
            "time": it.Timeminet,
            "amount": parseInt(it.sectionpriclabrr).toFixed(2).replace(/(d)(?=(d{3})+(?! d))/g, '$1,') + it.arthDath,
            "m": index + 1
          }))
    ))

  }
  const checkTask = (id, newValue) => {
    const index = tasksCONTRAT.findIndex(tasks => tasks.ID === id);
    if (index > -1) {
      let newTasks = [...tasksCONTRAT];
      newTasks[index].Done = newValue;
      AsyncStorage.setItem('TasksCONTRAT', JSON.stringify(newTasks)).then(() => {
        dispatch(setTasksCONTRAT(newTasks));
        ToastAndroid.showWithGravity(locale === 'ar_MA' ? 'تم نقله إلى قائمة المهام المنتهيه' : 'Moved to finished task list',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        navigation.navigate('Prodectmyfalse')
      }).catch(ERR => { console.log(ERR) })
    }
  }
  //delet founction
  const delet = (id) => {
    const filterDasec = tasksCONTRAT.filter(tasks => tasks.ID !== id)
    AsyncStorage.setItem('TasksCONTRAT', JSON.stringify(filterDasec)).then(() => {
      dispatch(setTasksCONTRAT(filterDasec))
      ToastAndroid.showWithGravity(locale === "ar_MA" ? 'تم العملية بنجاح' : "Saved the operation successfully",
        ToastAndroid.CENTER,
        ToastAndroid.LONG
      );
      navigation.navigate('Prodectmytrue')

    }).catch(err => console.log(err))
  }
  // useEffect(()=>{searching.length > 0 ? navigation.navigate('Prodectmyfalse'):null},[searching]);


  const renderdateboud = useCallback((ite, index) => (
    <View key={index} style={styles.bouild}>
      <TouchableOpacity onLongPress={() => {
        setCase('header');
        setIdsection(ite.id)
        setBuald(true)
      }} onPress={() => setIdsection(ite.id)}>
        <Creattask onpress={() => {
          setIdsection(ite.id);
          const newLocal = uuid.v4();
          setIdsectionSub(newLocal);
          setAddTsksfalse(true)
        }} sectiontitle={ite.sectiontitle} Time={ite.Time}
          idsectionsfalse={ite?.Databes.filter(filtercars).length > 0 ? true : false}
          SumDollar={parseInt(ite.SumDollar).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} SumِSR={parseInt(ite.SumِSR).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} SumِYR={parseInt(ite.SumِYR).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} />
      </TouchableOpacity>
      <View style={[ite?.Databes.filter(filtercars).length > 0 ? styles.containerbuilds_sub_heder : { display: 'none' }]}>
        <Text style={[{ width: '20%' }, styles.textbuild_sub_heder]}>{locale == 'ar_MA' ? "البيان" : "Statement"}</Text>
        <Text style={[{ width: '20%' }, styles.textbuild_sub_heder]}>{locale == 'ar_MA' ? "الوقت" : "Time"}</Text>
        <Text style={[{ width: '20%' }, styles.textbuild_sub_heder]}>{locale == 'ar_MA' ? "المبلغ" : 'Amount'}</Text>
        <Text style={[{ width: '20%' }, styles.textbuild_sub_heder]}>{locale == 'ar_MA' ? "ملاحظة" : "Note"}</Text>
      </View>
      <View>
        {ite?.Databes.filter(filtercars).map((pic, index) => (
          <TouchableOpacity key={index}
            onPress={() => {
              setCase('headersub');
              setIdsection(ite.id)
              setIdsectionSub(pic.idSub);
              setBuald(true)
            }}
            style={styles.containerbuilds_sub} >
            <Text numberOfLines={2} style={[{ width: '20%' }, styles.textbuild_sub]}>{pic.sectiontitle}</Text>
            <Text numberOfLines={2} style={[{ width: '20%' }, styles.textbuild_sub]}>{pic.TimeSub}</Text>
            <Text numberOfLines={2} style={[{ width: '20%' }, styles.textbuild_sub]}>{pic.arthDath} {parseInt(pic.sectionpriclabrr).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
            <Text numberOfLines={2} style={[{ width: '20%' }, styles.textbuild_sub]}>{pic.abzrphtion}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>), [idSectionSub, idSection])
  const renderItem = useCallback(({ item, index }) => (
    <View key={index} style={styles.bodyc}>
      <TouchableOpacity style={[carmsu.length > 0 ? styles.allsum : { display: 'none' }]} onPress={() => { setCarnsy('') }}>
        <Text style={styles.text}>{locale == 'ar_MA' ? "كشف بكافة العملات" : "List in all currencies"}</Text>
      </TouchableOpacity>
      <View style={styles.bodyconten}>
        <View style={styles.bodycontensab}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <TouchableOpacity style={styles.bottom_add} onPress={() => {
              setCase('header');
              setIdsection(uuid.v4());
              setBualdEdit(locale == 'ar_MA' ? "إضافة" : "add")
              setBellmodelMann(true);
            }}>
              <FontAwesome5Icon name="plus" size={20} color={colors.CURRENT} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottom_add} onPress={() => {
              setIddelet(item.ID);
              setMenu(true)
            }}>
              <FontAwesome5Icon name="grip-horizontal" size={20} color={colors.CURRENT} />
            </TouchableOpacity>
          </View>
          <Haderpost sectionidnfy={item.sectionidnfy} many={carmsu} SumDollar={parseInt(item.SumDollar).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} SumِSR={parseInt(item.SumِSR).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} SumِYR={parseInt(item.SumِYR).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} tiems={item.Timeminet} Datetiemarth={item.Datetiem} />
        </View>
        <View style={styles.bodycontensab2}>
          {item?.databuld.map(renderdateboud)}
        </View>
      </View>
    </View>
  ), [idSectionSub, idSection]);
  return (
    <>
      {Addtaskfalse || bulid || bellmodelMann ? <CshmonvModul setBualdEdit={setBualdEdit} bulidEdit={bulidEdit} caseused={caseused} idSectionSub={idSectionSub} idsection={idSection} bellmodel={bellmodelMann} setBellmodel={setBellmodelMann} setBuald={setBuald} bulid={bulid} Addtaskfalse={Addtaskfalse} setAddTsksfalse={setAddTsksfalse} /> : null}
      <Moduls setBellmodel={setBellmodel} bellmodel={bellmodel} preesyes={() => {
        delet(iddelet);
        setBellmodel(false);
      }} />
      <Modal
        visible={meneu}
        transparent
        onRequestClose={() => setMenu(false)}
        animationType='fade'
        hardwareAccelerated={true}>
        <TouchableOpacity onPress={() => setMenu(false)} style={styles.centered_menu}>
          <Pressable onPress={() => setMenu(true)} style={styles.menu_mod1al}>
            <View style={styles.menu_body}>
              <TouchableOpacity
                onPress={() => {
                  setCarnsy('ر.ي.س')
                  setMenu(false)
                }}
                style={styles.bottom_1}  >
                <Text style={styles.text_menu}>{locale == 'ar_MA' ? "كشف بالريال السعودي" : "Statement in Saudi Riyals"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setCarnsy('ر.ي')
                  setMenu(false);
                }} style={styles.bottom_1}>
                <Text style={styles.text_menu}>{locale == 'ar_MA' ? "كشف بالريال اليمني" : "Statement in Yemeni riyals"} </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setMenu(false);
                  setCarnsy('$')
                }} style={styles.bottom_1}>
                <Text style={styles.text_menu}>{locale == 'ar_MA' ? "كشف بالدولار الامريكي" : "Statement in US dollars"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={findTaskss?.Done == true ? true : false}
                onPress={() => {
                  checkTask(tasksCONTRATID, true)
                  setMenu(false);
                }} style={styles.bottom_1}>
                {locale == 'ar_MA' ?
                  <Text style={styles.text_menu}>{findTaskss?.Done == true ? "الحساب مقفل" : "اقفال الحساب"}</Text>
                  :
                  <Text style={styles.text_menu}>{findTaskss?.Done == true ? "Account Locked" : "Account Closed"}</Text>}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setBellmodel(true)
                  setMenu(false);
                }} style={styles.bottom_1}>
                <Text style={styles.text_menu}>{locale === 'ar_MA' ? "حذف الحساب" : 'Account delet'}</Text>
              </TouchableOpacity>
              <Pdfexpense onprestyle={styles.bottom_1} text={styles.text_menu} options={options} onpressfale={() => {
                setCount(count + 1);
                setMenu(false);
              }} />
              <ExportExcel onprestyle={styles.bottom_1} text={styles.text_menu} caseuTarg={findTaskss?.sectionidnfy} options={arrays} onpressecel={() => { arraPrss(); setMenu(false); }} />
            </View>
          </Pressable>
        </TouchableOpacity>
      </Modal>
      <View style={styles.body}>
        <FlatList
          data={tasksCONTRAT.filter(item => item.ID === tasksCONTRATID)}
          renderItem={renderItem}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  bottom_add: {
    width: RFValue(50), height: RFValue(50), alignItems: 'center', marginHorizontal: RFValue(10), marginVertical: RFValue(20)
  },
  allsum: {
    borderWidth: 1, width: '40%', alignSelf: 'center',
    position: 'absolute', top: RFValue(20),
    zIndex: 999,
    borderRadius: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center',
    padding: RFValue(5),
    backgroundColor: colors.CURRENT
  },
  containerbuilds_sub: {
    backgroundColor: colors.GREY,
    // flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: RFValue(2),
    padding: RFValue(5),
    marginVertical: RFValue(5),
  },
  textbuild_sub: {
    color: colors.CURRENT,
    fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(10),
    textAlign: 'center',
    marginBottom: RFValue(10)
  },
  textbuild_sub_heder: {
    color: colors.CURRENT,
    fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(13),
    textAlign: 'center'
  },

  body: {
    height: '100%',
  },
  bodyc: {
    width: "100%",
    // marginVertical: RFValue(30),
    marginBottom: RFValue(100),
    justifyContent: 'center',
    alignSelf: 'center',
    // backgroundColor: colors.WHITE,
    // elevation: RFValue(2),
    // overflow:'hidden'
  },
  bodyconten: {
    flexDirection: 'column',
    // padding: RFValue(3),
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  bodycontensab: {
    flex: 2,
    width: '100%',
    backgroundColor: colors.WHITE,
    overflow: 'hidden'
  },
  bodycontensab2: {
    flexDirection: "column",
    width: '100%',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  text: {
    color: colors.WHITE,
    fontFamily: fonts.CAIROREGULARK
  },
  textinpu: {
    fontSize: RFValue(17),
    color: colors.BLACK,
    padding: RFValue(15)
  },
  containerbuilds_sub_heder: {
    backgroundColor: colors.ORANGE,
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: RFValue(5),
    paddingHorizontal: RFValue(10),
    // marginVertical: RFValue(5),
    marginTop: RFValue(-5)
  },
  buttom: {
    backgroundColor: colors.YALO,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '40%',
    padding: RFValue(5),
    borderRadius: RFValue(30)
  },
  textbuttom: {
    color: colors.CURRENT,
    textAlign: 'center',
    fontFamily: fonts.CAIROREGULARK
  },
  //menu moduls
  centered_menu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: "#00000009"
  },
  menu_mod1al: {
    width: RFValue(150),
    backgroundColor: colors.WHITE,
    height: RFValue(300),
    borderRadius: RFValue(10),
    marginHorizontal: RFValue(10),
    top: RFValue(-30),
    alignSelf: 'flex-end',

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

  }
}

)

export default Subprodect;










