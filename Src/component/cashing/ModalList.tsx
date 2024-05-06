import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import ModelsAbdu from '../modelsAbdu';
import Pdfexpense from '../pdfexpense';
import ExportExcel from '../ecelexport';
import {colors} from '../../constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {locale} from '../../locale';
import {useSelector} from 'react-redux';
import usehtmlCash from '../../functionuse/cashbsns/htmlCash';
import {tost} from '../../functionuse/contractuse/expTemplet';
export default function ModalList({meneu, setMenu, navigation}) {
  const {Language} = useSelector(state => state.userReducer);
  const {tasksCSH} = useSelector(state => state.userReducer);
  const [bellmodels, setBellmodels] = useState(false);
  const {htmlCash, arraPrssAll} = usehtmlCash();

  return (
    <>
      {bellmodels ? (
        <ModelsAbdu setBellmodel={setBellmodels} bellmodel={bellmodels} />
      ) : null}
      <Modal
        visible={meneu}
        transparent
        onRequestClose={() => setMenu(false)}
        animationType="fade"
        hardwareAccelerated={true}>
        <TouchableOpacity
          onPress={() => setMenu(false)}
          style={styles.centered_menu}>
          <Pressable onPress={() => setMenu(true)} style={styles.menu_mod1al}>
            <View style={styles.menu_body}>
              {tasksCSH.length > 0 ? (
                <Pdfexpense
                  onprestyle={styles.bottom_1}
                  text={styles.text_menu}
                  options={meneu ? htmlCash(locale) : {}}
                  onpressfale={() => {
                    setMenu(false);
                  }}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    tost(Language.You_have_no_registered_debts);
                    setMenu(false);
                  }}
                  style={styles.bottom_1}>
                  <Text style={styles.text_menu}>{Language.PDF_Converter}</Text>
                </TouchableOpacity>
              )}
              {tasksCSH.length > 0 ? (
                <ExportExcel
                  onprestyle={styles.bottom_1}
                  text={styles.text_menu}
                  caseuTarg={`Exprenss_AllCovente_${new Date().toDateString()}`}
                  options={arraPrssAll()}
                  onpressecel={() => {
                    setMenu(false);
                  }}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    tost(Language.You_have_no_registered_debts);
                    setMenu(false);
                  }}
                  style={styles.bottom_1}>
                  <Text style={styles.text_menu}>
                    {Language.excel_Converter}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => {
                  setBellmodels(true);
                  setMenu(false);
                }}
                style={styles.bottom_1}>
                <Text style={styles.text_menu}>
                  {Language.Connect_With_support}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ModulsData');
                  setMenu(false);
                }}
                style={styles.bottom_1}>
                <Text style={styles.text_menu}>
                  {Language.Instructions_Guidelines}
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  text_menu: {
    // fontFamily: fonts.CAIROREGULARK,
    color: colors.CURRENT,
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
});
