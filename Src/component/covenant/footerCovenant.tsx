import {Text, StyleSheet, View} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../constants/colors';
import {useSelector} from 'react-redux';

export default function FooterCovenant(props) {
  const {Language} = useSelector(state => state.userReducer);
  return (
    <View style={styles.description}>
      <View style={styles.coustconte}>
        <View style={styles.container_sub}>
          <View style={styles.container_sub1}>
            <Text style={styles.text}>{Language.Total}</Text>
          </View>
          <View style={styles.container_sub1}>
            <Text style={styles.textbuild}>{props.SumDollarscov}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  coustconte: {
    flexDirection: 'row',
  },
  description: {
    flexDirection: 'row-reverse',
    borderColor: colors.CURRENT,
    margin: RFValue(5),
    backgroundColor: colors.CURRENT,
    borderRadius: RFValue(5),
  },
  container_sub: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  container_sub1: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  textbuild: {
    color: colors.WHITE,
    // fontFamily: fonts.CAIROREGULARK
  },
  text: {
    color: colors.WHITE,
    textAlign: 'center',
    // fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(10),
  },
});
