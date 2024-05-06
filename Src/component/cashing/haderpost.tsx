import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../constants/colors';
import {useSelector} from 'react-redux';

export default function Haderpost(props) {
  const {Language} = useSelector(state => state.userReducer);
  return (
    <View style={styles.body}>
      <View style={styles.headrs}>
        <View style={styles.user}>
          <Text style={styles.textHeder} numberOfLines={1}>
            {' '}
            {props.caseuTarg}
          </Text>
          <Text style={styles.Texts} numberOfLines={1}>
            d:{props.Datetiem}
          </Text>
        </View>
        <TouchableOpacity style={styles.ditails} onPress={props.onpress}>
          <Text style={styles.textHeder} numberOfLines={2}>
            {props.textmazed}{' '}
          </Text>
          <FontAwesome5Icon name="arrow-left" size={12} color={'#ff3636'} />
        </TouchableOpacity>
      </View>
      <View style={styles.coustconte}>
        <View style={styles.coust}>
          <View style={styles.coust_sub}>
            <Text style={styles.textcousnt} numberOfLines={1}>
              {Language.Total}
            </Text>
            <Text style={styles.textcousnt} numberOfLines={2}>
              {props.textpush}
            </Text>
          </View>
          <View style={styles.coust_sub}>
            <Text style={styles.textcousnt} numberOfLines={1}>
              {props.sum}{' '}
            </Text>
            <Text style={styles.textcousnt} numberOfLines={1}>
              {props.DescPush}{' '}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'column',
    overflow: 'hidden',
    margin: RFValue(2),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  user: {
    flex: 2,
    flexDirection: 'column',
    overflow: 'hidden',
    margin: RFValue(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headrs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: RFValue(5),
    marginVertical: RFValue(5),
    padding: RFValue(5),
  },
  Texts: {
    fontSize: RFValue(11),
    color: colors.BLACK,
    // fontFamily:fonts.CAIROREGULARK
  },
  coust: {
    flex: 2,
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.YALO,
    borderRadius: RFValue(10),
    marginHorizontal: RFValue(5),
    marginVertical: RFValue(5),
    padding: RFValue(2),
  },
  coust_sub: {
    flex: 2,
    flexDirection: 'column-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
    // marginHorizontal:RFValue(5),
    marginVertical: RFValue(5),
    padding: RFValue(2),
  },
  coustconte: {
    flexDirection: 'row',
  },
  textcousnt: {
    color: colors.CURRENT,
    // fontFamily:fonts.CAIROREGULARK,
    fontSize: RFValue(12),
  },
  textHeder: {
    color: colors.CURRENT,
    // fontFamily:fonts.CAIROREGULARK,
    fontSize: RFValue(13),
  },

  ditails: {
    flex: 1,
    marginHorizontal: RFValue(5),
    padding: RFValue(5),
  },
});
