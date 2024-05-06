import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';

import {colors} from './constants/colors';
import {useSelector, useDispatch} from 'react-redux';
import {setTasksCOVENANT} from './redux/actions';
import {RFValue} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ModulsCalculator, {result} from './component/modulsCalculator';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import useSwitchLanguage from './functionuse/SwitchLanguage';
import {tost} from './functionuse/contractuse/expTemplet';
import useEnquryLanguag from './functionuse/EnquryLanguag';

export default function TasksCovenant({navigation}) {
  const {tasksCOVENANT, tasksCOVENANTID, Language} = useSelector(
    state => state.userReducer,
  );
  const {rowS} = useEnquryLanguag();

  const {dolars} = useSwitchLanguage();
  const dispatch = useDispatch();
  const [sumCash, setSumCsh] = useState('');
  const [efakord, setEfakord] = useState([]);
  const [False, setFalse] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [phonNmber, setPhonNmber] = useState('');
  const [caseused, setCase] = useState(Language.Have);
  const [caseuTarg, setTarget] = useState('');
  // const [caseuTargText, setTargettext] = useState("الدائن");
  const [codm, setCodmon] = useState('$');
  const [DescPush, setDescPush] = useState('');
  const [selectedStartDateS, setSelectedStartDateS] = useState('');
  const [selectdata, setSelectData] = useState(false);
  const [calculator, setCalculator] = useState(false);
  const [FalseCalulter, setFalseCalculator] = useState(false);

  useEffect(() => {
    getTask();
  }, []);

  useMemo(() => {
    selectedStartDateS.length > 0 ? setSelectData(false) : null;
  }, [selectedStartDateS]);

  function getTask() {
    const Task = tasksCOVENANT.find(tasks => tasks.ID === tasksCOVENANTID);
    if (Task) {
      setTarget(Task.describtion);
      setSumCsh(Task.SumCash);
      setCodmon(Task.kindmony);
      setToggleCheckBox(Task.Done);
      setEfakord(Task.arrayOprition);
      setSelectedStartDateS(Task.TimeDate);
      setCase(Task.caseused);
      setPhonNmber(Task.phone);
      setDescPush(Task.DescPush);
      setFalseCalculator(true);
    } else {
      setFalseCalculator(false);
    }
  }
  const onPress = async () => {
    if (
      sumCash.length === 0 &&
      selectedStartDateS.length === 0 &&
      caseuTarg.length === 0 &&
      codm.value === 0
    ) {
      tost(Language.The_required_data_must_be_completed);
    } else {
      setFalse(true);
      try {
        // console.warn(dolars.find(item=>item.value ==codm.value)?.label)
        var Task = {
          ID: tasksCOVENANTID,
          describtion: caseuTarg,
          SumCash: sumCash,
          kindmony:
            codm.length === 0
              ? Language.RialYemeniShort
              : dolars.find(item => item.value === codm.value)?.label,
          DescPush: DescPush,
          Done: toggleCheckBox,
          TimeDate: selectedStartDateS,
          arrayOprition: efakord,
          caseused: caseused,
          phone: phonNmber,
        };
        const index = tasksCOVENANT.findIndex(
          tasks => tasks.ID === tasksCOVENANTID,
        );
        let newTasks = [];
        if (index > -1) {
          newTasks = [...tasksCOVENANT];
          newTasks[index] = Task;
        } else {
          newTasks = [...tasksCOVENANT, Task];
        }
        AsyncStorage.setItem('tasksCOVENANT', JSON.stringify(newTasks)).then(
          () => {
            dispatch(setTasksCOVENANT(newTasks));
            tost(Language.SavedSuccessfully);
            navigation.navigate('Covenanting');
            setTarget('');
            setSumCsh('');
            setCodmon('');
            setToggleCheckBox(false);
            setEfakord([]);
            setSelectedStartDateS('');
            setCase('');
            setPhonNmber('');
            setDescPush('');
            setFalse(false);
          },
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
  const useclurek = () => {
    setSumCsh(result);
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
      <DateTimePicker
        mode="datetime"
        isVisible={selectdata}
        onConfirm={value => setSelectedStartDateS(value.toLocaleDateString())}
        onCancel={() => setSelectData(false)}
      />
      <View style={styles.body}>
        <View style={[styles.puchcontener, {flexDirection: rowS()}]}>
          <TouchableOpacity
            onPress={() => setCase(Language.Have)}
            style={[
              caseused === Language.Have
                ? {backgroundColor: colors.YALO}
                : null,
              styles.puchcontener_sub1,
            ]}>
            <View>
              <Text style={styles.puchcontener_sub1_text}>{Language.Have}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCase(Language.Has)}
            style={[
              caseused === Language.Has ? {backgroundColor: colors.YALO} : null,
              styles.puchcontener_sub1,
            ]}>
            <View>
              <Text style={styles.puchcontener_sub1_text}>{Language.Has}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.mossdd}>
          <TextInput
            style={styles.inputdecerb}
            placeholderTextColor={colors.CURRENT}
            placeholder={
              caseused === Language.Have
                ? Language.Guardian_of_the_Covenant
                : Language.recipient_Of_the_Covenant
            }
            value={caseuTarg}
            onChangeText={value => setTarget(value)}
          />
          <View
            style={[styles.inputtitelcounterinput, {flexDirection: rowS()}]}>
            <Pressable
              android_ripple={{color: colors.YALO, borderless: true}}
              style={{top: 20, left: 40, zIndex: 1}}
              onPress={() => setCalculator(true)}>
              <FontAwesome5Icon
                name="calculator"
                size={15}
                color={colors.GREYD}
              />
            </Pressable>
            <TextInput
              style={[{flex: 1}, styles.inputdecerb]}
              placeholderTextColor={colors.CURRENT}
              keyboardType="number-pad"
              placeholder={Language.Amount}
              value={sumCash}
              onChangeText={value => setSumCsh(value)}
            />
          </View>
        </View>

        <RadioForm formHorizontal={true} animation={true}>
          <View
            style={{
              width: '100%',
              flexDirection: rowS(),
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
                    // buttonStyle={{}}
                    buttonWrapStyle={{marginLeft: 10}}
                  />
                ) : (
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={
                      codm.value === i + 1 ||
                      dolars.find(item => item.label === codm)?.value === i + 1
                    }
                    onPress={value => setCodmon({value})}
                    borderWidth={0.5}
                    buttonInnerColor={colors.YALO}
                    buttonOuterColor={
                      codm.value === i + 1 ||
                      dolars.find(item => item.label === codm)?.value === i + 1
                        ? colors.YALO
                        : colors.CURRENT
                    }
                    buttonSize={
                      codm.value === i + 1 ||
                      dolars.find(item => item.label === codm)?.value === i + 1
                        ? 15
                        : 10
                    }
                    buttonOuterSize={
                      codm.value === i + 1 ||
                      dolars.find(item => item.label === codm)?.value === i + 1
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
            flexDirection: 'row',
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
              }}>
              <Text style={styles.textmos}>{Language.Received}</Text>
              <Text style={styles.textData}>{selectedStartDateS}</Text>
            </TouchableOpacity>
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
        <View>
          {False ? (
            <ActivityIndicator color={colors.CURRENT} size={20} />
          ) : (
            <Pressable
              android_ripple={{borderless: true, color: colors.WHITE}}
              onPress={onPress}
              style={[
                // {width: RFValue(150), top: -15, alignSelf: 'center'},
                styles.set,
              ]}>
              <Text style={styles.text}>{Language.save}</Text>
            </Pressable>
          )}
        </View>
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
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    paddingHorizontal: RFValue(5),
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
    color: colors.CURRENT,
    // fontFamily: fonts.CAIROREGULARK
  },
  body: {
    justifyContent: 'center',
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(-50),
    width: '100%',
    alignSelf: 'center',
    height: '100%',
  },

  set: {
    backgroundColor: colors.CURRENT,
    width: '40%',
    // height: RFValue(20),
    padding: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    margin: RFValue(20),
    borderRadius: RFValue(10),
  },
  text: {
    textAlign: 'center',
    fontSize: RFValue(15),
    // fontFamily:fonts.CAIROREGULARK,
    color: colors.WHITE,
    marginHorizontal: RFValue(7),
  },

  inputdecerb: {
    padding: RFValue(5),
    fontSize: RFValue(13),
    textAlign: 'center',
    color: colors.GREYD,
    // fontFamily:fonts.CAIROEXTRLIGHK,
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
    // fontFamily:fonts.CAIROREGULARK
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
});
