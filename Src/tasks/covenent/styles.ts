import {StyleSheet} from "react-native"
import { colors } from "../../constants/colors"
import { fonts } from "../../constants/fonts"
import { RFValue } from "react-native-responsive-fontsize"
// import { locale } from "../../Taskscsh"
import  locales,{locale}  from "../../locale";




export const styles = StyleSheet.create({
  centered_menu: {
    flex:1,
    justifyContent: 'flex-start',
  },
  menu_mod1al: {
    width: RFValue(150),
    backgroundColor: colors.WHITE,
    height: RFValue(200),
    borderRadius: RFValue(10),
    marginHorizontal: RFValue(10),
    top:RFValue(100),
    marginTop:RFValue(30),
    alignSelf: 'flex-start',
  },
  menu_body: {
    flex: 1,
    height: RFValue(150),
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  menu_button: {
    flexDirection: 'row',
    height: RFValue(50),
  },
  bottom_1: {
    width: '100%',
    marginVertical: RFValue(5),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.BACKGRUONDPAG,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text_menu: {
    // fontFamily: fonts.CAIROREGULARK,
    color: colors.CURRENT
  },
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
    // fontFamily: fonts.CAIROREGULARK,
    color: colors.CURRENT
  },
  bell: {
    position:'absolute',
    alignSelf:'flex-start',
    alignItems:'center',
    left:-5,
    top:10,
    width:35,
    height:50
  },
  contsec_bell:{
    flex:0.3,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    top:-5
  },
  iconmessage: {
    height: 25,
    top: RFValue(10)
  },
  item_row: {
    width:'100%',
    flexDirection:'row',justifyContent:'space-around',
  },
  targ: {
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    paddingVertical: RFValue(5),
    flex:1,
  },
  sumsng:{  
      justifyContent: "center",
      alignItems: 'center',
      width: RFValue(100),
      height: RFValue(30),
      alignSelf:'center'
  },
  senction3:{
    padding:RFValue(4),
    marginHorizontal:RFValue(25),
    marginVertical:RFValue(15),
    borderRadius:RFValue(5),
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:colors.YALO
    },
    conter:{
      flex:2,
        borderBottomWidth: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    contsec:{
      flex:2,
      justifyContent:'center',
      alignItems:'center',
    },
    text:{
      // fontFamily:fonts.CAIROREGULARK,
      color: colors.CURRENT,
      fontSize:RFValue(13)
    },
    textadd:{
      // fontFamily:fonts.CAIROREGULARK,
      color: colors.WHITE,
      fontSize:RFValue(12),
      textAlign:'center',
    },
    textaddfoter:{
      // fontFamily:fonts.CAIROREGULARK,
      color: colors.WHITE,
      fontSize:RFValue(10),
      textAlign:'center',
    },
    textaddBottom:{
      // fontFamily:fonts.CAIROREGULARK,
      color: colors.YALO,
      fontSize:RFValue(15),
      textAlign:'center',
      textShadowColor:colors.WHITE,
      textShadowRadius:0.5
    },
    buttomadd: {
      justifyContent: "center",
      alignItems: 'center',
      flex:2,
      marginHorizontal:RFValue(10),
      borderRadius: RFValue(60),
      backgroundColor: colors.CURRENT
    },
  textbot: {
    color: colors.WHITE,
    // fontFamily: fonts.CAIROREGULARK
  },

  buttomsAl: {
    justifyContent: "center",
    alignItems: 'center',
    width: RFValue(60),
    height: RFValue(60),
    borderRadius: RFValue(50),
    backgroundColor: '#00000059',
    marginHorizontal:RFValue(15)
  },
  buttoms: {
    position:'absolute',
    zIndex:999,
    alignSelf:locale === 'ar_MA'?'flex-start':"flex-end",
    top:370,
  },
    body: {
        flex: 2,
        height:'100%'
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
        position: 'absolute',
        top: -10,
        backgroundColor: colors.GREYD
      },
      tasksbox: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: RFValue(3),
        backgroundColor: colors.WHITE,
        justifyContent: "space-around",
        alignItems: 'center',
        overflow: 'hidden',
        elevation: RFValue(1)
      },
      item_body: {
        flex: 1,
        flexDirection: 'column-reverse',
        justifyContent: 'space-around'
      },
      foderchedk: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      textfoders: {
        color: colors.BLACK,
        fontSize: RFValue(12),
        marginTop: RFValue(10),
        // fontFamily: fonts.CAIROREGULARK,
        textAlign: 'center',
        marginHorizontal: RFValue(5)
      },
      delet: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-end'
      },
      Datanew: {
        width: '95%',
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
        alignSelf: 'center'
      },
      texttask: {
        color: '#000000',
        fontSize: RFValue(9),
        // fontFamily: fonts.CAIROREGULARK,
      },
      textdesc: {
        textAlign: 'center',
        color: colors.BLACK,
        fontSize: RFValue(9),
      },
      zersection: {
        width: '10%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
      },
      onsection: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      onsectionsub: {
        flexDirection: 'row-reverse'
      },
      towsection: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      towsectionTo: {
        overflow: 'hidden',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      centered_view: {
        flex: 1,
        backgroundColor: "#00000099",
        justifyContent: 'center',
        alignItems: 'center'
      },
      bell_mod1al: {
        width: RFValue(300),
        backgroundColor: colors.YALO,
        height: RFValue(150),
        borderRadius: RFValue(20)
      },
      bell_body: {
        flex: 1,
        height: RFValue(150),
        justifyContent: 'center',
        alignItems: 'center'
      },
      bell_button: {
        flexDirection: 'row',
        height: RFValue(50),
      },
      ok: {
        width: '50%',
        justifyContent: "center",
        alignItems: 'center',
        borderBottomRightRadius: RFValue(20),
        backgroundColor: colors.CURRENT,
        borderColor: colors.YALO,
        borderWidth: RFValue(1)
      },
      cansall: {
        backgroundColor: colors.CURRENT,
        width: '50%',
        justifyContent: "center",
        alignItems: 'center',
        borderBottomLeftRadius: RFValue(20),
        borderColor: colors.YALO,
        borderWidth: RFValue(1)
      },
      textbodtom: {
        fontSize: RFValue(14),
        color: colors.WHITE,
        // fontFamily: fonts.CAIROREGULARK
      },
      textinpu: {
        fontSize: RFValue(14),
        color: colors.CURRENT,
        padding: RFValue(15),
        // fontFamily: fonts.CAIROREGULARK
      }, })
  