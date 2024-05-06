//import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import {colors} from '../constants/colors';
import {useSelector} from 'react-redux';
import {fonts} from '../constants/fonts';
import useEnquryLanguag from '../functionuse/EnquryLanguag';
//import ConstomBtom from "./ConstomBtom";

export default function Navbar(props) {
  const {Language} = useSelector(state => state.userReducer);
  const {rowS} = useEnquryLanguag()
  return (
    <View style={[style.navbar, {flexDirection: rowS()}]}>
      <View style={style.userdetails}>
        <View style={style.textlogoA}>
          <Text style={style.textm}>{Language.expenses}</Text>
        </View>
      </View>
      <View style={style.search}>
        <TextInput
          style={style.inputsearch}
          value={props.search}
          onChangeText={props.onChange}
        />
        <FontAwesome5 style={style.searchicon} name="search" size={10} />
      </View>
      <Pressable hitSlop={15}  onPress={props.onprsslist} style={style.bell}>
        {/* <Pdfconver/> */}
        <FontAwesome5
          style={style.iconmessage}
          name="grip-horizontal"
          color={colors.CURRENT}
          size={18}
        />
        {/* <Image
      style={style.iconmessage}
      resizeMode="stretch"
      source={require("../../assets/masseg.png")}
    /> */}
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  bell: {
    marginHorizontal: RFValue(10),
  },
  navbar: {
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
    marginVertical: RFValue(-5),
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
    // fontFamily: fonts.CAIROBLACK,
    color: colors.PINK,
    textShadowColor: colors.BLACK,
    textShadowRadius: 0.2,
  },
  textlogoB: {
    flexDirection: 'row-reverse',
    right: RFValue(-31),
    top: RFValue(-17),
    // // right: 15,
  },
  textgu: {
    fontSize: RFValue(9),
    // fontFamily: fonts.COURGETTE,
    color: colors.YALO,
    shadowColor: colors.CURRENT,
    elevation: 1,
  },
  textgut: {
    fontSize: 4,
    // fontFamily: fonts.COURGETTE,
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
    top: RFValue(10),
  },

  search: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: RFValue(8),
    width: RFValue(210),
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
    textAlign: 'center',
    width: '100%',
    height: '100%',
    paddingVertical: RFValue(4),
    // marginHorizontal: RFValue(10),
  },
  userdetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: RFValue(20),
    // marginRight: RFValue(10),
    padding: RFValue(5),
  },
  sectionone: {
    flexWrap: 'wrap-reverse',
    marginVertical: RFValue(25),
    marginBottom: RFValue(10),
  },
});

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
