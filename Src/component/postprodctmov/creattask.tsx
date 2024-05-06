import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../constants/colors';
import {useSelector} from 'react-redux';

export default function Creattask(props) {
  const {Language} = useSelector(state => state.userReducer);
  return (
    <View style={styles.bouild}>
      <View style={styles.containerbuilds}>
        <Text numberOfLines={2} style={[{width: '28%'}, styles.textbuild]}>
          {props.sectiontitle}
        </Text>
        <Text style={[{width: '20%', alignSelf: 'center'}, styles.textbuild]}>
          {props.Time}
        </Text>
        <TouchableOpacity
          style={{width: '10%', justifyContent: 'center', alignItems: 'center'}}
          onPress={props.onpress}>
          <FontAwesome5Icon name="plus" size={15} color={colors.CURRENT} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          props.idsectionsfalse ? styles.container_sub : {display: 'none'},
        ]}>
        <View style={styles.header}>
          <Text style={styles.text}>{Language.Total}</Text>
        </View>
        <View style={styles.container_sub1}>
          <Text style={styles.text}>{Language.Amounts_In_dollars}</Text>
          <Text style={styles.text}>{Language.RialSudiaLong}</Text>
          <Text style={styles.text}>{Language.RialYemeniLong}</Text>
        </View>
        <View style={styles.container_sub1}>
          <Text style={[{width: '25%'}, styles.text]} numberOfLines={1}>
            {props.SumDollar}
          </Text>
          <Text style={[{width: '25%'}, styles.text]} numberOfLines={1}>
            {props.SumِSR}
          </Text>
          <Text style={[{width: '25%'}, styles.text]} numberOfLines={1}>
            {props.SumِYR}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container_sub: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
  },
  container_sub1: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: colors.CURRENT,
    textAlign: 'center',
    paddingTop: RFValue(10),
  },
  header: {
    backgroundColor: colors.CURRENT,
    width: '30%',
    position: 'absolute',
    zIndex: 999,
    top: RFValue(-13),
    borderRadius: RFValue(10),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: colors.YALO,
    borderWidth: 1,
  },
  containerbuilds: {
    backgroundColor: colors.WHITE,
    elevation: 2,
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',

    paddingVertical: RFValue(10),
    // marginVertical: RFValue(5)
  },
  textbuild: {
    color: colors.CURRENT,
    marginVertical: RFValue(5),
    // fontFamily: fonts.CAIROREGULARK
  },
  text: {
    color: colors.WHITE,
    textAlign: 'center',
    marginBottom: RFValue(5),
    // fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(10),
  },
  bouild: {
    width: '100%',
    marginHorizontal: RFValue(10),
    paddingVertical: RFValue(2),
    marginVertical: RFValue(2),
    flexDirection: 'column',
    alignSelf: 'center',
  },
  inputtitelbuild: {
    backgroundColor: colors.WHITE,
    borderRadius: RFValue(5),
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(10),
    paddingHorizontal: RFValue(5),
    fontSize: RFValue(16),
    height: RFValue(40),
    textAlign: 'right',
    flex: 2,
    color: colors.GREYD,
  },
  inputtitelbuildidntfy: {
    backgroundColor: colors.WHITE,
    borderRadius: RFValue(15),
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(2),
    borderWidth: 1,
    fontSize: RFValue(10),
    textAlign: 'center',
    flex: 2,
    color: colors.GREYD,
  },
});
