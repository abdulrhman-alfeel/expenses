import {
  Text,
  StyleSheet,
  View,
  Modal,
  Pressable,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../constants/colors';
import useOnpress from '../../functionuse/contractuse/useOnpress';
import {useSelector} from 'react-redux';
export default function Haderpost(props) {
  const {Language} = useSelector(state => state.userReducer);
  const [monyMCH, setMony] = useState('');
  const [monyMCHName, setMonyName] = useState('');
  const [tittellaber, setTittellaber] = useState('');
  const [onEdit, allSav] = useOnpress();
  const [bellmodel, setBellmodel] = useState(false);

  useEffect(() => {
    if (props.many.length > 0) {
      if (props.many === Language.RialSudiaShort) {
        setMonyName(Language.Statement_in_Saudi_riyals);
        setMony(props.SumِSR);
      } else if (props.many === Language.RialYemeniShort) {
        setMonyName(Language.Statement_in_Yemeni_riyals);
        setMony(props.SumِYR);
      } else {
        setMonyName(Language.Statement_in_Us_dollars);
        setMony(props.SumDollar);
      }
    }
  }, [props.many]);

  useEffect(() => {
    setBellmodel(allSav);
  }, [allSav]);

  return (
    <View style={styles.body}>
      <Modal
        visible={bellmodel}
        transparent
        onRequestClose={() => setBellmodel(false)}
        animationType="fade"
        hardwareAccelerated={true}>
        <TouchableOpacity
          onPress={() => {
            setBellmodel(false);
          }}
          style={styles.centered_view}>
          <Pressable
            onPress={() => setBellmodel(true)}
            style={styles.user_mod1al}>
            <View style={styles.inputuser}>
              <View style={styles.headerstatement}>
                <View style={styles.stetment}>
                  <Text style={styles.textuser_sub}>{Language.Manifesto}:</Text>
                  <TextInput
                    style={[
                      tittellaber.length <= 0
                        ? {
                            borderWidth: 1.5,
                            borderColor: colors.RED,
                            borderRadius: RFValue(15),
                          }
                        : {
                            borderWidth: 1,
                            borderRadius: RFValue(15),
                            borderColor: colors.YALO,
                          },
                      {width: '70%'},
                      styles.inputtiteuser,
                    ]}
                    placeholder={
                      tittellaber.length <= 0
                        ? Language.You_must_specify_Aname_or_number
                        : Language.Manifesto
                    }
                    placeholderTextColor={colors.BLACK}
                    value={tittellaber}
                    onChangeText={value => setTittellaber(value)}
                  />
                </View>
              </View>
              {allSav ? (
                <ActivityIndicator size={25} color={colors.WHITE} />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    onEdit(tittellaber);
                  }}
                  style={styles.boutonuser}>
                  <Text style={styles.textuser}>{Language.Edit}</Text>
                </TouchableOpacity>
              )}
            </View>
          </Pressable>
        </TouchableOpacity>
      </Modal>
      <View style={styles.headrs}>
        <TouchableOpacity
          onPress={() => {
            setTittellaber(props.sectionidnfy);
            setBellmodel(true);
          }}>
          <Text style={styles.textcousnt} numberOfLines={1}>
            {' '}
            {props.sectionidnfy}
          </Text>
        </TouchableOpacity>
        <View style={styles.tiems}>
          <Text style={styles.Texts} numberOfLines={1}>
            d:{props.Datetiemarth}
          </Text>
          <Text style={styles.Texts} numberOfLines={1}>
            h:{props.tiems}
          </Text>
        </View>
      </View>
      <View style={styles.coustconte}>
        {props.many.length > 0 ? (
          <View style={[{alignItems: 'center'}, styles.container_sub]}>
            <Text style={styles.textbuild}>{monyMCHName}</Text>
            <Text style={styles.text}>
              {props.many}
              {monyMCH}
            </Text>
          </View>
        ) : (
          <View style={styles.container_sub}>
            <View style={styles.container_sub1}>
              <Text style={styles.text}>{Language.Amounts_In_dollars}</Text>
              <Text style={styles.text}>{Language.RialSudiaLong}</Text>
              <Text style={styles.text}>{Language.RialYemeniLong}</Text>
            </View>
            <View style={styles.container_sub1}>
              <Text
                style={[{width: '20%'}, styles.textbuild]}
                numberOfLines={1}>
                {props.SumDollar}
              </Text>
              <Text
                style={[{width: '20%'}, styles.textbuild]}
                numberOfLines={1}>
                {props.SumِSR}
              </Text>
              <Text
                style={[{width: '20%'}, styles.textbuild]}
                numberOfLines={1}>
                {props.SumِYR}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputtiteuser: {
    color: colors.CURRENT,
    padding: 5,
    borderRadius: RFValue(10),
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    // fontFamily: fonts.CAIROREGULARK
  },
  textuser_sub: {
    textAlign: 'center',
    justifyContent: 'center',
    marginHorizontal: RFValue(10),
    // fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(14),
    color: colors.WHITE,
  },
  stetment: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerstatement: {
    width: '90%',
    height: RFValue(100),
    justifyContent: 'space-around',
  },
  boutonuser: {
    margin: RFValue(15),
    backgroundColor: colors.YALO,
    width: '50%',
    padding: RFValue(5),
    borderRadius: RFValue(10),
    alignItems: 'center',
  },
  inputuser: {
    borderWidth: 1,
    borderRadius: RFValue(20),
    borderColor: colors.YALO,
    backgroundColor: colors.CURRENT,
    height: '90%',
    width: '90%',
    // flexDirection:'row',
    // flexWrap:'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  centered_view: {
    flex: 1,
    // backgroundColor: "#00000099",
    justifyContent: 'center',
    alignItems: 'center',
  },
  textuser: {
    // fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(14),
    color: colors.CURRENT,
    textAlign: 'center',
  },
  user_mod1al: {
    width: RFValue(300),
    height: RFValue(150),
    backgroundColor: colors.YALO,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(20),
  },
  container_sub: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
  },
  container_sub1: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: RFValue(10),
  },
  containerbuilds: {
    backgroundColor: colors.WHITE,
    // flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    elevation: RFValue(2),
    paddingVertical: RFValue(10),
    marginVertical: RFValue(5),
  },
  textbuild: {
    color: colors.CURRENT,
    fontSize: RFValue(12),
    textAlign: 'center',
    // fontFamily: fonts.CAIROREGULARK
  },
  text: {
    color: colors.BLACK,
    textAlign: 'center',
    // fontFamily: fonts.CAIROREGULARK,
    fontSize: RFValue(10),
  },
  body: {
    flexDirection: 'column',
    overflow: 'hidden',
    margin: RFValue(2),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headrs: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: RFValue(5),
    marginVertical: RFValue(5),
    padding: RFValue(5),
  },
  Texts: {
    fontSize: RFValue(11),
    color: colors.BLACK,
  },
  coust: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: RFValue(5),
    marginVertical: RFValue(5),
    padding: RFValue(2),
  },
  coustconte: {
    flexDirection: 'row',
  },
  textcousnt: {
    color: colors.BLACK,
    // fontFamily: fonts.TAJAWALEXTRABOLD,
    fontSize: RFValue(13),
  },

  ditails: {
    flex: 1,
    marginHorizontal: RFValue(5),
    padding: RFValue(5),
  },
  tiems: {
    flexDirection: 'row',
    width: RFValue(205),
    justifyContent: 'space-evenly',
  },
});
