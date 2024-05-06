import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from './constants/colors';
import {ScrollView} from 'react-native-virtualized-view';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ModelsAbdu from './component/modelsAbdu';
// import { locale } from './Taskscsh';
import {useSelector} from 'react-redux';
import useEnquryLanguag from './functionuse/EnquryLanguag';

const ModulsData = () => {
  const {Language} = useSelector(state => state.userReducer);
  const [calculator, setCalculator] = useState(false);
  const {rowS} = useEnquryLanguag();
  return (
    <View>
      {calculator ? (
        <ModelsAbdu bellmodel={calculator} setBellmodel={setCalculator} />
      ) : null}
      <View style={styles.inderction_body}>
        <Text style={styles.heder_inderction}>
          {Language.informationExplain}
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 75}}
        // contentContainerStyle={styles.body_inderch}
      >
        <Text style={styles.text_inderction}>{Language.informationText1}</Text>
        <Text style={[{marginVertical: RFValue(15)}, styles.text_inderction]}>
          {Language.informationText2}
        </Text>
        <Text style={styles.text_inderction}>{Language.informationText3}</Text>
        <Text style={styles.text_inderction}>{Language.informationText4}</Text>
        <Text style={styles.text_inderction}>{Language.informationText5}</Text>
        <Text style={styles.text_inderction}>{Language.informationText6}</Text>
        <Text style={styles.text_inderction}>{Language.informationText7}</Text>
        <Text style={[{marginVertical: RFValue(15)}, styles.text_inderction]}>
          {Language.informationText8}
        </Text>
        <Text style={styles.text_inderction}>{Language.informationText9}</Text>
        <Text style={styles.text_inderction}>{Language.informationText10}</Text>
        <Text style={styles.text_inderction}>{Language.informationText11}</Text>

        <Image
          style={{width: '100%', height: RFValue(50)}}
          source={require('./ass/countennew.png')}
          resizeMode="stretch"
        />

        <Text style={styles.text_inderction}>{Language.informationText12}</Text>
        <Image
          style={{width: '100%', height: RFValue(35), alignSelf: 'center'}}
          source={require('./ass/newCountent.png')}
          resizeMode="stretch"
        />
        <Image
          style={{
            width: '100%',
            height: RFValue(335),
            marginVertical: RFValue(5),
          }}
          source={require('./ass/AddCountent.png')}
          resizeMode="stretch"
        />
        <Text style={styles.text_inderction}>{Language.informationText13}</Text>
        <Image
          style={{width: '100%', height: RFValue(80)}}
          source={require('./ass/addnafkh.png')}
          resizeMode="stretch"
        />
        <Image
          style={{
            width: '100%',
            height: RFValue(420),
            marginVertical: RFValue(5),
          }}
          source={require('./ass/Nafkhadd.png')}
          resizeMode="stretch"
        />
        <Text style={styles.text_inderction}>{Language.informationText14}</Text>
        <Text style={styles.text_inderction}>
          {Language.informationText15}{' '}
        </Text>
        <Text style={styles.text_inderction}>{Language.informationText16}</Text>
        <Text style={styles.text_inderction}>{Language.informationText17}</Text>
        <Text style={styles.text_inderction}>
          {Language.informationText18}{' '}
        </Text>
        <Text style={styles.text_inderction}>{Language.informationText19}</Text>
        <Text style={styles.text_inderction}>{Language.informationText20}</Text>
        <Text style={styles.text_inderction}>{Language.informationText21}</Text>
        <Image
          style={{
            width: '100%',
            height: RFValue(420),
            marginVertical: RFValue(5),
          }}
          source={require('./ass/Covenent.png')}
          resizeMode="stretch"
        />
        <Text style={styles.text_inderction}>{Language.informationText22}</Text>
        <Text style={styles.text_inderction}>{Language.informationText23}</Text>
        <Text style={styles.text_inderction}>{Language.informationText24}</Text>
        <Text style={styles.text_inderction}>
          {Language.informationText25}{' '}
        </Text>
        <Text style={styles.text_inderction}>{Language.informationText26}</Text>
        <Image
          style={{
            width: '100%',
            height: RFValue(420),
            marginVertical: RFValue(10),
          }}
          source={require('./ass/givengCash.png')}
          resizeMode="stretch"
        />
        <View style={{marginBottom: RFValue(10)}}>
          <Text style={styles.text_inderction}>
            {Language.informationText27}{' '}
          </Text>
          <Text style={styles.text_inderction}>
            {Language.informationText28}{' '}
          </Text>
          <Text style={styles.text_inderction}>
            {Language.informationText29}{' '}
          </Text>
          <Text style={styles.text_inderction}>
            {Language.informationText30}{' '}
          </Text>
          <Text style={styles.text_inderction}>
            {Language.informationText31}{' '}
          </Text>
          <Text style={styles.text_inderction}>
            {Language.informationText32}
          </Text>
          <Text style={styles.text_inderction}>
            {Language.informationText33}
          </Text>
          <Text style={styles.text_inderction}>
            {Language.informationText34}{' '}
          </Text>
          <Text style={styles.text_inderction}>
            {Language.informationText35}{' '}
          </Text>
          <Text style={styles.text_inderction}>
            {Language.informationText36}
          </Text>
          <Text style={styles.text_inderction}>
            {Language.informationText37}{' '}
          </Text>

          <Text style={styles.text_inderction}>
            {Language.informationText38}{' '}
          </Text>
          <Text style={styles.text_inderction}>
            {Language.informationText39}
          </Text>
          <Image
            style={{
              width: '100%',
              height: RFValue(420),
              marginVertical: RFValue(10),
            }}
            source={require('./ass/nrgh.png')}
            resizeMode="stretch"
          />
          <View
            style={{
              flexDirection: rowS(),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.text_inderction}>
              {Language.informationText40}
            </Text>
            <Pressable
              android_ripple={{color: colors.YALO, borderless: true}}
              style={{zIndex: 1}}
              onPress={() => setCalculator(true)}>
              <FontAwesome5Icon name="phone" size={20} color={colors.GREYD} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ModulsData;

const styles = StyleSheet.create({
  centered_Abdu: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inderction_mod1al: {
    width: RFValue(300),
    backgroundColor: colors.WHITE,
    // height: RFValue(150),
    flex: 1,
    borderRadius: RFValue(10),
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(20),
    alignSelf: 'center',
  },
  inderction_body: {
    height: RFValue(50),
    borderTopLeftRadius: RFValue(10),
    borderTopRightRadius: RFValue(10),
    justifyContent: 'space-around',
    backgroundColor: colors.CURRENT,
    alignItems: 'center',
  },
  body_inderch: {
    marginHorizontal: RFValue(15),
    marginVertical: RFValue(15),
  },
  inderction_button: {
    flexDirection: 'row',
    height: RFValue(50),
  },

  text_inderction: {
    // fontFamily: fonts.CAIROREGULARK,
    color: colors.CURRENT,
    paddingHorizontal: RFValue(10),
  },
  text_inderctione: {
    // fontFamily: fonts.CAIROREGULARK,
    color: colors.CURRENT,
    fontSize: RFValue(10),
    paddingHorizontal: RFValue(10),
  },
  heder_inderction: {
    // fontFamily: fonts.CAIROREGULARK,
    color: colors.WHITE,
    fontSize: RFValue(15),
  },
});
