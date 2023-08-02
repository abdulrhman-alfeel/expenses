import { View, ScrollView, Text, TextInput, StyleSheet, ToastAndroid, Pressable, Modal, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { colors } from './constants/colors'
import { useSelector, useDispatch } from "react-redux"
import { setTasksCONTRAT, setTasksCONTRATID } from './redux/actions'
import { RFValue } from 'react-native-responsive-fontsize'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { fonts } from './constants/fonts'
import DateTimePicker from 'react-native-modal-datetime-picker';
import uuid from 'react-native-uuid';
import Modeltasksection from './component/modeltasksection'
import ModulsCalculator, { result } from './component/modulsCalculator'
import { NativeModules, Platform } from 'react-native';
import  locales,{locale}  from "./locale";
// const locale =
//   Platform.OS === 'ios'
//     ? NativeModules.SettingsManager.settings.AppleLocale
//     : NativeModules.I18nManager.localeIdentifier;

      export const dolars = [{ label: locale === "ar_MA" ? 'دولار امريكي' : "$", value: 1 }, { label: locale === "ar_MA" ? 'ريال سعودي' : "SR", value:2}, { label: locale === "ar_MA" ? 'ريال يمني' : "YR", value: 3}];
// export const dolars = [{ name: locale === "ar_MA" ? 'دولار امريكي' : "$", code: '$' }, { name: locale === "ar_MA" ? 'ريال سعودي' : "SR", code: locale === "ar_MA" ? 'ر.ي.س' : "SR" }, { name: locale === "ar_MA" ? 'ريال يمني' : "YR", code: locale === "ar_MA" ? 'ر.ي' : "YR" }];
export default function Taskscshmonv({ navigation }) {
  const { tasksCONTRAT, tasksCONTRATID } = useSelector(state => state.userReducer);
  const dispatch = useDispatch()
  const [databuld, setData] = useState([]);
  const [sectiontitle, setSectiontitel] = useState('');
  const [sectiondiscreab, setSectiondiscreab] = useState('');
  const [abzrphtion, setAbzrph] = useState('');
  const [bellmodel, setBellmodel] = useState(false)
  const [liprri, setLiprre] = useState(false)
  const [bulid, setBuald] = useState(false)
  const [bulidEdit, setBualdEdit] = useState(locale === "ar_MA" ? 'إضافة' : 'add')
  const [caseused, setCase] = useState("");
  const [arthDath, setDataarth] = useState('');
  const [sectionidnfy, setSecidenfy] = useState('');
  //وقت الخاص بالنفقات  
  const [DatetiemSubfals, setDataTiermSubfels] = useState(false);
  const [DatetiemaSub, setDataTiermSub] = useState('');
  //وقت الخاص بالنفقات الفرعية 
  const [Datetiemarthfals, setDataTiermarthfels] = useState(false);
  const [Datetiemarthwrit, setDataTiermarthwrit] = useState('');
  //وقت خاص بانشاء الحساب 
  const [Datecound, setDataCount] = useState('');
  const [Datecoundfalse, setDataCountfalse] = useState(false);
  //خاص بوقت الساعة
  const [Tiems, setTimes] = useState('');
  // اخطاء عدم اكمال البيانات
  const [falseerr, setFalseerr] = useState(false);
  const [Addtaskfalse, setAddTsksfalse] = useState(false);

  //array sub
  const [DatabesEdit, setDatabesEite] = useState([]);
  //اجور عمال 
  const [idSection, setIdsection] = useState('');
  const [idSectionSub, setIdsectionSub] = useState('');
  const [tittellaber, setTittellaber] = useState('');
  //العملات 
  const [SumDollar, setSumDollar] = useState(0);
  const [SumSR, setSumSR] = useState(0);
  const [SumYR, setSumYR] = useState(0);

  const [calculator, setCalculator] = useState(false);

  const [FalseCalulter, setFalseCalculator] = useState(false);
  // focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSecidenfy('');
      setDataarth('');
      setDatabesEite([]);
      setData([]);
      setBualdEdit(locale === "ar_MA" ? 'إضافة' : 'add');
      setSumDollar(0)
      setSumSR(0)
      setSumYR(0)
      setDataTiermarthwrit(new Date(Date.now()).toLocaleDateString());
      setDataCount(new Date().toLocaleDateString());
      setDataTiermSub(new Date().toLocaleDateString());
      setTittellaber('');
      setAbzrph('')
      setIdsection('')
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useMemo(() => {
    if (Datecound.length > 0) { setDataCountfalse(false) }
    if (DatetiemaSub.length > 0) { setDataTiermSubfels(false) }
    if (Datetiemarthwrit.length > 0) { setDataTiermarthfels(false) }
  }, [Datecound, DatetiemaSub, Datetiemarthwrit]);

  useEffect(() => {
    setDataTiermarthwrit(new Date(Date.now()).toLocaleDateString());
    setDataTiermSub(new Date().toLocaleDateString());
  }, [])
  const useclurek = () => {
    setSectiondiscreab(result);
  }

  const deleting = () => {
    const indexconten = databuld.findIndex(tasks => tasks.id === idSection);
    console.log(idSectionSub)
    let addnew = [];
    addnew = [...databuld];
    if (caseused === 'headersub') {

      const finddata = addnew.find(tasks => tasks.id === idSection);
      const ind = finddata?.Databes.findIndex(tasks => tasks.idSub === idSectionSub);
      // if (finddata) {     
      finddata?.Databes.splice(ind, 1);
      let objectsDoler = [];
      let objectYR = [];
      let objectSR = [];
      finddata?.Databes.forEach((item, index) => {
        item.arthDath === '$'|| item.arthDath === 'دولار امريكي' ?
          objectsDoler.push({ x: parseInt(item.sectionpriclabrr) }) : item.arthDath ==='ريال سعودي' || item.arthDath ==='SR' ?
            objectSR.push({ x: parseInt(item.sectionpriclabrr) }) : objectYR.push({ x: parseInt(item.sectionpriclabrr) });
      })
      const sumDoler = objectsDoler.reduce((accumulator, currentValue) => accumulator + currentValue.x, 0);
      const sumSR = objectSR.reduce((accumulator, currentValue) => accumulator + currentValue.x, 0);
      const sumYR = objectYR.reduce((accumulator, currentValue) => accumulator + currentValue.x, 0);

      console.log(parseInt(sumDoler))
      addnew[indexconten].SumDollar = sumDoler;
      addnew[indexconten].SumِSR = sumSR;
      addnew[indexconten].SumِYR = sumYR;
      //
      setData(addnew);
      ToastAndroid.showWithGravity(locale === "ar_MA" ? 'تم العملية بنجاح' : "Saved the operation successfully",
        ToastAndroid.CENTER,
        ToastAndroid.LONG
      );
    } else {
      const filterDasec = addnew.findIndex(tasks => tasks.id === idSection)
      if (filterDasec > -1) {
        databuld.splice(filterDasec, 1)
        ToastAndroid.showWithGravity(locale === "ar_MA" ? 'تم العملية بنجاح' : "Saved the operation successfully",
          ToastAndroid.CENTER,
          ToastAndroid.LONG
        );
      }
    }
  }
  const getDatalabrrs = () => {
    if (sectiontitle.length > 0 && sectiondiscreab.length > 0 && arthDath.value > 0) {
      setLiprre(true)
      console.log(idSectionSub);
      const indexconten = databuld.findIndex(tasks => tasks.id === idSection);
      let addnew = [];
      addnew = [...databuld];
      try {
        console.log(dolars.find(item=>item.value == arthDath.value)?.label)
        var datares = {
          idHOM: idSection,
          idSub: idSectionSub.length > 0 ? idSectionSub : uuid.v4(),
          sectiontitle: sectiontitle,
          sectionpriclabrr: sectiondiscreab,
          abzrphtion: abzrphtion,
          arthDath:dolars.find(item=>item.value == arthDath.value)?.label,
          TimeSub: Datetiemarthwrit,
          Timeminet: Tiems,
        }
        // const index = Datelaber.findIndex(tasks => tasks.id === idSectionlabrr);
        const finddata = addnew.find(tasks => tasks.id === idSection);
        if (finddata) {
          const index = finddata.Databes.findIndex(tasks => tasks.idSub === idSectionSub);
          const databulise = databuld.find(te => te.id === idSection);
          if (index > -1) {
            finddata.Databes[index] = datares;
            let objectsDoler = [];
            let objectYR = [];
            let objectSR = [];
            databulise?.Databes.forEach((item, index) => {
              item.arthDath === '$'|| item.arthDath === 'دولار امريكي' ?
              objectsDoler.push({ x: parseInt(item.sectionpriclabrr) }) : item.arthDath ==='ريال سعودي' || item.arthDath ==='SR' ?
                objectSR.push({ x: parseInt(item.sectionpriclabrr) }) : objectYR.push({ x: parseInt(item.sectionpriclabrr) });
            })
            const sumDoler = objectsDoler.reduce((accumulator, currentValue) => accumulator + currentValue.x, 0);
            const sumSR = objectSR.reduce((accumulator, currentValue) => accumulator + currentValue.x, 0);
            const sumYR = objectYR.reduce((accumulator, currentValue) => accumulator + currentValue.x, 0);
            addnew[indexconten].SumDollar = sumDoler;
            addnew[indexconten].SumِSR = sumSR;
            addnew[indexconten].SumِYR = sumYR;
            console.log(databuld)
            setBualdEdit(locale === 'ar_MA'?'إضافة':"add")
            setData(addnew);
          } else {
            addnew.find(tasks => tasks.id === idSection)?.Databes.push(datares);
            let objectsDoler = [];
            databulise?.Databes.forEach((item, index) => {
              objectsDoler.push({ x: parseInt(item.sectionpriclabrr) });
            })
            const sumDoler = objectsDoler.reduce((accumulator, currentValue) => accumulator + currentValue.x, 0);
            if (arthDath ==='دولار امريكي'||arthDath === '$') {
              addnew[indexconten].SumDollar = sumDoler;
            } else if (arthDath === 'ريال سعودي'||arthDath ==='SR') {
              addnew[indexconten].SumِSR = sumDoler;
            } else {
              addnew[indexconten].SumِYR = sumDoler;
            }
            console.log(databuld)
            setData(addnew);
          }
         
          // empty
        }
      } catch (err) {
        console.log(err)
      }
      setLiprre(false)
      cansleshook()
    } else {
      ToastAndroid.showWithGravity(locale === "ar_MA" ? 'يجب اكمال البيانات المطلوبه' : "The required data must be completed",
        ToastAndroid.CENTER,
        ToastAndroid.LONG
      );
        setFalseerr(true)
    }

  }



  const getDatabulds = () => {
    console.log(idSection)
    let addnew = [];
    addnew = [...databuld];
    if (tittellaber.length > 0) {
      try {
        setLiprre(true)
        var datares = {
          id: idSection,
          Databes: DatabesEdit,
          sectiontitle: tittellaber,
          SumDollar: SumDollar,
          SumِSR: SumSR,
          SumِYR: SumYR,
          abzrphtion: abzrphtion,
          Time: DatetiemaSub,
          Timeminet: Tiems
        }
        const index = databuld.findIndex(tasks => tasks.id === idSection);
        const finddata = databuld.find(tasks => tasks.id === idSection);
        if (finddata) {
          addnew[index] = datares;
          setData(addnew);
          setBualdEdit(locale === 'ar_MA'?'إضافة':"add");
        } else {
          addnew = [...databuld];
          addnew.push(datares);
          setData(addnew);
        }
        setDataCountfalse(false)
      } catch (err) {
        console.log(err)
      }
      setBellmodel(false)
      cansleshook()
      setLiprre(false)
    } else {
      ToastAndroid.showWithGravity(locale === "ar_MA" ? 'يجب اكمال البيانات المطلوبه' : "The required data must be completed",
        ToastAndroid.CENTER,
        ToastAndroid.LONG
      ),
        setFalseerr(true)
    }



  }

  const onPress = () => {
    if (sectionidnfy.length === 0) {
      ToastAndroid.showWithGravity(locale === "ar_MA" ? 'يجب اكمال البيانات ' : "The required data must be completed",
        ToastAndroid.CENTER,
        ToastAndroid.LONG
      ),
        setFalseerr(true)
    } else {
      try {
   setLiprre(false)
        let Dollar = 0;
        let SR = 0;
        let YR = 0;

        let objectsDoler = [];
        let objectsSR = [];
        let objectsYR = [];
        databuld.forEach((item, index) => {
          objectsDoler.push({ x: parseInt(item.SumDollar) });
          objectsSR.push({ x: parseInt(item.SumِSR) });
          objectsYR.push({ x: parseInt(item.SumِYR) });
        })
        Dollar = objectsDoler.reduce(
          (accumulator, currentValue) => accumulator + currentValue.x,
          0,);
        //sum reduce SR   
        SR = objectsSR.reduce(
          (accumulator, currentValue) => accumulator + currentValue.x,
          0,);
        //sum reduce YR
        YR = objectsYR.reduce(
          (accumulator, currentValue) => accumulator + currentValue.x,
          0,);

        var Task = {
          ID: tasksCONTRATID,
          sectionidnfy: sectionidnfy,
          Datetiem: Datecound,
          Timeminet: new Date(Date.now()).toLocaleTimeString(),
          databuld: databuld,
          Done: false,
          SumDollar: Dollar,
          SumِSR: SR,
          SumِYR: YR,
        }
        const newTasks = [...tasksCONTRAT, Task]
        AsyncStorage.setItem("TasksCONTRAT", JSON.stringify(newTasks)).then(() => {
          dispatch(setTasksCONTRAT(newTasks))
          ToastAndroid.showWithGravity(locale === "ar_MA" ? 'تم الحفظ بنجاح' : "Saved successfully",
            ToastAndroid.CENTER,
            ToastAndroid.LONG
          );
          navigation.navigate('Prodectmyfalse');
          cansleshook();
          setLiprre(false)
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
  const cansleshook = () => {
    setSectiontitel('');
    setSectiondiscreab('');
    setIdsectionSub('');
    setAbzrph('');
    setDataarth('');
    setDataTiermarthfels(false);
    setFalseCalculator(false)
    setTimes('');
    setDataCountfalse(false);
    setFalseerr(false)
    setTittellaber('');
    setDatabesEite([]);
    setAddTsksfalse(false);
    setBualdEdit(locale === "ar_MA" ? 'إضافة' : 'add');

  }

  return (
    <>
      <ModulsCalculator onprssfounction={() => useclurek()} visble={calculator} onrequewt={setCalculator} />
      <View style={styles.body}>
        <DateTimePicker
          mode='date'
          isVisible={Datecoundfalse}
          onConfirm={(value) => setDataCount(value.toLocaleDateString())}
          // onChange={(value)=>setDataCount(value)}
          onCancel={() => setDataCountfalse(false)}
        />
        <DateTimePicker
          mode='date'
          isVisible={DatetiemSubfals}
          onConfirm={(value) => setDataTiermSub(value.toLocaleDateString())}
          // onChange={(value)=>setDataCount(value)}
          onCancel={() => setDataTiermSubfels(false)}
        />
        <Modal
          visible={bulid}
          transparent
          onRequestClose={() => setBuald(false)}
          animationType='fade'
          hardwareAccelerated={true}>
          <TouchableOpacity onPress={() => { setBuald(false); cansleshook() }} style={styles.centered_view}>
            <Pressable onPress={() => setBuald(true)} style={[abzrphtion.length <= 100 ? { height: '50%' } : abzrphtion.length > 150 ? { height: '60%' } : null, styles.dag_mod1al]}>
              {abzrphtion.length > 150 ?
                <ScrollView style={[abzrphtion.length > 100 ? { height: '90%', marginVertical: RFValue(10) } : { height: RFValue(250), marginVertical: RFValue(10) }, styles.modulsub]}>
                  <View style={styles.continer_sub}>
                    <View style={styles.textconter}>
                      <Text numberOfLines={3} style={styles.textview}>{locale == 'ar_MA' ? "البيان" : "Statement"}: {sectiontitle}</Text>
                      {sectiondiscreab.length <= 0 ?
                        <View style={{ flexDirection: "column", alignItems: 'center' }}>
                          <Text numberOfLines={3} style={styles.textview}>{locale == 'ar_MA' ? "المبلغ" : "Amount"}</Text>
                          <View style={{ flexDirection: "row" }}>
                            <Text numberOfLines={3} style={styles.textview}>{locale == 'ar_MA' ? "ر.ي" : "YR"}{SumYR.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                            <Text numberOfLines={3} style={styles.textview}>$ {SumDollar.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                            <Text numberOfLines={3} style={styles.textview}>{locale == 'ar_MA' ? "ر.ي.س" : "SR"}{SumSR.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                          </View>
                        </View>
                        :
                        <Text numberOfLines={3} style={styles.textview}> {locale === 'ar_MA' ? "المبلغ" : "Amount"}:{arthDath + parseInt(sectiondiscreab).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>}
                    </View>
                    <View style={styles.textconter}>
                      <Text style={styles.textview}>{locale == 'ar_MA' ? "الوقت" : 'Time'}: {Tiems}</Text>
                      <Text style={styles.textview}>{locale == 'ar_MA' ? "التاريخ" : "Date"}: {Datetiemarthwrit}</Text>
                    </View>
                    <View style={styles.abzrph}>
                      <Text style={styles.textview}>{locale == 'ar_MA' ? "تفاصيل" : "Details"}:</Text>
                      <Text style={[abzrphtion.length <= 100 ? { display: 'flex' } : { display: 'none' }, styles.textviewabzrphtion]}>{abzrphtion}</Text>
                      <ScrollView style={[abzrphtion.length > 150 ? { display: 'flex' } : { display: 'none' }]}>
                        <Text style={styles.textviewabzrphtion}>{abzrphtion}</Text>
                      </ScrollView>
                    </View>
                  </View>
                  <View style={styles.footer}>
                    <TouchableOpacity
                      onPress={() => {
                        if (caseused === 'headersub') {
                          databuld.find(te => te.id === idSection)?.Databes.filter(ite => ite.idSub == idSectionSub).forEach(pic => {
                            setSectiontitel(pic.sectiontitle)
                            setSectiondiscreab(pic.sectionpriclabrr)
                          })
                          setBualdEdit("تعديل");
                          setFalseCalculator(true);
                          setAddTsksfalse(true);
                        } else {
                          databuld.filter(ite => ite.id === idSection).forEach(pic => {
                            setTittellaber(pic.sectiontitle)
                            setSumDollar(pic.SumDollar)
                            setSumSR(pic.SumِSR)
                            setSumYR(pic.SumِYR)
                          })
                          setBualdEdit("تعديل");
                          setBellmodel(true)}
                        setBuald(false);}}
                      style={styles.Edit}>
                      <Text style={styles.textbodtomleprr}>{locale == 'ar_MA' ? "تعديل" : "Edit"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        deleting();
                        setBuald(false);
                      }} style={styles.Edit}>
                      <Text style={styles.textbodtomleprr}>{locale == 'ar_MA' ? "حذف" : "delet"}</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
                :
                <View style={[abzrphtion.length > 100 ? {
                  height: '90%',
                  justifyContent: 'center',
                  alignItems: 'center',
                } : {
                  height: RFValue(350), marginVertical: RFValue(10),
                  justifyContent: 'center',
                  alignItems: 'center',
                }, styles.modulsub]}>
                  <View style={styles.continer_sub}>
                    <View style={[sectiondiscreab.length > 0 ? { flexDirection: 'row-reverse' } : null, styles.textconter]}>
                      <Text numberOfLines={5} style={styles.textview}>{locale == 'ar_MA' ? "البيان" : "Statement"}: {sectiontitle}</Text>
                      {sectiondiscreab.length <= 0 ?
                        <View style={{ flexDirection: "column", alignItems: 'center' }}>
                          <Text numberOfLines={3} style={styles.textview}>{locale == 'ar_MA' ? "المبلغ" : "Amount"}</Text>
                          <View style={{ flexDirection: "row" }}>
                            <Text numberOfLines={3} style={styles.textview}>ر.ي {SumYR.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                            <Text numberOfLines={3} style={styles.textview}>$ {SumDollar.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                            <Text numberOfLines={3} style={styles.textview}>ر.ي.س{SumSR.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                          </View>
                        </View>
                        :
                        <Text numberOfLines={3} style={styles.textview}> {locale == 'ar_MA' ? "المبلغ" : "Amount"}:{arthDath + parseInt(sectiondiscreab).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>}
                    </View>
                    <View style={[{ flexDirection: 'row-reverse' }, styles.textconter]}>
                      <Text style={styles.textview}>{locale == 'ar_MA' ? "الوقت" : 'Time'}: {Tiems}</Text>
                      <Text style={styles.textview}>{locale == 'ar_MA' ? "التاريخ" : "Date"}: {Datetiemarthwrit}</Text>
                    </View>
                    <View style={styles.abzrph}>
                      <Text style={styles.textview}>{locale == 'ar_MA' ? "تفاصيل" : "Details"}:</Text>
                      <Text style={[abzrphtion.length <= 100 ? { display: 'flex' } : { display: 'none' }, styles.textviewabzrphtion]}>{abzrphtion}</Text>
                      <ScrollView style={[abzrphtion.length > 100 ? { display: 'flex' } : { display: 'none' }]}>
                        <Text style={styles.textviewabzrphtion}>{abzrphtion}</Text>
                      </ScrollView>
                    </View>
                  </View>
                  <View style={styles.footer}>
                    <TouchableOpacity
                      onPress={() => {
                        if (caseused === 'headersub') {
                          databuld.find(te => te.id === idSection)?.Databes.filter(ite => ite.idSub == idSectionSub).forEach(pic => {
                            setSectiontitel(pic.sectiontitle)
                            setSectiondiscreab(pic.sectionpriclabrr)
                          })
                          setBualdEdit(locale == 'ar_MA' ? "تعديل" : "Edit");
                          setAddTsksfalse(true)
                        } else {
                          databuld.filter(ite => ite.id === idSection).forEach(pic => {
                            setTittellaber(pic.sectiontitle)
                            setSumDollar(pic.SumDollar)
                            setSumSR(pic.SumِSR)
                            setSumYR(pic.SumِYR)
                            setDatabesEite(pic.Databes)
                          })
                          setBellmodel(true)
                          setBualdEdit(locale == 'ar_MA' ? "تعديل" : "Edit");
                        }
                        setBuald(false);
                      }}
                      style={styles.Edit}>
                      <Text style={styles.textbodtomleprr}>{locale == 'ar_MA' ? "تعديل" : "Edit"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        deleting();
                        setBuald(false);
                      }} style={styles.Edit}>
                      <Text style={styles.textbodtomleprr}>{locale == 'ar_MA' ? "حذف" : "delet"}</Text>
                    </TouchableOpacity>
                  </View>
                </View>}
            </Pressable>
          </TouchableOpacity>
        </Modal>
        <Modal
          visible={bellmodel}
          transparent
          onRequestClose={() => setBellmodel(false)}
          animationType='fade'
          hardwareAccelerated={true}>
          <TouchableOpacity onPress={() => {
            cansleshook();
            setBellmodel(false)
          }} style={styles.centered_view}>
            <Pressable onPress={() => setBellmodel(true)} style={styles.user_mod1al}>
              <View style={styles.inputuser}>
                <View style={styles.headerstatement}>
                  <View style={styles.stetment} >
                    <Text style={styles.textuser_sub}>{locale == 'ar_MA' ? "البيان" : "Statement"}:</Text>
                    <TextInput style={[falseerr && tittellaber.length <= 0 ? { borderWidth: 1.5, borderColor: colors.RED, borderRadius: RFValue(15) } : {
                      borderWidth: 1,
                      borderRadius: RFValue(15),
                      borderColor: colors.YALO,
                    }, { width: '70%' }, styles.inputtiteuser]} placeholder={locale == 'ar_MA' ? falseerr && tittellaber.length <= 0 ? "يجب تحديد اسم او رقم" : "البيان" : falseerr && tittellaber.length <= 0 ? "You must specify a name or number" : "statement"} placeholderTextColor={colors.BLACK} value={tittellaber} onChangeText={(value) => setTittellaber(value)} />
                  </View>
                  <TouchableOpacity onPress={() => {
                    if (DatetiemaSub.length > 0) {
                      setDataTiermSub('')
                      setDataTiermSubfels(true)
                    } else {
                      setDataTiermSubfels(true)
                    }
                  }} style={[{ width: '100%', alignSelf: 'center' }, styles.inputtiteuser]}>
                    <Text style={styles.textuser}>{DatetiemaSub}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.stetment} >
                  <Text style={styles.textuser_sub}>{locale == 'ar_MA' ? "تفاصيل" : "Details"}:</Text>
                  <TextInput style={[{ width: '70%' }, styles.inputtitabzrphtion]} multiline placeholder={locale == 'ar_MA' ? "تفاصيل" : "Details"} placeholderTextColor={colors.BLACK} value={abzrphtion} onChangeText={(value) => setAbzrph(value)} />
                </View>
{    liprri?
<ActivityIndicator size={25} color={colors.PREMREY} />
:
<TouchableOpacity onPress={() => {
                getDatabulds();
              }} style={styles.boutonuser}>
                {locale === "ar_MA" ?
                  <Text style={styles.textuser}>{bulidEdit === 'إضافة' ? 'أضـAdd ـف' : 'تعديــEditـل'}</Text>
                  :
                  <Text style={styles.textuser}>{bulidEdit === 'add' ? 'Add' : 'Edit'}</Text>
                }
              </TouchableOpacity>}
              </View>
            </Pressable>
          </TouchableOpacity>
        </Modal>
        {Addtaskfalse || Datetiemarthfals || liprri ? <Modeltasksection onpress={() => {
          bulidEdit === 'إضافة' || bulidEdit === 'add' ?
            setIdsectionSub(uuid.v4()) : null;
          getDatalabrrs();
        }} Datetiemarthfals={Datetiemarthfals} FalseCalulter={FalseCalulter} setDataTiermarthfels={setDataTiermarthfels} pressclacultar={() => setCalculator(true)} setDataTiermarthwrit={setDataTiermarthwrit} Datetiemarthwrit={Datetiemarthwrit} bulidEditr={bulidEdit} Faslecomplet={falseerr} False={liprri} chexconsle={cansleshook} pushcash={Addtaskfalse} Pushsetfalse={setAddTsksfalse} selectedValue={arthDath} onValueChange={(value) => setDataarth({value})} options={dolars} sectiontitle={sectiontitle} setSectiontitel={setSectiontitel} pric={sectiondiscreab} setPric={setSectiondiscreab} abzrphtion={abzrphtion} setAbzrph={setAbzrph} /> : null}
        <ScrollView>
          <View style={styles.idmorev}>
            <Text style={[{ flex: 1 }, styles.textarth]}> {locale === "ar_MA" ? "اسم الحساب" : "name Account"}</Text>
            <TextInput style={[locale === "ar_MA" ? { fontSize: RFValue(10) } : { fontSize: RFValue(8) }, falseerr && sectionidnfy.length <= 0 ? { borderColor: colors.RED } : { borderColor: colors.YALO }, styles.inputtitelbuildidntfy]} placeholder={locale === "ar_MA" ? falseerr && sectionidnfy.length <= 0 ? "يجب تحديد الاسم او رقم الحساب" : "اختر اسم او رقم للحساب" : falseerr && sectionidnfy.length <= 0 ? "You must specify a name or account number" : "Select a name or account number"} placeholderTextColor={colors.BLACK} value={sectionidnfy} onChangeText={(value) => setSecidenfy(value)} />
            <TouchableOpacity onPress={() => {
              if (Datecound.length > 0) {
                setDataCount('')
                setDataCountfalse(true)
              } else {
                setDataCountfalse(true)
              }
            }} style={{ alignItems: 'center', height: 20, flex: 1, backgroundColor: colors.WHITE, borderRadius: RFValue(10) }}>
              <Text style={styles.textarth}>{Datecound}</Text>
            </TouchableOpacity>
            {/* <Text style={styles.textid}>{tasksCONTRATID}</Text> */}
          </View>

          <View style={styles.addnafgh}>
            <TouchableOpacity onPress={() => {
              setIdsection(uuid.v4());
              setBellmodel(true);
            }} style={styles.buttomadd}>
              <Text style={[locale === "ar_MA" ? { fontSize: RFValue(11) } : { fontSize: RFValue(8) }, styles.textbot]}>{locale === "ar_MA" ? "أضافة نفقات فرعية" : "Add subsidiary expenses"}</Text>
            </TouchableOpacity>
          </View>

          <View>

            {databuld.map((item, index) => (
              <View key={index} style={styles.bouild}>
                <TouchableOpacity onLongPress={() => {
                  setCase('header');
                  setIdsection(item.id);
                  setTimes(item.Timeminet)
                  setDataTiermarthwrit(item.Time)
                  //  setAbzrph(pic.abzrphtion)
                  setSumDollar(item.SumDollar)
                  setSectiondiscreab('')
                  setSumSR(item.SumِSR)
                  setSumYR(item.SumِYR)
                  setSectiontitel(item.sectiontitle)
                  setAbzrph(item.abzrphtion)
                  setBuald(true)
                }} onPress={() => {
                  idSection == item?
                  setIdsection('')
                  :
                  setIdsection(item.id);
                  console.log(item)
                }} style={styles.containerbuilds}>
                  <Text numberOfLines={2} style={[{ width: '20%' }, styles.textbuild]}>{item.sectiontitle}</Text>
                  <Text numberOfLines={1} style={[{ width: '20%' }, styles.textbuild]}>{item.Time}</Text>
                  <Text numberOfLines={1} style={[{ width: '20%' }, styles.textbuild]}>{item.Timeminet}</Text>

                </TouchableOpacity>

                <View style={idSection === item.id ?{ marginBottom: 10 }:{display:'none'}}>
                  {
                    locale === "ar_MA" ?
                      <View style={styles.header}>
                        <Text style={styles.textsum}>الاجمالي</Text>
                      </View>
                      :
                      <View style={styles.header}>
                        <Text style={styles.textsum}>Total</Text>
                      </View>}
                  {
                    locale === "ar_MA" ?
                      <View style={styles.container_sub1}>
                        <Text style={styles.textsum}>المبالغ بالدولار </Text>
                        <Text style={styles.textsum}>بالريال السعودي</Text>
                        <Text style={styles.textsum}>بالريام اليمني</Text>
                      </View>
                      :
                      <View style={styles.container_sub1}>
                        <Text style={styles.textsum}>Amounts in Dollars</Text>
                        <Text style={styles.textsum}>Saudi Riyals</Text>
                        <Text style={styles.textsum}>Yemeni Riyam</Text>
                      </View>
                  }

                  <View>
                    <View style={styles.container_sub1}>
                      <Text style={styles.textsum}>{parseInt(item.SumDollar).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                      <Text style={styles.textsum}>{parseInt(item.SumِSR).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                      <Text style={styles.textsum}>{parseInt(item.SumِYR).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                    </View>
                  </View>
                  {locale === "ar_MA" ?
                    <View style={styles.containerbuilds_sub_heder}>
                      <Text style={styles.textbuild_sub_heder}>البيان</Text>
                      <Text style={[{ width: '15%' }, styles.textbuild_sub_heder]}>الوقت</Text>
                      <Text style={styles.textbuild_sub_heder}>المبلغ</Text>
                      <Text style={styles.textbuild_sub_heder}>ملاحظة</Text>
                    </View>
                    :
                    <View style={styles.containerbuilds_sub_heder}>
                      <Text style={styles.textbuild_sub_heder}>Manifesto</Text>
                      <Text style={[{ width: '15%' }, styles.textbuild_sub_heder]}>Time</Text>
                      <Text style={styles.textbuild_sub_heder}>Amount</Text>
                      <Text style={styles.textbuild_sub_heder}>Note</Text>
                    </View>
                  }
                  {item?.Databes.filter(i => i.idHOM === idSection).map((pic, index) => (
                    <TouchableOpacity key={index} onLongPress={() => {
                      setCase('headersub');
                      setIdsectionSub(pic.idSub)
                      setTimes(pic.Timeminet)
                      setDataTiermarthwrit(pic.TimeSub)
                      setAbzrph(pic.abzrphtion)
                      setSectiondiscreab(pic.sectionpriclabrr)
                      setSectiontitel(pic.sectiontitle)
                      setDataarth(pic.arthDath)
                      // setIdsection(pic.idHOM);
                      setBuald(true);
                    }} style={styles.containerbuilds_sub} >
                      <Text numberOfLines={1} style={[{ width: '10%' }, styles.textbuild_sub]}>{pic.sectiontitle}</Text>
                      <Text numberOfLines={1} style={[{ width: '20%' }, styles.textbuild_sub]}>{pic.TimeSub}</Text>
                      <Text numberOfLines={1} style={[{ width: '20%' }, styles.textbuild_sub]}>{pic.arthDath} {parseInt(pic.sectionpriclabrr).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                      <Text numberOfLines={1} style={[{ width: '10%' }, styles.textbuild_sub]}>{pic.abzrphtion}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity onPress={() => {
                  setIdsection(item.id)
                  setAddTsksfalse(true)
                }} style={styles.buttom}>
                  {locale === "ar_MA" ?
                    <Text style={styles.textbuttom}>
                      {bulidEdit === 'إضافة' ? "إضافة" : "تعديل"}
                    </Text>
                    :
                    <Text style={styles.textbuttom}>
                      {bulidEdit === 'add' ? "add" : "edit"}
                    </Text>}
                </TouchableOpacity>

              </View>

            ))}
          </View>
          {liprri
            ?
            <ActivityIndicator size={20} color={colors.RED} />
            :
            <TouchableOpacity
              onPress={() => {
                onPress()
                // onPressl(databuld,setFalseerr,sectionidnfy,setFalse,tasksCONTRATID,Datecound,new Date().toLocaleDateString(),false,tasksCONTRAT,dispatch,setTasksCONTRAT,cansleshook)
              }}
              style={styles.set}>
              <Text style={styles.text}>
                {locale === "ar_MA" ? "حفظ" : 'save'}
              </Text>
            </TouchableOpacity>}
        </ScrollView>
      </View>
    </>
  )
}



const styles = StyleSheet.create({
  //نفقة
  addnafgh: {
    alignItems: 'flex-start',
  },
  buttomadd: {
    justifyContent: "center",
    alignItems: 'center',
    width: RFValue(110),
    height: RFValue(30),
    borderTopRightRadius: RFValue(50),
    borderBottomRightRadius: RFValue(50),
    // left: 15,
    backgroundColor: colors.CURRENT,
    borderColor: colors.YALO,
    borderBottomWidth: RFValue(1),
    borderTopWidth: RFValue(1)
  },
  textbot: {
    color: colors.WHITE,
    fontFamily: fonts.CAIROREGULARK
  },
  //user
  user_mod1al: {
    width: RFValue(300),
    height: RFValue(350),
    backgroundColor: colors.YALO,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(20)
  },
  inputuser: {
    borderWidth: 1,
    borderRadius: RFValue(20),
    borderColor: colors.YALO,
    backgroundColor: colors.CURRENT,
    height: '90%',
    width: '90%',
    // flexDirection:'row',
    // flexWrap:'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  inputtiteuser: {
    color: colors.CURRENT,
    padding: 5,
    borderRadius: RFValue(10),
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    fontFamily: fonts.CAIROREGULARK
  },
  inputtitabzrphtion: {
    borderWidth: 1,
    borderRadius: RFValue(10),
    height: RFValue(100),
    overflow: 'hidden',
    flexWrap: 'wrap',
    borderColor: colors.YALO,
    color: colors.CURRENT,
    padding: 5,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    fontFamily: fonts.CAIROREGULARK
  },
  headerstatement: {
    width: '90%',
    height: RFValue(100),
    justifyContent: 'space-around'
  },
  stetment: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  boutonuser: {
    margin: RFValue(15),
    backgroundColor: colors.YALO,
    width: '50%',
    padding: RFValue(5),
    borderRadius: RFValue(10),
    alignItems: 'center'
  },
  textuser: {
    fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(14),
    color: colors.CURRENT,
    textAlign: 'center'
  },
  textuser_sub: {
    textAlign: 'center',
    justifyContent: 'center',
    marginHorizontal: RFValue(10),
    fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(14),
    color: colors.WHITE
  },
  textmerr: {
    fontSize: RFValue(10),
    color: colors.RED,
    fontFamily: fonts.CAIROREGULARK,
    // marginHorizontal:RFValue(15),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.WHITE,
    textAlign: 'center',
    borderRadius: RFValue(5)
  },
  //
  textm: {
    fontSize: RFValue(17),
    fontFamily: fonts.TAJAWALREGULAR,
    textShadowColor: colors.BORDER,
    textShadowRadius: 0.2,
  },
  body: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
  set: {
    textAlign: 'center',
    //  height:RFValue(50),
    padding: RFValue(5),
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: RFValue(20),
    width: RFValue(200),
    borderRadius: RFValue(15),
    backgroundColor: colors.CURRENT,
    color: colors.WHITE,
  },
  inputtitel: {
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(10),
    paddingHorizontal: RFValue(5),
    fontSize: RFValue(16),
    height: RFValue(40),
    textAlign: 'right',
    flex: 1,
    color: colors.GREYD
  },
  ///خاص بالتفاصيل
  bouild: {
    width: "100%",
    marginHorizontal: RFValue(10),
    flexDirection: 'column',
    alignSelf: 'center'
  },
  inputtitelbuild: {
    backgroundColor: colors.WHITE,
    borderRadius: RFValue(5),
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(10),
    paddingHorizontal: RFValue(5),
    fontSize: RFValue(16),
    height: RFValue(40),
    textAlign: 'right',
    flex: 2,
    color: colors.GREYD
  },
  inputtitelbuildidntfy: {
    backgroundColor: colors.WHITE,
    borderRadius: RFValue(15),
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(2),
    borderWidth: 1,
    textAlign: 'center',
    flex: 2,
    color: colors.GREYD
  },
  //خاس بتفاصيل الفرع
  dag_mod1al: {
    position: 'relative',
    // right: RFValue(-90),
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: colors.YALO,
    borderRadius: RFValue(10)
  },
  modulsub: {
    backgroundColor: colors.CURRENT,
    width: '90%',
    borderRadius: RFValue(10),
    flexDirection: 'column',
  },
  textview: {
    color: colors.WHITE,
    fontFamily: fonts.CAIROREGULARK,
    padding: RFValue(5),
    marginHorizontal: RFValue(5),
    fontSize: RFValue(12),
    overflow: 'hidden'
  },
  textviewabzrphtion: {
    color: colors.WHITE,
    fontFamily: fonts.CAIROREGULARK,
    padding: RFValue(5),
    fontSize: RFValue(12),
    overflow: 'hidden',
    flexWrap: 'wrap'
  },
  continer_sub: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: RFValue(15),
  },
  abzrph: {
    alignItems: 'center'
  },
  Edit: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: RFValue(5),
    borderRadius: RFValue(10),
    marginHorizontal: RFValue(10),
    backgroundColor: colors.WHITE,
    borderWidth: RFValue(1)
  },
  textbodtomleprr: {
    fontSize: RFValue(13),
    color: colors.CURRENT,
    fontFamily: fonts.CAIROREGULARK
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textconter: {
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  //
  containerbuilds: {
    backgroundColor: colors.WHITE,
    elevation: 1,
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    // borderRadius: RFValue(5),
    paddingVertical: RFValue(10),
    marginVertical: RFValue(5)
  },
  textbuild: {
    color: colors.CURRENT,
    fontFamily: fonts.CAIROREGULARK
  },
  containerbuilds_sub: {
    backgroundColor: colors.WHITE,
    width: '100%',
    paddingHorizontal: RFValue(10),
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: RFValue(10),
    marginVertical: RFValue(5),
  },
  containerbuilds_sub_heder: {
    backgroundColor: colors.YALO,
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(10),
    // marginVertical: RFValue(5),
    marginTop: RFValue(-5)

  },
  textbuild_sub: {
    color: colors.BANAF,
    fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(10),
    textAlign: 'center',
  },
  textbuild_sub_heder: {
    color: colors.CURRENT,
    fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(13),
    textAlign: 'center'
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


  centered_view: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: 'center',
    alignItems: 'center'
  },

  idmorev: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: RFValue(15),
    paddingHorizontal: RFValue(15),
  },
  textarth: {
    color: colors.BLACK,
    fontSize: RFValue(12),
    fontFamily: fonts.CAIROREGULARK
  },
  textid: {
    color: colors.BLACK,
  },
  container_sub1: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: colors.CURRENT,
    padding: RFValue(10),

  },
  header: {
    backgroundColor: colors.CURRENT,
    width: '30%',
    position: 'absolute',
    zIndex: 999,
    top: RFValue(-10),
    borderRadius: RFValue(10),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: colors.YALO,
    borderWidth: 1
  },
  textsum: {
    color: colors.WHITE,
    textAlign: 'center',
    fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(10),
  },

})