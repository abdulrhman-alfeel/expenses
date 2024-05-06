import React, {useState, useCallback, useMemo} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../constants/colors';
import {useSelector} from 'react-redux';
import Dropdown from 'react-native-input-select';
import uuid from 'react-native-uuid';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {styles} from '../../component/cashing/styles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import ModulsView from '../../component/modulsView';
import ModulsCalculator, {result} from '../../component/modulsCalculator';
import useEVacuationsing from '../../functionuse/covenat/evacution';
import {tost} from '../../functionuse/contractuse/expTemplet';

function PushCashCovenant(props) {
  const {tasksCOVENANT, tasksEVACUTION, tasksCONTRAT, Language, Languagesign} =
    useSelector(state => state.userReducer);

  const [calculator, setCalculator] = useState(false);

  const [ObjectCovenant, setCovenant] = useState({
    nameTArg: '',
    descrbtion: '',
    pushing: '',
    Proveid: '',
    imagop: [],
    constrltl: '',
    paushset: Language.Have,
  });
  const [idnotnul, setIdnotnull] = useState(0);
  const [False, setFalse] = useState(false);
  const [bellmodel, setBellmodel] = useState(false);
  //عرض الصور
  const [ImageView, setImagView] = useState('');
  const [ImageViewFalse, setImagViewfalse] = useState(false);
  const Evacuationsing = useEVacuationsing();

  useMemo(() => {
    const index = tasksEVACUTION.find(
      (item: {id: string | string[]}) => item.id === props.IDEVacu,
    );
    if (index) {
      const find = tasksCOVENANT.find(
        (item: {ID: string | string[]}) => item.ID === index.IDCUST.toString(),
      );
      setCovenant({
        ...ObjectCovenant,
        nameTArg: find?.describtion,
        descrbtion: index.Describtions,
        pushing: index.Covenantday,
        Proveid: index.Covenantday,
        imagop: index.imagop,
        paushset: index.caseused,
      });
    }
  }, []);
  const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 4,
      mediaType: 'photo',
      includeBase64: false,
    },
  };
  const useclurek = () => {
    setCovenant({...ObjectCovenant, pushing: result});
  };

  const Emptying = () => {
    props.setIddelet(false);
    setCovenant({
      nameTArg: '',
      descrbtion: '',
      pushing: '',
      Proveid: '',
      imagop: [],
      constrltl: '',
      paushset: Language.Have,
    });
    setFalse(false);
  };
  const deletImagestorg = namimaguriprov1 => {
    RNFS.unlink(namimaguriprov1).then((err, success) => {
      console.log(err);
      if (err) throw err;
      if (success) {
        tost(Language.saved_the_Delet_successfully);
      }
    });

    const imagedit = ObjectCovenant.imagop.find(
      task => task.idimgpost == idnotnul,
    );
    ObjectCovenant.imagop.splice(imagedit, 1);
    // setImagOpg(imagedit);
  };
  const onPresuser = async lebrar => {
    const filterimag = ObjectCovenant.imagop.find(
      task => task.idimgpost === idnotnul,
    );
    const imagedit = ObjectCovenant.imagop.findIndex(
      task => task.idimgpost === idnotnul,
    );
    let result;
    if (lebrar === 1) {
      result = await launchCamera(options);
    } else {
      result = await launchImageLibrary(options);
    }
    if (result.assets?.length > 0) {
      if (filterimag) {
        console.log(JSON.stringify(ObjectCovenant.imagop));
        const image = {
          idimgpost: idnotnul,
          image: result.assets[0].uri,
          fileName: filterimag.fileName,
          type: result.assets[0].type,
        };
        let imagedata = [];
        imagedata = [...ObjectCovenant.imagop];
        imagedata[imagedit] = image;
        setCovenant({...ObjectCovenant, imagop: imagedata});
        setIdnotnull(0);
      } else {
        console.log(result.assets[0]);
        const imagedata = [...ObjectCovenant.imagop];
        const index = imagedata.length + 1;
        const image = {
          idimgpost: index,
          image: result.assets[0].uri,
          fileName: result.assets[0].fileName,
          type: result.assets[0].type,
        };
        imagedata.push(image);
        setCovenant({...ObjectCovenant, imagop: imagedata});
        console.log(JSON.stringify(image));
      }
    }
  };

  const evacuation = () => {
    if (
      (ObjectCovenant.pushing.length > 0 &&
        ObjectCovenant.nameTArg.length > 0) ||
      (ObjectCovenant.constrltl.length > 0 &&
        ObjectCovenant.nameTArg.length > 0)
    ) {
      const virfy = Evacuationsing(props.IDEVacu, ObjectCovenant);
      if (!virfy) return Emptying();
    } else {
      tost(Language.The_required_data_must_be_completed);
    }
  };

  const listimags = [
    require('../../ass/ICONPHOTO.png'),
    require('../../ass/ICONPHOTO.png'),
  ];
  const renderItem = useCallback(
    (item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setIdnotnull(item.idimgpost);
        }}>
        <View style={styles.Imaghom}>
          <TouchableHighlight
            onPress={() => {
              setImagView(item.image);
              setImagViewfalse(true);
            }}
            style={styles.Imaghomid}>
            <Image
              resizeMode="stretch"
              style={[
                !item.image
                  ? {width: RFValue(30), height: RFValue(30)}
                  : styles.imag,
              ]}
              source={{uri: item.image, cache: 'force-cache'}}
            />
          </TouchableHighlight>
          <TouchableOpacity
            onPress={() => {
              deletImagestorg(item.image);
              setIdnotnull(item.idimgpost);
            }}
            style={{
              backgroundColor: colors.WHITE,
              borderRadius: RFValue(10),
              width: RFValue(18),
              height: RFValue(18),
              position: 'absolute',
              justifyContent: 'flex-end',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}>
            <FontAwesome5 name="trash" size={15} color={'#ff3636'} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ),
    [ObjectCovenant.imagop],
  );
  const onptions = useCallback(
    tasksCOVENANT
      .filter(
        (item: {caseused: string; Done: boolean}) =>
          item.caseused === ObjectCovenant.paushset && item.Done === false,
      )
      .map((pic: {describtion: any}) => ({
        name: `${pic.describtion}`,
        code: `${pic.describtion}`,
      })),
    [ObjectCovenant.paushset],
  );
  const constrcutl = useCallback(
    tasksCONTRAT.map((pic: {describtion: any}) => ({
      name: `${pic.sectionidnfy}`,
      code: `${pic.ID}`,
    })),
    [ObjectCovenant.paushset],
  );
  return (
    <>
      {calculator ? (
        <ModulsCalculator
          visble={calculator}
          onrequewt={setCalculator}
          onprssfounction={() => useclurek()}
        />
      ) : null}
      <ModulsView
        visble={ImageViewFalse}
        onrequewt={setImagViewfalse}
        uri={ImageView}
      />
      <Modal
        visible={bellmodel}
        transparent
        onRequestClose={() => setBellmodel(false)}
        animationType="fade"
        hardwareAccelerated={true}>
        <TouchableOpacity
          onPress={() => setBellmodel(false)}
          style={styles.centered_IMag}>
          <View style={styles.mod1al}>
            <View style={styles.button}>
              <Pressable
                android_ripple={{color: colors.YALO}}
                onPress={() => {
                  onPresuser(2);
                  setBellmodel(false);
                }}
                style={styles.im}>
                <FontAwesome5 name="images" size={30} color={colors.WHITE} />
              </Pressable>
              <Pressable
                android_ripple={{color: colors.YALO}}
                onPress={() => {
                  onPresuser(1);
                  setBellmodel(false);
                }}
                style={styles.im}>
                <FontAwesome5 name="camera" size={30} color={colors.WHITE} />
              </Pressable>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        visible={props.iddelet}
        transparent
        onRequestClose={() => props.setIddelet(false)}
        animationType="fade"
        hardwareAccelerated={true}>
        <Pressable
          onPress={() => {
            ObjectCovenant.nameTArg.length <= 0
              ? props.setIddelet(false)
              : null;
          }}
          style={styles.centered_view}>
          <Pressable
            onPress={() => props.setIddelet(true)}
            style={[{height: RFValue(500)}, styles.bell_mod1al]}>
            <View style={styles.bell_body}>
              <Text style={styles.textinpu}>
                {Language.please_enter_evacuation_information}
              </Text>
            </View>
            <View style={styles.bell_button}>
              <ScrollView>
                <TouchableOpacity
                  onPress={() => {
                    Emptying();
                    props.setIddelet(false);
                  }}
                  style={{
                    marginVertical: RFValue(10),
                    marginHorizontal: RFValue(15),
                    alignSelf: 'flex-start',
                  }}>
                  <FontAwesome5Icon
                    name="times"
                    size={20}
                    color={colors.WHITE}
                  />
                </TouchableOpacity>
                <View style={styles.puchcontener}>
                  <TouchableOpacity
                    onPress={() =>
                      setCovenant({
                        ...ObjectCovenant,
                        paushset: Language.Have,
                      })
                    }
                    style={[
                      ObjectCovenant.paushset === Language.Have
                        ? {backgroundColor: colors.YALO}
                        : null,
                      styles.puchcontener_sub1,
                    ]}>
                    <Text
                      style={[
                        Languagesign === 'ar'
                          ? {fontSize: RFValue(10)}
                          : {fontSize: RFValue(12)},
                        styles.puchcontener_sub1_text,
                      ]}>
                      {Language.Evacuated_to}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      setCovenant({
                        ...ObjectCovenant,
                        paushset: Language.Has,
                      })
                    }
                    style={[
                      ObjectCovenant.paushset === Language.Has
                        ? {backgroundColor: colors.YALO}
                        : null,
                      styles.puchcontener_sub1,
                    ]}>
                    <Text
                      style={[
                        Languagesign === 'ar'
                          ? {fontSize: RFValue(10)}
                          : {fontSize: RFValue(12)},
                        styles.puchcontener_sub1_text,
                      ]}>
                      {Language.Evacuated_from}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.cansall}>
                  <View style={styles.inputtitelcounter}>
                    <Dropdown
                      labelStyle={{
                        top: 5,
                        textAlign: 'center',
                        paddingRight: -3,
                        fontSize: 12,
                        color: colors.WHITE,
                      }}
                      placeholder={
                        ObjectCovenant.paushset === Language.Has
                          ? Language.The_evacuator
                          : Language.Eviction_recipient
                      }
                      selectedItemStyle={{color: colors.RED}}
                      dropdownIconStyle={{
                        position: 'absolute',
                        right: 5,
                        top: 12,
                      }}
                      dropdownStyle={styles.taskhom}
                      dropdownContainerStyle={styles.contenar}
                      searchInputStyle={{
                        minHeight: 20,
                        height: 50,
                      }}
                      options={onptions}
                      optionLabel={'code'}
                      optionValue={'name'}
                      selectedValue={ObjectCovenant.nameTArg}
                      onValueChange={value =>
                        setCovenant({...ObjectCovenant, nameTArg: value})
                      }
                      primaryColor={'green'}
                    />
                  </View>
                </View>
                <View
                  style={{
                    width: '95%',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignSelf: 'center',
                  }}>
                  <View style={styles.mossdd}>
                    <Text style={styles.textmos}>{Language.Total}</Text>
                    <View
                      style={[
                        {backgroundColor: colors.WHITE},
                        styles.inputtitelcounter,
                      ]}>
                      <Text style={styles.inputdecerb}>
                        {tasksCOVENANT.find(
                          (item: {describtion: string}) =>
                            item.describtion === ObjectCovenant.nameTArg,
                        ).length > 0
                          ? tasksCOVENANT?.find(
                              (item: {describtion: string}) =>
                                item.describtion === ObjectCovenant.nameTArg,
                            ).SumCash
                          : 0}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.mossdd}>
                    <Text style={styles.textmos}>
                      {Language.The_amount_evacuated}
                    </Text>
                    <View
                      style={[
                        {backgroundColor: colors.WHITE},
                        styles.inputtitelcounter,
                      ]}>
                      <Text style={styles.inputdecerb}>
                        {tasksCOVENANT.find(
                          (item: {describtion: string}) =>
                            item.describtion === ObjectCovenant.nameTArg,
                        )?.DescPush.length > 0
                          ? tasksCOVENANT.find(
                              (item: {describtion: string}) =>
                                item.describtion === ObjectCovenant.nameTArg,
                            )?.DescPush
                          : 0}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.mossdd}>
                  <View style={styles.inputtitelcounter}>
                    <Dropdown
                      labelStyle={{
                        top: 5,
                        textAlign: 'center',
                        paddingRight: -3,
                        fontSize: 12,
                        color: colors.BLACK,
                      }}
                      placeholder={
                        Language.Select_an_expense_account_if_you_want_to_transfer_it
                      }
                      selectedItemStyle={{color: colors.RED}}
                      dropdownIconStyle={{
                        position: 'absolute',
                        right: 5,
                        top: 12,
                      }}
                      dropdownStyle={styles.taskhom}
                      dropdownContainerStyle={styles.contenar}
                      searchInputStyle={{
                        minHeight: 20,
                        height: 50,
                      }}
                      options={constrcutl}
                      optionLabel={'name'}
                      optionValue={'name'}
                      selectedValue={ObjectCovenant.constrltl}
                      onValueChange={(value: React.SetStateAction<string>) =>
                        setCovenant({...ObjectCovenant, constrltl: value})
                      }
                      primaryColor={'green'}
                    />
                  </View>
                  <View
                    style={
                      ObjectCovenant.constrltl.length > 0
                        ? {display: 'none'}
                        : {display: 'flex', marginBottom: 10}
                    }>
                    <View style={styles.inputtitelcounterinput}>
                      <Pressable
                        android_ripple={{color: colors.YALO, borderless: true}}
                        style={{top: 10, left: 18, zIndex: 1}}
                        onPress={() => setCalculator(true)}>
                        <FontAwesome5Icon
                          name="calculator"
                          size={15}
                          color={colors.GREYD}
                        />
                      </Pressable>
                      <TextInput
                        style={styles.inputdecerb}
                        keyboardType="number-pad"
                        placeholder={
                          Language.The_amount_that_will_be_vacated_now
                        }
                        value={ObjectCovenant.pushing}
                        onChangeText={value =>
                          setCovenant({...ObjectCovenant, pushing: value})
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.inputtitelcounterinput}>
                    <TextInput
                      style={styles.inputDiscripb}
                      multiline
                      placeholderTextColor={colors.CURRENT}
                      placeholder={Language.Evacuation_details}
                      value={ObjectCovenant.descrbtion}
                      onChangeText={value =>
                        setCovenant({...ObjectCovenant, descrbtion: value})
                      }
                    />
                  </View>
                  {ObjectCovenant.imagop.length >= 1 ? (
                    <View style={styles.sactionImag}>
                      {ObjectCovenant.imagop.map(renderItem)}
                      <TouchableOpacity
                        onPress={() => {
                          setIdnotnull(uuid.v4);
                          setBellmodel(true);
                        }}>
                        <View style={styles.Imaghom}>
                          <View style={styles.Imaghomid}>
                            <Image
                              resizeMode="stretch"
                              style={{width: RFValue(30), height: RFValue(30)}}
                              source={require('../../ass/ICONPHOTO.png')}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.sactionImag}>
                      {listimags.map((img, index) => (
                        <View key={index}>
                          <TouchableOpacity
                            onPress={() => {
                              setIdnotnull(uuid.v4);
                              setBellmodel(true);
                            }}>
                            <View style={styles.Imaghom}>
                              <View style={styles.Imaghomid}>
                                <Image
                                  resizeMode="stretch"
                                  style={{
                                    width: RFValue(30),
                                    height: RFValue(30),
                                  }}
                                  source={img}
                                />
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </ScrollView>
            </View>
            {False ? (
              <ActivityIndicator color={colors.WHITE} size={20} />
            ) : (
              <Pressable
                android_ripple={{color: colors.WHITE, borderless: true}}
                onPress={evacuation}
                style={[
                  {width: RFValue(150), top: -10, alignSelf: 'center'},
                  styles.inputtitelcounterbuton,
                ]}>
                <Text style={styles.inputdecerbuttom}>
                  {props.givinit === Language.Edit
                    ? Language.Edit
                    : Language.vacating}
                </Text>
              </Pressable>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

export default PushCashCovenant;
