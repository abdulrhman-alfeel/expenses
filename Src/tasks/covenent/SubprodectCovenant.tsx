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
  Platform,
  Pressable

} from "react-native"
import { RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from 'react-native-virtualized-view';
import { colors } from "../../constants/colors";
import { useSelector, useDispatch } from "react-redux"
import { setTasksCOVENANT, setTasksCOVENANTID,setTasksEVACUTION} from '../../redux/actions'
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from "@react-native-community/checkbox";
import PushNotification from "react-native-push-notification";
import Haderpost from '../../component/cashing/haderpost'
import CreatCovenant from '../../component/covenant/creatCovenant'
import FooterCovenant from '../../component/covenant/footerCovenant'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import uuid from 'react-native-uuid';
import Pdfexpense from '../../component/pdfexpense'
import ExportExcel from '../../component/ecelexport'
import Moduls from '../../component/moduls'
import { fonts } from "../../constants/fonts";
import { phonecall } from '../../component/exportfunction'
// import {locale}from '../../Taskscsh';
import  locales,{locale}  from "../../locale";


function SubprodectCovenant({navigation}) {
  const { tasksCOVENANT, tasksEVACUTION, tasksCOVENANTID , tasksCONTRAT} = useSelector(state => state.userReducer);
  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [meneu, setMenu] = useState(false);
  const [bellmodel, setBellmodel] = useState(false);
  // const [pagSec, setPagSec] = useState('Prodectmy');
  const [count, setCount] = useState(0)
  const [iddelet, setIddelet] = useState(0);

//   useEffect(() => {
// console.log(tasksEVACUTION)
//   }, [])
const Done = tasksCOVENANT.find(tasks => tasks.ID === tasksCOVENANTID);
const Donestrue = Done?.Done;
  const delet = (id) => {
    const filterDasec = tasksCOVENANT.filter(tasks => tasks.ID !== id)
    AsyncStorage.setItem('tasksCOVENANT', JSON.stringify(filterDasec)).then(() => {
      dispatch(setTasksCOVENANT(filterDasec))
      ToastAndroid.showWithGravity(locale ===  "ar_MA"?'تم العملية بنجاح':"Saved the operation successfully",
      ToastAndroid.CENTER,
      ToastAndroid.LONG
    );
       navigation.navigate('CrueatCovenant')
    }).catch(err => console.log(err))
  }
  const checkTask = (id, newValue) => {
    const index = tasksCOVENANT.findIndex(tasks => tasks.ID === id);
    let newTasks = [...tasksCOVENANT];
    const finddata = newTasks.find(tasks => tasks.ID === id);
    if (index > -1) {
      var Tasks = {
        id: uuid.v4(),
        IDCUST: finddata.ID,
        SumCash: finddata.SumCash,
        Covenantday: finddata.SumCash,
        TimeCovenant: new Date().toDateString(),
        Describtions:locale ===  "ar_MA"? 'لم يتم توثيق التفاصيل':"Details not documented",
        //اجمالي المدفوع لهذا اليوم
        CovenantSum:  finddata.SumCash,
        kindmony: finddata.kindmony,
          imagop:[],
        //المتبقي
        thremn:0
      }
      newTasks[index].Done = newValue;
      newTasks[index].DescPush = finddata.SumCash;
      finddata?.arrayOprition.push(Tasks)
      const convercash = [...tasksEVACUTION, Tasks];
      AsyncStorage.setItem("tasksEVACUTION", JSON.stringify(convercash)).then(() => {
        dispatch(setTasksEVACUTION(convercash))
        ToastAndroid.showWithGravity('تمت العملية  بنجاح',
          ToastAndroid.CENTER,
          ToastAndroid.LONG
        );
      })
      AsyncStorage.setItem('tasksCOVENANT', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTasksCOVENANT(newTasks));
          ToastAndroid.showWithGravity(locale ===  "ar_MA"?'تم نقلها إلى قائمة العهد المنتهيه':'Moved to the expired covenant list',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          navigation.navigate('CrueatCovenant')
        }).catch(ERR => { console.log(ERR) })
    }
  }
  const findTaskss = tasksCOVENANT.find(pic => pic.ID === tasksCOVENANTID);

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
${tasksCOVENANT.filter(item => item.ID === tasksCOVENANTID).map((pic, index) =>
  `
<table>
   <thead>
                       <tr>
                              <thead>
                                     <tbody>
                                      <th style="text-align: center;border-color: #333;"  colspan="7">${locale === 'ar_MA'?"كشف تفصيلي عن العهده المفصله":"Detailed disclosure of the detailed covenant"}</th>
                                         <tr>
                                             <th scope="col" rowspan="2">${locale === 'ar_MA'?"الرقم":"number"}</th>
                                             <th scope="col" rowspan="2">${locale === 'ar_MA'?"المبلغ الذي تم اخلائه":"Cleared amount"}</th>
                                             <th scope="col" rowspan="2">${locale === 'ar_MA'?"الاجمالي":"total"}</th>
                                             <th scope="col" rowspan="2">${locale === 'ar_MA'?"حالة العهده":"custody status"}</th>
                                             <th scope="col" rowspan="2">${locale === 'ar_MA'?"مقدم العهده /مستلم العهده":"Provider/Trustee Recipient"}</th>
                                             <th scope="col" rowspan="2">${locale === 'ar_MA'?"تاريخ":"date"} </th>
                                             <th scope="col" colspan="2"  rowspan="2">${locale === 'ar_MA'?"اسم":"name"}</th>    
                                             <!-- rowspan="2" هذه للدمج عمودي -->
                                         </tr>                                  
                                     </tbody>
                             </thead>
                             </tr>         
                             <tbody>                  
                                 <tr>
                                     <td>${pic.phone}</td>
                                     <td>${pic.kindmony + parseInt(pic.DescPush).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                     <td>${pic.kindmony + parseInt(pic.SumCash).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                     <td>${locale === 'ar_MA'?  pic.Done === false ? 'غير منتهيه' : 'منتهيه':pic.Done === false ? 'Unfinished': 'Finished'}</td>
                                     <td>${pic.caseused}</td>
                                     <td>${pic.TimeDate}</td>
                                     <td>${pic.describtion}</td>
                             </tr>            
                             </tbody>
                          <tr>
                       <thead>
                       </table>
                       ${pic.arrayOprition.map((item, index) =>
                        `  <table>
                       <tbody>
                       <th style="text-align: center;border-color: #333; background-color:darkblue;"  colspan="5">${locale === 'ar_MA'?"كشف تفصيلي لأخلاء العهده":" Detailed statement of the release of the custody"}</th>   
                     <tbody style="align-self:center; justify-content:center">
                                    <tr>
                                      <th scope="col" rowspan="2">${locale === 'ar_MA'?"المبلغ الذي تم اخلائه حتى الان":"amount vacated so far"}</th>
                                      <th scope="col" rowspan="2"> ${locale === 'ar_MA'?"تاريخ الاخلاء":"Evacuation date"} </th>
                                      <th scope="col" rowspan="2">${locale === 'ar_MA'?"مبلغ الاخلاء":"evacuation amount"}</th>
                                      <th scope="col"   rowspan="2">${locale === 'ar_MA'?"تفاصيل الاخلاء":"evacuation details"}</th>        
                                      <th scope="col"  rowspan="2">${locale === 'ar_MA'?"م":"m"}</th>        
                                  </tr>
                                 
                              </tbody>
                      </thead>
                      </tr>         
                      <tbody>
                          <tr>
                             <td>${parseInt(item.thremn).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                              <td>${item.TimeCovenant}</td>
                              <td>${parseInt(item.Covenantday).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                              <td>${item.Describtions}</td>
                              <td>${index +1}</td>
                      </tr>                
                      </tbody>
                   </tbody>
                      <!-- tm-app-feature-header -->
                  </table>
                  <div style="margin-bottom: 20px; flex-direction: column; display: flex;width: 100%; margin: auto;">
                  <h4 style="padding:5px;width:50%;margin:auto; text-align: center;border-color: #333; color:#ccc;border-radius: 15px; background-color:rgb(9, 9, 53);" colspan="5">${locale === 'ar_MA'?"مرفقات الاخلاء":"Evacuation attachments"}</h4>
              <div  style="flex-wrap: wrap; flex-direction: row; display: flex;width: 95%; margin: auto;">
              ${item.imagop.map((it)=>
             `<div style=" margin: 5px;width:200px; height:200px; border-radius:10px; background-color: #b8cef9;">
                  <img src=${it.image}  style="width: 100%;height: 100%;" />
              </div>`
                )}
              </div>
              `)}`
              ).join('')}  
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
    fileName: `Exprenss_${findTaskss?.describtion}pdf_${count}`,
    directory: 'Documents',
  }
:
null}

//excel
let arrays = []
const arraPrss =()=>{
  tasksCOVENANT.filter(item => item.ID === tasksCOVENANTID).map((pic, index) => (
    locale === 'ar_MA'?
    arrays.push({
      "رقم الجوال": pic.phone,
      "المبلغ الذي تم اخلائه ":pic.kindmony + parseInt(pic.DescPush).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      "اجمالي العهده ":pic.kindmony + parseInt(pic.SumCash).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      "حالة العهده": pic.Done === false ? 'غير منتهيه' : 'منتهيه',
      "مقدم العهده /مستلم العهده": pic.caseused,
      "تاريخ استلام العهده": pic.TimeDate,
      "اسم": pic.describtion,
    })
    :
    arrays.push({
      "Mobile Number": pic.phone,
      "Cleared amount" :pic.kindmony + parseInt(pic.DescPush).toFixed(2).replace(/(d)(?=(d{3})+(?! d))/g, '$1,'),
      "Total Custody" :pic.kindmony + parseInt(pic.SumCash).toFixed(2).replace(/(d)(?=(d{3})+(?! d))/g, '$1,'),
      "State of the Covenant": pic.Done === false ? 'Unfinished' : 'Finished',
      "Provider/Recipient of the Covenant": pic.caseused,
      "Date of receipt of custody": pic.TimeDate,
      "name": pic.describtion,
      
    })
  ))
  tasksCOVENANT.find(item => item.ID === tasksCOVENANTID)?.arrayOprition.forEach((item, index) => (
    locale === 'ar_MA'?
    arrays.push({
      "المبلغ الذي تم اخلائه حتى الان": parseInt(item.thremn).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      "تاريخ الاخلاء": item.TimeCovenant,
      "مبلغ الاخلاء": parseInt(item.Covenantday).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      "تفاصيل الاخلاء": item.Describtions,
      "م": index +1
    })
    :
    arrays.push({
      "Amount vacated so far": parseInt(item.thremn).toFixed(2).replace(/(d)(?=(d{3})+(?! d))/g, '$1,'),
      "Evacuation date": item.TimeCovenant,
      "Evacuation amount": parseInt(item.Covenantday).toFixed(2).replace(/(d)(?=(d{3})+(?! d))/g, '$1,'),
      "Evacuation details": item.Describtions,
      "m": index +1
    })
  ))
  

}

const renderItem=useCallback(({ item, index }) => (
  <>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <TouchableOpacity style={styles.bottom_add} onPress={() => {
            setIddelet(item.ID);
            setMenu(true)
          }}>
            <FontAwesome5Icon name="grip-horizontal" size={20} color={colors.CURRENT} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottom_add} onPress={() => {item.phone.length> 0 ? phonecall(item.phone):     ToastAndroid.showWithGravity(locale ==='ar_MA'?'لايوجد لديه رقم جوال':"He has no mobile number",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );}}>
            <FontAwesome5Icon name="phone" size={20} color={colors.CURRENT} />
          </TouchableOpacity>
        </View>
        <View style={styles.bodyconten}>
          <View style={styles.bodycontensab}>
            <Haderpost caseuTarg={item.describtion} textmazed={locale === 'ar_MA'?"للتعديل من هنا":"Edit from here"} textpush={locale == 'ar_MA'?' المبلغ الذي تم اخلائه حتى الان':"'The amount vacated so far'"} DescPush={item.DescPush.length > 0 ?item.kindmony + parseInt(item.DescPush).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : item.kindmony +0 }  Datetiem={item.TimeDate} sum={item.kindmony + parseInt(item.SumCash).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} onpress={() => {
              dispatch(setTasksCOVENANTID(item.ID))
              navigation.navigate("TasksCovenant")
            }} />
          </View>
        </View>
    <View style={styles.bodycontensab2}>
      <View style={styles.creettask}>
        <CreatCovenant  tasksCOVENANT={tasksCOVENANT} tasksEVACUTION={tasksEVACUTION} tasksCONTRAT={tasksCONTRAT}  arrayOprition={item.arrayOprition} caseused={item.caseused} describtion={item.describtion}/>
      </View>
      <View style={styles.footers}>
        <FooterCovenant SumDollarscov={item.DescPush.length > 0 ?item.kindmony + parseInt(item.DescPush).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : item.kindmony +0 } />
      </View>
    </View>
  </>
),[tasksCOVENANT,iddelet])
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
              <TouchableOpacity
               disabled={Donestrue == true ? true : false}
                onPress={() => {
                  checkTask(tasksCOVENANTID, true)
                  setMenu(false);
                }} style={styles.bottom_1}>
                  {locale == 'ar_MA'?
                     <Text style={styles.text_menu}>{Donestrue ===  true?"العهده مقفل":"اقفال العهده"}</Text>
                     :
                <Text style={styles.text_menu}>{Donestrue == true ? "Covenant Locked" : "Covenant Closed"}</Text>}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setBellmodel(true)
                  setMenu(false);
                }} style={styles.bottom_1}>
                <Text style={styles.text_menu}>{locale == 'ar_MA'?"حذف العهده":"delet Covenant"}</Text>
              </TouchableOpacity>
              <Pdfexpense onprestyle={styles.bottom_1} text={styles.text_menu}  options={options} onpressfale={() => {
                  setCount(count + 1);
                setMenu(false);
              }} />
    <ExportExcel onprestyle={styles.bottom_1} text={styles.text_menu} caseuTarg={findTaskss?.describtion} options={arrays} onpressecel={() => { arraPrss(); setMenu(false); }} />
            </View>
          </Pressable>
        </TouchableOpacity>
      </Modal>
      <Moduls setBellmodel={setBellmodel} bellmodel={bellmodel} preesyes={() => { delet(iddelet);  setBellmodel(false); }} />
      <View style={[tasksEVACUTION.filter(ite => ite.IDCUST === tasksCOVENANTID ).length > 0 ? {height:"100%"}:{height:'10%'},  styles.bodyc]}>
        <FlatList
        showsVerticalScrollIndicator={false}
          data={tasksCOVENANT.filter(item => item.ID === tasksCOVENANTID)}
          renderItem={renderItem}
          keyExtractor={(tiem, index) => index.toString()}
        />
      </View>

    </>
  );
}
const styles = StyleSheet.create({

  bottom_add:{
    width:RFValue(50),height:RFValue(50),alignItems:'center', marginHorizontal: RFValue(10), marginVertical: RFValue(20) 
  }, 

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
    marginHorizontal: RFValue(30),
    alignSelf: 'flex-start'
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
    width: '95%',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.YALO,
    borderRadius: RFValue(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf:'center',
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
export default SubprodectCovenant;










