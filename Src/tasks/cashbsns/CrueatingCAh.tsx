import React, {useState, useEffect, useCallback} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../constants/colors';

import {useSelector, useDispatch} from 'react-redux';
import {setTasksCshID} from '../../redux/actions';

import uuid from 'react-native-uuid';
import {phonecall} from '../../component/exportfunction';
import PushCash from '../../component/cashing/dushCash';
import ModalList from '../../component/cashing/ModalList';
import {Tofixed, tost} from '../../functionuse/contractuse/expTemplet';
export default function CrueatingCAh({navigation}) {
  const {tasksCSH, Language} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [pagSec, setPagSec] = useState('CrueatingCAh');
  const [bellmodel, setBellmodel] = useState(false);
  const [meneu, setMenu] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      setPagSec('CrueatingCAh');
    });
  }, [navigation]);

  const renderItem = useCallback(({item, index}) => {
    return (
      <View key={index} style={styles.tasksbox}>
        <TouchableOpacity
          onPress={() => {
            dispatch(setTasksCshID(item.ID));
            navigation.navigate('Subprodect');
          }}
          style={styles.item_row}>
          <View style={styles.item_body}>
            <View style={styles.contenersbox}>
              <View style={styles.zersection}>
                <FontAwesome5
                  name="users"
                  size={30}
                  color={
                    item.caseused === Language.To_Push
                      ? colors.PREMREY
                      : colors.RED
                  }
                />
                <Text style={styles.texttask} numberOfLines={1}>
                  {item.caseused === Language.To_Push
                    ? Language.Creditor
                    : Language.theDebtor}
                </Text>
              </View>
              <View style={styles.onsection}>
                <Text style={styles.texttask} numberOfLines={1}>
                  {item.caseuTarg}
                </Text>
                <View style={[{width: '60%'}, styles.onsectionsub]}>
                  <Text style={styles.texttask} numberOfLines={1}>
                    {item.codm}
                  </Text>
                  <Text style={styles.texttask} numberOfLines={1}>
                    {Tofixed(item.SumCash)}
                  </Text>
                </View>
              </View>
              <View style={styles.towsection}>
                <Text style={styles.texttask} numberOfLines={1}>
                  {Language.The_amount_paid}:
                </Text>
                <View style={[{width: '60%'}, styles.targ]}>
                  <Text style={styles.texttask} numberOfLines={1}>
                    {Tofixed(item.DescPush)}
                  </Text>
                  <Text style={styles.texttask} numberOfLines={1}>
                    {item.codm}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  item.phone.length > 0
                    ? phonecall(item.phone)
                    : tost(Language.He_has_no_mobile_number);
                }}
                style={{marginHorizontal: RFValue(10)}}>
                <FontAwesome5
                  name="phone"
                  size={20}
                  color={
                    item.caseused === Language.To_Push
                      ? colors.PREMREY
                      : colors.RED
                  }
                />
              </TouchableOpacity>
            </View>
            <View style={styles.Datanew}>
              <Text style={styles.textdesc} numberOfLines={1}>
                S: {item.selectedStartDateS}
              </Text>
              <Text style={styles.textdesc} numberOfLines={1}>
                F: {item.selectedStartDateF}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }, []);

  return (
    <>
      <View style={styles.body}>
        <View style={styles.senction3}>
          <Pressable
            android_ripple={{color: colors.WHITE}}
            onPress={() => {
              setPagSec('CrueatingCAh');
            }}
            style={[
              pagSec === 'CrueatingCAh' ? styles.conter : null,
              styles.contsec,
            ]}>
            <Text style={styles.text}>{Language.Current}</Text>
          </Pressable>
          <Pressable
            android_ripple={{color: colors.YALO}}
            onPress={() => {
              dispatch(setTasksCshID(uuid.v4()));
              navigation.navigate('Taskscsh');
            }}
            style={styles.buttomadd}>
            <Text style={styles.textadd}>{Language.Add}</Text>
          </Pressable>
          <Pressable
            android_ripple={{color: colors.WHITE}}
            onPress={() => {
              setPagSec('Fanshing');
            }}
            style={[
              pagSec === 'Fanshing' ? styles.conter : null,
              styles.contsec,
            ]}>
            <Text style={styles.text}>{Language.Ended}</Text>
          </Pressable>
        </View>
        {bellmodel === true ? (
          <PushCash
            conver={{}}
            IDCSHING={uuid.v4()}
            givinit={Language.Add}
            pushcash={bellmodel}
            Pushsetfalse={setBellmodel}
          />
        ) : null}
        <Pressable
          android_ripple={{color: colors.WHITE}}
          style={styles.buttomCah}
          onPress={() => setBellmodel(true)}>
          <Text style={styles.textbot}>{Language.Payment}</Text>
        </Pressable>
        <TouchableOpacity onPress={() => setMenu(true)} style={styles.bell}>
          <FontAwesome5
            style={styles.iconmessage}
            name="grip-horizontal"
            color={colors.CURRENT}
            size={18}
          />
        </TouchableOpacity>

        <ModalList meneu={meneu} setMenu={setMenu} navigation={navigation} />

        <FlatList
          data={tasksCSH.filter(item =>
            pagSec === 'Fanshing' ? item.Done === true : item.Done === false,
          )}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  plus: {
    position: 'absolute',
    top: RFValue(20),
  },
  buttom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: RFValue(20),
    height: RFValue(50),
    borderRadius: RFValue(60),
    position: 'absolute',
    top: -10,
    // bottom:RFValue(30),
    // right:RFValue(-50),
    backgroundColor: colors.GREYD,
  },
  buttomadd: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    padding: 2,
    marginHorizontal: RFValue(10),
    borderRadius: RFValue(60),
    backgroundColor: colors.CURRENT,
  },
  tasksbox: {
    flexDirection: 'row',
    width: RFValue(320),
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(8),
    padding: RFValue(5),
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: RFValue(10),
    elevation: RFValue(1),
  },
  item_row: {
    width: RFValue(290),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  item_body: {
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'space-around',
  },
  contenersbox: {
    width: RFValue(300),
    marginVertical: RFValue(5),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    alignItems: 'center',
  },
  foders: {
    width: '95%',
    borderTopWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  foderchedk: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  textfoders: {
    color: colors.BLACK,
    fontSize: RFValue(12),
    marginTop: RFValue(10),
    // fontFamily: fonts.CAIROREGULARK,
    textAlign: 'center',
    marginHorizontal: RFValue(5),
  },
  delet: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  Datanew: {
    width: '95%',
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
  },
  texttask: {
    color: '#000000',
    fontSize: RFValue(12),
  },
  textdesc: {
    color: colors.BLACK,
    fontSize: RFValue(10),
    margin: RFValue(2),
  },
  zersection: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  onsection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onsectionsub: {
    flexDirection: 'row-reverse',
  },
  towsection: {
    flex: 1,
    // borderWidth:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  targ: {
    flexDirection: 'row',
  },
  centered_view: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered_menu: {
    flex: 1,
    justifyContent: 'flex-start',
    // backgroundColor: "#00000009"
  },
  menu_mod1al: {
    width: RFValue(150),
    backgroundColor: colors.WHITE,
    height: RFValue(200),
    borderRadius: RFValue(10),
    marginHorizontal: RFValue(10),
    marginTop: RFValue(30),
    top: RFValue(100),
    alignSelf: 'flex-start',
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
  bell: {
    // marginHorizontal: RFValue(10),
    position: 'absolute',
    alignSelf: 'flex-start',
    alignItems: 'center',
    left: -5,
    width: 35,
    height: 50,
  },
  iconmessage: {
    // width:15,
    height: 25,
    top: RFValue(10),
  },
  senction3: {
    // padding:RFValue(5),
    // paddingHorizontal:RFValue(15),
    padding: RFValue(4),
    marginHorizontal: RFValue(25),
    marginVertical: RFValue(5),
    marginBottom: RFValue(10),
    borderRadius: RFValue(5),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.YALO,
  },
  conter: {
    flex: 2,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contsec: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // fontFamily: fonts.CAIROREGULARK,
    color: colors.CURRENT,
    fontSize: RFValue(13),
  },
  textadd: {
    // fontFamily: fonts.CAIROREGULARK,
    color: colors.WHITE,
    fontSize: RFValue(13),
  },
  buttomCah: {
    justifyContent: 'center',
    alignItems: 'center',
    width: RFValue(100),
    height: RFValue(30),
    borderRadius: RFValue(30),
    right: 15,
    backgroundColor: colors.CURRENT,
  },
  textbot: {
    color: colors.WHITE,
    // fontFamily: fonts.CAIROREGULARK
  },
});
