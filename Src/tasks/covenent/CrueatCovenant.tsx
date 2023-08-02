import React, { useEffect, useState, useCallback } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  View,
  Text,
  ToastAndroid,
  FlatList,
  Pressable,
  Animated,
  Modal,
  TouchableOpacity,
} from "react-native"
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { useSelector, useDispatch } from "react-redux"
import { setTasksCOVENANTID } from '../../redux/actions'
import { phonecall } from '../../component/exportfunction'
import { styles } from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import PushCashCovenant from './pushCashCovenant'
import uuid from 'react-native-uuid';
import Pdfexpense from '../../component/pdfexpense'
import ExportExcel from '../../component/ecelexport'
import ModelsAbdu from '../../component/modelsAbdu'
// import { locale } from '../../Taskscsh';
import  locales,{locale}  from "../../locale";

export default function CrueatCovenant({ navigation }) {
  const { tasksCOVENANT, tasksCOVENANTID, tasksEVACUTION, tasksCONTRAT } = useSelector(state => state.userReducer);
  const [iddelet, setIddelet] = useState(false);
  const [compontrue, setCompontrue] = useState(false);
  const dispatch = useDispatch()
  const [sumsing, setSumsing] = useState(0)
  const [sumDoler, setSumDoler] = useState(0)
  const [sumReal, setSumReal] = useState(0)
  const [sumReals, setSumReals] = useState(0)
  const [dates, setSetData] = useState(0)
  let ObjectSumCash = [];
  let ObjectdolerPush = [];
  let ObjectrealsRPush = [];
  let ObjectrealPush = [];
  // let ObjectSum=[];
  let datach = 0
  // let ObjectSum=[];
  const [count, setCount] = useState(0)
  const findTaskss = tasksCOVENANT.find(pic => pic.ID === tasksCOVENANTID);
  const [bellmodel, setBellmodel] = useState(false);
  const [meneu, setMenu] = useState(false);
  const [pagSec, setPagSec] = useState('Crueat');
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

<table>
   <thead>
                       <tr>
                              <thead>
                                     <tbody>
                                      <th style="text-align: center;border-color: #333;"  colspan="9">${locale === 'ar_MA' ? "كشف بكافة العهد" : "Disclaimer of all covenants"}</th>
                                         <tr>
                                         <th scope="col" rowspan="2">${locale === 'ar_MA' ? "الرقم" : "number"}</th>
                                         <th scope="col" rowspan="2">${locale === 'ar_MA' ? "المبلغ الذي تم اخلائه" : "Cleared amount"}</th>
                                         <th scope="col" rowspan="2">${locale === 'ar_MA' ? "الاجمالي" : "total"}</th>
                                         <th scope="col" rowspan="2">${locale === 'ar_MA' ? "حالة العهده" : "custody status"}</th>
                                         <th scope="col" rowspan="2">${locale === 'ar_MA' ? "مقدم العهده /مستلم العهده" : "Provider/Trustee Recipient"}</th>
                                         <th scope="col" rowspan="2">${locale === 'ar_MA' ? "تاريخ" : "date"} </th>
                                         <th scope="col" colspan="2"  rowspan="2">${locale === 'ar_MA' ? "اسم" : "name"}</th>         
                                             <!-- rowspan="2" هذه للدمج عمودي -->
                                         </tr>                                  
                                     </tbody>
                             </thead>
                             </tr>         
                             <tbody>  
                             ${tasksCOVENANT.map((pic, index) =>
          `                
                                 <tr>
                                     <td>${pic.phone}</td>
                                     <td>${pic.kindmony + parseInt(pic.DescPush).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                     <td>${pic.kindmony + parseInt(pic.SumCash).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                     <td>${locale === 'ar_MA' ? pic.Done === false ? 'غير منتهيه' : 'منتهيه' : pic.Done === false ? 'Unfinished' : 'Finished'}</td>
                                     <td>${pic.caseused}</td>
                                     <td>${pic.TimeDate}</td>
                                     <td colspan='2'>${pic.describtion}</td>
                                     <td>${index + 1}</td>
                             </tr>    
                             `
        ).join('')}        
                             </tbody>
                          <tr>
                       <thead>
                       </table>
            
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
        fileName: `Exprenss_All_Covenent_pdf_${count}`,
        directory: 'Documents',
      }
      :
      null
  }
  useEffect(() => {
    const refrshing = navigation.addListener('focus', () => {
      setPagSec('Crueat');
      setSumReals(0)
      setSumReal(0)
      setSumDoler(0)
      setSumsing(0)
    })
    return refrshing
  }, [])
  

  let arrays = []
  const arraPrss = () => {
    tasksCOVENANT.map((pic, index) => (
      locale === 'ar_MA' ?
        arrays.push({
          "رقم الجوال": pic.phone,
          "المبلغ الذي تم اخلائه ": pic.kindmony + parseInt(pic.DescPush).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
          "اجمالي العهده ": pic.kindmony + parseInt(pic.SumCash).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
          "حالة العهده": pic.Done === false ? 'غير منتهيه' : 'منتهيه',
          "مقدم العهده /مستلم العهده": pic.caseused,
          "تاريخ استلام العهده": pic.TimeDate,
          "اسم": pic.describtion,
        })
        :
        arrays.push({
          "Mobile Number": pic.phone,
          "Cleared amount": pic.kindmony + parseInt(pic.DescPush).toFixed(2).replace(/(d)(?=(d{3})+(?! d))/g, '$1,'),
          "Total Custody": pic.kindmony + parseInt(pic.SumCash).toFixed(2).replace(/(d)(?=(d{3})+(?! d))/g, '$1,'),
          "State of the Covenant": pic.Done === false ? 'Unfinished' : 'Finished',
          "Provider/Recipient of the Covenant": pic.caseused,
          "Date of receipt of custody": pic.TimeDate,
          "name": pic.describtion,

        })
    ))
  }

  const data_heder = () => {
    return (
      <View style={[{ backgroundColor: colors.CURRENT }, styles.item_row]}>
        <View style={styles.targ}>
          <Text style={styles.textadd}>{locale === 'ar_MA' ? "التاريخ" : "Date"}</Text>
        </View>
        <View style={styles.targ}>
          <Text style={styles.textadd}>{locale === 'ar_MA' ? "الاسم" : "name"}</Text>
        </View>
        <View style={styles.targ}>
          <Text style={styles.textadd}>{locale === 'ar_MA' ? "المبلغ" : "Amount"}</Text>
        </View>
        <View style={[locale == 'ar_MA' ? { marginHorizontal: 2, } : null, styles.targ]}>
          <Text style={styles.textadd}>{locale === 'ar_MA' ? "تم إخلاء" : "Evacuated"}</Text>
        </View>
        <View style={styles.targ}>
          <Text style={styles.textadd}>{locale === 'ar_MA' ? "رصيدك" : "Balance"}</Text>
        </View>
        <View style={styles.targ}>
          <Text style={styles.textadd}>{locale === 'ar_MA' ? "جوال" : "Phone"}</Text>
        </View>
      </View>
    )
  }
  arrays.length
  const data_footer = (date, onpress, Sum, doler, rial, rialS) => {
    // rial,rialS,doler,
    return (
      <View style={{ backgroundColor: colors.CURRENT, flexDirection: 'row', padding: RFValue(2), }}>
        <View style={styles.sumsng}>
          <Text style={{ flex: 1, fontFamily: fonts.CAIROREGULARK, color: colors.WHITE }}>{locale == 'ar_MA' ? "الاجمالي" : "Total"}</Text>
        </View>
        <View style={[date == 1 ? { height: RFValue(50) } : { height: RFValue(30) }, { flexDirection: 'column', flex: 1 }]}>
          <Pressable onPress={onpress} android_ripple={{ color: colors.YALO, borderless: true }}>
            <Text style={styles.textaddBottom}>{parseInt(Sum).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
          </Pressable>
          <View style={[date == 0 ? { display: 'none' } : { display: 'flex', flex: 2, flexDirection: 'row', justifyContent: 'space-around' }]}>
            <Text style={styles.textaddfoter} >{parseInt(rialS).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} {locale == 'ar_MA' ? "ر.ي.س" : "SR"}</Text>
            <Text style={styles.textaddfoter}>{parseInt(rial).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} {locale == 'ar_MA' ? "ر.ي" : "YR"}</Text>
            <Text style={styles.textaddfoter}>{parseInt(doler).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} $ </Text>
          </View>
        </View>
      </View>
    )
  }


  const onpress = () => {
    dates == 0 ? setSetData(1) : setSetData(0);
  }

  const renderItem = useCallback(({ item, index }) => {
    datach = parseInt(item.SumCash) - parseInt(item.DescPush);
    ObjectSumCash.push({ x: parseInt(item.SumCash) });

    if (item.kindmony == 'ر.ي.س' || 'SR') {
      ObjectrealsRPush.push({ x: parseInt(item.SumCash) })
    } else if (item.kindmony == 'ر.ي' || 'YR') {
      ObjectrealPush.push({ x: parseInt(item.SumCash) })
    } else {
      ObjectdolerPush.push({ x: parseInt(item.SumCash) })
    }
    const sumCash = ObjectSumCash.reduce(
      (accumulator, currentValue) => accumulator + currentValue.x,
      0,
    );
    const sumCashRE = ObjectrealPush.reduce(
      (accumulator, currentValue) => accumulator + currentValue.x,
      0,
    );
    const sumCashRES = ObjectrealsRPush.reduce(
      (accumulator, currentValue) => accumulator + currentValue.x,
      0,
    );
    const sumCashDolr = ObjectdolerPush.reduce(
      (accumulator, currentValue) => accumulator + currentValue.x,
      0,
    );

    setSumReals(sumCashRES)
    setSumReal(sumCashRE)
    setSumDoler(sumCashDolr)
    setSumsing(sumCash)
    return (<TouchableOpacity key={index} onPress={() => {
      dispatch(setTasksCOVENANTID(item.ID));
      // handleNotification(item, index)
      navigation.navigate("SubprodectCovenant");
    }} style={styles.tasksbox}>
      <View style={styles.targ}>
        <Text style={styles.textdesc}>{item.TimeDate}</Text>
      </View>
      <View style={styles.targ}>
        <Text style={styles.texttask} numberOfLines={1}>{item.describtion}</Text>
      </View>
      <View style={styles.targ}>
        <Text style={styles.texttask} numberOfLines={1}>{item.kindmony}{parseInt(item.SumCash).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
      </View>
      <View style={styles.targ}>
        <Text style={styles.texttask} numberOfLines={1}>{item.kindmony}{item.DescPush.length > 0 ? parseInt(item.DescPush).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 0}</Text>
      </View>
      <View style={styles.targ}>
        <Text style={styles.texttask} numberOfLines={1}>{item.kindmony}{datach > 0 ? datach : item.SumCash}</Text>
      </View>
      <TouchableOpacity onPress={() => {
        item.phone.length > 0 ? phonecall(item.phone) : ToastAndroid.showWithGravity('لايوجد لديه رقم جوال', ToastAndroid.SHORT, ToastAndroid.CENTER);
      }} style={styles.targ}>
        <FontAwesome5 name="phone" size={20} color={item.caseused === 'لدي' ? colors.PREMREY : colors.RED} />
      </TouchableOpacity>
    </TouchableOpacity>
    )
  }, [ObjectSumCash]);
  const pushingCash = <PushCashCovenant tasksCOVENANT={tasksCOVENANT} tasksEVACUTION={tasksEVACUTION} tasksCONTRAT={tasksCONTRAT} iddelet={iddelet} setIddelet={setIddelet} IDEVacu={uuid.v4()} givinit={'اخلاءجديد'} />
  return (
    <>
      <Modal
        visible={meneu}
        transparent
        onRequestClose={() => setMenu(false)}
        animationType="fade"
        hardwareAccelerated={true}>
        <TouchableOpacity onPress={() => setMenu(false)} style={styles.centered_menu}>
          <Pressable onPress={() => setMenu(true)} style={styles.menu_mod1al}>
            <View style={styles.menu_body}>
              {
                tasksCOVENANT.length > 0 ?
                  <Pdfexpense onprestyle={styles.bottom_1} text={styles.text_menu} options={options} onpressfale={() => {
                    setCount(count + 1);
                    setMenu(false);
                  }} />
                  :
                  <TouchableOpacity
                    onPress={() => {
                      ToastAndroid.showWithGravity(locale==='ar_MA'?'لايوجد لديك عهد مسجلة':"You have no registered covenant", ToastAndroid.CENTER, ToastAndroid.SHORT)
                      setMenu(false);
                    }} style={styles.bottom_1}>
                    <Text style={styles.text_menu}>{locale === 'ar_MA' ? "تحويل PDF" : "PDF Converter"}</Text>
                  </TouchableOpacity>  }
              {
                tasksCOVENANT.length > 0 ?
                  <ExportExcel onprestyle={styles.bottom_1} text={styles.text_menu} caseuTarg={`Exprenss_AllCovente_${count}`} options={arrays} onpressecel={() => { arraPrss(); setMenu(false); }} />
                  :
                  <TouchableOpacity
                    onPress={() => {
                      ToastAndroid.showWithGravity(locale==='ar_MA'?'لايوجد لديك عهد مسجلة':"You have no registered covenant", ToastAndroid.CENTER, ToastAndroid.SHORT)
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
                <Text style={styles.text_menu}>{locale == 'ar_MA' ? "التواصل بالدعم" : "Connect with support"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ModulsData')
                  setMenu(false);
                }} style={styles.bottom_1}>
                <Text style={styles.text_menu}>{locale == 'ar_MA' ? "تعليمات وارشادات" : "Instructions & Guidelines"}</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </TouchableOpacity>
      </Modal>
      <ModelsAbdu setBellmodel={setBellmodel} bellmodel={bellmodel} />
      <View style={styles.senction3}>
        <Pressable android_ripple={{ color: colors.WHITE }} onPress={() => {
          setSumReals(0)
          setSumReal(0)
          setSumDoler(0)
          setSumsing(0)
          setPagSec('Crueat');
        }} style={[pagSec == 'Crueat' ? styles.conter : null, styles.contsec]}>
          <Text style={styles.text}>{locale == 'ar_MA'?"الحالية":"Current"}</Text>
        </Pressable>
        <Pressable
          android_ripple={{ color: colors.WHITE }}
          onPress={() => {
            dispatch(setTasksCOVENANTID(uuid.v4()))
            navigation.navigate("TasksCovenant")
          }}
          style={styles.buttomadd}>
          <Text style={styles.textadd}>{locale === 'ar_MA' ? "أضف" : "Add"}</Text>
        </Pressable>
        <Pressable android_ripple={{ color: colors.WHITE }} onPress={() => {
          setSumReals(0)
          setSumReal(0)
          setSumDoler(0)
          setSumsing(0)
          setPagSec('Fanshing');
        }} style={[pagSec == 'Fanshing' ? styles.conter : null, styles.contsec]}>
          <Text style={styles.text}>{locale === 'ar_MA' ? "المنتهيه" : "Ended"}</Text>
        </Pressable>
      </View>
      <TouchableOpacity onPress={() => setMenu(true)} style={styles.bell}>
        <FontAwesome5 style={styles.iconmessage} name="grip-horizontal" color={colors.CURRENT} size={18} />
      </TouchableOpacity>
      {iddelet ? pushingCash : null}
      {data_heder()}

      <FlatList
        data={tasksCOVENANT.filter(item => (pagSec == 'Fanshing' ? item.Done == true : item.Done == false))}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={[pagSec == 'Fanshing' ? { display: 'none' } : styles.buttoms]}>
        <TouchableOpacity style={styles.buttomsAl} onPress={() => tasksCOVENANT.length > 0 ? setIddelet(true) : ToastAndroid.showWithGravity('لايوجد لديك عهد بعد',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )}>
          <Text style={styles.textbot}>{locale === 'ar_MA' ? "إخلاء" : "vacating"}</Text>
        </TouchableOpacity>
      </View>

      {data_footer(dates, onpress, sumsing, sumDoler, sumReal, sumReals,)}

    </>

  );
}

