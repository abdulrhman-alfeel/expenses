import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from './constants/colors';
import {useSelector, useDispatch} from 'react-redux';
import {setTasksCONTRAT} from './redux/actions';
import {RFValue} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from 'react-native-modal-datetime-picker';
import uuid from 'react-native-uuid';
import Modeltasksection from './component/modeltasksection';
import ModulsCalculator, {result} from './component/modulsCalculator';
import {locale} from './locale';
import ModulsSectionInsert from './component/postprodctmov/modulsSectionInsert';
import {Tofixed, tost} from './functionuse/contractuse/expTemplet';
import useSwitchLanguage from './functionuse/SwitchLanguage';
import useEnquryLanguag from './functionuse/EnquryLanguag';

// export const dolars = [{ name: locale === "ar_MA" ? 'دولار امريكي' : "$", code: '$' }, { name: locale === "ar_MA" ? 'ريال سعودي' : "SR", code: locale === "ar_MA" ? 'ر.ي.س' : "SR" }, { name: locale === "ar_MA" ? 'ريال يمني' : "YR", code: locale === "ar_MA" ? 'ر.ي' : "YR" }];

export default function Taskscshmonv({navigation}) {
  const {tasksCONTRAT, tasksCONTRATID, Language} = useSelector(
    state => state.userReducer,
  );
  const {rowS} = useEnquryLanguag();
  const dispatch = useDispatch();
  const {dolars} = useSwitchLanguage();

  const [databuld, setData] = useState([]);
  const [bellmodel, setBellmodel] = useState(false);
  const [liprri, setLiprre] = useState(false);
  const [bulidEdit, setBualdEdit] = useState(Language.add);
  const [sectionidnfy, setSecidenfy] = useState('');
  //وقت الخاص بالنفقات
  const [DatetiemSubfals, setDataTiermSubfels] = useState(false);
  const [DatetiemaSub, setDataTiermSub] = useState({
    text: '',
    booleans: DatetiemSubfals,
  });
  //وقت الخاص بالنفقات الفرعية
  const [Datetiemarthfals, setDataTiermarthfels] = useState(false);
  //وقت خاص بانشاء الحساب
  const [Datecound, setDataCount] = useState('');
  const [Datecoundfalse, setDataCountfalse] = useState(false);
  //خاص بوقت الساعة
  // اخطاء عدم اكمال البيانات
  const [falseerr, setFalseerr] = useState(false);
  const [Addtaskfalse, setAddTsksfalse] = useState(false);

  //array sub
  //اجور عمال
  const [idSection, setIdsection] = useState('');

  const [calculator, setCalculator] = useState(false);

  const [FalseCalulter, setFalseCalculator] = useState(false);

  const [TasksSac, setTasksSac] = useState({
    idHOM: '',
    Databes: [],
    sectiontitle: '',
    SumDollar: 0,
    SumِSR: 0,
    SumِYR: 0,
    abzrphtion: '',
    Time: '',
    Timeminet: '',
  });
  const [Tasks, setTasks] = useState({
    idHOM: '',
    idSub: uuid.v4(),
    sectionpriclabrr: '',
    sectiontitle: '',
    arthDath: '',
    abzrphtion: '',
    TimeSub: '',
    Timeminet: '',
  });

  // focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSecidenfy('');
      setData([]);
      setBualdEdit(Language.add);
      setTasks(pic => ({
        ...pic,
        TimeSub: new Date(Date.now()).toLocaleDateString(),
      }));
      setDataCount(new Date().toLocaleDateString());
      setDataTiermSub({...DatetiemaSub, text: new Date().toLocaleDateString()});
      setTasks(pic => ({...pic, TimeSub: new Date().toLocaleDateString()}));
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (TasksSac.Time?.length > 0) {
      setDataTiermSubfels(false);
    }
    if (Tasks.TimeSub?.length > 0) {
      setDataTiermarthfels(false);
    }
  }, [TasksSac.Time, Tasks.TimeSub]);

  useEffect(() => {
    setDataTiermSub({...DatetiemaSub, text: new Date().toLocaleDateString()});
  }, []);
  const useclurek = () => {
    setTasks({...Tasks, sectionpriclabrr: result});
  };

  const getDatalabrrs = () => {
    if (
      Tasks.sectiontitle?.length > 0 &&
      Tasks.sectionpriclabrr.length > 0 &&
      Tasks.arthDath?.value > 0
    ) {
      const indexconten = databuld.findIndex(
        tasks => tasks.idHOM === TasksSac.idHOM,
      );
      let addnew = [];
      addnew = [...databuld];
      try {
        setLiprre(true);
        var datares = {
          ...Tasks,
          arthDath: Tasks.arthDath.value,
        };

        let objectsDoler = [];
        let objectYR = [];
        let objectSR = [];
        // const index = Datelaber.findIndex(tasks => tasks.id === idSectionlabrr);
        const finddata = addnew.find(tasks => tasks.idHOM === TasksSac.idHOM);
        if (finddata) {
          const index = finddata.Databes.findIndex(
            tasks => tasks.idSub === Tasks.idSub,
          );
          const databulise = databuld.find(te => te.idHOM === TasksSac.idHOM);
          if (index > -1) {
            finddata.Databes[index] = datares;
            // console.log(databuld);
            setBualdEdit(Language.add);
          } else {
            addnew
              .find(tasks => tasks.idHOM === TasksSac.idHOM)
              ?.Databes.push(datares);
            // console.log('hello world', Tasks);
          }
          databulise?.Databes.forEach((item, index) => {
            item.arthDath.value === Language.AmericandollarShort
              ? objectsDoler.push({x: parseInt(item.sectionpriclabrr)})
              : item.arthDath.value === Language.RialSudiaShort
              ? objectSR.push({x: parseInt(item.sectionpriclabrr)})
              : objectYR.push({x: parseInt(item.sectionpriclabrr)});
          });
          const sumDoler = objectsDoler.reduce(
            (accumulator, currentValue) => accumulator + currentValue.x,
            0,
          );
          const sumSR = objectSR.reduce(
            (accumulator, currentValue) => accumulator + currentValue.x,
            0,
          );
          const sumYR = objectYR.reduce(
            (accumulator, currentValue) => accumulator + currentValue.x,
            0,
          );
          addnew[indexconten].SumDollar = sumDoler;
          addnew[indexconten].SumِSR = sumSR;
          addnew[indexconten].SumِYR = sumYR;
          setData(addnew);
          console.log(addnew);
          setIdsection(Tasks.idHOM);
          // empty
        }
        setLiprre(false);
      } catch (err) {
        console.log(err);
        setLiprre(false);
      }

      cansleshook();
    } else {
      tost(Language.The_required_data_must_be_completed);
      setFalseerr(true);
    }
  };

  const getDatabulds = () => {
    console.log(idSection);
    let addnew = [];
    addnew = [...databuld];
    if (TasksSac.sectiontitle.length > 0) {
      try {
        // setLiprre(true);
        var datares = TasksSac;
        const index = databuld.findIndex(
          tasks => tasks.idHOM === TasksSac.idHOM,
        );
        const finddata = databuld.find(tasks => tasks.idHOM === TasksSac.idHOM);
        if (finddata) {
          addnew[index] = datares;
          setData(addnew);
          setBualdEdit(Language.add);
        } else {
          addnew = [...databuld];
          addnew.push(datares);
          setData(addnew);
          console.log(addnew);
        }
        setDataCountfalse(false);
      } catch (err) {
        console.log(err);
      }
      setBellmodel(false);
      cansleshook();
      // setLiprre(false);
    } else {
      tost(Language.The_required_data_must_be_completed);
      // setFalseerr(true);
    }
  };

  const onPress = () => {
    if (sectionidnfy.length === 0) {
      tost(Language.The_required_data_must_be_completed);
      setFalseerr(true);
    } else {
      try {
        setLiprre(true);
        let Dollar = 0;
        let SR = 0;
        let YR = 0;

        let objectsDoler = [];
        let objectsSR = [];
        let objectsYR = [];
        databuld.forEach((item, index) => {
          objectsDoler.push({x: parseInt(item.SumDollar)});
          objectsSR.push({x: parseInt(item.SumِSR)});
          objectsYR.push({x: parseInt(item.SumِYR)});
        });
        Dollar = objectsDoler.reduce(
          (accumulator, currentValue) => accumulator + currentValue.x,
          0,
        );
        //sum reduce SR
        SR = objectsSR.reduce(
          (accumulator, currentValue) => accumulator + currentValue.x,
          0,
        );
        //sum reduce YR
        YR = objectsYR.reduce(
          (accumulator, currentValue) => accumulator + currentValue.x,
          0,
        );

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
        };
        const newTasks = [...tasksCONTRAT, Task];
        AsyncStorage.setItem('TasksCONTRAT', JSON.stringify(newTasks)).then(
          () => {
            dispatch(setTasksCONTRAT(newTasks));
            tost(Language.SavedSuccessfully);
            setLiprre(false);
            navigation.navigate('Prodectmyfalse');
            cansleshook();
          },
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
  const cansleshook = () => {
    setTasksSac({
      idHOM: '',
      Databes: [],
      sectiontitle: '',
      SumDollar: 0,
      SumِSR: 0,
      SumِYR: 0,
      abzrphtion: '',
      Time: '',
      Timeminet: '',
    });
    setTasks({
      idHOM: '',
      idSub: uuid.v4(),
      sectionpriclabrr: '',
      sectiontitle: '',
      arthDath: '',
      abzrphtion: '',
      TimeSub: '',
      Timeminet: '',
    });
    setDataTiermarthfels(false);
    setFalseCalculator(false);
    setDataCountfalse(false);
    setFalseerr(false);
    setAddTsksfalse(false);
    setBualdEdit(Language.add);
  };

  return (
    <>
      <ModulsCalculator
        onprssfounction={() => useclurek()}
        visble={calculator}
        onrequewt={setCalculator}
      />
      <View style={styles.body}>
        <DateTimePicker
          mode="date"
          isVisible={Datecoundfalse}
          onConfirm={value => setDataCount(value.toLocaleDateString())}
          // onChange={(value)=>setDataCount(value)}
          onCancel={() => setDataCountfalse(false)}
        />
        <DateTimePicker
          mode="date"
          isVisible={DatetiemSubfals}
          onConfirm={value =>
            setTasksSac({...TasksSac, Time: value.toLocaleDateString()})
          }
          // onChange={(value)=>setDataCount(value)}
          onCancel={() => setDataTiermSubfels(false)}
        />
        <ModulsSectionInsert
          bellmodel={bellmodel}
          W
          setBellmodel={setBellmodel}
          Contener={() => {
            // cansleshook();
            setBellmodel(false);
          }}
          ContenerSub={() => setBellmodel(true)}
          onPressAdd={() => {
            getDatabulds();
          }}
          falseerr={falseerr}
          TasksSac={TasksSac}
          setTasksSac={setTasksSac}
          setDataTiermSubfels={setDataTiermSubfels}
          bulidEdit={bulidEdit}
        />

        {Addtaskfalse || Datetiemarthfals || liprri ? (
          <Modeltasksection
            onpress={() => {
              bulidEdit === Language.add
                ? setTasks(pic => ({...pic, idSub: uuid.v4()}))
                : null;
              getDatalabrrs();
            }}
            Datetiemarthfals={Datetiemarthfals}
            FalseCalulter={FalseCalulter}
            setDataTiermarthfels={setDataTiermarthfels}
            pressclacultar={() => setCalculator(true)}
            setDataTiermarthwrit={setTasks}
            Datetiemarthwrit={Tasks.TimeSub}
            bulidEditr={bulidEdit}
            Faslecomplet={falseerr}
            False={liprri}
            chexconsle={cansleshook}
            pushcash={Addtaskfalse}
            Pushsetfalse={setAddTsksfalse}
            selectedValue={Tasks.arthDath}
            onValueChange={value => setTasks({...Tasks, arthDath: {value}})}
            options={dolars}
            sectiontitle={Tasks.sectiontitle}
            setSectiontitel={setTasks}
            pric={Tasks.sectionpriclabrr}
            setPric={setTasks}
            abzrphtion={Tasks.abzrphtion}
            setAbzrph={setTasks}
          />
        ) : null}
        <ScrollView>
          <View style={[styles.idmorev, {flexDirection: rowS()}]}>
            <Text style={[{flex: 1}, styles.textarth]}>
              {Language.nameAccount}
            </Text>
            <TextInput
              style={[
                locale === 'ar_MA'
                  ? {fontSize: RFValue(10)}
                  : {fontSize: RFValue(8)},
                falseerr && sectionidnfy.length <= 0
                  ? {borderColor: colors.RED}
                  : {borderColor: colors.YALO},
                styles.inputtitelbuildidntfy,
              ]}
              placeholder={
                falseerr && sectionidnfy.length <= 0
                  ? Language.You_must_specify_Aname_OR_accountNumber
                  : Language.Select_Aname_OR_account_number
              }
              placeholderTextColor={colors.BLACK}
              value={sectionidnfy}
              onChangeText={value => setSecidenfy(value)}
            />
            <TouchableOpacity
              onPress={() => {
                if (Datecound.length > 0) {
                  setDataCount('');
                  setDataCountfalse(true);
                } else {
                  setDataCountfalse(true);
                }
              }}
              style={{
                alignItems: 'center',
                height: 20,
                flex: 1,
                backgroundColor: colors.WHITE,
                borderRadius: RFValue(10),
              }}>
              <Text style={styles.textarth}>{Datecound}</Text>
            </TouchableOpacity>
            {/* <Text style={styles.textid}>{tasksCONTRATID}</Text> */}
          </View>

          <View style={{alignItems: 'center'}}>
            <Pressable
              android_ripple={{borderless: true, color: colors.WHITE}}
              onPress={() => {
                setIdsection(uuid.v4());
                setBellmodel(true);
                setTasksSac({
                  ...TasksSac,
                  idHOM: uuid.v4(),
                  Time: new Date().toLocaleDateString(),
                });
              }}
              style={styles.buttomadd}>
              <Text
                style={[
                  locale === 'ar_MA'
                    ? {fontSize: RFValue(11)}
                    : {fontSize: RFValue(8)},
                  styles.textbot,
                ]}>
                {Language.Add_Subsidiary_expenses}
              </Text>
            </Pressable>
          </View>

          <View>
            {databuld.map((item, index) => (
              <View key={index} style={styles.bouild}>
                <TouchableOpacity
                  onLongPress={() => {
                    setTasksSac(item);
                    setBellmodel(true);
                  }}
                  onPress={() => {
                    setIdsection(item.idHOM);
                  }}
                  style={[styles.containerbuilds, {flexDirection: rowS()}]}>
                  <Text
                    numberOfLines={2}
                    style={[{width: '20%'}, styles.textbuild]}>
                    {item.sectiontitle}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[{width: '20%'}, styles.textbuild]}>
                    {item.Time}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[{width: '20%'}, styles.textbuild]}>
                    {item.Timeminet}
                  </Text>
                </TouchableOpacity>

                <View
                  style={
                    idSection === item.idHOM
                      ? {marginBottom: 10}
                      : {display: 'none'}
                  }>
                  <View style={styles.header}>
                    <Text style={styles.textsum}>{Language.Total}</Text>
                  </View>
                  <View
                    style={[styles.container_sub1, {flexDirection: rowS()}]}>
                    <Text style={styles.textsum}>
                      {Language.Amounts_In_dollars}
                    </Text>
                    <Text style={styles.textsum}>{Language.RialSudiaLong}</Text>
                    <Text style={styles.textsum}>
                      {Language.RialYemeniLong}
                    </Text>
                  </View>

                  <View
                    style={[styles.container_sub1, {flexDirection: rowS()}]}>
                    <Text style={styles.textsum}>
                      {Tofixed(item.SumDollar)}
                    </Text>
                    <Text style={styles.textsum}>{Tofixed(item.SumِSR)}</Text>
                    <Text style={styles.textsum}>{Tofixed(item.SumِYR)}</Text>
                  </View>
                  <View
                    style={[
                      styles.containerbuilds_sub_heder,
                      {flexDirection: rowS()},
                    ]}>
                    <Text style={styles.textbuild_sub_heder}>
                      {Language.Manifesto}
                    </Text>
                    <Text style={[{width: '15%'}, styles.textbuild_sub_heder]}>
                      {Language.Time}
                    </Text>
                    <Text style={styles.textbuild_sub_heder}>
                      {Language.Amount}
                    </Text>
                    <Text style={styles.textbuild_sub_heder}>
                      {Language.Note}
                    </Text>
                  </View>
                  {item?.Databes.filter(i => i.idHOM === idSection).map(
                    (pic, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setTasks(pic);
                          setTasksSac(item);

                          setBualdEdit(Language.Edit);
                          setAddTsksfalse(true);
                        }}
                        style={[
                          styles.containerbuilds_sub,
                          {flexDirection: rowS()},
                        ]}>
                        <Text
                          numberOfLines={1}
                          style={[{width: '10%'}, styles.textbuild_sub]}>
                          {pic.sectiontitle}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={[{width: '20%'}, styles.textbuild_sub]}>
                          {pic.TimeSub}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={[{width: '20%'}, styles.textbuild_sub]}>
                          {pic.arthDath} {Tofixed(pic.sectionpriclabrr)}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={[{width: '10%'}, styles.textbuild_sub]}>
                          {pic.abzrphtion}
                        </Text>
                      </TouchableOpacity>
                    ),
                  )}
                </View>
                <Pressable
                  android_ripple={{borderless: true, color: colors.WHITE}}
                  onPress={() => {
                    setAddTsksfalse(true);
                    setTasksSac(item);
                    console.log(Tasks.TimeSub);
                    setTasks(pic => ({...pic, idHOM: item.idHOM}));
                  }}
                  style={styles.buttom}>
                  <Text style={styles.textbuttom}>{bulidEdit}</Text>
                </Pressable>
              </View>
            ))}
          </View>
          {liprri ? (
            <ActivityIndicator size={20} color={colors.RED} />
          ) : (
            <Pressable
              android_ripple={{borderless: false, color: colors.WHITE}}
              hitSlop={10}
              onPress={() => {
                onPress();
              }}
              style={styles.set}>
              <Text style={styles.text}>{Language.save}</Text>
            </Pressable>
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  //نفقة

  buttomadd: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: RFValue(110),
    // height: RFValue(30),
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 20,
    // borderTopRightRadius: RFValue(50),
    // borderBottomRightRadius: RFValue(50),
    // left: 15,
    backgroundColor: colors.CURRENT,
    borderColor: colors.YALO,
    borderBottomWidth: RFValue(1),
    borderTopWidth: RFValue(1),
  },
  textbot: {
    color: colors.WHITE,
    // fontFamily: fonts.CAIROREGULARK
  },
  //user
  user_mod1al: {
    width: RFValue(300),
    height: RFValue(350),
    backgroundColor: colors.YALO,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(20),
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
    alignItems: 'center',
  },
  inputtiteuser: {
    color: colors.CURRENT,
    padding: 5,
    borderRadius: RFValue(10),
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    // fontFamily: fonts.CAIROREGULARK
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
    // fontFamily: fonts.CAIROREGULARK
  },
  headerstatement: {
    width: '90%',
    height: RFValue(100),
    justifyContent: 'space-around',
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
    alignItems: 'center',
  },
  textuser: {
    // fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(14),
    color: colors.CURRENT,
    textAlign: 'center',
  },
  textuser_sub: {
    textAlign: 'center',
    justifyContent: 'center',
    marginHorizontal: RFValue(10),
    // fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(14),
    color: colors.WHITE,
  },
  textmerr: {
    fontSize: RFValue(10),
    color: colors.RED,
    // fontFamily: fonts.CAIROREGULARK,
    // marginHorizontal:RFValue(15),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.WHITE,
    textAlign: 'center',
    borderRadius: RFValue(5),
  },
  //
  textm: {
    fontSize: RFValue(17),
    // fontFamily: fonts.TAJAWALREGULAR,
    textShadowColor: colors.BORDER,
    textShadowRadius: 0.2,
  },
  body: {
    flex: 1,
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
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: RFValue(10),
    marginVertical: 15,
    width: '40%',
    backgroundColor: colors.CURRENT,
  },
  text: {
    textAlign: 'center',
    fontSize: RFValue(20),
    // width: RFValue(200),
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
    color: colors.GREYD,
  },
  ///خاص بالتفاصيل
  bouild: {
    width: '100%',
    marginHorizontal: RFValue(10),
    flexDirection: 'column',
    alignSelf: 'center',
    marginBottom: RFValue(15),
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
    color: colors.GREYD,
  },
  inputtitelbuildidntfy: {
    backgroundColor: colors.WHITE,
    borderRadius: RFValue(15),
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(2),
    borderWidth: 1,
    textAlign: 'center',
    flex: 2,
    color: colors.GREYD,
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
    borderRadius: RFValue(10),
  },
  modulsub: {
    backgroundColor: colors.CURRENT,
    width: '90%',
    borderRadius: RFValue(10),
    flexDirection: 'column',
  },
  textview: {
    color: colors.WHITE,
    // fontFamily: fonts.CAIROREGULARK,
    padding: RFValue(5),
    marginHorizontal: RFValue(5),
    fontSize: RFValue(12),
    overflow: 'hidden',
  },
  textviewabzrphtion: {
    color: colors.WHITE,
    // fontFamily: fonts.CAIROREGULARK,
    padding: RFValue(5),
    fontSize: RFValue(12),
    overflow: 'hidden',
    flexWrap: 'wrap',
  },
  continer_sub: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: RFValue(15),
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
    borderWidth: RFValue(1),
  },
  textbodtomleprr: {
    fontSize: RFValue(13),
    color: colors.CURRENT,
    // fontFamily: fonts.CAIROREGULARK
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textconter: {
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  //
  containerbuilds: {
    backgroundColor: colors.WHITE,
    elevation: 1,
    flex: 1,
    justifyContent: 'space-around',
    // borderRadius: RFValue(5),
    paddingVertical: RFValue(10),
    marginVertical: RFValue(5),
  },
  textbuild: {
    color: colors.CURRENT,
    // fontFamily: fonts.CAIROREGULARK
  },
  containerbuilds_sub: {
    backgroundColor: colors.WHITE,
    width: '100%',
    paddingHorizontal: RFValue(10),
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: RFValue(10),
    marginVertical: RFValue(5),
  },
  containerbuilds_sub_heder: {
    backgroundColor: colors.YALO,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(10),
    // marginVertical: RFValue(5),
    marginTop: RFValue(-5),
  },
  textbuild_sub: {
    color: colors.BANAF,
    // fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(10),
    textAlign: 'center',
  },
  textbuild_sub_heder: {
    color: colors.CURRENT,
    // fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(13),
    textAlign: 'center',
  },
  buttom: {
    backgroundColor: colors.YALO,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '40%',
    padding: RFValue(5),
    borderRadius: RFValue(10),
  },
  textbuttom: {
    color: colors.CURRENT,
    textAlign: 'center',
    // fontFamily: fonts.CAIROREGULARK
  },

  centered_view: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },

  idmorev: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: RFValue(15),
    paddingHorizontal: RFValue(15),
  },
  textarth: {
    color: colors.BLACK,
    fontSize: RFValue(12),
    // fontFamily: fonts.CAIROREGULARK
  },
  textid: {
    color: colors.BLACK,
  },
  container_sub1: {
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
    borderWidth: 1,
  },
  textsum: {
    color: colors.WHITE,
    textAlign: 'center',
    // fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(10),
  },
});
