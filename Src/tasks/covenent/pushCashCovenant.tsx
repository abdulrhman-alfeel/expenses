import React, { useState, useEffect, useCallback, useMemo } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  View,
  ToastAndroid,
  Text,
  TouchableHighlight,
  Alert,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native"
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { useSelector, useDispatch } from "react-redux"
import { setTasksCOVENANT, setTasksEVACUTION } from '../../redux/actions'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dropdown from 'react-native-input-select';
import uuid from 'react-native-uuid';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { styles } from "../../component/cashing/styles";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import RNFS from 'react-native-fs'
import ModulsView from "../../component/modulsView";
// import {locale}from '../../Taskscsh';
import  locales,{locale}  from "../../locale";
import ModulsCalculator, { result } from '../../component/modulsCalculator';

function PushCashCovenant({ IDEVacu, setIddelet, iddelet, givinit, tasksCOVENANT, tasksEVACUTION, tasksCONTRAT }) {
  const dispatch = useDispatch()
  const [nameTArg, setNameTarg] = useState('');
  const [descrbtion, setDescrbtion] = useState('');
  const [pushing, setPush] = useState('');
  const [Proveid, setProvEd] = useState('');
  const [imagop, setImagOpg] = useState([]);
  ///تغيير طريقة الاخلاء
  const [paushset, setPaushset] = useState(locale ===  "ar_MA"?'لدي':"Have");
  const [idnotnul, setIdnotnull] = useState(0);
  const [False, setFalse] = useState(false);
  const [bellmodel, setBellmodel] = useState(false);
  //عرض الصور
  const [ImageView, setImagView] = useState('');
  const [ImageViewFalse, setImagViewfalse] = useState(false);
  const [calculator, setCalculator] = useState(false);
  const [constrltl, setConstrctl] = useState('');
  useEffect(() => {
    iddelet == true ? getTasks() : null;
  }, [])
  const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 4,
      mediaType: 'photo',
      includeBase64: false,
    }
  };
  const useclurek = () => {
    setPush(result)
  }
  const Puchchshing = (IDEV) => {
    setFalse(true);
    let cash = 0;
    let falsing = false;
    if (pushing.length > 0 && nameTArg.length > 0 || constrltl.length > 0 && nameTArg.length > 0) {
      const datacash = tasksCOVENANT.find((item: { describtion: string; }) => item.describtion === nameTArg);
      let dataching: any[] = [];
      dataching = [...tasksCOVENANT];
      //خاص بالتحويل 
      const index = tasksCOVENANT.findIndex((item: { describtion: string | string[]; }) => item.describtion.includes(nameTArg));
      const find = dataching.find((item: { describtion: string | string[]; }) => item.describtion.includes(nameTArg));
      //خاص بالتعديل 
      const indexEvacution = tasksEVACUTION.findIndex((item: { id: string | string[]; }) => item.id === IDEV);
      const Editfunction = find.arrayOprition.findIndex(item => item.id === IDEV)

      if (datacash.DescPush.length > 0) {
        const cashing = parseInt(datacash.DescPush) + parseInt(pushing);
        if (cashing > parseInt(datacash.SumCash)) {
          ToastAndroid.showWithGravity(locale=='ar_MA'?'لايمكن اكمال العملية مبلغ الاخلاء اعلى من المتبقي لديه ':'The process cannot be completed The amount of evacuation is higher than the rest he has',
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
      } else if (parseInt(datacash.SumCash) < parseInt(pushing)) {
        ToastAndroid.showWithGravity(locale=='ar_MA'?'لايمكن اكمال العملية مبلغ الاخلاء اعلى من اجمالي العهده':"The operation cannot be completed, the amount of evacuation is higher than the total trust",
          ToastAndroid.CENTER,
          ToastAndroid.SHORT
        );
        falsing = true;
        setFalse(false);
      } else if (parseInt(datacash.SumCash) === parseInt(pushing)) {
        cash = parseInt(pushing);
        dataching[index].Done = true;
        falsing = false;
      } else {
        cash = parseInt(pushing);
        falsing = false;
      }
      //  arrayOprition
      if (falsing === false) {
        console.log(parseInt(datacash.SumCash) - cash);
        var Tasks = {
          id: IDEV,
          IDCUST: datacash.ID,
          SumCash: datacash.SumCash,
          Covenantday: parseInt(pushing).toString(),
          TimeCovenant: new Date().toDateString(),
          Describtions: descrbtion,
          imagop: imagop,
          //اجمالي المدفوع لهذا اليوم
          CovenantSum: cash,
          kindmony: datacash.kindmony,
          //المتبقي
          thremn: parseInt(datacash.SumCash) - cash,
          caseused: paushset
        }
        let convercash = [];
        if (indexEvacution > -1) {
          cash = cash - parseInt(Proveid)
          convercash = [...tasksEVACUTION];
          convercash[indexEvacution] = Tasks;
          find.arrayOprition[Editfunction] = Tasks;
          dataching[index].DescPush = cash.toString()
        } else {
          if (constrltl.length > 0) {
            var Tasksctrc = {}
            var cashing = 0;
            const data =   tasksCONTRAT.find(item => item.sectionidnfy === constrltl.toString() || item.sectionidnfy === constrltl.toString());
            if(data.databuld.length > 0){
            data.databuld[0].Databes?.map((pic) => {
              if (parseInt(datacash.DescPush) > 0) {
                cashing = parseInt(datacash.DescPush) + parseInt(pic.sectionpriclabrr);
              } else {
                cashing = parseInt(pic.sectionpriclabrr);
              }
              //  console.log(pic.sectionpriclabrr)
              if (pic.arthDath == datacash.kindmony) {
                Tasksctrc = {
                  id: IDEV,
                  IDCUST: datacash.ID,
                  SumCash: datacash.SumCash,
                  Covenantday: pic.sectionpriclabrr,
                  TimeCovenant: pic.TimeSub,
                  Describtions: pic.sectiontitle.length > 0 ? pic.sectiontitle : pic.abzrphtion,
                  imagop: imagop,
                  //اجمالي المدفوع لهذا اليوم
                  CovenantSum: cashing,
                  kindmony: datacash.kindmony,
                  //المتبقي
                  thremn: parseInt(datacash.SumCash) - cashing,
                  caseused: paushset
                }
                if (cashing <= parseInt(datacash.SumCash)) {
                  find?.arrayOprition.push(Tasksctrc)
                  convercash = [...tasksEVACUTION, Tasksctrc];
                  dataching[index].DescPush = cashing.toString();
                  falsing = true
                } 
              }else{
                Alert.alert(locale=='ar_MA'?'لايمكن تحويل المبلغ لان العملة الخاصة بالنفقاة لاتساوي العملة الخاصة بالعهد':"The amount cannot be transferred because the currency for maintenance is not equal to the currency of the covenant");
              falsing = true;
              setFalse(false);}
            })
          }else{
            ToastAndroid.showWithGravity(locale=='ar_MA'?'لايوجد نفقات بهذالحساب':"There are no expenses in this account",
            ToastAndroid.CENTER,
            ToastAndroid.SHORT);
          falsing = true;
          setFalse(false);
          }
          } else {      
            find?.arrayOprition.push(Tasks)
            convercash = [...tasksEVACUTION, Tasks];
            dataching[index].DescPush = cash.toString()
            falsing = false
          }
        }
        if (!falsing) {
          AsyncStorage.setItem("tasksEVACUTION", JSON.stringify(convercash)).then(() => {
            dispatch(setTasksEVACUTION(convercash))
            ToastAndroid.showWithGravity(locale=='ar_MA'?'تم الاخلاء بنجاح':'Successfully evacuated',
              ToastAndroid.CENTER,
              ToastAndroid.LONG
            );
            AsyncStorage.setItem("tasksCOVENANT", JSON.stringify(dataching)).then(() => {
              dispatch(setTasksCOVENANT(dataching))
              // navigation.navigate('profile')
            })

            Emptying()
          });
        }
      }
    } else {
      ToastAndroid.showWithGravity(locale=='ar_MA'?'يجب اكمال البيانات اولاً':'You must complete the data first',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
      setFalse(false);
    }
  }
  const Emptying = () => {
    setIddelet(false);
    setNameTarg('');
    setDescrbtion('');
    setPush('');
    setProvEd('')
    setPaushset('لدي');
    setFalse(false);
    setImagOpg([]);
    setConstrctl('');
    setPaushset('')
  }
  const deletImagestorg = (namimaguriprov1) => {
    RNFS.unlink(namimaguriprov1).then((err, success) => {
      console.log(err);
      if (err) throw err;
      if (success) {
        ToastAndroid.showWithGravity(locale ===  "ar_MA"?'تم الحذف بنجاح':"Saved the Delet successfully",
        ToastAndroid.CENTER,
        ToastAndroid.LONG
      );
      }
    });

    const imagedit = imagop.find(task => task.idimgpost == idnotnul);
    imagop.splice(imagedit, 1)
    // setImagOpg(imagedit);
  };
  const onPresuser = async (lebrar) => {
    const filterimag = imagop.find(task => task.idimgpost === idnotnul);
    const imagedit = imagop.findIndex(task => task.idimgpost === idnotnul);
    let result;
    if (lebrar === 1) {
      result = await launchCamera(options);
    } else {
      result = await launchImageLibrary(options);
    }
    if (result.assets?.length > 0) {
      if (filterimag) {
        console.log(JSON.stringify(imagop));
        const image = {
          idimgpost: idnotnul,
          image: result.assets[0].uri,
          fileName: filterimag.fileName,
          type: result.assets[0].type,
        };
        let imagedata = [];
        imagedata = [...imagop];
        imagedata[imagedit] = image;
        setImagOpg(imagedata);
        setIdnotnull(0);
      } else {
        console.log(result.assets[0]);
        const imagedata = [...imagop];
        const index = imagedata.length + 1;
        const image = {
          idimgpost: index,
          image: result.assets[0].uri,
          fileName: result.assets[0].fileName,
          type: result.assets[0].type,
        };
        imagedata.push(image);
        setImagOpg(imagedata);
        console.log(JSON.stringify(image));
      };
    }
  };
  const getTasks = () => {
    const index = tasksEVACUTION.find((item: { id: string | string[]; }) => item.id === IDEVacu);
    if (index) {
      const find = tasksCOVENANT.find((item: { ID: string | string[]; }) => item.ID === index.IDCUST.toString());
      console.log(find.describtion);
      setNameTarg(find?.describtion);
      setDescrbtion(index.Describtions);
      setPush(index.Covenantday);
      setProvEd(index.Covenantday);
      setImagOpg(index.imagop);
      setPaushset(index.caseused)
    }
  }
  const listimags = [
    require("../../ass/ICONPHOTO.png"),
    require("../../ass/ICONPHOTO.png"),
  ];
  const renderItem = useCallback((item, index) => (
    < TouchableOpacity key={index}
      onPress={() => {
        setIdnotnull(item.idimgpost);
      }}  >
      <View style={styles.Imaghom}>
        <TouchableHighlight onPress={() => { setImagView(item.image); setImagViewfalse(true); }} style={styles.Imaghomid}>
          <Image resizeMode="stretch" style={[!item.image ? { width: RFValue(30), height: RFValue(30) } : styles.imag]} source={{ uri: item.image,cache:"force-cache" }} />
        </TouchableHighlight>
        <TouchableOpacity
          onPress={() => { deletImagestorg(item.image); setIdnotnull(item.idimgpost); }}
          style={{ backgroundColor: colors.WHITE, borderRadius: RFValue(10), width: RFValue(18), height: RFValue(18), position: 'absolute', justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'flex-end' }}>
          <FontAwesome5
            name='trash'
            size={15}
            color={'#ff3636'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ), [imagop]);
  const onptions = useCallback(
    tasksCOVENANT.filter((item: { caseused: string; Done: boolean; }) => item.caseused === paushset && item.Done === false).map((pic: { describtion: any; }) => (
      { name: `${pic.describtion}`, code: `${pic.describtion}` }
    )), [paushset]);
  const constrcutl = useCallback(
    tasksCONTRAT.map((pic: { describtion: any; }) => (
      { name: `${pic.sectionidnfy}`, code: `${pic.ID}` }
    )), [paushset]);
  return (
    <>
      {calculator ? <ModulsCalculator visble={calculator} onrequewt={setCalculator} onprssfounction={() => useclurek()} /> : null}
      <ModulsView visble={ImageViewFalse} onrequewt={setImagViewfalse} uri={ImageView} />
      <Modal
        visible={bellmodel}
        transparent
        onRequestClose={() => setBellmodel(false)}
        animationType='fade'
        hardwareAccelerated={true}>
        <TouchableOpacity onPress={() => setBellmodel(false)} style={styles.centered_IMag}>
          <View style={styles.mod1al}>
            <View style={styles.button}>
              <Pressable
                android_ripple={{ color: colors.YALO }}
                onPress={() => { onPresuser(2); setBellmodel(false) }}
                style={styles.im}>
                <FontAwesome5
                  name='images'
                  size={30}
                  color={colors.WHITE}
                />
              </Pressable>
              <Pressable
                android_ripple={{ color: colors.YALO }}
                onPress={() => { onPresuser(1); setBellmodel(false) }}
                style={styles.im}>
                <FontAwesome5
                  name='camera'
                  size={30}
                  color={colors.WHITE}
                />
              </Pressable>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        visible={iddelet}
        transparent
        onRequestClose={() => setIddelet(false)}
        animationType='fade'
        hardwareAccelerated={true}>
        <Pressable onPress={() => { nameTArg.length <= 0 ? setIddelet(false) : null }} style={styles.centered_view}>
          <Pressable onPress={() => setIddelet(true)} style={[{ height: RFValue(500) }, styles.bell_mod1al]}>
            <View style={styles.bell_body}>
              <Text style={styles.textinpu}>ادخل بيانات الاخلاء من فضلك</Text>
            </View>
            <View style={styles.bell_button}>
              <ScrollView>
                <TouchableOpacity onPress={() => { Emptying(); setIddelet(false) }} style={{ marginVertical: RFValue(10), marginHorizontal: RFValue(15), alignSelf: 'flex-start' }}>
                  <FontAwesome5Icon name='times' size={20} color={colors.WHITE} />
                </TouchableOpacity>
                <View style={styles.puchcontener}>
                  <TouchableOpacity onPress={() => setPaushset(locale ===  "ar_MA"?'لدي':"Have")} style={[paushset === 'لدي'||paushset === "Have" ? { backgroundColor: colors.YALO } : null, styles.puchcontener_sub1]}><Text style={[locale ===  "ar_MA"?{fontSize:RFValue(10)}:{fontSize:RFValue(12)},styles.puchcontener_sub1_text]}>{locale === 'ar_MA'?"إخلاء إلى":"Evacuation to"}</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => setPaushset(locale ==="ar_MA"?'لديه':"Has")} style={[paushset === 'لديه'|| paushset === "Has" ? { backgroundColor: colors.YALO } : null, styles.puchcontener_sub1]}><Text style={[locale ===  "ar_MA"?{fontSize:RFValue(10)}:{fontSize:RFValue(12)},styles.puchcontener_sub1_text]}>{locale === 'ar_MA'?"اخلاء من":"Evacuation from"}</Text></TouchableOpacity >
                </View>
                <View
                  style={styles.cansall}>
                  <View style={styles.inputtitelcounter}>
                    <Dropdown
                      labelStyle={{ top: 5, textAlign: 'center', paddingRight: -3, fontSize: 12, fontFamily: fonts.CAIROBLACK, color: colors.WHITE, }}
                      placeholder={locale ==="ar_MA"? paushset === 'لديه' ? 'القائم بالاخلاء' : 'مستلم الاخلاء':paushset === 'لديه' ? 'Evacuator': 'The future of evacuation'}
                      selectedItemStyle={{ color: colors.RED }}
                      dropdownIconStyle={{ position: 'absolute', right: 5, top: 12 }}
                      dropdownStyle={styles.taskhom}
                      dropdownContainerStyle={styles.contenar}
                      searchInputStyle={{
                        minHeight: 20, height: 50
                      }}
                      options={onptions}
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
                    <Text style={styles.textmos}>{locale ==="ar_MA"?"اجمالي العهده":"Total custody"}</Text>
                    <View style={[{ backgroundColor: colors.WHITE }, styles.inputtitelcounter]}>
                      <Text style={styles.inputdecerb}>{tasksCOVENANT.filter((item: { describtion: string; }) => item.describtion === nameTArg).length > 0 ? tasksCOVENANT?.find((item: { describtion: string; }) => item.describtion === nameTArg).SumCash : 0}</Text>
                    </View>
                  </View>
                  <View style={styles.mossdd}>
                    <Text style={styles.textmos}>{locale ==="ar_MA"?"ماتم اخلائه":"What has been evacuated"}</Text>
                    <View style={[{ backgroundColor: colors.WHITE }, styles.inputtitelcounter]}>
                      <Text style={styles.inputdecerb}>{tasksCOVENANT.find((item: { describtion: string; }) => item.describtion === nameTArg)?.DescPush.length > 0 ? tasksCOVENANT.find((item: { describtion: string; }) => item.describtion === nameTArg)?.DescPush : 0}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.mossdd}>
                <View style={styles.inputtitelcounter}>
                <Dropdown
                    labelStyle={{ top: 5, textAlign: 'center', paddingRight: -3, fontSize: 12, fontFamily: fonts.CAIROBLACK, color: colors.BLACK, }}
                    placeholder={locale ==="ar_MA"?"حدد حساب نفقات إذا اردت تحويله ":"Select an expense account if you want to transfer it"}
                    selectedItemStyle={{ color: colors.RED }}
                    dropdownIconStyle={{ position: 'absolute', right: 5, top: 12 }}
                    dropdownStyle={styles.taskhom}
                    dropdownContainerStyle={styles.contenar}
                    searchInputStyle={{
                      minHeight: 20, height: 50
                    }}
                    options={constrcutl}
                    optionLabel={'name'}
                    optionValue={'code'}
                    selectedValue={constrltl}
                    onValueChange={(value: React.SetStateAction<string>) => setConstrctl(value)}
                    primaryColor={'green'}
                  />
                  </View>
                  <View style={constrltl.length > 0 ? { display: 'none' } : { display: 'flex' ,marginBottom:10}}>
                    <View style={styles.inputtitelcounterinput}>
                      <Pressable android_ripple={{ color: colors.YALO, borderless: true }} style={{ top: 10, left: 18, zIndex: 1 }} onPress={() => setCalculator(true)}>
                        <FontAwesome5Icon name='calculator' size={15} color={colors.GREYD} />
                      </Pressable>
                      <TextInput style={styles.inputdecerb} keyboardType='number-pad' placeholder={locale ==="ar_MA"?"المبلغ الذي سيتم اخلائه الان":"The amount that will be vacated now"} value={pushing} onChangeText={(value) => setPush(value)} />
                    </View>
                  </View>
                  <View style={styles.inputtitelcounterinput}>
                    <TextInput style={styles.inputDiscripb} multiline placeholderTextColor={colors.CURRENT} placeholder={locale ==="ar_MA"?"تفاصيل الإخلاء":"Evacuation details"} value={descrbtion} onChangeText={(value) => setDescrbtion(value)} />
                  </View>
                  {
                    imagop.length >= 1
                      ?
                      <View style={styles.sactionImag}>
                        {imagop.map(renderItem)}
                        < TouchableOpacity
                          onPress={() => {
                            setIdnotnull(uuid.v4);
                            setBellmodel(true);
                          }}
                        >
                          <View style={styles.Imaghom}>
                            <View style={styles.Imaghomid}>
                              <Image resizeMode="stretch" style={{ width: RFValue(30), height: RFValue(30) }} source={require("../../ass/ICONPHOTO.png")} />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                      :
                      <View style={styles.sactionImag} >
                        {listimags.map((img, index) => (
                          <View key={index}>

                            <TouchableOpacity
                              onPress={() => {
                                setIdnotnull(uuid.v4);
                                setBellmodel(true);
                              }}>
                              <View style={styles.Imaghom}>
                                <View style={styles.Imaghomid}>
                                  <Image resizeMode="stretch" style={{ width: RFValue(30), height: RFValue(30) }} source={img} />
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        ))
                        }
                      </View>
                  }
                </View>
              </ScrollView>
            </View>
            {False
              ?
              <ActivityIndicator color={colors.WHITE} size={20} />
              :
              <Pressable
                android_ripple={{ color: colors.WHITE, borderless: true }}
                onPress={() => Puchchshing(IDEVacu)}
                style={[{ width: RFValue(150), top: -10, alignSelf: 'center' }, styles.inputtitelcounterbuton]}>
                <Text style={styles.inputdecerbuttom}>{locale ==="ar_MA"? givinit === 'تعديل' ? 'تعديل' : "اخلاء":givinit ==="Edit"?"edit": "vacating"}</Text>
              </Pressable>
            }
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}


export default PushCashCovenant;
