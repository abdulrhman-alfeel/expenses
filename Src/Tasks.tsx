import {
  View,
  ScrollView,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
  Pressable,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {colors} from './constants/colors';
import {useSelector, useDispatch} from 'react-redux';
import {setTasks} from './redux/actions';
import {RFValue} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PushNotification from 'react-native-push-notification';
import DateTimePicker from 'react-native-modal-datetime-picker';
import uuid from 'react-native-uuid';
import moment from 'moment';
// import {locale}from './Taskscsh';
import {locale} from './locale';
import {tost} from './functionuse/contractuse/expTemplet';
import useEnquryLanguag from './functionuse/EnquryLanguag';
// import uniqueId  from 'react-native-unique-id';
const options = {
  title: 'Select Image',
  maxHeight: 200,
  maxWidth: 200,
  selectionLimit: 1,
  MediaType: 'photo',
  includeBase64: false,
  //presentationStyle:fullScreen
};

export default function Tasks({navigation}): JSX.Element {
  const {tasks, tasksID, Language, Languagesign} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();
  const {rowS} = useEnquryLanguag();
  const [tittel, setTittel] = useState('');
  const [desc, setDesc] = useState('');
  const [pathimag, setPathima] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [bellmodel, setBellmodel] = useState(false);
  const [liprri, setLiprre] = useState(false);
  const [bellTem, setBelltem] = useState('');
  const [False, setFalse] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getTask();
    });
  }, []);

  const getTask = () => {
    const Task = tasks.find((task: {ID: any}): boolean => task.ID === tasksID);
    if (Task) {
      setTittel(Task.Title);
      setToggleCheckBox(Task.Done);
      setBelltem(Task.Time);
      setPathima(Task.dataimag);
    }
  };
  const onPress = () => {
    let data = [];
    if (desc.length > 0) {
      const task = {
        id: uuid.v4(),
        uri: '',
        docements: desc,
      };
      data = [...pathimag, task];
    }

    if (tittel.length === 0) {
      tost(Language.please_Write_your_task_title);
    } else {
      try {
        setFalse(true);
        var Task = {
          ID: tasksID,
          Title: tittel,
          Done: toggleCheckBox,
          Time: bellTem,
          dataimag: data.length > 0 ? data : pathimag,
        };
        const index = tasks.findIndex(
          (tasks: {ID: any}) => tasks.ID === tasksID,
        );
        let newTasks: any[] = [];
        if (index > -1) {
          newTasks = [...tasks];
          newTasks[index] = Task;
        } else {
          newTasks = [...tasks, Task];
        }
        AsyncStorage.setItem('Tasks', JSON.stringify(newTasks)).then(() => {
          dispatch(setTasks(newTasks));
          tost(Language.SavedSuccessfully);
          navigation.navigate('Home');
          setFalse(false);
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  // const deletImage = (furl, ids) => {
  //   RNFS.unlink(furl).then(() => {
  //     const index = pathimag.findIndex((tasks: {id: any}) => tasks.id === ids);
  //     console.log(ids);
  //     if (index > -1) {
  //       let newTasks = [...pathimag];
  //       newTasks[index].uri = '';
  //       setPathima(newTasks);
  //     }
  //   });
  // };

  const launch = async (i: number) => {
    let images;
    if (i === 2) {
      images = await launchImageLibrary(options);
    } else {
      images = await launchCamera(options);
    }
    if (images.assets?.length > 0) {
      console.log(images.assets[0]);
      const filePath = images.assets[0].uri;
      // setUri(filePath);

      const dataindex = [...pathimag].length + 1;
      console.log(dataindex);
      const task = {
        id: uuid.v4(),
        uri: filePath,
        docements: desc,
      };
      const data = [...pathimag, task];
      setPathima(data);
      setDesc('');
    }
  };

  const Timenotic = async (dateTime: any) => {
    const fireDate = dateTime;
    setBelltem(fireDate);
    // var c = moment.utc('2023-05-25T06:13:25.352Z').format('HH:mm');
    // var d = moment.utc('2023-05-25T06:15:25.352Z').format('HH:mm');
    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      title: tittel,
      message: desc.length > 0 ? desc : pathimag[0].docements,
      // date: new Date(new Date().getDay()+ moment().add(parseInt(bellTemhor), 'days').format() + (parseInt(bellTem)*60* 60 * 1000)),
      date: fireDate,
      allowWhileIdle: true,
    });
  };

  const dataStoring = (value, idss) => {
    const findindex = pathimag.findIndex(item => item.id === idss);
    console.log(idss);
    let datas = [];
    if (findindex > -1) {
      datas = [...pathimag];
      datas[findindex].docements = value;

      setPathima(datas);
    }
  };

  return (
    <View style={styles.body}>
      <Modal
        visible={liprri}
        transparent
        onRequestClose={() => setLiprre(false)}
        animationType="slide"
        hardwareAccelerated>
        <TouchableOpacity
          onPress={() => setLiprre(false)}
          style={styles.centered_IMag}>
          <View style={styles.mod1al}>
            <View style={styles.button}>
              <Pressable
                android_ripple={{color: colors.YALO}}
                onPress={() => {
                  launch(2);
                  setLiprre(false);
                }}
                style={styles.im}>
                <FontAwesome5 name="images" size={30} color={colors.WHITE} />
              </Pressable>
              <Pressable
                android_ripple={{color: colors.YALO}}
                onPress={() => {
                  launch(1);
                  setLiprre(false);
                }}
                style={styles.im}>
                <FontAwesome5 name="camera" size={30} color={colors.WHITE} />
              </Pressable>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <ScrollView>
        <DateTimePicker
          mode="datetime"
          isVisible={bellmodel}
          onConfirm={Timenotic}
          onCancel={() => setBellmodel(false)}
        />
        {/* clearTextOnFocus={true} */}
        <KeyboardAvoidingView>
          <TextInput
            numberOfLines={4}
            editable
            style={[
              styles.inputtitel,
              {textAlign: Languagesign === 'en' ? 'left' : 'right'},
            ]}
            underlineColorAndroid="transparent"
            placeholder={Language.subject}
            value={tittel}
            onChangeText={value => setTittel(value)}
          />
          <TouchableWithoutFeedback onPress={Keyboard.metrics}>
            <View style={styles.inputdecerb}>
              {pathimag.length > 0
                ? pathimag.map((item, index) => {
                    // console.log(item.id)
                    return (
                      <View style={styles.inputdecerbdata}>
                        {item.docements.length > 0 ? (
                          <TextInput
                            textAlign={Languagesign === 'en' ? 'left' : 'right'}
                            editable
                            underlineColorAndroid="transparent"
                            multiline
                            placeholder={Language.description}
                            id="discrip"
                            selectTextOnFocus={true}
                            value={item.docements}
                            onChangeText={value => dataStoring(value, item.id)}
                          />
                        ) : null}
                        {item.uri.length > 0 ? (
                          <>
                            <Image
                              style={styles.image}
                              source={{uri: item.uri}}
                            />
                            {/* <TouchableOpacity
   onPress={()=>deletImage(item.uri,item.id)}
   style={styles.delete}
   >
   <FontAwesome5
    name='trash'
    size={12}
    color={'#ff3636'}
    />
   </TouchableOpacity> */}
                          </>
                        ) : null}
                      </View>
                    );
                  })
                : null}
              <TextInput
                style={{
                  flex: 1,
                  color: colors.CURRENT,
                  textAlign: Languagesign === 'en' ? 'left' : 'right',
                  textAlignVertical: 'top',
                }}
                multiline
                maxLength={
                  1000000000000000000000000000000000000000000000000000000000000000000
                }
                value={desc}
                onChangeText={value => setDesc(value)}
              />
            </View>
          </TouchableWithoutFeedback>
          <View
            style={[
              styles.viewnotic,
              {flexDirection: rowS(), marginVertical: 20},
            ]}>
            <TouchableOpacity
              onPress={() => {
                setBellmodel(true);
              }}
              style={styles.notice}>
              <FontAwesome5 name={'bell'} size={20} color={colors.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setLiprre(true);
              }}
              style={styles.notice1}>
              <FontAwesome5 name="camera" size={20} color={colors.WHITE} />
            </TouchableOpacity>
            {False ? (
              <ActivityIndicator
                style={{flex: 1}}
                size={30}
                color={colors.CURRENT}
              />
            ) : (
              <Pressable
                onPress={onPress}
                android_ripple={{color: colors.WHITE}}
                style={styles.set}>
                <Text style={styles.text}>{Language.save}</Text>
              </Pressable>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },

  text: {
    textAlign: 'center',
    fontSize: RFValue(20),
    color: colors.WHITE,
    // fontFamily:fonts.CAIROREGULARK
  },
  inputtitel: {
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(10),
    paddingHorizontal: RFValue(10),
    fontSize: RFValue(16),
    height: RFValue(60),
    backgroundColor: colors.WHITE,
    borderRadius: RFValue(10),
    elevation: RFValue(1),
    color: colors.GREYD,
  },
  inputdecerb: {
    marginHorizontal: RFValue(10),
    fontSize: RFValue(12),
    marginVertical: RFValue(10),
    paddingHorizontal: RFValue(10),
    minHeight: RFValue(300),
    backgroundColor: colors.WHITE,
    borderRadius: RFValue(10),
    // elevation:RFValue(1)
  },
  inputdecerbdata: {
    fontSize: RFValue(12),
    textAlign: 'auto',
    textAlignVertical: 'top',
    borderRadius: RFValue(10),
    // elevation:RFValue(1)
  },
  inputsdeck: {
    textAlign: 'right',
    color: colors.GREYD,
  },

  viewnotic: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notice: {
    flex: 1,
    margin: RFValue(5),
    alignItems: 'center',
    height: RFValue(30),
    justifyContent: 'center',
    borderRadius: RFValue(30),
    backgroundColor: colors.CURRENT,
  },
  notice1: {
    flex: 1,
    margin: RFValue(5),
    alignItems: 'center',
    height: RFValue(30),
    justifyContent: 'center',
    borderRadius: RFValue(30),
    backgroundColor: colors.CURRENT,
  },
  set: {
    backgroundColor: colors.CURRENT,
    textAlign: 'center',
    flex: 3,
    height: RFValue(30),
    margin: RFValue(10),
    alignSelf: 'center',
    borderRadius: RFValue(20),
  },
  centered_IMag: {
    height: '100%',
    flex: 1,
    backgroundColor: '#00000002',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mod1al: {
    width: '100%',
    height: RFValue(80),
    alignItems: 'flex-end',
    backgroundColor: colors.CURRENT,
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    opacity: 0.9,
  },
  button: {
    flexDirection: 'row',
    // flex: 10,
    height: '90%',
    width: '98%',
    marginVertical: RFValue(10),
    justifyContent: 'space-around',
    alignSelf: 'center',
    borderColor: colors.YALO,
    borderWidth: RFValue(1),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    overflow: 'hidden',
  },

  im: {
    flex: 2,
    padding: RFValue(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.YALO,
    // borderRadius:RFValue(10)
  },
  textbodtom: {
    fontSize: RFValue(17),
    color: colors.WHITE,
  },
  textinpu: {
    fontSize: RFValue(17),
    color: colors.BLACK,
    padding: RFValue(15),
  },
  input: {
    width: RFValue(100),
    borderWidth: RFValue(1),
    borderRadius: RFValue(5),
    textAlign: 'center',
  },
  imag_mod1al: {
    position: 'relative',
    top: RFValue(170),
    right: RFValue(-90),
    width: RFValue(170),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:colors.WHITE,
    height: RFValue(130),
  },
  textbodtomleprr: {
    fontSize: RFValue(13),
    color: colors.WHITE,
  },
  leprr: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
    backgroundColor: colors.BLUEDARK,
    borderColor: colors.WHITE,
    borderBottomLeftRadius: RFValue(10),
    borderBottomRightRadius: RFValue(10),
    borderWidth: RFValue(1),
  },
  camer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
    backgroundColor: colors.BLUEDARK,
    borderColor: colors.WHITE,
    borderTopLeftRadius: RFValue(10),
    borderTopRightRadius: RFValue(10),

    borderWidth: RFValue(1),
  },
  imag_button: {
    margin: 10,
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    height: RFValue(0),
  },
  image: {
    width: RFValue(200),
    height: RFValue(200),
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    margin: RFValue(20),
    borderRadius: RFValue(10),
  },
  delete: {
    width: RFValue(30),
    height: RFValue(30),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: RFValue(60),
    bottom: RFValue(20),
    backgroundColor: '#ffffff80',
    margin: RFValue(10),
    borderRadius: RFValue(5),
  },
});
