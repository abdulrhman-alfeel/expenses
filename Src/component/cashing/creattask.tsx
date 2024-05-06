import {Text, StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../constants/colors';
import {useSelector} from 'react-redux';
import PushCash from '../../component/cashing/dushCash';
import {Tofixed} from '../../functionuse/contractuse/expTemplet';
export default function Creattask(props) {
  const {Language, Languagesign} = useSelector(state => state.userReducer);
  const [editFalse, setEDit] = useState(false);
  const [id, setId] = useState('');
  const [givinitd, setGivinit] = useState('');
  const {tasksCSH, tasksCSHID} = useSelector(state => state.userReducer);
  const [conversi, setConver] = useState({});
  function getCashConver(ids) {
    const convers = tasksCSH
      .find((item: {ID: string | string[]}) => item.ID === tasksCSHID)
      ?.arryCahing.find(i => i.id === ids);
    //   console.log(conver)
    setConver(convers);
  }
  return (
    <View style={styles.continer}>
      {editFalse ? (
        <PushCash
          conver={conversi}
          givinit={givinitd}
          IDCSHING={id}
          pushcash={editFalse}
          Pushsetfalse={setEDit}
        />
      ) : null}
      <FlatList
        data={props.arryCahing.filter(
          i => i.IDCUST === tasksCSHID || i.idConver === tasksCSHID,
        )}
        renderItem={({item, index}) => (
          <View style={styles.description}>
            <View style={styles.indexind}>
              <Text style={{color: colors.WHITE}}>{index + 1}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setGivinit(Language.Edit);
                getCashConver(item.id);
                setId(item.id);
                setEDit(true);
              }}
              style={styles.indexindEdit}>
              <View style={styles.indexindEditV}>
                <FontAwesome5Icon name="edit" size={15} color={colors.WHITE} />
              </View>
            </TouchableOpacity>
            <View style={styles.continer}>
              <Text style={styles.textsumData}>{item.TiemPUSH}</Text>
              {item.idConver === tasksCSHID ? (
                <>
                  <View
                    style={{
                      width: '80%',
                      justifyContent: 'space-between',
                      flexDirection: 'row-reverse',
                    }}>
                    <Text style={styles.textsum}>
                      {Language.Amount_reimbursed}
                    </Text>
                    <Text style={styles.textsum}>
                      {item.codm === undefined ? null : item.codm}
                      {Tofixed(item.pushcash)}
                    </Text>
                  </View>
                  <View
                    style={[
                      item.conver === '' || item.money_transfer === 0
                        ? {display: 'none'}
                        : {display: 'flex'},
                      styles.vearticaltow,
                    ]}>
                    <Text style={styles.textsum}>
                      {Language.The_amount_has_been_transferred_from}:
                    </Text>
                    <View style={styles.continercover}>
                      <Text style={styles.textsumC}>{item?.caseuTarg}</Text>
                      <Text style={styles.textsumC}>
                        {item.codm + Tofixed(item.money_transfer)}
                      </Text>
                    </View>
                  </View>
                </>
              ) : item.idConver !== tasksCSHID ? (
                <>
                  <View
                    style={[
                      styles.vearticalone,
                      {
                        flexDirection:
                          Languagesign === 'ar' ? 'row-reverse' : 'row',
                      },
                    ]}>
                    <Text style={styles.textsum}>
                      {Language.Amount_reimbursed}
                    </Text>
                    <Text style={styles.textsum}>
                      {item.codm === undefined ? null : item.codm}
                      {Tofixed(item.pushcash)}
                    </Text>
                  </View>
                  <View
                    style={[
                      item.conver === '' || parseInt(item.money_transfer) == 0
                        ? {display: 'none'}
                        : styles.vearticaltow,
                    ]}>
                    <Text style={styles.textsum}>
                      {Language.The_amount_has_been_transferred_to}:
                    </Text>
                    <View style={styles.continercover}>
                      <Text style={styles.textsumC}>{item?.conver}</Text>
                      <Text style={styles.textsumC}>
                        {item.codm + Tofixed(item.money_transfer)}
                      </Text>
                    </View>
                  </View>
                </>
              ) : null}
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        // automaticallyAdjustKeyboardInsets={true}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  continer: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginHorizontal: RFValue(5),
    marginVertical: RFValue(5),
  },

  description: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: colors.CURRENT,
    borderWidth: 1,
    marginVertical: RFValue(5),
    borderRadius: RFValue(5),
  },
  vearticalone: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: RFValue(15),
    marginVertical: RFValue(10),
  },
  indexind: {
    justifyContent: 'center',
    backgroundColor: colors.CURRENT,
    alignItems: 'flex-end',
    padding: RFValue(5),
    borderRadius: RFValue(3),
  },
  indexindEdit: {
    position: 'absolute',
    alignItems: 'center',
    width: RFValue(30),
    height: RFValue(30),
    right: RFValue(10),
    top: RFValue(-5),
    justifyContent: 'flex-start',
    borderRadius: RFValue(3),
  },
  indexindEditV: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    width: RFValue(20),
    height: RFValue(20),
    backgroundColor: colors.CURRENT,
  },
  vearticaltow: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginHorizontal: RFValue(3),
    marginVertical: RFValue(3),
  },
  vearticaltow2: {
    flexDirection: 'column-reverse',
    marginHorizontal: RFValue(3),
    marginVertical: RFValue(3),
  },
  sumcreat: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.CURRENT,
    padding: RFValue(5),
    borderRadius: RFValue(5),
  },
  headers: {
    flex: 1,
  },
  textsum: {
    color: colors.CURRENT,
    textAlign: 'center',
    fontSize: RFValue(12),
  },
  textsumC: {
    color: colors.WHITE,
    textAlign: 'center',
    fontSize: RFValue(12),
  },
  textsumData: {
    color: colors.CURRENT,
    textAlign: 'center',
    fontSize: RFValue(9),
  },
  textD: {
    color: colors.BLACK,
    textAlign: 'center',
    fontSize: RFValue(12),
    marginVertical: RFValue(7),
  },
  continercover: {
    backgroundColor: colors.CURRENT,
    padding: RFValue(5),
    borderRadius: RFValue(5),
    marginVertical: RFValue(5),
  },
});
