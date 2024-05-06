import {
  View,
  ScrollView,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';

import {colors} from './constants/colors';
import {useSelector, useDispatch} from 'react-redux';
import {setTasksCsh} from './redux/actions';
import {RFValue} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import PushNotification from 'react-native-push-notification';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ModulsCalculator, {result} from './component/modulsCalculator';
import locales, {locale} from './locale';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import useSwitchLanguage from './functionuse/SwitchLanguage';
import {tost} from './functionuse/contractuse/expTemplet';
import useEnquryLanguag from './functionuse/EnquryLanguag';

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
  },
};

export default function Taskscsh({navigation}) {
  const {tasksCSH, tasksCSHID, Language, darkmode} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();
  const {dolars} = useSwitchLanguage();
  const {rowS} = useEnquryLanguag();
  const [arryCahing, setArryCahing] = useState([]);
  const [sumCash, setSumCsh] = useState('');
  const [desc, setDesc] = useState('');
  const [fileurl, setUri] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [bellmodel, setBellmodel] = useState(false);
  const [liprri, setLiprre] = useState(false);
  const [bellTem, setBelltem] = useState('');
  const [phonNmber, setPhonNmber] = useState('');
  const [caseused, setCase] = useState(Language.Receive);
  const [caseuTarg, setTarget] = useState('');
  // const [caseuTargText, setTargettext] = useState("الدائن");
  const [codm, setCodmon] = useState('');
  const [selectedStartDateS, setSelectedStartDateS] = useState('');
  const [selectedStartDateF, setSelectedStartDateF] = useState('');
  const [selectdata, setSelectData] = useState(false);
  const [selectdataF, setSelectDataF] = useState(false);
  const [False, setFalse] = useState(false);
  const [calculator, setCalculator] = useState(false);
  const [calculatorCover, setCalculatorCover] = useState(false);
  const [FalseCalulter, setFalseCalculator] = useState(false);

  useEffect(() => {
    getTask();
    setFalse(false);
  }, []);

  const dataTims = useMemo(() => {
    selectedStartDateS.length > 0 ? setSelectData(false) : null;
    selectedStartDateF.length > 0 ? setSelectDataF(false) : null;
  }, [selectedStartDateS, selectedStartDateF]);

  const getTask = () => {
    const Task = tasksCSH.find((task: {ID: any}) => task.ID === tasksCSHID);
    if (Task) {
      setTarget(Task.caseuTarg);
      setSumCsh(Task.SumCash);
      setCodmon(Task.codm);
      setDesc(Task.DescPush);
      setToggleCheckBox(Task.Done);
      setBelltem(Task.Time);
      setUri(Task.Image);
      setSelectedStartDateS(Task.selectedStartDateS);
      setSelectedStartDateF(Task.selectedStartDateF);
      setCase(Task.caseused);
      setPhonNmber(Task.phone);
      setArryCahing(Task.arryCahing);
      setFalseCalculator(true);
    } else {
      setFalseCalculator(false);
    }
  };
  const onPress = async () => {
    if (
      sumCash.length === 0 ||
      selectedStartDateS.length === 0 ||
      selectedStartDateF.length === 0 ||
      caseuTarg.length === 0
    ) {
      tost(Language.The_required_data_must_be_completed);
      setFalse(false);
    } else if (parseInt(sumCash) < parseInt(desc)) {
      Alert(Language.The_paid_amount_cannot_be_higher_then_the_total);
      setFalse(false);
    } else {
      try {
        setFalse(true);
        var Task = {
          ID: tasksCSHID,
          caseuTarg: caseuTarg,
          SumCash: sumCash,
          codm:
            codm.length === 0
              ? Language.RialYemeniShort
              : dolars.find(item => item.value === codm.value)?.label,
          DescPush: desc.length > 0 ? desc : 0,
          Done: parseInt(sumCash) > parseInt(desc) ? false : toggleCheckBox,
          Time: bellTem,
          Image: fileurl,
          selectedStartDateS: selectedStartDateS,
          selectedStartDateF: selectedStartDateF,
          phone: phonNmber,
          caseused: caseused,
          arryCahing: arryCahing,
        };
        const index = tasksCSH.findIndex(
          (task: {ID: any}) => task.ID == tasksCSHID,
        );
        let newTasks: any[] = [];
        if (index > -1) {
          newTasks = [...tasksCSH];
          newTasks[index] = Task;
        } else {
          newTasks = [...tasksCSH, Task];
        }
        AsyncStorage.setItem('Taskscsh', JSON.stringify(newTasks)).then(() => {
          dispatch(setTasksCsh(newTasks));
          tost(Language.SavedSuccessfully);
          navigation.navigate('Cashbsns');
          empyte();
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const empyte = () => {
    setDesc('');
    setCase(Language.Receive);
    setPhonNmber('');
    setFalse(false);
    setSumCsh('');
  };

  const deletImage = () => {
    RNFS.unlink(fileurl).then(() => {
      const index = tasksCSH.findIndex(
        (tasks: {ID: any}) => tasks.ID === tasksCSHID,
      );
      if (index > -1) {
        let newTasks = [...tasksCSH];
        newTasks[index].Image = '';
        AsyncStorage.setItem('Taskscsh', JSON.stringify(newTasks)).then(() => {
          setUri('');
          tost(Language.savedTheOperationSuccessfully);
        });
      } else setUri('');
      empyte();
    });
  };
  const launch = async (i: number) => {
    let images;
    if (i === 2) {
      images = await launchImageLibrary(options);
    } else {
      images = await launchCamera(options);
    }
    if (images.assets?.length > 0) {
      console.log(images.assets[0]);
      const assets = images.assets;
      const filePath = assets[0].uri;
      setUri(filePath);
      /*const url =RNFS.readFile(filePath,'base64').then((date)=>{
      console.log(date)
      setPathima(date)})
      */
    }
  };

  const Timenotic = async (dateTime: any) => {
    const fireDate = dateTime;
    setBelltem(fireDate);
    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      title: caseuTarg,
      message: desc,
      date: fireDate,
      allowWhileIdle: true,
    });
  };
  const useclurek = () => {
    setSumCsh(result);
  };
  const useclurekD = () => {
    setDesc(result);
  };
  return (
    <>
      {calculator ? (
        <ModulsCalculator
          visble={calculator}
          onrequewt={setCalculator}
          onprssfounction={() => useclurek()}
        />
      ) : null}
      {calculatorCover ? (
        <ModulsCalculator
          visble={calculatorCover}
          onrequewt={setCalculatorCover}
          onprssfounction={() => useclurekD()}
        />
      ) : null}
      <Modal
        visible={liprri}
        transparent
        onRequestClose={() => setLiprre(false)}
        animationType="slide"
        hardwareAccelerated>
        <TouchableOpacity
          onPress={() => setLiprre(false)}
          style={styles.centered_IMag}>
          <View style={styles.mod1al}>
            <View style={[styles.button, {flexDirection: rowS()}]}>
              <Pressable
                android_ripple={{color: colors.YALO}}
                onPress={() => {
                  launch(2);
                  setLiprre(false);
                }}
                style={styles.im}>
                <FontAwesome5Icon
                  name="images"
                  size={30}
                  color={colors.WHITE}
                />
              </Pressable>
              <Pressable
                android_ripple={{color: colors.YALO}}
                onPress={() => {
                  launch(1);
                  setLiprre(false);
                }}
                style={styles.im}>
                <FontAwesome5Icon
                  name="camera"
                  size={30}
                  color={colors.WHITE}
                />
              </Pressable>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <DateTimePicker
        mode="datetime"
        isVisible={bellmodel}
        onConfirm={Timenotic}
        onCancel={() => setBellmodel(false)}
      />
      <DateTimePicker
        mode="date"
        isVisible={selectdata}
        onConfirm={value => setSelectedStartDateS(value.toDateString())}
        onCancel={() => setSelectData(false)}
      />
      <DateTimePicker
        mode="date"
        isVisible={selectdataF}
        onConfirm={value => setSelectedStartDateF(value.toDateString())}
        onCancel={() => setSelectDataF(false)}
      />
      <View
        style={[
          styles.body,
          {
            backgroundColor: darkmode === 'light' ? null : colors.DARK,
          },
        ]}>
        <View
          style={[
            styles.puchcontener,
            {
              backgroundColor:
                darkmode === 'light' ? colors.WHITE : colors.DARKM,
            },
          ]}>
          <TouchableOpacity
            onPress={() => setCase(Language.Receive)}
            style={[
              caseused === Language.Receive
                ? {
                    backgroundColor:
                      darkmode === 'light' ? colors.CURRENT : colors.WHITE,
                  }
                : null,
              styles.puchcontener_sub1,
            ]}>
            <Text
              style={[
                caseused === Language.Receive
                  ? {
                      color:
                        darkmode === 'light' ? colors.WHITE : colors.CURRENT,
                    }
                  : {
                      color:
                        darkmode === 'light' ? colors.CURRENT : colors.WHITE,
                    },
                styles.puchcontener_sub1_text,
              ]}>
              {Language.Receive}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCase(Language.To_Push)}
            style={[
              caseused === Language.To_Push
                ? {
                    backgroundColor:
                      darkmode === 'light' ? colors.CURRENT : colors.WHITE,
                  }
                : null,
              styles.puchcontener_sub1,
            ]}>
            <Text
              style={[
                caseused === Language.To_Push
                  ? {
                      color:
                        darkmode === 'light' ? colors.WHITE : colors.CURRENT,
                    }
                  : {
                      color:
                        darkmode === 'light' ? colors.CURRENT : colors.WHITE,
                    },
                styles.puchcontener_sub1_text,
              ]}>
              {Language.To_Push}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{marginBottom: RFValue(30)}}>
          <View style={styles.mossdd}>
            <TextInput
              style={styles.inputdecerb}
              placeholderTextColor={colors.CURRENT}
              placeholder={
                caseused === Language.To_Push
                  ? Language.Creditor
                  : Language.theDebtor
              }
              value={caseuTarg}
              onChangeText={value => setTarget(value)}
            />
            <View
              style={[styles.inputtitelcounterinput, {flexDirection: rowS()}]}>
              <Pressable
                android_ripple={{color: colors.YALO, borderless: true}}
                style={{top: 20, left: 30, zIndex: 1}}
                onPress={() => setCalculator(true)}>
                <FontAwesome5Icon
                  name="calculator"
                  size={15}
                  color={colors.GREYD}
                />
              </Pressable>

              <TextInput
                style={styles.inputdecerb}
                placeholderTextColor={colors.CURRENT}
                keyboardType="number-pad"
                placeholder={Language.TotalDebt}
                value={sumCash}
                onChangeText={value => setSumCsh(value)}
              />
            </View>
          </View>

          <RadioForm formHorizontal={true} animation={true}>
            <View
              style={{
                flexDirection: rowS(),
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: RFValue(10),
              }}>
              {dolars.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i}>
                  {/*  You can set RadioButtonLabel before RadioButtonInput */}
                  {!FalseCalulter ? (
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={codm.value === i + 1}
                      onPress={value => setCodmon({value})}
                      borderWidth={0.5}
                      buttonInnerColor={colors.YALO}
                      buttonOuterColor={
                        codm.value === i + 1 ? colors.YALO : colors.CURRENT
                      }
                      buttonSize={codm.value === i + 1 ? 15 : 10}
                      buttonOuterSize={codm.value === i + 1 ? 25 : 20}
                      buttonStyle={{}}
                      buttonWrapStyle={{marginLeft: 10}}
                    />
                  ) : (
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={
                        codm?.value === i + 1 ||
                        dolars.find(item => item.label === codm)?.value ===
                          i + 1
                      }
                      onPress={value => setCodmon({value})}
                      borderWidth={0.5}
                      buttonInnerColor={colors.YALO}
                      buttonOuterColor={
                        codm?.value === i + 1 ||
                        dolars.find(item => item.label === codm)?.value ===
                          i + 1
                          ? colors.YALO
                          : colors.CURRENT
                      }
                      buttonSize={
                        codm?.value === i + 1 ||
                        dolars.find(item => item.label === codm)?.value ===
                          i + 1
                          ? 15
                          : 10
                      }
                      buttonOuterSize={
                        codm?.value === i + 1 ||
                        dolars.find(item => item.label === codm)?.value ===
                          i + 1
                          ? 25
                          : 20
                      }
                      buttonStyle={{}}
                      buttonWrapStyle={{marginLeft: 10}}
                    />
                  )}
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={value => setCodmon({value})}
                    labelStyle={{fontSize: 12, color: colors.CURRENT}}
                    // labelWrapStyle={{}}
                  />
                </RadioButton>
              ))}
            </View>
          </RadioForm>

          <View
            style={{
              flexDirection: rowS(),
              width: '100%',
              justifyContent: 'space-around',
            }}>
            <View style={styles.dtatastart}>
              <TouchableOpacity
                onPress={() => {
                  if (selectedStartDateS.length > 0) {
                    setSelectedStartDateS('');
                    setSelectData(true);
                  } else {
                    setSelectData(true);
                  }
                  dataTims;
                }}>
                <Text style={styles.textmos}>{Language.StartingDate}</Text>
                <Text style={styles.textData}>{selectedStartDateS}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dtatastart}>
              <TouchableOpacity
                onPress={() => {
                  if (selectedStartDateF.length > 0) {
                    setSelectedStartDateF('');
                    setSelectDataF(true);
                  } else {
                    setSelectDataF(true);
                  }
                  dataTims;
                }}>
                <Text style={styles.textmos}>{Language.ExpiryDate}</Text>
                <Text style={styles.textData}>{selectedStartDateF}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.mossdd}>
            <Text style={styles.textmos}>
              {Language.Paid_off_the_debt_so_far}
            </Text>
            <View
              style={[styles.inputtitelcounterinput, {flexDirection: rowS()}]}>
              <Pressable
                android_ripple={{color: colors.YALO, borderless: true}}
                style={{top: 20, left: 30, zIndex: 1}}
                onPress={() => setCalculatorCover(true)}>
                <FontAwesome5Icon
                  name="calculator"
                  size={15}
                  color={colors.GREYD}
                />
              </Pressable>
              <TextInput
                style={styles.inputdecerb}
                keyboardType="number-pad"
                placeholder={Language.the_amount_paid}
                value={desc}
                onChangeText={value => setDesc(value)}
              />
            </View>
          </View>
          <View style={styles.mossdd}>
            <Text style={styles.textmos}>{Language.His_mobile_Number}</Text>
            <TextInput
              style={styles.inputdecerb}
              keyboardType="number-pad"
              placeholder={Language.His_mobile_Number}
              value={phonNmber}
              onChangeText={value => setPhonNmber(value)}
            />
          </View>
          {fileurl ? (
            <View>
              <Image style={styles.image} source={{uri: fileurl}} />
              <TouchableOpacity onPress={deletImage} style={styles.delete}>
                <FontAwesome5Icon name="trash" size={12} color="#ff3636" />
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={[styles.viewnotic, {flexDirection: rowS()}]}>
            <TouchableOpacity
              onPress={() => {
                setBellmodel(true);
              }}
              style={styles.notice}>
              <FontAwesome5Icon name={'bell'} size={25} color={'#ffffff'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setLiprre(true);
              }}
              style={styles.notice1}>
              <FontAwesome5Icon name="camera" size={25} color={'#ffffff'} />
            </TouchableOpacity>
            {False ? (
              <ActivityIndicator
                style={{flex: 2}}
                color={colors.RED}
                size={25}
              />
            ) : (
              <TouchableOpacity onPress={onPress} style={styles.set}>
                <Text style={styles.text}>{Language.save}</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputtitelcounterinput: {
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(10),
  },
  puchcontener: {
    width: RFValue(200),
    height: RFValue(30),
    borderRadius: 20,
    paddingHorizontal: RFValue(5),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: RFValue(10),
  },
  puchcontener_sub1: {
    flex: 1,
    alignItems: 'center',
    borderRadius: RFValue(20),
    padding: RFValue(2),
  },
  puchcontener_sub1_text: {
    // fontFamily: fonts.CAIROREGULARK,
  },
  body: {
    justifyContent: 'center',
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(25),
    width: '100%',
    alignSelf: 'center',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
  contenar: {
    width: 100,
    // position:'absolute',
    alignSelf: 'center',
    zIndex: 1,
    top: RFValue(7),
    right: RFValue(9),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: colors.YALO,
  },
  taskhom: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    minHeight: 10,
    height: 30,
    paddingTop: 3,
    paddingLeft: 3,
    paddingBottom: 1,
    opacity: 0.8,
  },
  set: {
    backgroundColor: colors.CURRENT,
    textAlign: 'center',
    flex: 3,
    alignSelf: 'center',
    marginHorizontal: RFValue(20),
    borderRadius: RFValue(20),
  },
  text: {
    textAlign: 'center',
    fontSize: RFValue(15),
    // fontFamily: fonts.CAIROREGULARK,
    color: colors.WHITE,
    // marginHorizontal: RFValue(7),
    marginVertical: RFValue(4),
  },

  inputdecerb: {
    flex: 1,
    padding: RFValue(5),
    fontSize: RFValue(13),
    textAlign: 'center',
    color: colors.GREYD,
    // fontFamily: fonts.CAIROEXTRLIGHK,
    backgroundColor: colors.WHITE,
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(10),
    borderRadius: RFValue(10),
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mossdd: {
    marginHorizontal: RFValue(5),
  },
  textmos: {
    textAlign: 'center',
    color: colors.BLACK,
    // fontFamily: fonts.CAIROREGULARK
  },
  dtatastart: {
    backgroundColor: colors.WHITE,
    flex: 1,
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(5),
    paddingHorizontal: RFValue(15),
    borderRadius: RFValue(10),
  },
  textData: {
    textAlign: 'center',
    color: colors.BLACK,
  },
  viewnotic: {
    justifyContent: 'center',
  },
  notice: {
    flex: 1,
    margin: RFValue(5),
    backgroundColor: colors.CURRENT,
    alignItems: 'center',
    height: RFValue(40),
    justifyContent: 'center',
    borderRadius: RFValue(10),
  },
  notice1: {
    flex: 1,
    margin: RFValue(5),
    backgroundColor: colors.CURRENT,
    alignItems: 'center',
    height: RFValue(40),
    justifyContent: 'center',
    borderRadius: RFValue(10),
  },
  centered_IMag: {
    height: '100%',
    flex: 1,
    backgroundColor: '#00000002',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mod1al: {
    width: '100%',
    height: RFValue(80),
    alignItems: 'flex-end',
    backgroundColor: colors.CURRENT,
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    opacity: 0.9,
  },
  button: {
    flexDirection: 'row',
    // flex: 10,
    height: '90%',
    width: '98%',
    marginVertical: RFValue(10),
    justifyContent: 'space-around',
    alignSelf: 'center',
    borderColor: colors.YALO,
    borderWidth: RFValue(1),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    overflow: 'hidden',
  },

  im: {
    flex: 2,
    padding: RFValue(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.YALO,
    // borderRadius:RFValue(10)
  },

  image: {
    width: RFValue(200),
    height: RFValue(200),
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    margin: RFValue(20),
    borderRadius: RFValue(10),
  },
  delete: {
    width: RFValue(30),
    height: RFValue(30),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: RFValue(80),
    bottom: RFValue(20),
    backgroundColor: '#ffffff80',
    margin: RFValue(10),
    borderRadius: RFValue(5),
  },
});
