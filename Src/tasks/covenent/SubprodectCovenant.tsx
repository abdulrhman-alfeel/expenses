//import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState, useEffect, useCallback} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
  Pressable,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../constants/colors';
import {useSelector, useDispatch} from 'react-redux';
import {
  setTasksCOVENANT,
  setTasksCOVENANTID,
  setTasksEVACUTION,
} from '../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Haderpost from '../../component/cashing/haderpost';
import CreatCovenant from '../../component/covenant/creatCovenant';
import FooterCovenant from '../../component/covenant/footerCovenant';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import uuid from 'react-native-uuid';
import Pdfexpense from '../../component/pdfexpense';
import ExportExcel from '../../component/ecelexport';
import Moduls from '../../component/moduls';
import {phonecall} from '../../component/exportfunction';
import {locale} from '../../locale';
import usehtmlCovenat from '../../functionuse/covenat/htmlCovenat';
import {tost} from '../../functionuse/contractuse/expTemplet';

function SubprodectCovenant({navigation}) {
  const {
    tasksCOVENANT,
    tasksEVACUTION,
    tasksCOVENANTID,
    tasksCONTRAT,
    Language,
  } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [meneu, setMenu] = useState(false);
  const [bellmodel, setBellmodel] = useState(false);
  const [iddelet, setIddelet] = useState(0);
  const {htmlconvenantSub, arraPrss, findCavenat, findDonestrue} =
    usehtmlCovenat();

  const delet = id => {
    const filterDasec = tasksCOVENANT.filter(tasks => tasks.ID !== id);
    AsyncStorage.setItem('tasksCOVENANT', JSON.stringify(filterDasec))
      .then(() => {
        dispatch(setTasksCOVENANT(filterDasec));
        tost(Language.savedTheOperationSuccessfully);
        navigation.navigate('CrueatCovenant');
      })
      .catch(err => console.log(err));
  };
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
        Describtions: Language.Details_not_documented,
        //اجمالي المدفوع لهذا اليوم
        CovenantSum: finddata.SumCash,
        kindmony: finddata.kindmony,
        imagop: [],
        //المتبقي
        thremn: 0,
      };
      newTasks[index].Done = newValue;
      newTasks[index].DescPush = finddata.SumCash;
      finddata?.arrayOprition.push(Tasks);
      const convercash = [...tasksEVACUTION, Tasks];
      AsyncStorage.setItem('tasksEVACUTION', JSON.stringify(convercash)).then(
        () => {
          dispatch(setTasksEVACUTION(convercash));
          tost(Language.savedTheOperationSuccessfully);
        },
      );
      AsyncStorage.setItem('tasksCOVENANT', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTasksCOVENANT(newTasks));
          tost(Language.Moved_to_finished_task_list);
          navigation.navigate('CrueatCovenant');
        })
        .catch(ERR => {
          console.log(ERR);
        });
    }
  };

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.bottom_add}
              onPress={() => {
                setIddelet(item.ID);
                setMenu(true);
              }}>
              <FontAwesome5Icon
                name="grip-horizontal"
                size={20}
                color={colors.CURRENT}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottom_add}
              onPress={() => {
                item.phone?.length > 0
                  ? phonecall(item.phone)
                  : tost(Language.He_has_no_mobile_number);
              }}>
              <FontAwesome5Icon name="phone" size={20} color={colors.CURRENT} />
            </TouchableOpacity>
          </View>
          <View style={styles.bodyconten}>
            <View style={styles.bodycontensab}>
              <Haderpost
                caseuTarg={item.describtion}
                textmazed={Language.Edit_from_here}
                textpush={Language.the_amount_vacated_so_far}
                DescPush={
                  item.DescPush?.length > 0
                    ? item.kindmony +
                      parseInt(item.DescPush)
                        .toFixed(2)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                    : item.kindmony + 0
                }
                Datetiem={item.TimeDate}
                sum={
                  item.kindmony +
                  parseInt(item.SumCash)
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                }
                onpress={() => {
                  dispatch(setTasksCOVENANTID(item.ID));
                  navigation.navigate('TasksCovenant');
                }}
              />
            </View>
          </View>
          <View style={styles.bodycontensab2}>
            <View style={styles.creettask}>
              <CreatCovenant
                tasksCOVENANT={tasksCOVENANT}
                tasksEVACUTION={tasksEVACUTION}
                tasksCONTRAT={tasksCONTRAT}
                arrayOprition={item.arrayOprition}
                caseused={item.caseused}
                describtion={item.describtion}
              />
            </View>
            <View style={styles.footers}>
              <FooterCovenant
                SumDollarscov={
                  item.DescPush?.length > 0
                    ? item.kindmony +
                      parseInt(item.DescPush)
                        .toFixed(2)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                    : item.kindmony + 0
                }
              />
            </View>
          </View>
        </>
      );
    },
    [tasksCOVENANT, iddelet],
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
              <TouchableOpacity
                disabled={findDonestrue() === true ? true : false}
                onPress={() => {
                  checkTask(tasksCOVENANTID, true);
                  setMenu(false);
                }}
                style={styles.bottom_1}>
                <Text style={styles.text_menu}>
                  {findDonestrue() === true
                    ? Language.the_covenant_is_locked
                    : Language.Closing_the_covenant}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setBellmodel(true);
                  setMenu(false);
                }}
                style={styles.bottom_1}>
                <Text style={styles.text_menu}>{Language.Delete_covenant}</Text>
              </TouchableOpacity>
              <Pdfexpense
                onprestyle={styles.bottom_1}
                text={styles.text_menu}
                options={meneu ? htmlconvenantSub(locale) : {}}
                onpressfale={() => {
                  setMenu(false);
                }}
              />
              <ExportExcel
                onprestyle={styles.bottom_1}
                text={styles.text_menu}
                caseuTarg={findCavenat().describtion}
                options={meneu ? arraPrss(locale) : []}
                onpressecel={() => {
                  setMenu(false);
                }}
              />
            </View>
          </Pressable>
        </TouchableOpacity>
      </Modal>
      <Moduls
        setBellmodel={setBellmodel}
        bellmodel={bellmodel}
        preesyes={() => {
          delet(iddelet);
          setBellmodel(false);
        }}
      />
      <View
        style={[
          findCavenat()?.length > 0 ? {height: '100%'} : {height: '10%'},
          styles.bodyc,
        ]}>
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
  bottom_add: {
    width: RFValue(50),
    height: RFValue(50),
    alignItems: 'center',
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(20),
  },

  centered_menu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#00000009',
  },
  menu_mod1al: {
    width: RFValue(150),
    backgroundColor: colors.WHITE,
    height: RFValue(300),
    borderRadius: RFValue(10),
    marginHorizontal: RFValue(30),
    alignSelf: 'flex-start',
  },
  menu_body: {
    flex: 1,
    height: RFValue(150),
    justifyContent: 'space-around',
    alignItems: 'center',
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
    justifyContent: 'center',
  },
  text_menu: {
    // fontFamily: fonts.CAIROREGULARK,
    color: colors.CURRENT,
  },
  body: {
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bodyc: {
    width: '95%',
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
    textAlign: 'center',
  },
  bodycontensab: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.BACKGRUONDPAG,
    overflow: 'hidden',
  },
  bodycontensab2: {
    flexDirection: 'column',
    width: '95%',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.YALO,
    borderRadius: RFValue(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  footers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creettask: {
    borderRadius: RFValue(1),
    padding: RFValue(5),
  },
  bliertask: {
    borderRadius: RFValue(1),
    padding: RFValue(5),
    borderLeftWidth: 1,
    borderColor: colors.BACKGRUONDPAG,
  },
  disalltask: {
    borderRadius: RFValue(1),
    padding: RFValue(5),
    borderLeftWidth: 1,
    borderColor: colors.BACKGRUONDPAG,
  },
  arrow: {
    alignSelf: 'flex-start',
    marginHorizontal: RFValue(20),
    marginVertical: RFValue(10),
  },
  senction3: {
    padding: RFValue(5),
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.GREYD,
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
    borderRadius: RFValue(15),
  },
  textpdf: {
    color: colors.WHITE,
    // fontFamily: fonts.CAIROVARIABLEFON,
  },
});
export default SubprodectCovenant;
