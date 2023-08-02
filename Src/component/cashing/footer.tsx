import { Text, StyleSheet, View, TextInput } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '../../constants/colors'
import { fonts } from '../../constants/fonts'
import { useSelector, useDispatch } from "react-redux"
// import {locale}from '../../Taskscsh';
import  locales,{locale}  from "../../locale";
export default function Footer(props) {
    const { tasksCSH, tasksConver, tasksCSHID } = useSelector(state => state.userReducer);
    // const [caseuseds, setCaseused] = useState('');
    const [sumsCover, setSumCover] = useState('');
    const [sumsCode, setSumCod] = useState('');
    let objects = [];
    useEffect(()=>{
        props.arryCahing.forEach(pi => {
            objects.push({ x: parseInt(pi.money_transfer) })
            setSumCod(pi.codm)
                             // setCaseused(pi.caseused)
            });
        const sumconver = objects.reduce(
            (accumulator, currentValue) => accumulator + currentValue.x,
            0,
        );
        setSumCover(sumconver);
        
    }, [objects])
    return (
        
            <View style={styles.description}>
                <View style={styles.sumcreat}>
                    <View style={styles.headers}>
                        <Text style={styles.text}  numberOfLines={1}>{locale === 'ar_MA'?"اجمالي المدفوع":"Total Paid"}</Text>
                    </View>
                    <View style={styles.continersum}>
                    <Text numberOfLines={1} style={styles.textsum} >{ parseInt(props.DescPush).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                    <Text numberOfLines={1} style={styles.textsumcond} >{props.codm}</Text>
                    </View>
                </View>
                <View style={styles.sumcreat}>
                    <View style={styles.headers}>
                        { props.caseuseds ==='إستلام' ?
                          <Text style={styles.text}  numberOfLines={1}>{locale=== 'ar_MA'?"اجمالي المحولة":'Total Transferred'}</Text>
                          :
                          <Text style={styles.text}  numberOfLines={1}>{locale === 'ar_MA'?"اجمالي المحوله إليه":"Total transferred to him"}</Text>
                    }
                    </View>
                    <View style={styles.continersum}>
                    <Text numberOfLines={1} style={styles.textsum} >{parseInt(sumsCover).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                    <Text numberOfLines={1} style={styles.textsumcond} >{sumsCode}</Text>
                    </View>
                </View>
            </View>
    )

}

const styles = StyleSheet.create({
    continer:{
        width: '100%',
        flexDirection: 'column',
    },
    description:{
        flexDirection: 'row',
        borderColor: colors.CURRENT,
        margin: RFValue(5),
        backgroundColor: colors.CURRENT,
        borderRadius: RFValue(5),

    },
    vearticalone:{
        flexDirection: 'column-reverse',
        marginHorizontal: RFValue(3),
        marginVertical: RFValue(3)
    },
    vearticaltow:{
        flexDirection: 'column-reverse',
        marginHorizontal: RFValue(3),
        marginVertical: RFValue(3)
    },
    sumcreat:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center'
        // borderRadius: RFValue(5),
        // marginHorizontal:RFValue(5)
    },
    texthedt: {
        color: colors.BLACK,
        fontFamily: fonts.CAIROREGULARK,
        fontSize: RFValue(10),
    },
    headers: {
        justifyContent: 'center',
        alignSelf: 'center',
        // backgroundColor: colors.WHITE,
        padding: RFValue(5),
        borderBottomLeftRadius: RFValue(5),
        borderBottomRightRadius: RFValue(5)
    },
    text: {
        color: colors.WHITE,
        textAlign: 'center',
        fontFamily: fonts.CAIROREGULARK,
        fontSize:RFValue(10)
    },
    textsum: {
        color: colors.CURRENT,
        textAlign: 'center',
        fontFamily: fonts.CAIROREGULARK,
        fontSize: RFValue(11),
    },
    continersum:{
        flexDirection:'row-reverse',
        justifyContent:'space-around',
        paddingHorizontal:RFValue(10),
        borderRadius:RFValue(15),
        borderWidth:1,
        backgroundColor:colors.YALO
    },
    textsumcond:{
        color: colors.CURRENT,
        textAlign: 'center',
        fontFamily: fonts.CAIROREGULARK,
        fontSize: RFValue(8),
        
    }

})