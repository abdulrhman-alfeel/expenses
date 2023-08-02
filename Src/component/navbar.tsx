//import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect  } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  View,
  ToastAndroid,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  Keyboard,
  Modal,
  TextInput

} from "react-native"
import { RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from 'react-native-virtualized-view';

import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";
//import ConstomBtom from "./ConstomBtom";
import { useSelector, useDispatch } from "react-redux"
import { setTasks, setTasksID, setTasksCshID, setTasksCONTRAT, setTasksCONTRATID } from '../redux/actions'
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from "@react-native-community/checkbox";
import PushNotification from "react-native-push-notification";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import uuid from 'react-native-uuid';




export default function Navbar(props) {
  const { tasks, tasksID, tasksCONTRAT } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [bellmodel, setBellmodel] = useState(false);

  // console.log(props.search.toString())



  const [iddelet, setIddelet] = useState();
  const [age, setAge] = useState('');
  // const myElement = findNodeById('my-element');
  return (
    <View style={style.navbar}>
      <View style={style.userdetails}>
        <View style={style.textlogoA}>
          <Text style={style.textm}>نفقـExpnseاتي</Text>
        </View>
       
      </View>
      <View style={style.search}>
        <TextInput style={style.inputsearch} value={props.search}  onChangeText={props.onChange} />
        <FontAwesome5 style={style.searchicon} name="search" size={10} />
      </View>
      <TouchableOpacity onPress={props.onprsslist} style={style.bell}>
        {/* <Pdfconver/> */}
        <FontAwesome5 style={style.iconmessage} name="grip-horizontal" color={colors.CURRENT} size={18} />
        {/* <Image
      style={style.iconmessage}
      resizeMode="stretch"
      source={require("../../assets/masseg.png")}
    /> */}
      </TouchableOpacity>

    </View>

  );
}



const style = StyleSheet.create({
  bell: {
    marginHorizontal: RFValue(10)
  },
  navbar: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    // padding:RFValue(10),
    height: RFValue(50),
    marginBottom: RFValue(15),
    // borderWidth:1
    // marginHorizontal:RFValue(10)
  },

  textlogoA: {
    flexDirection: "row",
    marginVertical: RFValue(-5)

  },
  textm: {
    fontSize: 20,
    fontFamily: fonts.CAIROBLACK,
    color: colors.BLACK,
    textShadowColor: colors.BORDER,
    textShadowRadius: 0.2,
  },

  textg: {
    fontSize: 20,
    fontFamily: fonts.CAIROBLACK,
    color: colors.PINK,
    textShadowColor: colors.BLACK,
    textShadowRadius: 0.2,
  },
  textlogoB: {
    flexDirection: "row-reverse",
    right: RFValue(-31),
    top: RFValue(-17)
    // // right: 15,


  },
  textgu: {
    fontSize: RFValue(9),
    fontFamily: fonts.COURGETTE,
    color: colors.YALO,
    shadowColor: colors.CURRENT,
    elevation: 1
  },
  textgut: {
    fontSize: 4,
    fontFamily: fonts.COURGETTE,
    top: 5,
  },

  noticuser: {
    // flex: 0.5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // margin: RFValue(20),
    flexDirection: 'row-reverse',
  },
  iconmessage: {
    // width:15,
    height: 25,
    top: RFValue(10)


  },

  search: {

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: RFValue(8),
    width: RFValue(180),
    height: RFValue(30),
    borderWidth: 0.2,
    borderColor: colors.CURRENT,
    borderRadius: RFValue(4),
    backgroundColor: colors.ORANGE,

  },
  searchicon: {
    position: 'absolute',
    left: RFValue(10),
    // top: RFValue(10)
  },
  inputsearch: {
    textAlign: "center",
    width: '100%',
    height: '100%',
    paddingVertical: RFValue(4)
    // marginHorizontal: RFValue(10),
  },
  userdetails: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'space-between',
    alignItems: "center",
    marginTop: RFValue(20),
    // marginRight: RFValue(10),
    padding: RFValue(5),
  },
  sectionone: {
    flexWrap: 'wrap-reverse',
    marginVertical: RFValue(25),
    marginBottom: RFValue(10),
  },

}

)

















/*
 
 
 
 
 
 
<Text>welcome {name}</Text>
     <Text>AGE {age}</Text>
     <TextInput
     style={style.input}
     onChangeText={(value)=>setName(value)}
     placeholder='Enter'
     value={name}
     />
     <TextInput
     style={style.input}
     onChangeText={(value)=>setAge(value)}
     placeholder='Enter'
     value={age}
     />
     <ConstomBtom 
     title="updut"
     color='#f0f'
     onpress={uputfuncbtom}/>
     <ConstomBtom 
     title="remove"
     color='#555'
     onpress={remofuncbtom}/>
*/