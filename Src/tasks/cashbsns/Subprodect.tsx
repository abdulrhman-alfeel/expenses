import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../constants/colors';
import {useSelector, useDispatch} from 'react-redux';
import {
  setTasksCsh,
  setTasksCshID,
  setTasksCshConver,
} from '../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Haderpost from '../../component/cashing/haderpost';
import Creattask from '../../component/cashing/creattask';
import Footer from '../../component/cashing/footer';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import uuid from 'react-native-uuid';
import ExportExcel from '../../component/ecelexport';
import Moduls from '../../component/moduls';
import Pdfexpense from '../../component/pdfexpense';
import {phonecall} from '../../component/exportfunction';
import usehtmlCash from '../../functionuse/cashbsns/htmlCash';
import {Tofixed, tost} from '../../functionuse/contractuse/expTemplet';

export const Subprodect = ({navigation}) => {
  const {tasksCSH, tasksConver, tasksCSHID, Language, Languagesign} =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [meneu, setMenu] = useState(false);
  const [bellmodel, setBellmodel] = useState(false);
  const [iddelet, setIddelet] = useState(0);
  const [findTasks, setFindTasks] = useState({});
  const {htmlCashsub, arraPrss} = usehtmlCash();

  useEffect(() => {
    const findTasks = tasksCSH.find(pic => pic.ID === tasksCSHID);
    setFindTasks(findTasks);
  }, []);
  //excel

  const delet = id => {
    const filterDasec = tasksCSH.filter(tasks => tasks.ID !== id);
    AsyncStorage.setItem('Taskscsh', JSON.stringify(filterDasec))
      .then(() => {
        dispatch(setTasksCsh(filterDasec));
        tost(Language.savedTheOperationSuccessfully);
        navigation.goBack();
      })
      .catch(err => console.log(err));
  };
  const checkTask = (id, newValue) => {
    const index = tasksCSH.findIndex(tasks => tasks.ID === id);
    const finddata = tasksCSH.find(tasks => tasks.ID === id);
    if (index > -1) {
      let newTasks = [...tasksCSH];
      newTasks[index].Done = newValue;
      newTasks[index].DescPush = finddata.SumCash;
      var Tasks = {
        id: uuid.v4(),
        IDCUST: finddata.ID,
        SumCash: finddata.SumCash,
        pushcash: finddata.SumCash,
        pushcashSum: 0,
        TiemStart: finddata.selectedStartDateS,
        TiemPUSH: new Date(Date.now()).toUTCString(),
        idConver: 0,
        conver: null,
        money_transfer: '0',
        allConver: '',
        cousused: finddata.cousused,
      };
      const convercash = [...tasksConver, Tasks];
      AsyncStorage.setItem('Tasksconver', JSON.stringify(convercash)).then(
        () => {
          dispatch(setTasksCshConver(convercash));
          tost(Language.Successful_payment);
        },
      );
      AsyncStorage.setItem('Taskscsh', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTasksCsh(newTasks));
          tost(Language.Moved_to_finished_task_list);
          navigation.navigate('CrueatingCAh');
        })
        .catch(ERR => {
          console.log(ERR);
        });
    }
  };
  const renderItem = useCallback(
    ({item, index}) => (
      <View key={index}>
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
              item.phone.length > 0
                ? phonecall(item.phone)
                : tost(Language.He_has_no_mobile_number);
            }}>
            <FontAwesome5Icon name="phone" size={20} color={colors.CURRENT} />
          </TouchableOpacity>
        </View>
        <View style={styles.bodyconten}>
          <View style={styles.bodycontensab}>
            <Haderpost
              caseuTarg={item.caseuTarg}
              textmazed={Language.Edit_from_here}
              textpush={Language.Amount_paid_so_far}
              DescPush={item.codm + Tofixed(item.DescPush)}
              Datetiem={item.selectedStartDateS}
              sum={item.codm + Tofixed(item.SumCash)}
              onpress={() => {
                dispatch(setTasksCshID(item.ID));
                navigation.navigate('Taskscsh');
              }}
            />
          </View>
        </View>
        <View style={styles.bodycontensab2}>
          <View style={styles.creettask}>
            <Creattask arryCahing={item.arryCahing} />
          </View>
          <View style={styles.footers}>
            <Footer
              DescPush={item.DescPush}
              cousused={item.caseused}
              codm={item.codm}
              arryCahing={item.arryCahing}
            />
          </View>
        </View>
      </View>
    ),
    [tasksCSH],
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
                disabled={findTasks?.Done === true ? true : false}
                onPress={() => {
                  checkTask(tasksCSHID, true);
                  setMenu(false);
                }}
                style={styles.bottom_1}>
                <Text style={styles.text_menu}>
                  {findTasks?.Done === true
                    ? Language.Religion_closed
                    : Language.Religion_Locked}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setBellmodel(true);
                  setMenu(false);
                }}
                style={styles.bottom_1}>
                <Text style={styles.text_menu}>{Language.Delete_Religion}</Text>
              </TouchableOpacity>
              <Pdfexpense
                onprestyle={styles.bottom_1}
                text={styles.text_menu}
                options={meneu ? htmlCashsub(Languagesign) : {}}
                onpressfale={() => {
                  setMenu(false);
                }}
              />
              <ExportExcel
                onprestyle={styles.bottom_1}
                text={styles.text_menu}
                caseuTarg={findTasks?.caseuTarg}
                options={arraPrss(Languagesign)}
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
      {/* <View style={[tasksConver.find(i => i.IDCUST == tasksCSHID || i.idConver == tasksCSHID) ? { height: '100%' } : { height: '90%' }, styles.body]}> */}
      <View style={styles.bodyc}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tasksCSH.filter(item => item.ID === tasksCSHID)}
          renderItem={renderItem}
        />
      </View>
      {/* </View> */}
    </>
  );
};
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#00000009',
  },
  menu_mod1al: {
    width: RFValue(150),
    backgroundColor: colors.WHITE,
    height: RFValue(150),
    borderRadius: RFValue(10),
    marginHorizontal: RFValue(30),
    alignSelf: 'flex-start',
    top: 150,
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
    width: '100%',
    borderWidth: 1,
    borderColor: colors.YALO,
    borderRadius: RFValue(10),
    alignItems: 'center',
    justifyContent: 'space-between',
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
export default Subprodect;
