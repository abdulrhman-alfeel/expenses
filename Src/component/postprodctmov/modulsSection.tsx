import {
  Modal,
  TouchableOpacity,
  Pressable,
  FlatList,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import React, {useCallback} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';
import {useSelector} from 'react-redux';
import {Tofixed} from '../../functionuse/contractuse/expTemplet';

export default function ModulsSection(props) {
  const {Language} = useSelector(state => state.userReducer);
  const renderItem = useCallback(
    ({item}) => (
      <View style={[styles.modulsub]}>
        <View style={styles.continer_sub}>
          <View
            style={[
              item.sectionpriclabrr ? {flexDirection: 'row-reverse'} : null,
              styles.textconter,
            ]}>
            <Text numberOfLines={5} style={styles.textview}>
              {Language.Manifesto}: {item.sectiontitle}
            </Text>
            {!item.sectionpriclabrr ? (
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text numberOfLines={3} style={styles.textview}>
                  {Language.Amount}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    numberOfLines={3}
                    style={[
                      item.SumِYR <= 0 ? {display: 'none'} : styles.textview,
                    ]}>
                    {Language.RialYemeniShort}
                    {Tofixed(item.SumِYR)}
                  </Text>
                  <Text
                    numberOfLines={3}
                    style={[
                      item.SumDollar <= 0 ? {display: 'none'} : styles.textview,
                    ]}>
                    {Language.AmericandollarShort}
                    {Tofixed(item.SumDollar)}
                  </Text>
                  <Text
                    numberOfLines={3}
                    style={[
                      item.SumِSR > 0 ? {display: 'none'} : styles.textview,
                    ]}>
                    {Language.RialSudiaShort}
                    {Tofixed(item.SumِSR)}
                  </Text>
                </View>
              </View>
            ) : (
              <Text numberOfLines={3} style={styles.textview}>
                {Language.Amount}:{item.arthDath + item.sectionpriclabrr}
              </Text>
            )}
          </View>

          <View style={[{flexDirection: 'row'}, styles.textconter]}>
            <Text style={styles.textview}>
              {Language.Time} : {item.Timeminet}
            </Text>
            <Text style={styles.textview}>
              {Language.Date} :
              {item.Time?.length > 0 ? item.Time : item.TimeSub}
            </Text>
          </View>

          <View style={styles.abzrph}>
            <Text style={styles.textview}>{Language.Details}:</Text>
            <Text style={styles.textviewabzrphtion}>{item.abzrphtion}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              if (props.caseused === 'headersub') {
                props.setTasks(item);
              } else {
                props.setTasksSac(item);
              }
              props.onPressEdit();
            }}
            style={styles.Edit}>
            <Text style={styles.textbodtomleprr}>{Language.Edit} </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onPressDelet} style={styles.Edit}>
            <Text style={styles.textbodtomleprr}>{Language.Delete}</Text>
          </TouchableOpacity>
        </View>
      </View>
    ),
    [],
  );
  return (
    <Modal
      visible={props.bulid}
      transparent
      onRequestClose={() => props.setBuald(false)}
      animationType="fade"
      hardwareAccelerated={true}>
      <TouchableOpacity
        onPress={() => {
          props.setBuald(false);
          // cansleshook();
        }}
        style={styles.centered_view}>
        <Pressable
          onPress={() => props.setBuald(true)}
          style={styles.dag_mod1al}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={props.caseusedt}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </Pressable>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centered_view: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textbodtomleprr: {
    fontSize: RFValue(13),
    color: colors.CURRENT,
    fontFamily: fonts.CAIROREGULARK,
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
  footer: {
    flex: 0.3,
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textviewabzrphtion: {
    color: colors.WHITE,
    fontFamily: fonts.CAIROREGULARK,
    padding: RFValue(5),
    fontSize: RFValue(12),
  },
  //خاس بتفاصيل الفرع
  dag_mod1al: {
    marginVertical: RFValue(20),
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: colors.YALO,
    borderRadius: RFValue(10),
  },
  textview: {
    color: colors.WHITE,
    fontFamily: fonts.CAIROREGULARK,
    padding: RFValue(5),
    marginHorizontal: RFValue(5),
    fontSize: RFValue(12),
    overflow: 'hidden',
  },
  abzrph: {
    alignItems: 'center',
  },
  textconter: {
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  continer_sub: {
    flex: 2,
    overflow: 'hidden',
    padding: RFValue(5),
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    marginBottom: 15,
    justifyContent: 'center',
  },
  modulsub: {
    backgroundColor: colors.CURRENT,
    width: '97%',
    // height:'95%',
    marginVertical: RFValue(15),
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: RFValue(10),
  },
});
