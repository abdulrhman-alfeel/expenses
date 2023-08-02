//import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect,useCallback } from "react";
import {
  View,
  FlatList,
} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import {setTasksCONTRATID } from '../redux/actions'
import Creattaskmove from '../component/postprodctmov/creattaskmove'
import {styles} from './styles'
import {searching} from './Contracting';
export default function Prodectmytrue({navigation}) {
  
  const {tasksCONTRAT} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  useEffect(()=>{searching.length > 0? console.log(searching.toString()):null},[searching])
  const renderItem = useCallback(({ item, index }) => (
    <Creattaskmove  keys={index} SumDollar={item.SumDollar} onpress={()=> {
  dispatch(setTasksCONTRATID(item.ID));
  navigation.navigate('Subprodect')}
} SumِSR={item.SumِSR} SumِYR={item.SumِYR}  sectionidnfy={item.sectionidnfy} Datetiem={item.Datetiem}  sum={item.sum}/>
), []);
const datItem =useCallback(searching.length > 0 ?   tasksCONTRAT.filter(item =>  item.databuld.find(ite=> ite.sectiontitle == searching.toString() || ite.SumِYR == searching.toString()|| ite.SumDollar == searching.toString()||  ite.SumِYR == searching.toString() || ite.abzrphtion == searching.toString()|| ite.Databes.find(i=> i.sectiontitle == searching.toString() || i.sectionpriclabrr == searching.toString()|| i.sectionpriclabrr == parseInt(searching.toString())|| i.abzrphtion == searching.toString() ) ) && item.Done === true|| item.sectionidnfy == searching.toString() && item.Done === true || item.sectionidnfy ==  parseInt(searching.toString()) && item.Done === true || item.sum == searching.toString() && item.Done === true)  : tasksCONTRAT.filter(item => item.Done === true),[tasksCONTRAT,searching])
  return (
    <View style={styles.body}>
<FlatList
        data={datItem}
        renderItem={renderItem}/>    
    </View>
  );
}




















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