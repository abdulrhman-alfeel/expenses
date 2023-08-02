import { Text,ScrollView,TouchableOpacity, StyleSheet,Image,View, FlatList } from 'react-native'
import React, { useState, useEffect,useCallback } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '../../constants/colors'
import { fonts } from '../../constants/fonts'
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import PushCashCovenant from '../../tasks/covenent/pushCashCovenant'
// import {locale}from '../../Taskscsh';
import  locales,{locale}  from "../../locale";
import ModulsView from '../modulsView';

export default function CreatCovenant(props) {
    const [editFalse, setEDit] = useState(false);
    const [id, setId] = useState('');
    const [givinitd, setGivinit] = useState('');
    const [ImageView, setImagView] = useState('');
    const [ImageViewFalse, setImagViewfalse] = useState(false);
  

    const renderItems=useCallback(({item,index}) => (
        <View  style={styles.description}>
            <View style={styles.indexind}><Text style={{ color: colors.WHITE }}>{index + 1}</Text></View>
            <TouchableOpacity onPress={()=>{setId(item.id);setGivinit(locale =='ar_MA'?'تعديل':"Edit");setEDit(true); }} ><FontAwesome5Icon name="edit" size={15} color={colors.CURRENT}/></TouchableOpacity >
            <View style={styles.continer}>
                <View style={styles.vearticalone}>
                    <View style={styles.vearticaltow}>
                <Text style={styles.textsum}>{ locale == 'ar_MA'? props.caseused == "لدي"? "تم الاخلاء إلى": "تم الاخلاء من ":props.caseused == "Have"? "Evacuated to": "Evacuated from"}</Text>
                    <Text style={styles.textsum}>{props.describtion}</Text>
                    </View>
                    <View style={styles.vearticaltow2}>
                    <Text style={styles.textsum}>{locale == 'ar_MA'?"مبلغ وقدرة":"Amount and capacity"}</Text>
                    <Text style={styles.textsum}>{item.kindmony}{parseInt(item.Covenantday).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                       </View >
                    <Text style={styles.textsumData}>{item.TimeCovenant}</Text>
                </View>
                <View style={styles.vearticalonedd}>
                    <Text style={styles.textsumData}>{locale =='ar_MA'?"التفاصيل":"Details"}</Text>
                    <Text style={styles.textsumC}>{item.Describtions}</Text>
                </View>      
                      <View style={styles.sactionImag}>
                      <Text style={styles.textsumData}>{locale =='ar_MA'?"مرفقات الاخلاء":"Evacuation attachments"}</Text>
                      {item?.imagop?.length>0? item?.imagop.map((pic,index)=>(
                        
                        <View key={index}>
                        < TouchableOpacity
                          onPress={() => {
                            setImagView(pic.image);
                            setImagViewfalse(true);
                          }}
                        >
                          <View style={styles.Imaghom}>
                            <View style={styles.Imaghomid}>
                              <Image resizeMode="stretch" style={[!pic.image ? { width: RFValue(30), height: RFValue(30) } : styles.imag]} source={{ uri: pic.image ,cache:"force-cache"}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>)):null}      
                  </View>
            </View>
        </View>
    ),[id])
    return ( 
<View style={styles.continer}>
{editFalse? <PushCashCovenant   tasksCOVENANT={props.tasksCOVENANT} tasksEVACUTION={props.tasksEVACUTION} tasksCONTRAT={props.tasksCONTRAT} iddelet={editFalse} setIddelet={setEDit} IDEVacu={id} givinit={givinitd}/> : null  }
{ImageViewFalse?<ModulsView visble={ImageViewFalse} onrequewt={setImagViewfalse} uri={ImageView} />:null}
<FlatList
    data={props.arrayOprition}
    renderItem={renderItems}
    keyExtractor={(item, index) => index.toString()}
    // automaticallyAdjustKeyboardInsets={true}
/>
</View>

    )

}
const styles = StyleSheet.create({
  sactionImag: {
    width:'100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems:'center',
    alignSelf:'center',
  },
  Imaghom: {
    margin: RFValue(5),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row-reverse",
  },
  Imaghomid: {
    width: RFValue(80),
    height: RFValue(80),
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: "row-reverse",
    backgroundColor: colors.WHITE,
    borderColor: colors.BORDER,
    borderWidth: RFValue(0.5),
    borderRadius: RFValue(10),
  },
  imag: {
    width: RFValue(80),
    height: RFValue(80),
    borderRadius: RFValue(10),
  },
    continer: {
        width: '95%',
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
    vearticalonedd: {
        width:'80%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor:colors.WHITE,
        // borderWidth: 1,
        marginHorizontal: RFValue(15),
        marginVertical: RFValue(3),
        
    },
    vearticalone: {
        width:'95%',
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor:colors.WHITE,
        // borderWidth: 1,
        marginHorizontal: RFValue(15),
        marginVertical: RFValue(3),
        
    },
    indexind: {
        // width:'25%',
        position:'absolute',
        justifyContent: 'center',
        backgroundColor: colors.CURRENT,
        alignSelf: 'flex-end',
        // top:RFValue(-8),
        // right:RFValue(5),
        padding: RFValue(8),
        borderRadius: RFValue(5)
    },
    indexindEdit: {
        // width:'25%',
        position:'absolute',
        justifyContent: 'center',
        // top:RFValue(-8),
        // right:RFValue(5),
        // zIndex:999,
        padding: RFValue(3),
        borderRadius: RFValue(5)
    },
    vearticaltow: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginHorizontal: RFValue(3),
        marginVertical: RFValue(3)
    },
    vearticaltow2: {
        flexDirection: 'column',
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
        color: colors.CURRENT,
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