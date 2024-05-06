import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  TextInput,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../constants/colors';
import {useSelector} from 'react-redux';
import useEnquryLanguag from '../../functionuse/EnquryLanguag';
export default function ModulsSectionInsert(props) {
  const {rowS, flexS} = useEnquryLanguag();

  const {Language} = useSelector(state => state.userReducer);
  return (
    <Modal
      visible={props.bellmodel}
      transparent
      onRequestClose={() => props.setBellmodel(false)}
      animationType="fade"
      hardwareAccelerated={true}>
      <TouchableOpacity onPress={props.Contener} style={styles.centered_view}>
        <Pressable onPress={props.ContenerSub} style={styles.user_mod1al}>
          <View style={styles.inputuser}>
            <View style={styles.headerstatement}>
              <View style={[styles.stetment, {flexDirection: rowS()}]}>
                <Text style={styles.textuser_sub}>{Language.Manifesto}:</Text>
                <TextInput
                  style={[
                    props.falseerr && props.TasksSac.sectiontitle?.length <= 0
                      ? {
                          borderWidth: 1.5,
                          borderColor: colors.RED,
                        }
                      : {
                          borderWidth: 1,
                          borderColor: colors.YALO,
                        },
                    {width: '70%', borderRadius: RFValue(15)},
                    styles.inputtiteuser,
                  ]}
                  placeholder={
                    props.falseerr && props.TasksSac.sectiontitle?.length <= 0
                      ? Language.You_must_specify_Aname_or_number
                      : Language.Manifesto
                  }
                  placeholderTextColor={colors.BLACK}
                  value={props.TasksSac.sectiontitle}
                  onChangeText={value =>
                    props.setTasksSac({...props.TasksSac, sectiontitle: value})
                  }
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (props.TasksSac.Time?.length > 0) {
                    props.setTasksSac({...props.TasksSac, Time: ''});
                    props.setDataTiermSubfels(true);
                  } else {
                    props.setDataTiermSubfels(true);
                  }
                }}
                style={[
                  {width: '100%', alignSelf: 'center'},
                  styles.inputtiteuser,
                ]}>
                <Text style={styles.textuser}>{props.TasksSac.Time}</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.stetment, {flexDirection: rowS()}]}>
              <Text style={styles.textuser_sub}>{Language.Details}:</Text>
              <TextInput
                style={[{width: '70%'}, styles.inputtitabzrphtion]}
                multiline
                placeholder={Language.Details}
                placeholderTextColor={colors.BLACK}
                value={props.TasksSac.abzrphtion}
                onChangeText={value =>
                  props.setTasksSac({...props.TasksSac, abzrphtion: value})
                }
              />
            </View>
            <TouchableOpacity
              onPress={props.onPressAdd}
              style={styles.boutonuser}>
              <Text style={styles.textuser}>
                {props.bulidEdit === Language.add
                  ? Language.Add
                  : Language.Edit}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  textuser: {
    fontSize: RFValue(14),
    color: colors.CURRENT,
    textAlign: 'center',
  },
  inputtitabzrphtion: {
    borderWidth: 1,
    borderRadius: RFValue(10),
    height: RFValue(100),
    overflow: 'hidden',
    flexWrap: 'wrap',
    borderColor: colors.YALO,
    color: colors.CURRENT,
    padding: 5,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
  },
  textuser_sub: {
    textAlign: 'center',
    justifyContent: 'center',
    marginHorizontal: RFValue(10),
    fontSize: RFValue(14),
    color: colors.WHITE,
  },
  boutonuser: {
    margin: RFValue(5),
    backgroundColor: colors.YALO,
    width: '50%',
    padding: RFValue(5),
    borderRadius: RFValue(10),
    alignItems: 'center',
  },
  stetment: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inputtiteuser: {
    color: colors.CURRENT,
    padding: 5,
    borderRadius: RFValue(10),
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
  },
  headerstatement: {
    width: '90%',
    height: RFValue(100),
    justifyContent: 'space-around',
  },
  inputuser: {
    borderWidth: 1,
    borderRadius: RFValue(20),
    borderColor: colors.YALO,
    backgroundColor: colors.CURRENT,
    height: '90%',
    width: '90%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  user_mod1al: {
    width: RFValue(300),
    height: RFValue(350),
    backgroundColor: colors.YALO,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(20),
  },
  centered_view: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

