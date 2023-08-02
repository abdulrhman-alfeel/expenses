import { Text, View,TouchableOpacity,Modal,StyleSheet,Linking ,Pressable} from 'react-native'
import React, { Component } from 'react'
import { phonecall } from './exportfunction'
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { RFValue } from "react-native-responsive-fontsize";
import {colors} from '../constants/colors'
import {fonts} from '../constants/fonts'
// import { locale } from '../Taskscsh';
import  locales,{locale}  from "../locale";
export default function ModelsAbdu (props) {

    return (
        <Modal
        visible={props.bellmodel}
        transparent
        onRequestClose={() => props.setBellmodel(false)}
        animationType="fade"
        hardwareAccelerated={true}
        >
        <TouchableOpacity onPress={() => props.setBellmodel(false)} style={styles.centered_Abdu}>
          <Pressable onPress={() => props.setBellmodel(true)} style={styles.Abdu_mod1al}>
            <View style={styles.Abdu_body}>
            <Text style={styles.text_Abdu}>{locale == 'ar_MA'?"للاستفسال وطرح المقترحات اتصل بنا":"For inquiries and suggestions, contact us"} </Text>
            <View>
            <Text style={styles.text_Abdu}>{locale == 'ar_MA'?"تنفيذ":"execution"}</Text>
            <Text style={styles.text_Abdu}>{locale == 'ar_MA'?"م/عبدالرحمن الفيل":"Abdulrhman Alfeel"}</Text>
            </View >    
              <TouchableOpacity
                onPress={() => {
                  phonecall('775227593')
                  props.setBellmodel(false)
                }} style={styles.bottom_1_Abdu}>
                <Text style={styles.text_Abdu}>{locale == 'ar_MA'?"اتصل بنا":"Contact Us"} </Text>
              </TouchableOpacity>
              <View style={{flexDirection:'row', width:'70%',overflow:'hidden'}}>
           <Pressable style={styles.bottom_f_Abdu} onPress={()=>{ Linking.openURL('https://www.facebook.com/hamyk.yayemen')}}>  
           <FontAwesome5Icon name='facebook' size={25} color={colors.CURRENT}/>
           </Pressable>
           <Pressable  style={styles.bottom_f_Abdu} onPress={()=>{ Linking.openURL('https://www.instagram.com/abdulrhman_alfeel/')}}>  
           <FontAwesome5Icon name='instagram' size={25} color={colors.CURRENT}/>
           </Pressable>
           <Pressable  style={styles.bottom_f_Abdu} onPress={()=>{ Linking.openURL('https://api.whatsapp.com/send/?phone=967718295860')}}>  
           <FontAwesome5Icon name='whatsapp' size={25} color={colors.CURRENT}/>
           </Pressable>
           
            
              </View>
            </View>
          </Pressable>
        </TouchableOpacity>
      </Modal>
    )
  
}
const styles = StyleSheet.create({

    centered_Abdu: {
      flex:1,
      justifyContent: 'center',
      backgroundColor: "#00000099"
    },
    Abdu_mod1al: {
      width: RFValue(300),
      backgroundColor: colors.WHITE,
      height: RFValue(200),
      borderRadius: RFValue(10),
      marginHorizontal: RFValue(10),
      top:RFValue(-30),
      alignSelf: 'center',
  
    },
    Abdu_body: {
      flex: 1,
      height: RFValue(150),
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    Abdu_button: {
      flexDirection: 'row',
      height: RFValue(50),
    },
    bottom_1_Abdu: {
      width: '50%',
      marginVertical: RFValue(5),
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderRadius:RFValue(15),
      backgroundColor: colors.BACKGRUONDPAG,
      alignItems: 'center',
      justifyContent: 'center'
    },
    bottom_f_Abdu: {
     flex:1,
      marginVertical: RFValue(5),
      alignItems: 'center',
      justifyContent: 'center'
    },
    text_Abdu: {
      fontFamily: fonts.CAIROREGULARK,
      color: colors.CURRENT
  
    },
  
  
   
  }
  
  )