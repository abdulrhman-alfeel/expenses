//import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useMemo } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  View,
  ToastAndroid,
  Text,
  StyleSheet,
  Platform,
  Alert,
  TouchableOpacity,
  Modal,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator
} from "react-native"
import { RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from 'react-native-virtualized-view';
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";
//import ConstomBtom from "./ConstomBtom";
import { useSelector, useDispatch } from "react-redux"
import { setTasksCsh, setTasksCshConver } from '../../redux/actions'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dropdown from 'react-native-input-select';
import uuid from 'react-native-uuid';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import ModulsCalculator,{result} from '../modulsCalculator'
import { styles } from "./styles";
// import {locale}from '../../Taskscsh';
import  locales,{locale}  from "../../locale";

function PushCash({ pushcash, Pushsetfalse, IDCSHING,givinit }) {
  const { tasksCSH, tasksConver,tasksCSHID } = useSelector(state => state.userReducer);
  const dispatch = useDispatch()
  const [nameTArg, setNameTarg] = useState('');
  const [nameConver, setNameConver] = useState('');
  const [allConver, setAllConver] = useState('');
  const [pushing, setPush] = useState('');
  const [monyCnver, setMonveCnver] = useState('');
  ///تغيير طريقة التسديد
  const [paushset, setPaushset] = useState(locale ===  "ar_MA"?"إستلام":"Receive");
  const [False, setFalse] = useState(false);
  //خاص بالتعديل 
  const [pushSum, setPushProfid] = useState('');
  const [pushSumCover, setPushProfiCiver] = useState('');

  const [calculator, setCalculator] = useState(false);
  const [calculatorCover, setCalculatorCover] = useState(false);


 

  const Puchchshing = (idPush) => {
    setFalse(true);
    let cash = 0;
    let CashCover = 0;
    let falsing = false;
    let allCount = 0;
    if(nameConver.length > 0){
    if (allConver.includes(locale === 'ar_MA'?'جزئي':'partial' ) ) { allCount = parseInt(monyCnver) } else { allCount = parseInt(pushing) };}

    let dataching: any[] = [];
    dataching = [...tasksCSH];
    const datacash = dataching.find((item: { caseuTarg: string; }) => item.caseuTarg === nameTArg)
    const index = tasksCSH.findIndex((item: { caseuTarg: string | string[]; }) => item.caseuTarg.includes(nameTArg))
    const indexconver = tasksCSH.findIndex((item: { caseuTarg: string | string[]; }) => item.caseuTarg.includes(nameConver))
    const conver = tasksCSH.find((item: { caseuTarg: string | string[]; }) => item.caseuTarg.includes(nameConver))
    if (pushing.length > 0 && nameTArg.length > 0) {
      const indexEdeitCober = tasksConver.findIndex(item => item.id === idPush);
      const EditArrayCov = conver.arryCahing.findIndex(item => item.id === idPush);
      const EditArray = datacash.arryCahing.findIndex(item => item.id === idPush);
      let cashing = parseInt(pushing);
      if (EditArray > -1) {
        if (parseInt(pushSum) > parseInt(pushing) || parseInt(pushSum) < parseInt(pushing)) {
          cashing = cashing - parseInt(pushSum)
        }
        if (nameConver.length > 0 && parseInt(pushSumCover) > allCount || nameConver.length > 0 && parseInt(pushSumCover) < allCount) {
          CashCover = CashCover - parseInt(pushSumCover)
        }
      }
      if (datacash?.DescPush) {
        cashing = parseInt(datacash.DescPush) + parseInt(pushing);
        if (cashing > parseInt(datacash.SumCash)) {
          ToastAndroid.showWithGravity(locale==='ar_MA'?'لايمكن اكمال العملية مبلغ الدفع اعلى من المتبقي عليه':'The transaction cannot be completed The payment amount is higher than the rest of it',
            ToastAndroid.CENTER,
            ToastAndroid.SHORT
          );
          falsing = true;
          setFalse(false);
        } else if (cashing === parseInt(datacash.SumCash)) {
          cash = cashing;
          dataching[index].Done = true;
        } else {
          cash = cashing;
          falsing = false
        };
        // console.log(cashing);
      } else if (parseInt(datacash?.SumCash) < cashing) {
        ToastAndroid.showWithGravity(locale==='ar_MA'?'لايمكن اكمال العملية مبلغ الدفع اعلى من المبلغ الذي  عليه':'The transaction cannot be completed The payment amount is higher than the amount on it',
          ToastAndroid.CENTER,
          ToastAndroid.SHORT
        );
        falsing = true;
        setFalse(false);
      } else if (parseInt(datacash?.SumCash) === cashing) {
        cash = cashing;
        dataching[index].Done = true;
        falsing = false;
      } else {
        cash = parseInt(pushing);
        falsing = false;
      }




      if (paushset === "إستلام"||paushset ==="Receive" && nameConver.length > 0 && falsing === false) {
        if (conver.DescPush) {
          const datasum = parseInt(conver.DescPush) + allCount;
          if (datasum > parseInt(conver.SumCash)) {
            falsing = true
            ToastAndroid.showWithGravity(locale==='ar_MA'?'لايمكن اكمال العملية مبلغ التحويل اعلى من المتبقي عندك للمحول اليه':'The transaction cannot be completed The transfer amount is higher than the rest you have for the transferee',
              ToastAndroid.CENTER,
              ToastAndroid.SHORT
            )
            setFalse(false);
          } else if (parseInt(monyCnver) > parseInt(pushing)) {
            falsing = true
            ToastAndroid.showWithGravity(locale==='ar_MA'?'لايمكن اكمال العملية مبلغ التحويل اعلى من القسط المدفوع من قبل المدين':'The transaction cannot be completed and the transfer amount is higher than the installment paid by the debtor',
              ToastAndroid.CENTER,
              ToastAndroid.SHORT
            )
            setFalse(false);
          } else if (datasum === parseInt(conver.SumCash)) {
            CashCover = datasum;
            dataching[indexconver].Done = true;
            falsing = false;
          } else {
            CashCover = datasum;
            falsing = false;
          }
        } else {
          CashCover = allCount;
          falsing = false;
        }
      }

      if (falsing === false) {
       
        dataching[index].DescPush = cash.toString();
        let convercash: any[] = []
        console.log(cash);
        var Tasks = {
          id: idPush,
          IDCUST: datacash.ID,
          SumCash: datacash.SumCash,
          caseuTarg: nameTArg,
          pushcash: parseInt(pushing).toString(),
          pushcashSum: cash,
          codm: datacash.codm,
          TiemStart: datacash.selectedStartDateS,
          TiemPUSH: new Date(Date.now()).toUTCString(),
          idConver: paushset ==="إستلام"|| paushset === "Receive" ? conver.ID : locale ===  "ar_MA"?"دفع":"To push",
          conver: paushset === "إستلام"||paushset ==="Receive" ? nameConver : locale ===  "ar_MA"?"دفع":"To push",
          money_transfer: CashCover,
          allConver: allConver,
          cousused: paushset
        };
        if (EditArray > -1) {
          convercash = [...tasksConver];
          convercash[indexEdeitCober] = Tasks;
          datacash.arryCahing[EditArray] = Tasks;
          if (nameConver.length > 0) {
            dataching[indexconver].DescPush = CashCover.toString()
            conver.arryCahing[EditArrayCov] = Tasks;
          }
        } else {
          datacash.arryCahing.push(Tasks)
          if (nameConver.length > 0) {
            console.log(CashCover.toString())
            dataching[indexconver].DescPush = CashCover.toString()
            conver.arryCahing.push(Tasks)
            convercash = [...tasksConver, Tasks];
          }
        }
        AsyncStorage.setItem("Taskscsh", JSON.stringify(dataching)).then(() => {
          dispatch(setTasksCsh(dataching))
          // navigation.navigate('profile')
        })
        AsyncStorage.setItem("Tasksconver", JSON.stringify(convercash)).then(() => {
          dispatch(setTasksCshConver(convercash))
          ToastAndroid.showWithGravity(locale === 'ar_MA'?'تم التسديد بنجاح':"Successful payment",
            ToastAndroid.CENTER,
            ToastAndroid.LONG
          );
          Pushsetfalse(false);
          setNameTarg('');
          setNameConver('');
          setPush('');
          setPaushset(locale ===  "ar_MA"?"إستلام":"Receive");
          setFalse(false);
          setAllConver('');
          setMonveCnver('')
        });
      }
    } else {
      ToastAndroid.showWithGravity(locale === 'ar_MA'?'يجب اكمال البيانات اولاً':'You must complete the data first',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
      setFalse(false);
    } }



  const getCashConver = () => {
    const conver = tasksCSH.find((item: { ID: string | string[]; }) => item.ID ===tasksCSHID )?.arryCahing.find(i=> i.id === IDCSHING)
    if (conver) {
      setNameTarg(conver.caseuTarg);
      console.log(conver.caseuTarg)
      setNameConver(conver.conver);
      setPush(conver.pushcash);
      setPushProfid(conver.pushcash)
      setPaushset(conver.cousused);
      setAllConver(conver.allConver);
      setMonveCnver(conver.money_transfer)
      setPushProfiCiver(conver.money_transfer)
    }
  }


getCashConver();
 const useclurek = (valu) => {
  if(valu === 1){
    setPush(result)
  }else{
    setMonveCnver(result)
  }}

  return (
    <>
      {calculator?<ModulsCalculator  visble={calculator} onrequewt={setCalculator} onprssfounction={()=>useclurek(1)} />:null}
      {calculatorCover?  <ModulsCalculator  visble={calculatorCover} onrequewt={setCalculatorCover}  onprssfounction={()=>useclurek(2)} />:null}
      <Modal
        visible={pushcash}
        transparent
        onRequestClose={() => Pushsetfalse(false)}
        animationType='fade'
        hardwareAccelerated={true}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} >
          <Pressable onPress={() => { nameTArg.length <= 0 ? Pushsetfalse(false) : null }} style={styles.centered_view}>
            <Pressable onPress={() => { Pushsetfalse(true) }} style={[allConver.includes('جزئي') && paushset ==="إستلام"||paushset ==="Receive"  ? { height: RFValue(550) } : paushset === "دفع"||paushset === "To push" ? { height: RFValue(350) } : { height: RFValue(500) }, styles.bell_mod1al]}>
              <View style={styles.bell_button}>
                <TouchableOpacity onPress={() => Pushsetfalse(false)} style={{ marginVertical: RFValue(10), marginHorizontal: RFValue(15), alignSelf: 'flex-start' }}>
                  <FontAwesome5Icon name='times' size={20} color={colors.WHITE} />
                </TouchableOpacity>
                <View style={styles.puchcontener}>
                  <TouchableOpacity onPress={() => setPaushset(locale === "ar_MA"?"إستلام":"Receive")} style={[paushset ==="إستلام"||paushset ==="Receive" ? { backgroundColor: colors.YALO } : null, styles.puchcontener_sub1]}><Text style={styles.puchcontener_sub1_text}>{locale === 'ar_MA'?"استلام":"Receive"}</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => setPaushset(locale ===  "ar_MA"?"دفع":"To push")} style={[paushset === 'دفع'||paushset === "To push" ? { backgroundColor: colors.YALO } : null, styles.puchcontener_sub1]}><Text style={styles.puchcontener_sub1_text}>{locale ===  "ar_MA"?"دفع":"To push"}</Text></TouchableOpacity >
                </View>
                <View
                  style={styles.cansall}>
                  <Text style={styles.textmos}>{locale ===  "ar_MA"? paushset ==='دفع' ? 'المستلم' : 'الدافع':paushset ==="To push"? 'Total transferred to him':'motive'}</Text>
                  <View style={styles.inputtitelcounter}>
                    <Dropdown
                      labelStyle={{ top: 5, textAlign: 'center', paddingRight: -3, fontSize: 12, fontFamily: fonts.CAIROBLACK, color: colors.WHITE, }}
                      placeholder={locale ===  "ar_MA"?paushset === "دفع" ? 'المستلم' : 'الدافع':paushset ==="To push"? 'Total transferred to him':'motive'}
                      selectedItemStyle={{ color: colors.RED }}
                      dropdownIconStyle={{ position: 'absolute', right: 5, top: 12 }}
                      dropdownStyle={styles.taskhom}
                      dropdownContainerStyle={styles.contenar}
                      searchInputStyle={{ minHeight: 20, height: 50 }}
                      options={
                        paushset === "دفع"||  paushset ==="To push" ?
                          tasksCSH.filter((item: { caseused: string; Done: boolean; }) => item.caseused === paushset&& item.Done === false).map((pic: { caseuTarg: any; }) => (
                            { name: `${pic.caseuTarg}`, code: `${pic.caseuTarg}` }
                          ))
                          :
                          tasksCSH.filter((item: { caseused: string; Done: boolean; }) => item.caseused === "إستلام"||item.caseused ==="Receive" && item.Done === false).map((pic: { caseuTarg: any; }) => (
                            { name: `${pic.caseuTarg}`, code: `${pic.caseuTarg}` }
                          ))}
                      optionLabel={'code'}
                      optionValue={'name'}
                      selectedValue={nameTArg}
                      onValueChange={(value) => setNameTarg(value)}
                      primaryColor={'green'}
                    />
                  </View>
                </View>
                <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center' }}>
                  <View style={styles.mossdd}>
                    <Text style={styles.textmos}>{locale === 'ar_MA'?"اجمالي الدين":"Total Debt"}</Text>
                    <View style={[{ backgroundColor: colors.WHITE }, styles.inputtitelcounter]}>
                      <Text style={styles.inputdecerb}>{tasksCSH.filter((item: { caseuTarg: string; }) => item.caseuTarg === nameTArg).length > 0 ? parseInt(tasksCSH?.find((item: { caseuTarg: string; }) => item.caseuTarg === nameTArg).SumCash).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 0}</Text>
                    </View>
                  </View>
                  <View style={styles.mossdd}>
                    <Text style={styles.textmos}>{locale === 'ar_MA'?"المٌسدد من الدين إلى الان":'Paid off the debt so far'}: </Text>
                    <View style={[{ backgroundColor: colors.WHITE }, styles.inputtitelcounter]}>
                      <Text style={styles.inputdecerb}>{tasksCSH.filter((item: { caseuTarg: string; }) => item.caseuTarg === nameTArg).length > 0 ? parseInt(tasksCSH.find((item: { caseuTarg: string; }) => item.caseuTarg === nameTArg).DescPush).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 0}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cansall}>

                  <View style={styles.inputtitelcounterinput}>
                  <Pressable android_ripple={{color:colors.YALO,borderless:true}} style={{width:50,position:'absolute',top:5,marginHorizontal:10,zIndex:1,left:locale == 'ar_MA'?-30:10}} onPress={()=>setCalculator(true)}>
                  <FontAwesome5Icon  name='calculator' size={15} color={colors.GREYD}/>
                    </Pressable>
                    <TextInput style={[styles.inputdecerb]} keyboardType='number-pad' placeholder={locale === 'ar_MA'?"المبلغ الذي سيتم تسديده الان":"The amount to be paid now"} value={pushing} onChangeText={(value) => setPush(value)} />
                  </View>
                </View>
                <View
                  style={[paushset === "دفع"||paushset === "To push" ? { display: 'none' } : styles.cansall]}>
   
                  <View style={[{ width: '90%', }, styles.inputtitelcounterconvent]}>
                  <Text style={styles.textConver}>{locale=== 'ar_MA'?"إذا كنت تريد تحويله لشخص ما اختر من قائمة الدائنين":"If you want to transfer it to someone, choose from the list of creditors"}</Text>
                    <Dropdown
                      labelStyle={{ top: 5, textAlign: 'center', paddingRight: -3, fontSize: 12, fontFamily: fonts.CAIROBLACK, color: colors.BLACK, }}
                      placeholder={locale ===  "ar_MA"?"دفع":"To push"}
                      selectedItemStyle={{ color: colors.RED }}
                      dropdownIconStyle={{ position: 'absolute', right: 5, top: 12 }}
                      dropdownStyle={styles.taskhom}
                      // dropdownContainerStyle={[{ marginHorizontal: RFValue(5) }, styles.contenar]}
                      dropdownContainerStyle={styles.contenar}
                      searchInputStyle={{
                        minHeight: 20, height: 50
                      }}
                      options={tasksCSH.filter((item: { caseused: string; Done: boolean; }) => item.caseused === 'دفع'&& item.Done === false||item.caseused === "To push" && item.Done === false).map((pic: { caseuTarg: any; }) => (
                        { name: `${pic.caseuTarg}`, code: `${pic.caseuTarg}` }
                      ))}
                      optionLabel={'code'}
                      optionValue={'name'}
                      selectedValue={nameConver}
                      onValueChange={(value: React.SetStateAction<string>) => setNameConver(value)}
                      primaryColor={'green'}
                    />
                    <Dropdown
                      labelStyle={{ top: 5, textAlign: 'center', paddingRight: -3, fontSize: 12, fontFamily: fonts.CAIROBLACK, color: colors.BLACK, }}
                      placeholder={locale === 'ar_MA'?"حدد نوع التحويل":"Select conversion type"}
                      selectedItemStyle={{ color: colors.RED }}
                      dropdownIconStyle={{ position: 'absolute', right: 5, top: 12 }}
                      dropdownStyle={styles.taskhom}
                      dropdownContainerStyle={styles.contenar}
                      searchInputStyle={{
                        minHeight: 20, height: 50
                      }}
                      options={locale === 'ar_MA'?
                       [ { name: "جزئي", code: "جزئي" }, { name: "كلي", code: "كلي" }]
                        :
                        [{ name: "partial", code: "partial" }, { name: "total", code: "total" }]
                      }
                      optionLabel={'name'}
                      optionValue={'code'}
                      selectedValue={allConver}
                      onValueChange={(value: React.SetStateAction<string>) => setAllConver(value)}
                      primaryColor={'green'}
                    />
         

         
                <View style={[allConver.includes(locale === 'ar_MA'?'جزئي':'partial') ? { display: 'flex' } : { display: 'none' }, styles.mossdd]}>
                  <View style={styles.inputtitelcounterinput}>
                  <Pressable android_ripple={{color:colors.YALO,borderless:true}} style={{top:-10,position:'absolute',left:10,zIndex:1}} onPress={()=>setCalculatorCover(true)}>
                  <FontAwesome5Icon  name='calculator' size={15} color={colors.GREYD}/>
                    </Pressable>
                    <TextInput style={[{right:5},styles.inputdecerb]} keyboardType='number-pad' placeholder={locale === 'ar_MA'?"المبلغ المراد تحويله":"Amount to be transferred"} value={monyCnver} onChangeText={(value) => setMonveCnver(value)} />
                  </View>
                  </View>
                </View>
              </View>
              </View>
              {False
                ?
                <ActivityIndicator color={colors.CURRENT} size={25} />
                :
                <TouchableOpacity
                  onPress={() => Puchchshing(IDCSHING)}
                  style={styles.inputtitelcounterbuton}>
                 { locale === 'ar_MA'?
                 <Text style={styles.inputdecerbuttom}>{givinit === 'تعديل' ? "تعديل" :"تسديد"}</Text>
                 :
                  <Text style={styles.inputdecerbuttom}>{givinit === 'Edit' ? "Edit" :"Payment"}</Text>}
                </TouchableOpacity>
              }
            </Pressable>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>

    </>
  );
}

export default PushCash
// export default React.memo(PushCash)