{
  /* <Modal
  visible={bulid}
  transparent
  onRequestClose={() => setBuald(false)}
  animationType="fade"
  hardwareAccelerated={true}>
  <TouchableOpacity
    onPress={() => {
      setBuald(false);
      cansleshook();
    }}
    style={styles.centered_view}>
    <Pressable
      onPress={() => setBuald(true)}
      style={[
        abzrphtion.length <= 100
          ? {height: '50%'}
          : abzrphtion.length > 150
          ? {height: '60%'}
          : null,
        styles.dag_mod1al,
      ]}>
      <View
        style={[
          abzrphtion.length > 100
            ? {
                height: '90%',
                justifyContent: 'center',
                alignItems: 'center',
              }
            : {
                height: RFValue(350),
                marginVertical: RFValue(10),
                justifyContent: 'center',
                alignItems: 'center',
              },
          styles.modulsub,
        ]}>
        <View style={styles.continer_sub}>
          <View
            style={[
              sectiondiscreab.length > 0
                ? {flexDirection: 'row-reverse'}
                : null,
              styles.textconter,
            ]}>
            <Text numberOfLines={5} style={styles.textview}>
              {locale == 'ar_MA' ? 'البيان' : 'Statement'}: {sectiontitle}
            </Text>
            {sectiondiscreab.length <= 0 ? (
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <Text numberOfLines={3} style={styles.textview}>
                  {locale == 'ar_MA' ? 'المبلغ' : 'Amount'}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text numberOfLines={3} style={styles.textview}>
                    ر.ي{' '}
                    {SumYR.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </Text>
                  <Text numberOfLines={3} style={styles.textview}>
                    ${' '}
                    {SumDollar.toFixed(2).replace(
                      /(\d)(?=(\d{3})+(?!\d))/g,
                      '$1,',
                    )}
                  </Text>
                  <Text numberOfLines={3} style={styles.textview}>
                    ر.ي.س
                    {SumSR.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </Text>
                </View>
              </View>
            ) : (
              <Text numberOfLines={3} style={styles.textview}>
                {' '}
                {locale == 'ar_MA' ? 'المبلغ' : 'Amount'}:
                {arthDath +
                  parseInt(sectiondiscreab)
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </Text>
            )}
          </View>
          <View style={[{flexDirection: 'row-reverse'}, styles.textconter]}>
            <Text style={styles.textview}>
              {locale == 'ar_MA' ? 'الوقت' : 'Time'}: {Tiems}
            </Text>
            <Text style={styles.textview}>
              {locale == 'ar_MA' ? 'التاريخ' : 'Date'}: {Datetiemarthwrit}
            </Text>
          </View>
          <View style={styles.abzrph}>
            <Text style={styles.textview}>
              {locale == 'ar_MA' ? 'تفاصيل' : 'Details'}:
            </Text>
            <Text
              style={[
                abzrphtion.length <= 100
                  ? {display: 'flex'}
                  : {display: 'none'},
                styles.textviewabzrphtion,
              ]}>
              {abzrphtion}
            </Text>
            <ScrollView
              style={[
                abzrphtion.length > 100 ? {display: 'flex'} : {display: 'none'},
              ]}>
              <Text style={styles.textviewabzrphtion}>{abzrphtion}</Text>
            </ScrollView>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              if (caseused === 'headersub') {
                databuld
                  .find(te => te.idHOM === idSection)
                  ?.Databes.filter(ite => ite.idSub == idSectionSub)
                  .forEach(pic => {
                    setSectiontitel(pic.sectiontitle);
                    setSectiondiscreab(pic.sectionpriclabrr);
                  });
                setBualdEdit(locale == 'ar_MA' ? 'تعديل' : 'Edit');
                setAddTsksfalse(true);
              } else {
                databuld
                  .filter(ite => ite.idHOM === idSection)
                  .forEach(pic => {
                    setTittellaber(pic.sectiontitle);
                    setSumDollar(pic.SumDollar);
                    setSumSR(pic.SumِSR);
                    setSumYR(pic.SumِYR);
                    setDatabesEite(pic.Databes);
                  });
                setBellmodel(true);
                setBualdEdit(locale == 'ar_MA' ? 'تعديل' : 'Edit');
              }
              setBuald(false);
            }}
            style={styles.Edit}>
            <Text style={styles.textbodtomleprr}>
              {locale == 'ar_MA' ? 'تعديل' : 'Edit'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleting();
              setBuald(false);
            }}
            style={styles.Edit}>
            <Text style={styles.textbodtomleprr}>
              {locale == 'ar_MA' ? 'حذف' : 'delet'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  </TouchableOpacity>
</Modal>; */
}
