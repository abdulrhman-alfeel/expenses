import {Text, StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../constants/colors';
import {useSelector} from 'react-redux';
import {Tofixed} from '../../functionuse/contractuse/expTemplet';
export default function Footer(props) {
  const {Language} = useSelector(state => state.userReducer);
  const [sumsCover, setSumCover] = useState('');
  const [sumsCode, setSumCod] = useState('');
  let objects = [];
  useEffect(() => {
    props.arryCahing.forEach(pi => {
      // console.log(pi)
      objects.push({x: parseInt(pi.money_transfer)});
      setSumCod(pi.codm);
    });
    const sumconver = objects.reduce(
      (accumulator, currentValue) => accumulator + currentValue.x,
      0,
    );
    setSumCover(sumconver);
  }, [objects]);
  return (
    <View style={styles.description}>
      <View style={styles.sumcreat}>
        <View style={styles.headers}>
          <Text style={styles.text} numberOfLines={1}>
            {Language.Total_Paid}
          </Text>
        </View>
        <View style={styles.continersum}>
          <Text numberOfLines={1} style={styles.textsum}>
            {Tofixed(props.DescPush)}
          </Text>
          <Text numberOfLines={1} style={styles.textsumcond}>
            {props.codm}
          </Text>
        </View>
      </View>
      <View style={styles.sumcreat}>
        <View style={styles.headers}>
          {props.cousused === Language.Receive ? (
            <Text style={styles.text} numberOfLines={1}>
              {Language.Total_transferred}
            </Text>
          ) : (
            <Text style={styles.text} numberOfLines={1}>
              {Language.Total_transferred_to_him2}
            </Text>
          )}
        </View>
        <View style={styles.continersum}>
          <Text numberOfLines={1} style={styles.textsum}>
            {Tofixed(sumsCover)}
          </Text>
          <Text numberOfLines={1} style={styles.textsumcond}>
            {sumsCode}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  continer: {
    width: '100%',
    flexDirection: 'column',
  },
  description: {
    flexDirection: 'row',
    borderColor: colors.CURRENT,
    margin: RFValue(5),
    backgroundColor: colors.CURRENT,
    borderRadius: RFValue(5),
  },
  vearticalone: {
    flexDirection: 'column-reverse',
    marginHorizontal: RFValue(3),
    marginVertical: RFValue(3),
  },
  vearticaltow: {
    flexDirection: 'column-reverse',
    marginHorizontal: RFValue(3),
    marginVertical: RFValue(3),
  },
  sumcreat: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: RFValue(5),
    // marginHorizontal:RFValue(5)
  },
  texthedt: {
    color: colors.BLACK,
    // fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(10),
  },
  headers: {
    justifyContent: 'center',
    alignSelf: 'center',
    // backgroundColor: colors.WHITE,
    padding: RFValue(5),
    borderBottomLeftRadius: RFValue(5),
    borderBottomRightRadius: RFValue(5),
  },
  text: {
    color: colors.WHITE,
    textAlign: 'center',
    // fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(10),
  },
  textsum: {
    color: colors.CURRENT,
    textAlign: 'center',
    // fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(11),
  },
  continersum: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    paddingHorizontal: RFValue(10),
    borderRadius: RFValue(15),
    borderWidth: 1,
    backgroundColor: colors.YALO,
  },
  textsumcond: {
    color: colors.CURRENT,
    textAlign: 'center',
    // fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(8),
  },
});
