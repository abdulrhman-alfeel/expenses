import {StyleSheet} from "react-native"
import { colors } from "../constants/colors"
import { fonts } from "../constants/fonts"
import { RFValue } from "react-native-responsive-fontsize"
export const styles = StyleSheet.create({
  sumsng:{  
    justifyContent: "center",
    alignItems: 'center',
    width: RFValue(100),
    height: RFValue(30),
    alignSelf:'center'
},
textaddBottom:{
  // fontFamily:fonts.CAIROREGULARK,
  color: colors.CURRENT,
  fontSize:RFValue(15),
  textAlign:'center',
  textShadowColor:colors.WHITE,
  textShadowRadius:0.5
},
textaddfoter:{
  // fontFamily:fonts.CAIROREGULARK,
  color: colors.CURRENT,
  fontSize:RFValue(9),
  textAlign:'center',
},
    senction3:{
  padding:RFValue(5),
  borderWidth:1,
  flexDirection:'row',
  justifyContent:'space-around',
  backgroundColor:colors.CURRENT
  },
  conter:{
      borderBottomWidth: 3,
      borderBottomColor: colors.WHITE,
      borderRadius: 2,
  },
  text:{
    color:colors.WHITE,
  },
    body: {
      flex: 1,
      height:'100%'
      //borderWidth:RFValue(10),
    },
    plus: {
      position: 'absolute',
      top: RFValue(20)
    },
    buttom: { 
      justifyContent: "flex-end",
      alignItems: 'center',
      width: RFValue(20),
      height: RFValue(50),
      borderRadius: RFValue(60),
      position:'absolute',
      top:-10,
      // bottom:RFValue(30),
      // right:RFValue(-50),
      backgroundColor: colors.GREYD
    },
    tasksbox: {
      flexDirection: 'row',
      width:RFValue(290),
      marginHorizontal: RFValue(10),
      marginVertical: RFValue(8),
      padding: RFValue(1),
      backgroundColor: colors.WHITE,
      justifyContent: "center",
      alignItems: 'center',
      alignSelf:'center',
      borderRadius: RFValue(10),
      elevation: RFValue(1)
    },
    item_row: {
      width: RFValue(250),
      justifyContent:'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    checkTask: {
      position: 'relative',
      marginHorizontal: RFValue(5),
      justifyContent: "flex-end",
      alignItems: 'center',
      width: RFValue(60),
      height: RFValue(60),
      borderRadius: RFValue(60),
      bottom: RFValue(30),
      right: RFValue(-50),
  
      borderColor: colors.BLACK
    },
    item_body: {
      flex: 1
    },
    delet: {
      width: RFValue(50),
      height: RFValue(50),
      justifyContent: 'center',
      alignItems: 'center'
  
    },
    texttask: {
      color: '#000000',
      fontSize: RFValue(16),
      margin: RFValue(2),
  
    },
    textdesc: {
      color: '#999999',
      fontSize: RFValue(12),
      margin: RFValue(2),
  
    },
  
    centered_view:{
      flex:1,
      backgroundColor:"#00000099",
      justifyContent:'center',
      alignItems:'center'
    },
    bell_mod1al:{
      width:RFValue(300),
      backgroundColor:colors.WHITE,
      height:RFValue(150),
      borderRadius:RFValue(20)
    },
    bell_body:{
    flex:1,
    height:RFValue(150),
    justifyContent:'center',
    alignItems:'center' 
    },
    bell_button:{
    flexDirection:'row',
    height:RFValue(50),
    },
    ok:{
    width:'50%',
      justifyContent:"center",
      alignItems:'center',
      borderBottomRightRadius:RFValue(20),
      backgroundColor:colors.BLUEDARK,
      borderColor:colors.WHITE,
      borderWidth:RFValue(1)
    },
    cansall:{
      backgroundColor:colors.BLUEDARK,
      width:'50%',
      justifyContent:"center",
      alignItems:'center',
      borderBottomLeftRadius:RFValue(20),
      borderColor:colors.WHITE,
      borderWidth:RFValue(1)
    },
    textbodtom:{
      fontSize:RFValue(17),
      color:colors.WHITE,
    },
    textinpu:{
      fontSize:RFValue(17),
      color:colors.BLACK,
      padding:RFValue(15)
    },
    bodyc: {
      width: "95%",
      marginHorizontal: RFValue(10),
      marginVertical: RFValue(10),
      justifyContent:'center',
      alignSelf:'center',
      backgroundColor:colors.WHITE,
      borderRadius:RFValue(5),
      elevation:RFValue(2),
      overflow:'hidden'
    },
    bodyconten: {
      flexDirection: 'column',
      padding: RFValue(3),
      justifyContent: 'center',
      alignItems: 'center',
      textAlign:'center'
    },
    bodycontensab: {
      flex: 2,
      width:'100%',
      borderWidth:1,
      borderColor:colors.BACKGRUONDPAG,
      overflow:'hidden'
    },
    bodycontensab2: {
      flex: 3,
      flexDirection: 'row',
      justifyContent:'space-between',
      height:RFValue(130),
      overflow:'hidden'
    },
    footers: {
      flex:2,
      flexDirection: 'row',
      justifyContent:'space-between',
      width:'100%'
    },
    creettask:{
      flex:1,
      borderRadius:RFValue(1),
      padding:RFValue(5),
    
    },
    bliertask:{
      flex:1,
      borderRadius:RFValue(1),
      padding:RFValue(5),
      borderLeftWidth:1,
      borderColor:colors.BACKGRUONDPAG
    },
    disalltask:{
       flex:1,
      borderRadius:RFValue(1),
      padding:RFValue(5),
      borderLeftWidth:1,
      borderColor:colors.BACKGRUONDPAG
    } }
  )
  