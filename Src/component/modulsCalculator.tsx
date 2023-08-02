import { View,Pressable, Text ,Modal,Image,ToastAndroid,StyleSheet} from 'react-native'
import React,{useState,useEffect,useMemo, useCallback,useDebugValue} from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '../constants/colors'
import { fonts } from '../constants/fonts'
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { TextInput } from 'react-native-gesture-handler'
// import { locale } from '../Taskscsh'
import  locales,{locale}  from "../locale";
export var result ='0'
const ModulsCalculator =(props) => {
  const [total,setTotal]=useState('');
  const [totalrsalt,setTotalRsalt]=useState('');
  const hedlcalculator = (value:string)=>{
    if(value === 'c'){
  setTotal('');
}else if (value === 'back'){
  setTotal(total.slice(0,-1));
}else if (value === '='){
  try{
    let tot=total;
    console.log(tot.trimEnd())
    if(tot.trimEnd() == '*'||'+'||'/'||'-'){
      tot= total.slice(0,-1);
    }
   const resltss = eval(tot);
    setTotal(String(resltss.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')))
    setTotalRsalt(String(resltss))
  }catch(err){
    ToastAndroid.showWithGravity(locale=='ar_MA'?'لايمكن اختيار علامتين حسابية مع بعض لابد ان يكون بينهما ارقام  ':"error",
    ToastAndroid.SHORT,ToastAndroid.CENTER)
  }
}else if (value === '*'){
  setTotal(total +"*");
}else if (value === '/'){
  setTotal(total + '/');
}else if (value === '-'){
  setTotal(total + '-');
}else if (value === '+'){
  setTotal(total + '+');
}else if(value === 'ok'){
  result=totalrsalt;
  props.onrequewt(false);
  props.onprssfounction()


}else{
  setTotal(total+value)
}
}
  return (
    <>
    <Modal
        visible={props.visble}
        transparent
        onRequestClose={()=>props.onrequewt(false)}
        animationType="fade"
        hardwareAccelerated={true} >
        <Pressable  style={styles.centered_recoinr} onPress={()=>{props.onrequewt(false);}}>      
            <Pressable onPress={()=>props.onrequewt(true)} style={styles.button_body}>
            {/* keyboardType="numeric" showSoftInputOnFocus={true} */}
            <TextInput style={styles.inputing}   showSoftInputOnFocus={false} pointerEvents='auto' value={total}></TextInput>
        <View style={styles.button_row}>
          <Pressable android_ripple={{color:colors.WHITE,borderless:true}} style={styles.yellow_button} onPress={()=>hedlcalculator('c')}>
            <Text style={styles.textbMArg}>c</Text>
          </Pressable>
          <Pressable android_ripple={{color:colors.WHITE,borderless:true}} style={styles.back_button} onPress={()=>hedlcalculator('back')}>
            <Text style={styles.textb}>{locale == 'ar_MA'?"رجوع":'Back'}</Text>
          </Pressable>
          <Pressable  android_ripple={{color:colors.WHITE,borderless:true}}  style={styles.other_button} onPress={()=>hedlcalculator('*')}>
            <Text style={styles.textbMArg}>×</Text>
          </Pressable>
          </View>
        <View style={styles.button_row}>
          <Pressable  android_ripple={{color:colors.WHITE,borderless:true}}  style={styles.namber_button} onPress={()=>hedlcalculator('7')}>
            <Text style={styles.text}>7</Text>
          </Pressable>
          <Pressable  android_ripple={{color:colors.WHITE,borderless:true}}   style={styles.namber_button} onPress={()=>hedlcalculator('8')}>
            <Text style={styles.text}>8</Text>
          </Pressable>
          <Pressable  android_ripple={{color:colors.WHITE,borderless:true}}  style={styles.namber_button} onPress={()=>hedlcalculator('9')}>
            <Text style={styles.text}>9</Text>
          </Pressable>
          <Pressable  android_ripple={{color:colors.WHITE,borderless:true}}  style={styles.other_button} onPress={()=>hedlcalculator('/')}>
            <Text style={styles.textbMArg}>/</Text>
          </Pressable>
          </View>
        <View style={styles.button_row}>
          <Pressable  android_ripple={{color:colors.WHITE,borderless:true}}  style={styles.namber_button} onPress={()=>hedlcalculator('4')}>
            <Text style={styles.text}>4</Text>
          </Pressable>
          <Pressable  android_ripple={{color:colors.WHITE,borderless:true}}  style={styles.namber_button} onPress={()=>hedlcalculator('5')}>
            <Text style={styles.text}>5</Text>
          </Pressable>
          <Pressable  android_ripple={{color:colors.WHITE,borderless:true}}  style={styles.namber_button} onPress={()=>hedlcalculator('6')}>
            <Text style={styles.text}>6</Text>
          </Pressable>
          <Pressable  android_ripple={{color:colors.WHITE,borderless:true}}  style={styles.other_button} onPress={()=>hedlcalculator('-')}>
            <Text style={styles.textbMArg}>-</Text>
          </Pressable>
          </View>
        <View style={styles.button_row}>
          <Pressable  android_ripple={{color:colors.WHITE,borderless:true}}  style={styles.namber_button} onPress={()=>hedlcalculator('1')}>
            <Text style={styles.text}>1</Text>
          </Pressable>
          <Pressable  android_ripple={{color:colors.WHITE,borderless:true}}  style={styles.namber_button} onPress={()=>hedlcalculator('2')}>
            <Text style={styles.text}>2</Text>
          </Pressable>
          <Pressable  android_ripple={{color:colors.WHITE,borderless:true}}   style={styles.namber_button} onPress={()=>hedlcalculator('3')}>
            <Text style={styles.text}>3</Text>
          </Pressable>
   
          <Pressable  android_ripple={{color:colors.WHITE,borderless:true}}  style={styles.other_button} onPress={()=>hedlcalculator('+')}>
            <Text style={styles.textbMArg}>+</Text>
          </Pressable>
          </View>
        <View style={styles.button_row}>
          <Pressable  android_ripple={{color:colors.WHITE,borderless:true}}  style={styles.namber_button} onPress={()=>hedlcalculator('ok')}>
            <Text style={styles.text}>{locale=='ar_MA'?"تم":'ok'}</Text>
          </Pressable>
          <Pressable  android_ripple={{color:colors.WHITE,borderless:true}}  style={styles.namber_button} onPress={()=>hedlcalculator(',')}>
            <Text style={styles.text}>,</Text>
          </Pressable>
          <Pressable  android_ripple={{color:colors.WHITE,borderless:true}}  style={styles.namber_button} onPress={()=>hedlcalculator('0')}>
            <Text style={styles.text}>0</Text>
          </Pressable>
          <Pressable  android_ripple={{color:colors.WHITE,borderless:true}}  style={styles.back_button} onPress={()=>hedlcalculator('=')}>
            <Text style={styles.textbMArg}>=</Text>
          </Pressable>
          </View>
          </Pressable>
        </Pressable>
  
      </Modal>
  </>
  )
}

export default ModulsCalculator;


const styles = StyleSheet.create({

  button_body:{
    width:'70%',
    gap:10,
    margin:5,
    backgroundColor:colors.CURRENT,
    justifyContent:'center',
    alignSelf:'center',
    borderWidth:3,
    borderColor:colors.YALO,
    borderRadius:RFValue(15)
  },
  inputing:{
    height:RFValue(50),
    borderTopLeftRadius:RFValue(10),
    borderTopRightRadius:RFValue(10),
    fontSize:RFValue(10),
    padding:10,
    backgroundColor:colors.WHITE,
    // borderWidth:1
  },

  button_row:{
    flexDirection:'row',
    width:'90%',
    gap:10,
    margin:5,
    justifyContent:'center',
    alignSelf:'center'
    
  },
  yellow_button:{
    flex:1,
    borderRadius:50,
    borderWidth:1,
    backgroundColor:colors.YALO, 
    justifyContent:'center',
    alignItems:'center'
  },
  back_button:{
    flex:2,
    borderRadius:50,
    backgroundColor:colors.YALO, 
    justifyContent:'center',
    alignItems:'center'
  },
  other_button:{
    flex:1,
    borderRadius:50,
    backgroundColor:colors.YALO, 
    justifyContent:'center',
    alignItems:'center'
  },
  namber_button:{
    width:RFValue(50),
    height:RFValue(50),
    borderWidth:1,
    borderRadius:50,
    backgroundColor:colors.WHITE, 
    justifyContent:'center',
    alignItems:'center'
  },
  textb:{
    fontSize:RFValue(17),
    color:colors.CURRENT,
    fontFamily:fonts.TAJAWALREGULAR,
    padding:2
  },
  textbMArg:{
    fontSize:RFValue(25),
    color:colors.CURRENT,
    fontFamily:fonts.TAJAWALREGULAR,
    padding:2
  },
  text:{
    fontSize:RFValue(15),
    color:colors.CURRENT,
    fontFamily:fonts.CAIROREGULARK
  },
  centered_recoinr:{
   flex:1,
   height:'100%',
  //  top:RFValue(-20),
  width:'100%',
  justifyContent:'center',
    // borderColor: colors.BORDER,
    // borderRadius: RFValue(20),

  },
  

      
})