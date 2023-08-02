import { View, ScrollView, Text, TextInput,FlatList, VirtualizedList, StyleSheet, ToastAndroid, Button, Pressable, Modal, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState,useCallback, useMemo, Component } from 'react'
import { colors } from '../../constants/colors'
import { useSelector, useDispatch } from "react-redux"
import { setTasksCONTRAT, setTasksCONTRATID } from '../../redux/actions'
import { RFValue } from 'react-native-responsive-fontsize'
import { fonts } from '../../constants/fonts'
import DateTimePicker from 'react-native-modal-datetime-picker';
import uuid from 'react-native-uuid';
import Modeltasksection from '../modeltasksection'
const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
    //presentationStyle:fullScreen
  }
}
import AsyncStorage from '@react-native-async-storage/async-storage'
import {dolars} from '../../Taskscshmonv'
// import {locale}from '../../Taskscsh';
import  locales,{locale}  from "../../locale";

 const  CshmonvModul = (props) =>{
  const { tasksCONTRATID, tasksCONTRAT } = useSelector(state => state.userReducer);
  const dispatch = useDispatch()
  const [databuld, setData] = useState([]);
  const [sectiontitle, setSectiontitel] = useState('');
  const [sectiondiscreab, setSectiondiscreab] = useState('');
  const [abzrphtion, setAbzrph] = useState('');
  const [liprri, setLiprre] = useState(false)
  // const [props.bulidEdit, props.setBualdEdit] = useState(locale === "ar_MA" ? 'إضافة' : 'add')
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
  //count
  const [timehoer, setTimTent] = useState('');
  const [Dounfalse, setDonefalse] = useState('');
  const [FalseCalulter, setFalseCalculator] = useState(false);

  let caseusedt =
 props.caseused === "headersub" ? databuld.find(te => te.id === idSection)?.Databes.filter(ite => ite.idSub == idSectionSub)
  : 
  databuld.filter(ite => ite.id === idSection);



  // focus
  useEffect(() => {
    getEditTsk()
    setIdsection(props.idsection);
    setIdsectionSub(props.idSectionSub)
    props.setBualdEdit(locale === "ar_MA" ? 'إضافة' : 'add')
  }, [props]);
  const getEditTsk = () => {
    const Task = tasksCONTRAT.find(item => item.ID === tasksCONTRATID)
    if(Task){
      setData(Task.databuld);
      setSecidenfy(Task.sectionidnfy);
      setDataCount(Task.Datetiem);
      setTimTent(Task.Timeminet);
      setDonefalse(Task.Done);
    }
  }

  //useefect tiem
  useEffect(() => {
    if (Datecound.length > 0) { setDataCountfalse(false) }
    if (DatetiemaSub.length > 0) { setDataTiermSubfels(false) }
    if (Datetiemarthwrit.length > 0) { setDataTiermarthfels(false) }
  }, [Datecound, DatetiemaSub, Datetiemarthwrit]);
  useEffect(() => {
    setDataTiermarthwrit(new Date(Date.now()).toLocaleDateString());
    setDataTiermSub(new Date().toLocaleDateString());
  }, [])
  
  const deleting = () => {
    const indexconten = databuld.findIndex(tasks => tasks.id === idSection);
    console.log(idSectionSub)
    let addnew = [];
    addnew = [...databuld];
    if (props.caseused === 'headersub') {
      //  databes.push(filterDasec);
      const finddata = addnew.find(tasks => tasks.id === idSection);
      const ind = finddata?.Databes.findIndex(tasks => tasks.idSub === idSectionSub);
      if (finddata) {
        const index = finddata?.Databes.find(tasks => tasks.idSub == idSectionSub);
        finddata.Databes.splice(ind, 1);

        let objectsDoler = [];
        let objectYR = [];
        let objectSR = [];

        finddata?.Databes.forEach((item, index) => {
          item.arthDath === '$'|| item.arthDath === 'دولار امريكي' ?
            objectsDoler.push({ x: parseInt(item.sectionpriclabrr) }) : item.arthDath ==='ريال سعودي' || item.arthDath ==='SR' ?
              objectSR.push({ x: parseInt(item.sectionpriclabrr) }) : objectYR.push({ x: parseInt(item.sectionpriclabrr) });
        })
        const sumSR = objectSR.reduce((accumulator, currentValue) => accumulator + currentValue.x, 0);
        const sumDoler = objectsDoler.reduce((accumulator, currentValue) => accumulator + currentValue.x, 0);
        const sumYR = objectYR.reduce((accumulator, currentValue) => accumulator + currentValue.x, 0);
        console.log(parseInt(sumDoler))
        addnew[indexconten].SumDollar = sumDoler;
        addnew[indexconten].SumِSR = sumSR;
        addnew[indexconten].SumِYR = sumYR;
        setData(addnew);
      }
    } else {
      const filterDasec = addnew.findIndex(tasks => tasks.id === idSection)
      if(filterDasec > -1){
        addnew.splice(filterDasec ,1)
        setData(addnew);
      }
    }
    onPressl(addnew)
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
    props.setAddTsksfalse(false)
    props.setBualdEdit(locale =='ar_MA'?"إضافة":'add');
    props.setBellmodel(false);
    props.setBuald(false)
  }

  const getDatalabrrs = () => {
    if (sectiontitle.length > 0 && sectiondiscreab.length > 0 && arthDath.value > 0) {
      setLiprre(true)
      console.log(idSectionSub);
      const indexconten = databuld.findIndex(tasks => tasks.id === idSection);
      let addnew = [];
      addnew = [...databuld];
      try {
        var datares = {
          idHOM: idSection,
          idSub: idSectionSub.length > 0 ? idSectionSub : uuid.v4(),
          sectiontitle: sectiontitle,
          sectionpriclabrr: sectiondiscreab,
          abzrphtion: abzrphtion,
          arthDath: dolars.find(item=>item.value ==arthDath.value)?.label,
          TimeSub: Datetiemarthwrit,
          Timeminet:Tiems,
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
            // console.log(databuld)
            props.setBualdEdit(locale === 'ar_MA'?'إضافة':"add")
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
            } else if (arthDath === 'ر.ي.س'||arthDath ==='SR') {
              addnew[indexconten].SumِSR = sumDoler;
            } else {
              addnew[indexconten].SumِYR = sumDoler;
            }
            console.log(databuld)
            setData(addnew);
          }
          // console.log(arthDath);
          // empty
        }
      } catch (err) {
        console.log(err)
      }
      setLiprre(false)
        onPressl(addnew);
    } else {
      ToastAndroid.showWithGravity( locale ===  "ar_MA"?'يجب اكمال البيانات المطلوبه':"The required data must be completed",
      ToastAndroid.CENTER,
      ToastAndroid.LONG
    ),
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
          props.setBualdEdit(locale === 'ar_MA'?'إضافة':"add")
        } else {
          addnew = [...databuld];
          addnew.push(datares);
          setData(addnew);
        }
        setLiprre(false)
        setDataCountfalse(false)
      } catch (err) {
        console.log(err)
        setLiprre(false)
      }
      onPressl(addnew)
   props.setBellmodel(false)

    } else {
      ToastAndroid.showWithGravity( locale ===  "ar_MA"?'يجب اكمال البيانات المطلوبه':"The required data must be completed",
      ToastAndroid.CENTER,
      ToastAndroid.LONG
    ),
        setFalseerr(true)
    }

    }
  
  const onPressl = (newadd) => {
    if (sectionidnfy.length === 0) {
      ToastAndroid.showWithGravity(locale === "ar_MA" ? 'يجب اكمال البيانات ' : "The required data must be completed",
        ToastAndroid.CENTER,
        ToastAndroid.LONG
      ),
        console.log(sectionidnfy);
        setFalseerr(true)
    } else {
      try {
        setLiprre(true)
        //sum reduce dollar 
        let objectsDoler = [];
        let objectsSR = [];
        let objectsYR = [];
        newadd.forEach((item, index) => {
          objectsDoler.push({ x: parseInt(item.SumDollar.toFixed(2)) });
          objectsSR.push({ x: parseInt(item.SumِSR.toFixed(2)) });
          objectsYR.push({ x: parseInt(item.SumِYR.toFixed(2)) });
        })
        const Dollar = objectsDoler.reduce(
          (accumulator, currentValue) => accumulator + currentValue.x,
          0,);
        //sum reduce SR
        const YR = objectsYR.reduce(
          (accumulator, currentValue) => accumulator + currentValue.x,
          0,);
        const SR = objectsSR.reduce(
          (accumulator, currentValue) => accumulator + currentValue.x,
          0,);
        //sum reduce YR
        var Task = {
          ID: tasksCONTRATID,
          sectionidnfy: sectionidnfy,
          Datetiem: Datecound,
          Timeminet: timehoer,
          databuld: newadd,
          Done: Dounfalse,
          SumDollar: Dollar.toString(),
          SumِSR: SR.toString(),
          SumِYR: YR.toString(),
        }
        let newTasks = []
         newTasks = [...tasksCONTRAT]
         const index =tasksCONTRAT.findIndex(item => item.ID === tasksCONTRATID)
        newTasks[index]=Task;
        AsyncStorage.setItem("TasksCONTRAT", JSON.stringify(newTasks)).then(() => {
          dispatch(setTasksCONTRAT(newTasks))
          ToastAndroid.showWithGravity(locale === "ar_MA" ? 'تم الحفظ بنجاح' : "Saved successfully",
            ToastAndroid.CENTER,
            ToastAndroid.LONG
          );
          cansleshook()
          setLiprre(false)
        })
      } catch (err) {
        console.log(err)
        setLiprre(false)
      }
    }
  }



  const renderItem= useCallback(({item}) => (
      <View style={[ styles.modulsub]}>
         <View style={styles.continer_sub}>
      <View style={[item.sectionpriclabrr ? { flexDirection: 'row-reverse' } : null, styles.textconter]}>
        <Text numberOfLines={5} style={styles.textview}>{locale == 'ar_MA'?"البيان":"Statement"}: {item.sectiontitle}</Text>
        {!item.sectionpriclabrr ?
          <View style={{ flexDirection: "column", alignItems: 'center' }}>
            <Text numberOfLines={3} style={styles.textview}>{locale == 'ar_MA'?"المبلغ":"Amount"}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text numberOfLines={3} style={[item.SumِYR <=0? {display:'none'}:styles.textview]}>ر.ي{item.SumِYR.toFixed(2)}</Text>
              <Text numberOfLines={3} style={[item.SumDollar <=0? {display:'none'}:styles.textview]}>$ {item.SumDollar.toFixed(2)}</Text>
              <Text numberOfLines={3} style={[item.SumِSR > 0? {display:'none'}:styles.textview]}>ر.ي.س{item.SumِSR.toFixed(2)}</Text>
            </View>
          </View>
          :
          <Text numberOfLines={3} style={styles.textview}> {locale == 'ar_MA'?"المبلغ":"Amount"}:{item.arthDath + item.sectionpriclabrr}</Text>}
      </View>
      {item.Time && item.Timeminet ?
        <View style={[{flexDirection:'row'},styles.textconter]}>
          <Text style={styles.textview}>{locale == 'ar_MA'?"الوقت":'Time'}: {item.Timeminet}</Text>
          <Text style={styles.textview}>{locale == 'ar_MA'?"التاريخ":"Date"}: {item.Time}</Text>
        </View>
        :
        <View style={[{flexDirection:'row'},styles.textconter]}>
          <Text style={styles.textview}>{locale == 'ar_MA'?"الوقت":'Time'}: {item.Timeminet}</Text>
          <Text style={styles.textview}>{locale == 'ar_MA'?"التاريخ":"Date"}: {item.TimeSub}</Text>
        </View>
      }
      
      <View style={styles.abzrph}>
        <Text style={styles.textview}>{locale == 'ar_MA'?"تفاصيل":"Details"}:</Text>
          <Text style={styles.textviewabzrphtion}>{item.abzrphtion}</Text>
      </View>

    </View>
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={() => {
          if (props.caseused === 'headersub') {
              setSectiontitel(item.sectiontitle)
              setSectiondiscreab(item.sectionpriclabrr)
              setTimes(item.Timeminet)
              setDataTiermarthwrit(item.TimeSub)
              setAbzrph(item.abzrphtion)
              setSectiondiscreab(item.sectionpriclabrr)
              setSectiontitel(item.sectiontitle)
              setDataarth(item.arthDath)
            props.setBualdEdit(locale == 'ar_MA'?"تعديل":"Edit");
            setFalseCalculator(true)
            props.setAddTsksfalse(true)
          } else {
              setTittellaber(item.sectiontitle)
              setDatabesEite(item.Databes)
              setTimes(item.Timeminet)
              setDataTiermarthwrit(item.Time)
              //  setAbzrph(item.abzrphtion)
              setSumDollar(item.SumDollar)
              setSectiondiscreab('')
              setSumSR(item.SumِSR)
              setSumYR(item.SumِYR)
              setAbzrph(item.abzrphtion)
              props.setBuald(true)
            props.setBellmodel(true)
            props.setBualdEdit(locale == 'ar_MA'?"تعديل":"Edit");
          }
          props.setBuald(false);
        }}
        style={styles.Edit}>
        <Text style={styles.textbodtomleprr}>{locale == 'ar_MA'?"تعديل":"Edit"} </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          deleting();
          props.setBuald(false);
        }} style={styles.Edit}>
        <Text style={styles.textbodtomleprr}>{locale == 'ar_MA'?"حذف":"delet"}</Text>
      </TouchableOpacity>
    </View> 
      </View>
      ),[databuld])
  return (
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
        visible={props.bulid}
        transparent
        onRequestClose={() => props.setBuald(false)}
        animationType="fade"
        hardwareAccelerated={true}
        >
        <TouchableOpacity onPress={() => { props.setBuald(false); cansleshook()}} style={styles.centered_view}>
          <Pressable onPress={() => props.setBuald(true)} style={styles.dag_mod1al}>
     <FlatList showsVerticalScrollIndicator={false} data={caseusedt} renderItem={renderItem}   keyExtractor={(item, index) => index.toString()} />
          </Pressable>
        </TouchableOpacity>
      </Modal>
      <Modal
        visible={props.bellmodel}
        transparent
        onRequestClose={() => props.setBellmodel(false)}
        animationType="fade"
        hardwareAccelerated={true}
        >
        <TouchableOpacity onPress={() => {
          cansleshook();
          props.setBellmodel(false)
        }} style={styles.centered_view}>
          <Pressable onPress={() => props.setBellmodel(true)} style={styles.user_mod1al}>
            <View style={styles.inputuser}>
              <View style={styles.headerstatement}>
                <View style={styles.stetment} >
                  <Text style={styles.textuser_sub}>{locale == 'ar_MA'?"البيان":"Statement"}:</Text>
                  <TextInput style={[falseerr && tittellaber.length <= 0 ? { borderWidth: 1.5, borderColor: colors.RED, borderRadius: RFValue(15) } : {
                    borderWidth: 1,
                    borderRadius: RFValue(15),
                    borderColor: colors.YALO,
                  }, { width: '70%' }, styles.inputtiteuser]} placeholder={falseerr && tittellaber.length <= 0 ? "يجب تحديد اسم او رقم" : "البيان"} placeholderTextColor={colors.BLACK} value={tittellaber} onChangeText={(value) => setTittellaber(value)} />
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
                <Text style={styles.textuser_sub}>{locale == 'ar_MA'?"تفاصيل":"Details"}:</Text>
                <TextInput style={[{ width: '70%' }, styles.inputtitabzrphtion]} multiline placeholder={locale == 'ar_MA'?"تفاصيل":"Details"} placeholderTextColor={colors.BLACK} value={abzrphtion} onChangeText={(value) => setAbzrph(value)} />
              </View>
              <TouchableOpacity onPress={() => {
                getDatabulds()
              }} style={styles.boutonuser}>
                {locale === "ar_MA" ?
                    <Text style={styles.textuser}>{props.bulidEdit === 'إضافة' ? 'أضـAdd ـف' : 'تعديــEditـل'}</Text>
                    :
                    <Text style={styles.textuser}>{props.bulidEdit === 'add' ? 'Add' : 'Edit'}</Text>
                  }
              </TouchableOpacity>
            </View>
          </Pressable>
        </TouchableOpacity>
      </Modal>
   {props.Addtaskfalse ? <Modeltasksection onpress={() => {
        props.bulidEdit === 'إضافة' || props.bulidEdit === 'add'?
          setIdsectionSub(uuid.v4()) : null;
          getDatalabrrs();
      }} Datetiemarthfals={Datetiemarthfals}  FalseCalulter={FalseCalulter}  setDataTiermarthfels={setDataTiermarthfels} setDataTiermarthwrit={setDataTiermarthwrit} Datetiemarthwrit={Datetiemarthwrit} bulidEditr={props.bulidEdit} Faslecomplet={falseerr} False={liprri} chexconsle={cansleshook} pushcash={props.Addtaskfalse} Pushsetfalse={props.setAddTsksfalse} selectedValue={arthDath} onValueChange={(value) => setDataarth({value})} options={dolars} sectiontitle={sectiontitle} setSectiontitel={setSectiontitel} pric={sectiondiscreab} setPric={setSectiondiscreab} abzrphtion={abzrphtion} setAbzrph={setAbzrph} />: null}
    </View>)
}
const styles = StyleSheet.create({
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
    margin: RFValue(5),
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

  
  body: {
    flex: 1
  },
  text: {
    textAlign: 'center',
    fontSize: RFValue(20),
    width: RFValue(200),
    borderRadius: RFValue(15),
    backgroundColor: colors.CURRENT,
    color: colors.WHITE,

  },

  //خاس بتفاصيل الفرع
  dag_mod1al: {
    marginVertical:RFValue(20),
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: colors.YALO,
    borderRadius: RFValue(10)
  },
  modulsub: {
    backgroundColor: colors.CURRENT,
    width: '97%',
    // height:'95%',
    marginVertical:RFValue(15),
    justifyContent:'center',
    alignSelf:'center',
    borderRadius: RFValue(10),

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

  },
  continer_sub: {
    flex:2,
    overflow:'hidden',
    padding:RFValue(5),
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    marginBottom:15,
    justifyContent: 'center',

  },
  abzrph: {
    alignItems: 'center', 
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
    flex:0.3,
    marginBottom:50,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textconter: {
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  centered_view: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: 'center',
    alignItems: 'center'
  },
})
export default CshmonvModul;

