import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../constants/colors';
import {useSelector} from 'react-redux';
import useEnquryLanguag from '../../functionuse/EnquryLanguag';

export default function Creattaskmove(props) {
  const {Language} = useSelector(state => state.userReducer);
  const [Sumall, setSumall] = useState(false);
  const {rowS} = useEnquryLanguag();

  return (
    <View key={props.keys} style={styles.bouild}>
      <TouchableOpacity onPress={props.onpress}>
        <View
          style={[
            !Sumall
              ? {
                  borderRadius: RFValue(15),
                  elevation: 1,
                  width: '95%',
                  alignSelf: 'center',
                }
              : null,
            styles.sumcreat,
            {flexDirection: rowS()},
          ]}>
          <Text style={styles.textbuild}>{props.sectionidnfy}</Text>
          <Text style={styles.textbuild}>{props.Datetiem}</Text>
          <TouchableOpacity
            onPress={() => {
              Sumall ? setSumall(false) : setSumall(true);
            }}>
            <Text style={styles.textd}>{Language.Total}</Text>
            <FontAwesome5Icon
              style={{margin: 0}}
              name="angle-down"
              size={15}
              color={colors.CURRENT}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            Sumall ? {display: 'flex'} : {display: 'none'},
            styles.container_sub,
          ]}>
          <View style={styles.header}>
            <Text style={styles.text}>{Language.Total}</Text>
          </View>
          <View style={[styles.container_sub1, {flexDirection: rowS()}]}>
            <Text style={styles.text}>{Language.Amounts_In_dollars}</Text>
            <Text style={styles.text}>{Language.RialSudiaLong}</Text>
            <Text style={styles.text}>{Language.RialYemeniLong}</Text>
          </View>
          <View style={[styles.container_sub1, {flexDirection: rowS()}]}>
            <Text style={[{width: '25%'}, styles.text]}>{props.SumDollar}</Text>
            <Text style={[{width: '25%'}, styles.text]}>{props.SumِSR}</Text>
            <Text style={[{width: '25%'}, styles.text]}>{props.SumِYR}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  sumcreat: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: RFValue(3),
    padding: RFValue(10),
    backgroundColor: colors.WHITE,
  },
  container_sub: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
  },
  container_sub1: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: colors.CURRENT,
    paddingTop: RFValue(10),
  },
  header: {
    backgroundColor: colors.CURRENT,
    width: '30%',
    position: 'absolute',
    zIndex: 999,
    top: RFValue(-10),
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
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    paddingVertical: RFValue(10),
  },
  textbuild: {
    color: colors.CURRENT,
  },
  textd: {
    color: colors.CURRENT,
    textAlign: 'center',
    fontSize: RFValue(10),
  },
  text: {
    color: colors.WHITE,
    textAlign: 'center',
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
