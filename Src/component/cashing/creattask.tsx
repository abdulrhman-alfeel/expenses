import { Text, StyleSheet, View, FlatList ,TouchableOpacity} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '../../constants/colors'
import { fonts } from '../../constants/fonts'
import { useSelector, useDispatch } from "react-redux"
import PushCash from '../../component/cashing/dushCash'
// import {locale}from '../../Taskscsh';
import  locales,{locale}  from "../../locale";
export default function Creattask(props) {
    const [editFalse, setEDit] = useState(false);
    const [id, setId] = useState('');
    const [givinitd, setGivinit] = useState('');
let opsth =[];
    const { tasksCSH, tasksConver, tasksCSHID } = useSelector(state => state.userReducer);
const tasks=  tasksCSH.find(item => item.ID == tasksCSHID);

    return (

        <View style={styles.continer}>
                       {editFalse ?  <PushCash  givinit={givinitd} IDCSHING={id} pushcash={editFalse} Pushsetfalse={setEDit} /> :null}
            <FlatList
                data={props.arryCahing.filter(i=>i.IDCUST === tasksCSHID ||i.idConver ===  tasksCSHID )}
                renderItem={({ item, index }) => (
                    <View  style={styles.description}>
                        <View style={styles.indexind}><Text style={{ color: colors.WHITE }}>{index + 1}</Text></View>
                        <TouchableOpacity onPress={()=>{setGivinit(locale === 'ar_MA'?'تعديل':'Edit'); setId(item.id);setEDit(true); }} style={styles.indexindEdit}>
                          <View style={styles.indexindEditV}>
                           <FontAwesome5Icon name="edit" size={15} color={colors.WHITE}/>
                           </View>
                            </TouchableOpacity >
                        <View style={styles.continer}>
                            <View style={styles.vearticalone}>
                            <Text style={styles.textsum}>{locale === 'ar_MA'?"المبلغ المسدد":"Amount reimbursed"}</Text>
                                <Text style={styles.textsum}>{item.codm == undefined ? null:item.codm}{parseInt(item.pushcash).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text> 
                            </View>
                            <Text style={styles.textsumData}>{item.TiemPUSH}</Text>
                            {item.idConver === tasksCSHID  ?
                                    <View style={[ item.conver === ''||item.money_transfer ==0 ? { display: 'none' } :{display:'flex'}, styles.vearticaltow]}>
                                        <Text style={styles.textsum}>{locale === 'ar_MA'?"تم تحويل المبلغ من ":"Amount transferred from"}:</Text>
                                        <View  style={styles.continercover}>
                                        <Text style={styles.textsumC}>{item?.caseuTarg}</Text>
                                        <Text style={styles.textsumC}>{item.codm +parseInt(item.money_transfer).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                    </View>
                                    </View>
                                : item.idConver !== tasksCSHID ?
                                <View style={[ item.conver === ''|| parseInt(item.money_transfer) ==0 ? { display: 'none' } : styles.vearticaltow]}>
                                <Text style={styles.textsum}>{locale === 'ar_MA'?"تم تحويل المبلغ إلى":"Amount transferred to"} :</Text>
                                <View  style={styles.continercover}>
                                <Text style={styles.textsumC}>{item?.conver}</Text>
                                <Text style={styles.textsumC}>{item.codm + parseInt(item.money_transfer).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                            </View>
                            </View>
                            :
                            null
                            } 
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                // automaticallyAdjustKeyboardInsets={true}
            />
        </View>
    )

}
const styles = StyleSheet.create({
    continer: {
        width: '90%',
        flexDirection: "column",
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginHorizontal: RFValue(5),
        marginVertical: RFValue(5),   
    },

    description: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: colors.CURRENT,
        borderWidth:1,
        // backgroundColor:colors.YALO , 
        marginVertical:RFValue(5),
        borderRadius:RFValue(5)
        
        // margin:RFValue(5)
    },
    vearticalone: {
        width:'100%',
        flexDirection:locale === 'ar_MA'? 'row-reverse':'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor:colors.WHITE,
        // borderWidth: 1,
        marginHorizontal: RFValue(15),
        marginVertical: RFValue(10),
        
    },
    indexind: {
        // width:'25%',
        justifyContent: 'center',
        backgroundColor: colors.CURRENT,
        alignItems: 'flex-end',
        padding: RFValue(5),
        borderRadius: RFValue(3)
    },
    indexindEdit: {
        // width:'25%',
        position:'absolute',
        alignItems:'center',
        width:RFValue(30),
        height:RFValue(30),
        right:RFValue(10),
        top:RFValue(-5),
        justifyContent: 'flex-start',
        borderRadius: RFValue(3)
    },
    indexindEditV: {
        // width:'25%',
        justifyContent: 'flex-start',
        alignItems:'center',
        alignSelf:'center',
        width:RFValue(20),
        height:RFValue(20),
        backgroundColor: colors.CURRENT,
       
    },
    vearticaltow: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginHorizontal: RFValue(3),
        marginVertical: RFValue(3)
    },
    vearticaltow2: {
        flexDirection: 'column-reverse',
        marginHorizontal: RFValue(3),
        marginVertical: RFValue(3)
    },
    sumcreat: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.CURRENT,
        padding: RFValue(5),
        borderRadius: RFValue(5),
    },
    headers: {
        flex: 1
    },
    textsum: {
        color: colors.CURRENT,
        textAlign: 'center',
        fontFamily: fonts.CAIROREGULARK,
        fontSize: RFValue(12),
    },
    textsumC: {
        color: colors.WHITE,
        textAlign: 'center',
        fontFamily: fonts.CAIROREGULARK,
        fontSize: RFValue(12),
    },
    textsumData: {
        color: colors.CURRENT,
        textAlign: 'center',
        fontFamily: fonts.CAIROREGULARK,
        fontSize: RFValue(9),
    },
    textD: {
        color: colors.BLACK,
        textAlign: 'center',
        fontFamily: fonts.CAIROREGULARK,
        fontSize: RFValue(12),
        marginVertical: RFValue(7)
    },
    continercover:{
        backgroundColor:colors.CURRENT,
        padding:RFValue(5),
        borderRadius:RFValue(5),
        marginVertical:RFValue(5)
    }

})