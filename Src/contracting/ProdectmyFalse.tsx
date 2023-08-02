import React ,{useCallback,useEffect}from "react";
import {View,FlatList} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import {setTasksCONTRATID } from '../redux/actions'
import Creattaskmove from '../component/postprodctmov/creattaskmove'
import {styles} from './styles'
import {searching} from './Contracting';
export default function Prodectmyfalse({navigation}) {
  const {tasksCONTRAT} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  useEffect(()=>{ console.log(searching.toString())},[searching])
  const renderItem = useCallback(({ item, index }) => (
    <Creattaskmove keys={index}  SumDollar={parseInt(item.SumDollar).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} onpress={()=> {
  dispatch(setTasksCONTRATID(item.ID));
  navigation.navigate('Subprodect')}
} SumِSR={parseInt(item.SumِSR).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} SumِYR={parseInt(item.SumِYR).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}  sectionidnfy={item.sectionidnfy} Datetiem={item.Datetiem}  sum={parseInt(item.sum).toFixed(2)}/>
), [searching]);
const datItem =useCallback(searching?.length > 0 ?   tasksCONTRAT.filter(item =>  item.databuld.find(ite=> ite.sectiontitle == searching.toString() || ite.SumِYR == searching.toString()|| ite.SumDollar == searching.toString()||  ite.SumِYR == searching.toString() || ite.abzrphtion == searching.toString()|| ite.Databes.find(i=> i.sectiontitle == searching.toString() || i.sectionpriclabrr == searching.toString()|| i.sectionpriclabrr == parseInt(searching.toString())|| i.abzrphtion == searching.toString() ) ) && item.Done === false|| item.sectionidnfy == searching.toString() && item.Done === false || item.sectionidnfy ==  parseInt(searching.toString()) && item.Done === false || item.sum == searching.toString() && item.Done === false)  : tasksCONTRAT.filter(item => item.Done === false),[tasksCONTRAT,searching])
  return (
    <View style={styles.body}>
<FlatList
        data={datItem}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        />    
    </View>
  );
}


















