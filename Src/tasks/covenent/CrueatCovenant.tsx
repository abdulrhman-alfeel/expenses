import React, {useEffect, useState, useCallback} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  Text,
  FlatList,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../constants/colors';
import {useSelector, useDispatch} from 'react-redux';
import {setTasksCOVENANTID} from '../../redux/actions';
import {phonecall} from '../../component/exportfunction';
import {styles} from './styles';
import {RFValue} from 'react-native-responsive-fontsize';
import PushCashCovenant from './pushCashCovenant';
import uuid from 'react-native-uuid';
import Pdfexpense from '../../component/pdfexpense';
import ExportExcel from '../../component/ecelexport';
import ModelsAbdu from '../../component/modelsAbdu';
import usehtmlCovenat from '../../functionuse/covenat/htmlCovenat';
import {Tofixed, tost} from '../../functionuse/contractuse/expTemplet';
export default function CrueatCovenant({navigation}) {
  const {tasksCOVENANT, Language, Languagesign} = useSelector(
    state => state.userReducer,
  );
  const [iddelet, setIddelet] = useState(false);
  const dispatch = useDispatch();
  const [sumsing, setSumsing] = useState(0);
  const [sumDoler, setSumDoler] = useState(0);
  const [sumReal, setSumReal] = useState(0);
  const [sumReals, setSumReals] = useState(0);
  const [dates, setSetData] = useState(0);
  const {htmlCavenat, arraPrssAll} = usehtmlCovenat();
  let ObjectSumCash = [];
  let ObjectdolerPush = [];
  let ObjectrealsRPush = [];
  let ObjectrealPush = [];
  // let ObjectSum=[];
  let datach = 0;
  // let ObjectSum=[];
  const [bellmodel, setBellmodel] = useState(false);
  const [meneu, setMenu] = useState(false);
  const [pagSec, setPagSec] = useState('Crueat');

  useEffect(() => {
    const refrshing = navigation.addListener('focus', () => {
      setPagSec('Crueat');
      setSumReals(0);
      setSumReal(0);
      setSumDoler(0);
      setSumsing(0);
    });
    return refrshing;
  }, []);

  const data_heder = () => {
    return (
      <View style={[{backgroundColor: colors.CURRENT}, styles.item_row]}>
        <View style={styles.targ}>
          <Text style={styles.textadd}>{Language.Date}</Text>
        </View>
        <View style={styles.targ}>
          <Text style={styles.textadd}>{Language.name}</Text>
        </View>
        <View style={styles.targ}>
          <Text style={styles.textadd}>{Language.Amount}</Text>
        </View>
        <View
          style={[
            Languagesign === 'ar' ? {marginHorizontal: 2} : null,
            styles.targ,
          ]}>
          <Text style={styles.textadd}>{Language.Evacuated}</Text>
        </View>
        <View style={styles.targ}>
          <Text style={styles.textadd}>{Language.Balance}</Text>
        </View>
        <View style={styles.targ}>
          <Text style={styles.textadd}>{Language.phone}</Text>
        </View>
      </View>
    );
  };
  const data_footer = (date, onpress, Sum, doler, rial, rialS) => {
    // rial,rialS,doler,
    return (
      <View
        style={{
          backgroundColor: colors.CURRENT,
          flexDirection: 'row',
          padding: RFValue(2),
        }}>
        <View style={styles.sumsng}>
          <Text style={{flex: 1, color: colors.WHITE}}>{Language.Total}</Text>
        </View>
        <View
          style={[
            date === 1 ? {height: RFValue(50)} : {height: RFValue(30)},
            {flexDirection: 'column', flex: 1},
          ]}>
          <Pressable
            onPress={onpress}
            android_ripple={{color: colors.YALO, borderless: true}}>
            <Text style={styles.textaddBottom}>
              {parseInt(Sum)
                .toFixed(2)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </Text>
          </Pressable>
          <View
            style={[
              date === 0
                ? {display: 'none'}
                : {
                    display: 'flex',
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  },
            ]}>
            <Text style={styles.textaddfoter}>
              {Tofixed(rialS)}
              {Language.RialSudiaShort}
            </Text>
            <Text style={styles.textaddfoter}>
              {Tofixed(rial)}
              {Language.RialYemeniShort}
            </Text>
            <Text style={styles.textaddfoter}>
              {Tofixed(doler)}
              {Language.AmericandollarShort}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const onpress = () => {
    dates === 0 ? setSetData(1) : setSetData(0);
  };

  const renderItem = useCallback(
    ({item, index}) => {
      datach = parseInt(item.SumCash) - parseInt(item.DescPush);
      ObjectSumCash.push({x: parseInt(item.SumCash)});

      if (item.kindmony === Language.RialSudiaShort) {
        ObjectrealsRPush.push({x: parseInt(item.SumCash)});
      } else if (item.kindmony === Language.RialYemeniShort) {
        ObjectrealPush.push({x: parseInt(item.SumCash)});
      } else {
        ObjectdolerPush.push({x: parseInt(item.SumCash)});
      }
      const sumCash = ObjectSumCash.reduce(
        (accumulator, currentValue) => accumulator + currentValue.x,
        0,
      );
      const sumCashRE = ObjectrealPush.reduce(
        (accumulator, currentValue) => accumulator + currentValue.x,
        0,
      );
      const sumCashRES = ObjectrealsRPush.reduce(
        (accumulator, currentValue) => accumulator + currentValue.x,
        0,
      );
      const sumCashDolr = ObjectdolerPush.reduce(
        (accumulator, currentValue) => accumulator + currentValue.x,
        0,
      );
      setSumReals(sumCashRES);
      setSumReal(sumCashRE);
      setSumDoler(sumCashDolr);
      setSumsing(sumCash);
      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            dispatch(setTasksCOVENANTID(item.ID));
            // handleNotification(item, index)
            navigation.navigate('SubprodectCovenant');
          }}
          style={styles.tasksbox}>
          <View style={styles.targ}>
            <Text style={styles.textdesc}>{item.TimeDate}</Text>
          </View>
          <View style={styles.targ}>
            <Text style={styles.texttask} numberOfLines={1}>
              {item.describtion}
            </Text>
          </View>
          <View style={styles.targ}>
            <Text style={styles.texttask} numberOfLines={1}>
              {item.kindmony}
              {Tofixed(item.SumCash)}
            </Text>
          </View>
          <View style={styles.targ}>
            <Text style={styles.texttask} numberOfLines={1}>
              {item.kindmony}
              {item.DescPush.length > 0 ? Tofixed(item.DescPush) : 0}
            </Text>
          </View>
          <View style={styles.targ}>
            <Text style={styles.texttask} numberOfLines={1}>
              {item.kindmony}
              {datach > 0 ? datach : item.SumCash}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              item.phone.length > 0
                ? phonecall(item.phone)
                : tost(Language.He_has_no_mobile_number);
            }}
            style={styles.targ}>
            <FontAwesome5
              name="phone"
              size={20}
              color={
                item.caseused === Language.Have ? colors.PREMREY : colors.RED
              }
            />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    },
    [ObjectSumCash],
  );
  const pushingCash = (
    <PushCashCovenant
      iddelet={iddelet}
      setIddelet={setIddelet}
      IDEVacu={uuid.v4()}
      givinit={Language.Evacuatednew}
    />
  );
  return (
    <>
      <Modal
        visible={meneu}
        transparent
        onRequestClose={() => setMenu(false)}
        animationType="fade"
        hardwareAccelerated={true}>
        <TouchableOpacity
          onPress={() => setMenu(false)}
          style={styles.centered_menu}>
          <Pressable onPress={() => setMenu(true)} style={styles.menu_mod1al}>
            <View style={styles.menu_body}>
              {tasksCOVENANT.length > 0 ? (
                <Pdfexpense
                  onprestyle={styles.bottom_1}
                  text={styles.text_menu}
                  options={meneu ? htmlCavenat(Languagesign) : {}}
                  onpressfale={() => {
                    setMenu(false);
                  }}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    tost(Language.You_have_on_egistered_covenant);
                    setMenu(false);
                  }}
                  style={styles.bottom_1}>
                  <Text style={styles.text_menu}>
                    {Language.PDF_have_on_egistered_covenant}
                  </Text>
                </TouchableOpacity>
              )}
              {tasksCOVENANT.length > 0 ? (
                <ExportExcel
                  onprestyle={styles.bottom_1}
                  text={styles.text_menu}
                  caseuTarg={`AllCovente`}
                  options={meneu ? arraPrssAll(Languagesign) : []}
                  onpressecel={() => {
                    setMenu(false);
                  }}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    tost(Language.PDF_have_on_egistered_covenant);
                    setMenu(false);
                  }}
                  style={styles.bottom_1}>
                  <Text style={styles.text_menu}>
                    {Language.excel_Converter}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => {
                  setBellmodel(true);
                  setMenu(false);
                }}
                style={styles.bottom_1}>
                <Text style={styles.text_menu}>
                  {Language.Connect_With_support}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ModulsData');
                  setMenu(false);
                }}
                style={styles.bottom_1}>
                <Text style={styles.text_menu}>
                  {Language.Instructions_Guidelines}
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </TouchableOpacity>
      </Modal>
      <ModelsAbdu setBellmodel={setBellmodel} bellmodel={bellmodel} />
      <View style={styles.senction3}>
        <Pressable
          android_ripple={{color: colors.WHITE}}
          onPress={() => {
            setSumReals(0);
            setSumReal(0);
            setSumDoler(0);
            setSumsing(0);
            setPagSec('Crueat');
          }}
          style={[pagSec === 'Crueat' ? styles.conter : null, styles.contsec]}>
          <Text style={styles.text}>{Language.Current}</Text>
        </Pressable>
        <Pressable
          android_ripple={{color: colors.WHITE}}
          onPress={() => {
            dispatch(setTasksCOVENANTID(uuid.v4()));
            navigation.navigate('TasksCovenant');
          }}
          style={styles.buttomadd}>
          <Text style={styles.textadd}>{Language.Add}</Text>
        </Pressable>
        <Pressable
          android_ripple={{color: colors.WHITE}}
          onPress={() => {
            setSumReals(0);
            setSumReal(0);
            setSumDoler(0);
            setSumsing(0);
            setPagSec('Fanshing');
          }}
          style={[
            pagSec === 'Fanshing' ? styles.conter : null,
            styles.contsec,
          ]}>
          <Text style={styles.text}>{Language.Ended}</Text>
        </Pressable>
      </View>
      <TouchableOpacity onPress={() => setMenu(true)} style={styles.bell}>
        <FontAwesome5
          style={styles.iconmessage}
          name="grip-horizontal"
          color={colors.CURRENT}
          size={18}
        />
      </TouchableOpacity>
      {iddelet ? pushingCash : null}
      {data_heder()}

      <FlatList
        data={tasksCOVENANT.filter(item =>
          pagSec === 'Fanshing' ? item.Done === true : item.Done === false,
        )}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View
        style={[pagSec === 'Fanshing' ? {display: 'none'} : styles.buttoms]}>
        <TouchableOpacity
          style={styles.buttomsAl}
          onPress={() =>
            tasksCOVENANT.length > 0
              ? setIddelet(true)
              : tost(Language.You_have_on_egistered_covenant)
          }>
          <Text style={styles.textbot}>{Language.vacating}</Text>
        </TouchableOpacity>
      </View>

      {data_footer(dates, onpress, sumsing, sumDoler, sumReal, sumReals)}
    </>
  );
}
