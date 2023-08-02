//import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  View,
  ToastAndroid,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable
} from "react-native"
import { RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from 'react-native-virtualized-view';
import { colors } from "../../constants/colors";
import { useSelector, useDispatch } from "react-redux"
import { setTasksCsh, setTasksCshID, setTasksCshConver } from '../../redux/actions'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Haderpost from '../../component/cashing/haderpost'
import Creattask from '../../component/cashing/creattask'
import Footer from '../../component/cashing/footer'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import uuid from 'react-native-uuid';
import ExportExcel from '../../component/ecelexport'
import Moduls from '../../component/moduls'
import Pdfexpense from '../../component/pdfexpense'
import { fonts } from "../../constants/fonts";
import { phonecall } from '../../component/exportfunction'
// import {locale}from '../../Taskscsh';
import  locales,{locale}  from "../../locale";

export const Subprodect = ({ navigation }) => {
  const { tasksCSH, tasksConver, tasksCSHID } = useSelector(state => state.userReducer);
  const dispatch = useDispatch()
  const [meneu, setMenu] = useState(false);
  const [bellmodel, setBellmodel] = useState(false);
  const [iddelet, setIddelet] = useState(0);
  const [count, setCount] = useState(0)
  const [findTasks, setFindTasks] = useState({})
  const [lest_Cash, setlest_Cash] = useState({})

  // const findData = lest_Cash.find(pic => pic.IDCUST === tasksCSHID);



useEffect(()=>{
  const findTasks = tasksCSH.find(pic => pic.ID === tasksCSHID);
  const filteCash = findTasks.arryCahing;
  setFindTasks(findTasks)
  const lest_Cash = filteCash[filteCash.length - 1];
  setlest_Cash(lest_Cash)
},[])
  //excel 
  let options={};
  {
    meneu ?
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
                                          <th scope="col" rowspan="2">${locale === 'ar_MA'?"تاريخ اخر عملية سداد":"Last payment date"}</th>
                                          <th scope="col" rowspan="2">${locale === 'ar_MA'?"المبلغ المدفوع حتى الان":"amount paid so far"}</th>
                                          <th scope="col" rowspan="2">${locale === 'ar_MA'?"تاريخ بدء الدين":"Debt start date"}</th>
                                          <th scope="col" rowspan="2">${locale === 'ar_MA'?"المبلغ الكلي للدين":"Total amount of debt"}</th>
                                          <th scope="col" rowspan="2">${locale === 'ar_MA'?"الاسم":"name"}</th>
                                          <th scope="col" rowspan="2">${locale === 'ar_MA'?"الفئة":"class"}</th>
                                          <th scope="col" rowspan="2">${locale === 'ar_MA'?"م":"M"}</th>
                                      </tr>
                                  </tbody>
                          </thead>
                          </tr>         
                          <tbody>
                          ${tasksCSH.filter(item => item.ID === tasksCSHID).map((pic, index) =>
                         `<tr>
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
                <table>
                  <header>
                      <h1 style=" font-size: 13px; text-align: center;">${locale === 'ar_MA'?"عمليات السداد والتحويلات المالية":"Payments and Money Transfers"}</h1>
                  </header>
                          <thead>
                              <tr>
                           <thead>
                                  <tbody>
                                      <tr>
                                          <th style="text-align: center;border-color: #333;" colspan="2">${locale === 'ar_MA'?"عملية التحويل":"Conversion Process"}</th>
                                          <!-- the cell we want to combine -->
                                          <th scope="col" rowspan="2">${locale === 'ar_MA'?"تاريخ القسط":'Installment date'}</th>
                                          <th scope="col" rowspan="2">${locale === 'ar_MA'?"القسط رقم":"installment number"}</th>
                                          <th scope="col" rowspan="2">${locale === 'ar_MA'?"الاسم":"name"}</th>
                                          <th scope="col" rowspan="2">${locale === 'ar_MA'?"الفئة":"class"}</th>

  
                                          <!-- rowspan="2" هذه للدمج عمودي -->
                                      </tr>
                                      <th scope="col">${locale === 'ar_MA'?"مبلغ التحويل":'Transfer amount'}</th>
                                      <th scope="col">${ locale ===  "ar_MA"? findTasks?.caseused.includes('دفع') ? "الشخص المحول منه" : "الشخص المحول له": findTasks?.caseused.includes('To push')?"Transferee" : "Transferee"} </th>
                                      
                                  </tbody>
  
                          </thead>
                          </tr>         
                          <tbody>
                          ${findTasks.arryCahing.map((pic, index) =>
          `<tr >
                                  <td>${parseInt(pic.money_transfer).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                  <td>${findTasks?.caseused.includes(locale ===  "ar_MA"?'دفع':"To push") ? tasksCSH.find(item => item.ID === pic.IDCUST)?.caseuTarg : pic.conver}</td>
                                  <td>${pic.TiemPUSH}</td>
                                  <td>${index + 1}</td>
                                  <td>${findTasks.caseuTarg}</td>
                                  <td>${findTasks.caseused}</td>
                              </tr>`
        ).join('')}
                          </tbody>
                          <!-- tm-app-feature-header -->
                      </table>
  </body>
  </html>`,
        fileName: `contract_Cash_${findTasks?.caseuTarg}pdf_${count}`,
        // directory:RNFS.DownloadDirectoryPath ,
        directory: 'Documents',
        // directory: 'Download',
      }
      :
      null
  }
  let optionsC = [];
  const arraPrss = () => {
    tasksCSH.filter(item => item.ID === tasksCSHID).map((pic, index) => (
      locale === 'ar_MA'?
      optionsC.push({
        "تاريخ اخر عملية سداد": lest_Cash?.TiemPUSH,
        "المبلغ المدفوع حتى الان": pic.codm + parseInt(pic.DescPush).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
        "تاريخ بدء الدين": pic.selectedStarateS,
        "المبلغ الكلي للدين": pic.codm + parseInt(pic.SumCash).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
        "الاسم": pic.caseuTarg,
        "الفئة": pic.caseused,
        "م":index +1
      })
      :
      optionsC.push({
        "Last payment date": lest_Cash?.TiemPUSH,
        "Amount paid so far": pic.codm + parseInt(pic.DescPush).toFixed(2).replace(/(d)(?=(d{3})+(?! d))/g, '$1,'),
        "Debt Start Date": pic.selectedStarateS,
        "Total amount of debt": pic.codm + parseInt(pic.SumCash).toFixed(2).replace(/(d)(?=(d{3})+(?! d))/g, '$1,'),
        "Name": pic.caseuTarg,
        "Category": pic.caseused,
        "m":index +1
      })
    ))
    findTasks.arryCahing.forEach((pic, index) => (
      locale === 'ar_MA'?
      optionsC.push({
        "القائم بالتحويل":findTasks.caseused.includes('دفع') ? tasksCSH.find(item => item.ID === pic.IDCUST).caseuTarg : pic.conver ,
        "مبلغ التحويل": parseInt(pic.money_transfer).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
        "تاريخ القسط": pic.TiemPUSH,
        "القسط رقم": index + 1,
        "الاسم": findTasks.caseuTarg,
        "الفئة": findTasks.caseused,
      })
      :
      optionsC.push({
        "transferor":findTasks.caseused.includes(locale ===  "ar_MA"?'دفع':"To push") ? tasksCSH.find(item => item.ID === pic.IDCUST).caseuTarg : pic.conver ,
        "transfer amount": parseInt(pic.money_transfer).toFixed(2).replace(/(d)(?=(d{3})+(?! d))/g, '$1,'),
        "Installment Date":pic.TiemPUSH,
        "Installment No.": index + 1,
        "Name": findTasks.caseuTarg,
        "Category": findTasks.caseused,
      })
    ))
  }

  const delet = (id) => {
    const filterDasec = tasksCSH.filter(tasks => tasks.ID !== id)
    AsyncStorage.setItem('Taskscsh', JSON.stringify(filterDasec)).then(() => {
      dispatch(setTasksCsh(filterDasec))
      ToastAndroid.showWithGravity(locale ===  "ar_MA"?'تم العملية بنجاح':"Saved the operation successfully",
      ToastAndroid.CENTER,
      ToastAndroid.LONG
    );
      navigation.goBack()
    }).catch(err => console.log(err))
  }
  const checkTask = (id, newValue) => {
    const index = tasksCSH.findIndex(tasks => tasks.ID === id);
    const finddata = tasksCSH.find(tasks => tasks.ID === id);
    if (index > -1) {
      let newTasks = [...tasksCSH];
      newTasks[index].Done = newValue;
      newTasks[index].DescPush = finddata.SumCash;
      var Tasks = {
        id: uuid.v4(),
        IDCUST: finddata.ID,
        SumCash: finddata.SumCash,
        pushcash: finddata.SumCash,
        pushcashSum: 0,
        TiemStart: finddata.selectedStartDateS,
        TiemPUSH: new Date(Date.now()).toUTCString(),
        idConver: 0,
        conver: null,
        money_transfer: '0',
        allConver: '',
        cousused: finddata.cousused
      }
      const convercash = [...tasksConver, Tasks];
      AsyncStorage.setItem("Tasksconver", JSON.stringify(convercash)).then(() => {
        dispatch(setTasksCshConver(convercash))
        ToastAndroid.showWithGravity(locale === 'ar_MA'?'تم التسديد بنجاح':"Successful payment",
          ToastAndroid.CENTER,
          ToastAndroid.LONG
        );
      })
      AsyncStorage.setItem('Taskscsh', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTasksCsh(newTasks));
          ToastAndroid.showWithGravity(locale === 'ar_MA'?'تم نقلها إلى قائمة الديون المنتهيه':"Moved to expired debt list",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          navigation.navigate('CrueatingCAh')
        }).catch(ERR => { console.log(ERR) })
    }
  }
  const renderItem = useCallback(({ item, index }) => (
    <View key={index}>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <TouchableOpacity style={styles.bottom_add} onPress={() => {
          setIddelet(item.ID);
          setMenu(true)
        }}>
          <FontAwesome5Icon name="grip-horizontal" size={20} color={colors.CURRENT} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottom_add} onPress={() => {
          item.phone.length > 0 ? phonecall(item.phone) : ToastAndroid.showWithGravity(locale ==='ar_MA'?'لايوجد لديه رقم جوال':"He has no mobile number",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }}>
          <FontAwesome5Icon name="phone" size={20} color={colors.CURRENT} />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyconten}>
        <View style={styles.bodycontensab}>
          <Haderpost caseuTarg={item.caseuTarg} textmazed={locale === 'ar_MA'?"للتعديل من هنا":"Edit from here"} textpush={locale === 'ar_MA'?'المبلغ المدفوع حتى الان':'Amount paid so far'} DescPush={item.codm + parseInt(item.DescPush).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} Datetiem={item.selectedStartDateS} sum={item.codm + parseInt(item.SumCash).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} onpress={() => {
            dispatch(setTasksCshID(item.ID))
            navigation.navigate("Taskscsh")
          }} />
        </View>
      </View>
      <View style={styles.bodycontensab2}>
        <View style={styles.creettask}>
          <Creattask arryCahing={item.arryCahing} />
        </View>
      <View style={styles.footers}>
        <Footer DescPush={item.DescPush} caseuseds={item.caseuseds} codm={item.codm} arryCahing={item.arryCahing} />
      </View>
      </View>
    </View>
  ), [tasksCSH]);
  return (
    <>  
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
                disabled={findTasks?.Done == true ? true : false}
                onPress={() => {
                  checkTask(tasksCSHID, true)
                  setMenu(false);
                }} style={styles.bottom_1}>
                {locale === 'ar_MA'?
                  <Text style={styles.text_menu}>{findTasks?.Done == true ? "الدين مقفل" : "اقفال الدين"}</Text>
                  :
                <Text style={styles.text_menu}>{findTasks?.Done == true ? "Religion Locked" : "Religion Closed"}</Text>}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setBellmodel(true)
                  setMenu(false);
                }} style={styles.bottom_1}>
                <Text style={styles.text_menu}>{locale === 'ar_MA'?"حذف الدين":'Delete Religion'}</Text>
              </TouchableOpacity>
              <Pdfexpense onprestyle={styles.bottom_1} text={styles.text_menu} options={options} onpressfale={() => {
                setCount(count + 1);
                setMenu(false);
              }} />
              <ExportExcel onprestyle={styles.bottom_1} text={styles.text_menu} caseuTarg={findTasks?.caseuTarg} options={optionsC} onpressecel={() => { arraPrss(); setMenu(false); }} />
            </View>
          </Pressable>
        </TouchableOpacity>
      </Modal>
      <Moduls setBellmodel={setBellmodel} bellmodel={bellmodel} preesyes={() => { delet(iddelet); setBellmodel(false); }} />
      {/* <View style={[tasksConver.find(i => i.IDCUST == tasksCSHID || i.idConver == tasksCSHID) ? { height: '100%' } : { height: '90%' }, styles.body]}> */}
      <View style={styles.bodyc}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tasksCSH.filter(item => item.ID === tasksCSHID)}
          renderItem={renderItem} />

      </View>
      {/* </View> */}
    </>
  );
}
const styles = StyleSheet.create({
  bottom_add: {
    width: RFValue(50), height: RFValue(50), alignItems: 'center', marginHorizontal: RFValue(10), marginVertical: RFValue(20)
  },
  centered_menu: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: "#00000009"
  },
  menu_mod1al: {
    width: RFValue(150),
    backgroundColor: colors.WHITE,
    height: RFValue(150),
    borderRadius: RFValue(10),
    marginHorizontal: RFValue(30),
    alignSelf: 'flex-start',
    top:150
  },
  menu_body: {
    flex: 1,
    height: RFValue(150),
    justifyContent: "space-around",
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
  body: {
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  bodyc: {
    width: "95%",
    flex: 1,
    marginHorizontal: RFValue(10),
    // marginVertical: RFValue(30),
    marginBottom: RFValue(10),
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: RFValue(5),
    elevation: RFValue(2),
    // overflow:'hidden'
  },
  bodyconten: {
    flexDirection: 'column',
    padding: RFValue(3),
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  bodycontensab: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.BACKGRUONDPAG,
    overflow: 'hidden'
  },
  bodycontensab2: {
    flexDirection: "column",
    width: '100%',
    borderWidth: 1,
    borderColor: colors.YALO,
    borderRadius: RFValue(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  footers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  creettask: {
    borderRadius: RFValue(1),
    padding: RFValue(5),

  },
  bliertask: {
    borderRadius: RFValue(1),
    padding: RFValue(5),
    borderLeftWidth: 1,
    borderColor: colors.BACKGRUONDPAG

  },
  disalltask: {
    borderRadius: RFValue(1),
    padding: RFValue(5),
    borderLeftWidth: 1,
    borderColor: colors.BACKGRUONDPAG

  },
  arrow: {
    alignSelf: 'flex-start',
    marginHorizontal: RFValue(20),
    marginVertical: RFValue(10)
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
  buttompdf: {
    backgroundColor: colors.CURRENT,
    padding: RFValue(7),
    borderRadius: RFValue(15)
  },
  textpdf: {
    color: colors.WHITE,
    fontFamily: fonts.CAIROVARIABLEFON,

  }

}

)
export default Subprodect;















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