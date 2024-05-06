import {StyleSheet} from "react-native"
import { colors } from "../../constants/colors"
import { fonts } from "../../constants/fonts"
import { RFValue } from "react-native-responsive-fontsize"
export const styles = StyleSheet.create({
    bodyAl: {
    // flex: 2,transparent
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginVertical: RFValue(25),
    marginHorizontal: RFValue(25),
    backgroundColor: 'transparent'
    //borderWidth:RFValue(10),
  },
  buttomsAl: {
    justifyContent: "center",
    alignItems: 'center',
    width: RFValue(60),
    height: RFValue(60),
    borderRadius: RFValue(50),
    backgroundColor: '#00000059',
    // opacity:0.5
  },
    body: {
      // flex: 2,
      alignSelf: 'flex-end',
      alignItems: 'flex-end',
      //borderWidth:RFValue(10),
    },
    textuser: {
      // fontFamily: fonts.CAIROREGULARK,
      fontSize: RFValue(14),
      color: colors.CURRENT,
      textAlign: 'center'
    },
    inputtiteuser: {
      color: colors.CURRENT,
      padding: RFValue(5),
      borderRadius:RFValue(10),
      marginVertical:RFValue(10),
      textAlign: 'center',
      justifyContent: 'center',
      backgroundColor: colors.WHITE,
      // fontFamily: fonts.CAIROREGULARK
    },
    buttom: {
      justifyContent: "center",
      alignItems: 'center',
      width: RFValue(100),
      height: RFValue(30),
      borderRadius: RFValue(30),
      left: 15,
      backgroundColor: colors.CURRENT
    },
    textbot: {
      color: colors.WHITE,
      // fontFamily: fonts.CAIROREGULARK
    },
    tasksbox: {
      flexDirection: 'row',
      width: RFValue(320),
      marginHorizontal: RFValue(10),
      marginVertical: RFValue(8),
      padding: RFValue(1),
      backgroundColor: colors.WHITE,
      justifyContent: "center",
      alignItems: 'center',
      alignSelf: 'center',
      overflow: 'hidden',
      borderRadius: RFValue(10),
      elevation: RFValue(1)
    },
    centered_view: {
      height: '100%',
      flex: 1,
      backgroundColor: "#00000039",
      justifyContent: 'center',
      alignItems: 'center'
    },
    bell_mod1al: {
      width: RFValue(320),
      height: RFValue(500),
  
      backgroundColor: colors.YALO,
      borderRadius: RFValue(20),
    },
    bell_body: {
      // flex: 0.8,
      // height:RFValue(150),
      justifyContent: 'center',
      alignItems: 'center'
    },
    bell_button: {
      flexDirection: "column",
      // flex: 10,
      height: '85%',
      width: '95%',
      paddingVertical: RFValue(10),
      marginVertical:RFValue(10),
      justifyContent: 'space-around',
      alignSelf: 'center',
      borderColor: colors.WHITE,
      borderWidth: RFValue(1),
      borderRadius: RFValue(15),
      backgroundColor: colors.CURRENT,
      overflow: 'hidden'
    },
    mossdd: {
      flexDirection: 'column',
      justifyContent: "space-around",
      alignItems: 'center',
      flex:1
    },
    textmos: {
      fontSize: RFValue(13),
      color: colors.WHITE,
      // fontFamily: fonts.TAJAWALREGULAR,
      // marginHorizontal:RFValue(15),
      alignItems: 'center',
      justifyContent: 'center',
    },
    textmerr: {
      fontSize: RFValue(10),
      color: colors.RED,
      // fontFamily: fonts.CAIROREGULARK,
      // marginHorizontal:RFValue(15),
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.WHITE,
      textAlign: 'center',
      borderRadius: RFValue(5)
    },
    inputtitelcounter: {
      marginHorizontal: RFValue(10),
      marginVertical: RFValue(10),
      height: RFValue(25),
      borderRadius: RFValue(10),
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
    },
    inputtitelcounterinput: {
      backgroundColor: colors.WHITE,
      marginHorizontal: RFValue(10),
      marginVertical: RFValue(10),
      borderRadius: RFValue(10),
      flexDirection: 'row-reverse',
    },
    inputdecerb: {
      fontSize: RFValue(12),
      textAlign: 'center',
      height:RFValue(30),
      padding:RFValue(5),
      color: colors.CURRENT,
      flex: 1
    },
    inputtitelcounterbuton: {
      backgroundColor: colors.CURRENT,
      marginHorizontal: RFValue(10),
      marginVertical: RFValue(10),
      borderRadius: RFValue(10),
      padding: RFValue(3),
      flexDirection: 'row-reverse',
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputdecerbuttom: {
      fontSize: RFValue(14),
      textAlign: 'center',
      // fontFamily: fonts.TAJAWALEXTRABOLD,
      color: colors.YALO,
      flex: 0.5
    },
    ok: {
      flexDirection: 'row-reverse',
      justifyContent: "space-around",
      alignItems: 'center',
      marginHorizontal: RFValue(15)
    },
    cansall: {
      flexDirection: 'column',
      justifyContent: "space-between",
      alignItems: 'center',
      marginHorizontal: RFValue(5),
    },
    scrollView: {
      flexDirection: 'column',
      marginHorizontal: RFValue(5),
      height: '90%',
    },
    textbodtom: {
      fontSize: RFValue(13),
      color: colors.WHITE,
      // fontFamily: fonts.TAJAWALREGULAR,
      marginHorizontal: RFValue(15),
      alignItems: 'center',
      justifyContent: 'center',
    },
    textConver: {
      fontSize: RFValue(10),
      color: colors.WHITE,
      // fontFamily: fonts.TAJAWALREGULAR,
      marginHorizontal: RFValue(15),
      alignItems: 'center',
      justifyContent: 'center',
    },
    contenar: {
      fontSize: RFValue(17),
      color: colors.WHITE,
      // fontFamily: fonts.TAJAWALREGULAR,
      flex: 1,
    },
    taskhom: {
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 10,
      height: 30,
      paddingTop: 3,
      paddingLeft: 3,
      paddingBottom: 1,
      opacity: 0.8
    },
    textinpu: {
      fontSize: RFValue(12),
      color: colors.CURRENT,
      // fontFamily: fonts.TAJAWALEXTRABOLD,
      padding: RFValue(5)
    },
    puchcontener: {
      width: RFValue(200),
      height: RFValue(30),
      backgroundColor: colors.WHITE,
      borderRadius: (20),
      paddingHorizontal: RFValue(5),
      flexDirection: 'row-reverse',
      alignItems: 'center',
      alignSelf:'center',
      marginVertical: RFValue(10)
    },
    puchcontener_sub1: {
      flex: 1,
      alignItems: 'center',
      borderRadius: RFValue(20),
      padding: RFValue(2),
  
    },
    puchcontener_sub1_text: {
      color: colors.CURRENT,
      // fontFamily: fonts.CAIROREGULARK
    },
    inputtitabzrphtion: {
      borderWidth: 1,
      borderRadius: RFValue(10),
      height: RFValue(150),
      overflow: 'hidden',
      flexWrap: 'wrap',
      borderColor: colors.YALO,
      color: colors.CURRENT,
      padding: 5,
      textAlign: 'center',
      justifyContent: 'center',
      backgroundColor: colors.WHITE,
      // fontFamily: fonts.CAIROREGULARK
    },
  
  
  
  
  }
  
  )
  