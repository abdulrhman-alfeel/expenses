import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';
import {useSelector} from 'react-redux';
import Dropdown from 'react-native-input-select';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ModulsCalculator, {result} from '../modulsCalculator';
import {styles} from './styles';
import usePayment from '../../functionuse/cashbsns/payment';
import {Tofixed, tost} from '../../functionuse/contractuse/expTemplet';

function PushCash(props) {
  const {tasksCSH, Language, Languagesign} = useSelector(
    state => state.userReducer,
  );
  const Puchchshing = usePayment();
  const [objectPayment, setObjectPayment] = useState({
    nameTArg: '',
    nameConver: '',
    allConver: '',
    pushing: '',
    monyCnver: '',
    pushSum: '',
    pushSumCover: '',
  });

  ///تغيير طريقة التسديد
  const [paushset, setPaushset] = useState(Language.Receive);
  const [False, setFalse] = useState(false);
  const [calculator, setCalculator] = useState(false);
  const [calculatorCover, setCalculatorCover] = useState(false);

  useMemo(() => {
    if (props?.conver && props.givinit === Language.Edit) {
      console.log(props.conver);
      setObjectPayment({
        ...objectPayment,
        nameTArg: props.conver.caseuTarg,
        nameConver: props.conver.conver,
        pushing: props.conver.pushcash,
        pushSum: props.conver.pushcash,
        allConver: props.conver.allConver,
        monyCnver: props.conver.money_transfer,
        pushSumCover: props.conver.money_transfer,
      });
      setPaushset(props.conver.cousused);
    }
  }, [props.conver]);

  const useclurek = valu => {
    if (valu === 1) {
      setObjectPayment({...objectPayment, pushing: result});
    } else {
      setObjectPayment({...objectPayment, monyCnver: result});
    }
  };

  //  عملية تسديد الدين
  const Puchchsh = () => {
    try {
      if (
        objectPayment.pushing.length > 0 &&
        objectPayment.nameTArg.length > 0
      ) {
        const {Falsee, already} = Puchchshing(
          props.IDCSHING,
          objectPayment,
          paushset,
        );
        setFalse(Falsee);
        if (already === true) {
          props.Pushsetfalse(false);
          setPaushset(Language.Receive);
          setObjectPayment({
            nameTArg: '',
            nameConver: '',
            allConver: '',
            pushing: '',
            monyCnver: '',
            pushSum: '',
            pushSumCover: '',
          });
        }
      } else {
        tost(Language.The_required_data_must_be_completed);
        setFalse(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {calculator ? (
        <ModulsCalculator
          visble={calculator}
          onrequewt={setCalculator}
          onprssfounction={() => useclurek(1)}
        />
      ) : null}
      {calculatorCover ? (
        <ModulsCalculator
          visble={calculatorCover}
          onrequewt={setCalculatorCover}
          onprssfounction={() => useclurek(2)}
        />
      ) : null}
      <Modal
        visible={props.pushcash}
        transparent
        onRequestClose={() => props.Pushsetfalse(false)}
        animationType="fade"
        hardwareAccelerated={true}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <Pressable
            onPress={() => {
              objectPayment.nameTArg.length <= 0
                ? props.Pushsetfalse(false)
                : null;
            }}
            style={styles.centered_view}>
            <Pressable
              onPress={() => {
                props.Pushsetfalse(true);
              }}
              style={[
                objectPayment.allConver?.includes(Language.partial) &&
                paushset === Language.Receive
                  ? {height: RFValue(550)}
                  : paushset === Language.To_Push
                  ? {height: RFValue(350)}
                  : {height: RFValue(500)},
                styles.bell_mod1al,
              ]}>
              <View style={styles.bell_button}>
                <TouchableOpacity
                  onPress={() => props.Pushsetfalse(false)}
                  style={{
                    marginVertical: RFValue(10),
                    marginHorizontal: RFValue(15),
                    alignSelf: 'flex-start',
                  }}>
                  <FontAwesome5Icon
                    name="times"
                    size={20}
                    color={colors.WHITE}
                  />
                </TouchableOpacity>
                <View style={styles.puchcontener}>
                  <TouchableOpacity
                    onPress={() => setPaushset(Language.Receive)}
                    style={[
                      paushset === Language.Receive
                        ? {backgroundColor: colors.YALO}
                        : null,
                      styles.puchcontener_sub1,
                    ]}>
                    <Text style={styles.puchcontener_sub1_text}>
                      {Language.Receive}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setPaushset(Language.To_Push)}
                    style={[
                      paushset === Language.To_Push
                        ? {backgroundColor: colors.YALO}
                        : null,
                      styles.puchcontener_sub1,
                    ]}>
                    <Text style={styles.puchcontener_sub1_text}>
                      {Language.To_Push}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={[{width: '100%'}, styles.cansall]}>
                  <Text style={styles.textmos}>
                    {paushset === Language.To_Push
                      ? Language.recipient
                      : Language.motive}
                  </Text>
                  <View>
                    <Dropdown
                      labelStyle={{
                        top: 5,
                        textAlign: 'center',
                        paddingRight: -3,
                        fontSize: 12,
                        color: colors.WHITE,
                      }}
                      placeholder={
                        paushset === Language.To_Push
                          ? Language.recipient
                          : Language.motive
                      }
                      selectedItemStyle={{color: colors.RED}}
                      dropdownIconStyle={{
                        position: 'absolute',
                        right: 5,
                        top: 12,
                      }}
                      dropdownStyle={styles.taskhom}
                      dropdownContainerStyle={styles.contenar}
                      searchInputStyle={{minHeight: 20, height: 50}}
                      options={
                        paushset === Language.To_Push
                          ? tasksCSH
                              .filter(
                                (item: {caseused: string; Done: boolean}) =>
                                  item.caseused === paushset &&
                                  item.Done === false,
                              )
                              .map((pic: {caseuTarg: any}) => ({
                                name: `${pic.caseuTarg}`,
                                code: `${pic.caseuTarg}`,
                              }))
                          : tasksCSH
                              .filter(
                                (item: {caseused: string; Done: boolean}) =>
                                  item.caseused === Language.Receive &&
                                  item.Done === false,
                              )
                              .map((pic: {caseuTarg: any}) => ({
                                name: `${pic.caseuTarg}`,
                                code: `${pic.caseuTarg}`,
                              }))
                      }
                      optionLabel={'name'}
                      optionValue={'name'}
                      selectedValue={objectPayment.nameTArg}
                      onValueChange={value =>
                        setObjectPayment({...objectPayment, nameTArg: value})
                      }
                    />
                  </View>
                </View>
                <View
                  style={{
                    width: '95%',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignSelf: 'center',
                  }}>
                  <View style={styles.mossdd}>
                    <Text style={styles.textmos}>{Language.TotalDebt}</Text>
                    <View
                      style={[
                        {backgroundColor: colors.WHITE},
                        styles.inputtitelcounter,
                      ]}>
                      <Text style={styles.inputdecerb}>
                        {tasksCSH.filter(
                          (item: {caseuTarg: string}) =>
                            item.caseuTarg === objectPayment.nameTArg,
                        ).length > 0
                          ? Tofixed(
                              tasksCSH?.find(
                                (item: {caseuTarg: string}) =>
                                  item.caseuTarg === objectPayment.nameTArg,
                              ).SumCash,
                            )
                          : 0}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.mossdd}>
                    <Text style={styles.textmos}>
                      {Language.Amount_paid_so_far}:
                    </Text>
                    <View
                      style={[
                        {backgroundColor: colors.WHITE},
                        styles.inputtitelcounter,
                      ]}>
                      <Text style={styles.inputdecerb}>
                        {tasksCSH.filter(
                          (item: {caseuTarg: string}) =>
                            item.caseuTarg === objectPayment.nameTArg,
                        ).length > 0
                          ? Tofixed(
                              tasksCSH.find(
                                (item: {caseuTarg: string}) =>
                                  item.caseuTarg === objectPayment.nameTArg,
                              ).DescPush,
                            )
                          : 0}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cansall}>
                  <View style={styles.inputtitelcounterinput}>
                    <Pressable
                      android_ripple={{color: colors.YALO, borderless: true}}
                      style={{
                        width: 50,
                        position: 'absolute',
                        top: 5,
                        marginHorizontal: 10,
                        zIndex: 1,
                        left: Languagesign === 'ar' ? -30 : 10,
                      }}
                      onPress={() => setCalculator(true)}>
                      <FontAwesome5Icon
                        name="calculator"
                        size={15}
                        color={
                          Languagesign === 'ar' ? colors.YALO : colors.GREYD
                        }
                      />
                    </Pressable>
                    <TextInput
                      style={[styles.inputdecerb]}
                      keyboardType="number-pad"
                      placeholder={Language.The_amount_to_be_paid_now}
                      value={objectPayment.pushing}
                      onChangeText={value =>
                        setObjectPayment({...objectPayment, pushing: value})
                      }
                    />
                  </View>
                </View>
                <View
                  style={[
                    paushset === Language.To_Push
                      ? {display: 'none'}
                      : styles.cansall,
                  ]}>
                  <View
                    style={[{width: '90%'}, styles.inputtitelcounterconvent]}>
                    <Text style={styles.textConver}>
                      {
                        Language.If_you_want_to_transfer_it_to_someone_choose_from_the_list_of_creditors
                      }
                    </Text>
                    <View>
                      <Dropdown
                        labelStyle={{
                          top: 5,
                          textAlign: 'center',
                          paddingRight: -3,
                          fontSize: 12,
                          fontFamily: fonts.CAIROBLACK,
                          color: colors.BLACK,
                        }}
                        placeholder={Language.To_Push}
                        selectedItemStyle={{color: colors.RED}}
                        dropdownIconStyle={{
                          position: 'absolute',
                          right: 5,
                          top: 12,
                        }}
                        dropdownStyle={styles.taskhom}
                        // dropdownContainerStyle={[{ marginHorizontal: RFValue(5) }, styles.contenar]}
                        dropdownContainerStyle={styles.contenar}
                        searchInputStyle={{
                          minHeight: 20,
                          height: 50,
                        }}
                        options={tasksCSH
                          .filter(
                            (item: {caseused: string; Done: boolean}) =>
                              item.caseused === Language.To_Push &&
                              item.Done === false,
                          )
                          .map((pic: {caseuTarg: any}) => ({
                            name: `${pic.caseuTarg}`,
                            code: `${pic.caseuTarg}`,
                          }))}
                        optionLabel={'code'}
                        optionValue={'name'}
                        selectedValue={objectPayment.nameConver}
                        onValueChange={(value: React.SetStateAction<string>) =>
                          setObjectPayment({
                            ...objectPayment,
                            nameConver: value,
                          })
                        }
                        primaryColor={'green'}
                      />
                    </View>
                    <View>
                      <Dropdown
                        labelStyle={{
                          top: 5,
                          textAlign: 'center',
                          paddingRight: -3,
                          fontSize: 12,
                          fontFamily: fonts.CAIROBLACK,
                          color: colors.BLACK,
                        }}
                        placeholder={Language.Select_Conversion_type}
                        selectedItemStyle={{color: colors.RED}}
                        dropdownIconStyle={{
                          position: 'absolute',
                          right: 5,
                          top: 12,
                        }}
                        dropdownStyle={styles.taskhom}
                        dropdownContainerStyle={styles.contenar}
                        searchInputStyle={{
                          minHeight: 20,
                          height: 50,
                        }}
                        options={[
                          {
                            name: Language.partial,
                            code: Language.partial,
                          },
                          {name: Language.Total, code: Language.Total},
                        ]}
                        optionLabel={'name'}
                        optionValue={'code'}
                        selectedValue={objectPayment.allConver}
                        onValueChange={(value: React.SetStateAction<string>) =>
                          setObjectPayment({...objectPayment, allConver: value})
                        }
                        primaryColor={'green'}
                      />
                    </View>
                    <View
                      style={[
                        objectPayment.allConver?.includes(Language.partial)
                          ? {display: 'flex'}
                          : {display: 'none'},
                        styles.mossdd,
                      ]}>
                      <View style={styles.inputtitelcounterinput}>
                        <Pressable
                          android_ripple={{
                            color: colors.YALO,
                            borderless: true,
                          }}
                          style={{
                            top: -10,
                            position: 'absolute',
                            left: 10,
                            zIndex: 1,
                          }}
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
                          placeholder={Language.Amount_to_be_transferred}
                          value={objectPayment.monyCnver}
                          onChangeText={value =>
                            setObjectPayment({
                              ...objectPayment,
                              monyCnver: value,
                            })
                          }
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              {False ? (
                <ActivityIndicator color={colors.CURRENT} size={25} />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    Puchchsh();
                  }}
                  style={styles.inputtitelcounterbuton}>
                  <Text style={styles.inputdecerbuttom}>
                    {props.givinit === Language.Edit
                      ? Language.Edit
                      : Language.Payment}
                  </Text>
                </TouchableOpacity>
              )}
            </Pressable>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

export default PushCash;
// export default React.memo(PushCash)
