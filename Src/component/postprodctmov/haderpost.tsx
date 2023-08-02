

import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '../../constants/colors'
import { fonts } from '../../constants/fonts'
// import { locale } from '../../Taskscsh'
import  locales,{locale}  from "../../locale";

export default function Haderpost(props) {
    const [monyMCH, setMony] = useState('')
    const [monyMCHName, setMonyName] = useState('')

    useEffect(() => {
     
        if (props.many.length > 0) {
     if(locale == 'ar_MA'){
               if (props.many == 'ريال سعودي' ||props.many ==  'SR') {
                setMonyName('كشف بالريال السعودي')
                setMony(props.SumِSR)
            } else if (props.many == 'ريال يمني' ||props.many ==  'YR') {
                setMonyName('كشف بالريال اليمني')
                setMony(props.SumِYR)
            } else {
                setMonyName('كشف بالدولار الامريكي' )
                setMony(props.SumDollar)
            }}else{
                if (props.many == 'ريال سعودي' ||props.many ===  'SR') {
                    setMonyName('Statement in US dollars')
                    setMony(props.SumِSR)
                } else if (props.many == 'ريال يمني' ||props.many ===  'YR') {
                    setMonyName('Statement in Yemeni riyals')
                    setMony(props.SumِYR)
                } else {
                    setMonyName('Statement in US dollars' )
                    setMony(props.SumDollar)
                } 
            }
        }
    }, [props.many])

    return (
        <View style={styles.body}>
            <View style={styles.headrs}>
                <Text style={styles.textcousnt} numberOfLines={1}> {props.sectionidnfy}</Text>
                <View style={styles.tiems}>
                    <Text style={styles.Texts} numberOfLines={1}>
                        d:{props.Datetiemarth}
                    </Text>
                    <Text style={styles.Texts} numberOfLines={1}>
                        h:{props.tiems}
                    </Text>
                </View>
            </View>
            <View style={styles.coustconte}>
                {props.many.length > 0
                    ?
                    <View style={[{ alignItems: 'center' }, styles.container_sub]}>
                        <Text style={styles.textbuild}>{monyMCHName}</Text>
                        <Text style={styles.text}>{props.many}{monyMCH}</Text>
                    </View>
                    :
                    <View style={styles.container_sub}>
                        <View style={styles.container_sub1}>
                            <Text style={styles.text}>{locale == 'ar_MA' ? "المبالغ بالدولار" : "Dollar amounts"} </Text>
                            <Text style={styles.text}>{locale == 'ar_MA' ? "بالريال السعودي" : "in Saudi Riyal"}</Text>
                            <Text style={styles.text}>{locale == 'ar_MA' ? "بالريام اليمني" : " Yemeni Riyam"}</Text>
                        </View>
                        <View style={styles.container_sub1}>
                            <Text style={styles.textbuild}>{props.SumDollar}</Text>
                            <Text style={styles.textbuild}>{props.SumِSR}</Text>
                            <Text style={styles.textbuild}>{props.SumِYR}</Text>
                        </View>
                    </View>
                }

            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container_sub: {
        flexDirection: "column",
        flex: 1,
        justifyContent: 'space-around'
    },
    container_sub1: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around'
    },
    containerbuilds: {
        backgroundColor: colors.WHITE,
        // flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        elevation: RFValue(2),
        paddingVertical: RFValue(10),
        marginVertical: RFValue(5)
    },
    textbuild: {
        color: colors.CURRENT,
        fontFamily: fonts.CAIROREGULARK
    },
    text: {
        color: colors.BLACK,
        textAlign: 'center',
        fontFamily: fonts.CAIROREGULARK,
        fontSize: RFValue(10),
    },
    body: {
        flexDirection: "column",
        overflow: 'hidden',
        margin: RFValue(2),
        justifyContent: "space-around",
        alignItems: 'center'
    },
    headrs: {

        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: RFValue(5),
        marginVertical: RFValue(5),
        padding: RFValue(5)
    },
    Texts: {
        fontSize: RFValue(11),
        color: colors.BLACK
    },
    coust: {
        flex: 2,
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: RFValue(5),
        marginVertical: RFValue(5),
        padding: RFValue(2)
    },
    coustconte: {
        flexDirection: 'row'
    },
    textcousnt: {
        color: colors.BLACK,
        fontFamily: fonts.TAJAWALEXTRABOLD,
        fontSize: RFValue(13),
    },

    ditails: {
        flex: 1,
        marginHorizontal: RFValue(5),
        padding: RFValue(5)

    },
    tiems: {
        flexDirection: 'row',
        width: RFValue(205),
        justifyContent: 'space-evenly'
    }






})