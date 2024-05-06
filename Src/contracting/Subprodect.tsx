import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../constants/colors';
import {useSelector, useDispatch} from 'react-redux';
import {setTasksCONTRAT} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Haderpost from '../component/postprodctmov/haderpost';
import Creattask from '../component/postprodctmov/creattask';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Moduls from '../component/moduls';
import ExportExcel from '../component/ecelexport';
import Pdfexpense from '../component/pdfexpense';
import {Pressable} from 'react-native';
import CshmonvModul from '../component/postprodctmov/cshmonvModul ';
import uuid from 'react-native-uuid';
import useFindexpnses from '../functionuse/contractuse/useFindexpnses';
import {tost, Tofixed} from '../functionuse/contractuse/expTemplet';
import usehtmlContractuse from '../functionuse/contractuse/htmlContractuse';
import useEnquryLanguag from '../functionuse/EnquryLanguag';
export const Subprodect = ({navigation}) => {
  const {tasksCONTRATID, tasksCONTRAT, Language} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();
  const {Leftn, rowSexpception, rowS} = useEnquryLanguag();

  const [bellmodel, setBellmodel] = useState(false);
  const [meneu, setMenu] = useState(false);
  const [carmsu, setCarnsy] = useState('');
  const [idSection, setIdsection] = useState('');
  const [idSectionSub, setIdsectionSub] = useState('');
  //اختيار تعديل الراسل او الفرع
  const [caseused, setCase] = useState('');
  const [bulidEdit, setBualdEdit] = useState(Language.add);
  const [Addtaskfalse, setAddTsksfalse] = useState(false);
  const [bellmodelMann, setBellmodelMann] = useState(false);
  const [bulid, setBuald] = useState(false);
  const [tasks, setTask] = useState({});
  const findTaskss = useFindexpnses();
  const {htmlContractuseSub, arraPrssSub} = usehtmlContractuse();
  //pdf

  const checkTask = newValue => {
    const index = tasksCONTRAT.findIndex(tasks => tasks.ID === tasksCONTRATID);
    if (index > -1) {
      let newTasks = [...tasksCONTRAT];
      newTasks[index].Done = newValue;
      AsyncStorage.setItem('TasksCONTRAT', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTasksCONTRAT(newTasks));
          tost(Language.Moved_to_finished_task_list);
          navigation.navigate('Prodectmytrue');
        })
        .catch(ERR => {
          console.log(ERR);
        });
    }
  };
  //delet founction
  const delet = () => {
    const filterDasec = tasksCONTRAT.filter(
      tasks => tasks.ID !== tasksCONTRATID,
    );
    AsyncStorage.setItem('TasksCONTRAT', JSON.stringify(filterDasec))
      .then(() => {
        dispatch(setTasksCONTRAT(filterDasec));
        tost(Language.savedTheOperationSuccessfully);
        navigation.goBack();
      })
      .catch(err => console.log(err));
  };
  let filtercars =
    carmsu.length > 0 ? i => i.arthDath === carmsu : i => i.idHOM === idSection;
  const renderItem = useCallback(
    ({item, index}) => (
      <View key={index} style={styles.bodyc}>
        <TouchableOpacity
          style={[carmsu.length > 0 ? styles.allsum : {display: 'none'}]}
          onPress={() => {
            setCarnsy('');
          }}>
          <Text style={styles.text}>{Language.List_in_all_currencies}</Text>
        </TouchableOpacity>
        <View style={styles.bodyconten}>
          <View style={styles.bodycontensab}>
            <View
              style={{justifyContent: 'space-between', flexDirection: rowS()}}>
              <TouchableOpacity
                style={styles.bottom_add}
                onPress={() => {
                  setCase('header');
                  setTask(item);
                  setIdsection(uuid.v4());
                  setBualdEdit(Language.add);
                  setBellmodelMann(true);
                }}>
                <FontAwesome5Icon
                  name="plus"
                  size={20}
                  color={colors.CURRENT}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bottom_add}
                onPress={() => {
                  setTask(item);
                  setMenu(true);
                }}>
                <FontAwesome5Icon
                  name="grip-horizontal"
                  size={20}
                  color={colors.CURRENT}
                />
              </TouchableOpacity>
            </View>
            <Haderpost
              sectionidnfy={item.sectionidnfy}
              many={carmsu}
              SumDollar={Tofixed(item.SumDollar)}
              SumِSR={Tofixed(item.SumِSR)}
              SumِYR={Tofixed(item.SumِYR)}
              tiems={item.Timeminet}
              Datetiemarth={item.Datetiem}
            />
          </View>
          <View style={styles.bodycontensab2}>
            {item?.databuld.map((ite, index) => (
              <View key={index} style={styles.bouild}>
                <TouchableOpacity
                  onLongPress={() => {
                    setCase('header');
                    setIdsection(ite.idHOM);
                    setTask(item);
                    setBuald(true);
                  }}
                  onPress={() => {
                    setIdsection(ite.idHOM);
                    console.log(ite.idHOM);
                    console.log(ite);
                  }}>
                  <Creattask
                    onpress={() => {
                      setIdsection(ite.idHOM);
                      setIdsectionSub(uuid.v4());
                      setTask(item);
                      setAddTsksfalse(true);
                    }}
                    sectiontitle={ite.sectiontitle}
                    Time={ite.Time}
                    idsectionsfalse={
                      ite?.Databes.filter(filtercars)?.length > 0 ? true : false
                    }
                    SumDollar={Tofixed(ite.SumDollar)}
                    SumِSR={Tofixed(ite.SumِSR)}
                    SumِYR={Tofixed(ite.SumِYR)}
                  />
                </TouchableOpacity>
                <View
                  style={[
                    ite?.Databes.filter(filtercars).length > 0
                      ? styles.containerbuilds_sub_heder
                      : {display: 'none'},
                    {flexDirection: rowS()},
                  ]}>
                  <Text style={[{width: '30%'}, styles.textbuild_sub_heder]}>
                    {Language.Manifesto}
                  </Text>
                  <Text style={[{width: '30%'}, styles.textbuild_sub_heder]}>
                    {Language.Time}
                  </Text>
                  <Text style={[{width: '30%'}, styles.textbuild_sub_heder]}>
                    {Language.Amount}
                  </Text>
                  <Text style={[{width: '30%'}, styles.textbuild_sub_heder]}>
                    {Language.Note}
                  </Text>
                </View>
                <View>
                  {ite?.Databes.filter(filtercars).map((pic, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setCase('headersub');
                        setIdsection(ite.idHOM);
                        setIdsectionSub(pic.idSub);
                        setTask(item);
                        setBuald(true);
                      }}
                      style={[
                        styles.containerbuilds_sub,
                        {flexDirection: rowS()},
                      ]}>
                      <Text
                        numberOfLines={2}
                        style={[{width: '30%'}, styles.textbuild_sub]}>
                        {pic.sectiontitle}
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={[{width: '30%'}, styles.textbuild_sub]}>
                        {pic.TimeSub}
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={[{width: '30%'}, styles.textbuild_sub]}>
                        {pic.arthDath} {Tofixed(pic.sectionpriclabrr)}
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={[{width: '30%'}, styles.textbuild_sub]}>
                        {pic.abzrphtion}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    ),
    [idSectionSub, idSection, carmsu],
  );
  return (
    <>
      {Addtaskfalse || bulid || bellmodelMann ? (
        <CshmonvModul
          Task={tasks}
          setBualdEdit={setBualdEdit}
          bulidEdit={bulidEdit}
          caseused={caseused}
          idSectionSub={idSectionSub}
          idsection={idSection}
          bellmodel={bellmodelMann}
          setBellmodel={setBellmodelMann}
          setBuald={setBuald}
          bulid={bulid}
          Addtaskfalse={Addtaskfalse}
          setAddTsksfalse={setAddTsksfalse}
        />
      ) : null}
      <Moduls
        setBellmodel={setBellmodel}
        bellmodel={bellmodel}
        preesyes={() => {
          delet();
          setBellmodel(false);
        }}
      />
      <Modal
        visible={meneu}
        transparent
        onRequestClose={() => setMenu(false)}
        animationType="none"
        hardwareAccelerated={true}>
        <TouchableOpacity
          onPress={() => setMenu(false)}
          style={styles.centered_menu}>
          <Pressable
            onPress={() => setMenu(true)}
            style={[styles.menu_mod1al, {alignSelf: Leftn()}]}>
            <View style={styles.menu_body}>
              <TouchableOpacity
                onPress={() => {
                  setCarnsy(Language.RialSudiaShort);
                  setMenu(false);
                }}
                style={styles.bottom_1}>
                <Text style={styles.text_menu}>
                  {Language.Statement_in_Saudi_riyals}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setCarnsy(Language.RialYemeniLong);
                  setMenu(false);
                }}
                style={styles.bottom_1}>
                <Text style={styles.text_menu}>
                  {Language.Statement_in_Saudi_riyals}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setMenu(false);
                  setCarnsy(Language.AmericandollarLong);
                }}
                style={styles.bottom_1}>
                <Text style={styles.text_menu}>
                  {Language.Statement_in_Us_dollars}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={findTaskss?.Done === true ? true : false}
                onPress={() => {
                  checkTask(true);
                  setMenu(false);
                }}
                style={styles.bottom_1}>
                <Text style={styles.text_menu}>
                  {findTaskss?.Done === true
                    ? Language.Account_closed
                    : Language.Account_locked}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setBellmodel(true);
                  setMenu(false);
                }}
                style={styles.bottom_1}>
                <Text style={styles.text_menu}>{Language.Account_delete}</Text>
              </TouchableOpacity>
              <Pdfexpense
                onprestyle={styles.bottom_1}
                text={styles.text_menu}
                options={meneu ? htmlContractuseSub(carmsu) : {}}
                onpressfale={() => {
                  setMenu(false);
                }}
              />
              <ExportExcel
                onprestyle={styles.bottom_1}
                text={styles.text_menu}
                caseuTarg={findTaskss?.sectionidnfy}
                options={meneu ? arraPrssSub() : {}}
                onpressecel={() => {
                  setMenu(false);
                }}
              />
            </View>
          </Pressable>
        </TouchableOpacity>
      </Modal>
      <View style={styles.body}>
        <FlatList
          data={tasksCONTRAT.filter(item => item.ID === tasksCONTRATID)}
          renderItem={renderItem}
        />
      </View>
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
  allsum: {
    borderWidth: 1,
    width: '40%',
    alignSelf: 'center',
    position: 'absolute',
    top: RFValue(20),
    zIndex: 999,
    borderRadius: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center',
    padding: RFValue(5),
    backgroundColor: colors.CURRENT,
  },
  containerbuilds_sub: {
    backgroundColor: colors.GREY,
    // flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: RFValue(2),
    padding: RFValue(5),
    marginVertical: RFValue(5),
  },
  textbuild_sub: {
    color: colors.CURRENT,
    // fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(10),
    textAlign: 'center',
    marginBottom: RFValue(10),
  },
  textbuild_sub_heder: {
    color: colors.CURRENT,
    // fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(13),
    textAlign: 'center',
  },

  body: {
    height: '100%',
  },
  bodyc: {
    width: '100%',
    // marginVertical: RFValue(30),
    marginBottom: RFValue(100),
    justifyContent: 'center',
    alignSelf: 'center',
    // backgroundColor: colors.WHITE,
    // elevation: RFValue(2),
    // overflow:'hidden'
  },
  bodyconten: {
    flexDirection: 'column',
    // padding: RFValue(3),
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  bodycontensab: {
    flex: 2,
    width: '100%',
    backgroundColor: colors.WHITE,
    overflow: 'hidden',
  },
  bodycontensab2: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  text: {
    color: colors.WHITE,
    // fontFamily: fonts.CAIROREGULARK
  },
  textinpu: {
    fontSize: RFValue(17),
    color: colors.BLACK,
    padding: RFValue(15),
  },
  containerbuilds_sub_heder: {
    backgroundColor: colors.ORANGE,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: RFValue(5),
    paddingHorizontal: RFValue(10),
    // marginVertical: RFValue(5),
    marginTop: RFValue(-5),
  },
  buttom: {
    backgroundColor: colors.YALO,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '40%',
    padding: RFValue(5),
    borderRadius: RFValue(30),
  },
  textbuttom: {
    color: colors.CURRENT,
    textAlign: 'center',
    // fontFamily: fonts.CAIROREGULARK
  },
  //menu moduls
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
    marginHorizontal: RFValue(10),
    top: RFValue(-80),
  },
  menu_body: {
    flex: 1,
    height: RFValue(150),
    justifyContent: 'space-around',
    alignItems: 'center',
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
});

export default Subprodect;
