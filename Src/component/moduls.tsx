import { View, Text ,Modal,Image,TouchableOpacity,StyleSheet} from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '../constants/colors'
import { fonts } from '../constants/fonts'
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const Moduls = (props) => {
  return (
    <>
    
    <Modal
    visible={props.bellmodel}
    transparent
    onRequestClose={() => props.setBellmodel(false)}
    animationType="fade"
    hardwareAccelerated={true}
    >
    <TouchableOpacity onPress={() => props.setBellmodel(false)} style={styles.centered_view}>
      <View style={styles.bell_mod1al}>
        <View style={styles.bell_body}>
          <Text style={styles.textinpu}>هل انت متأكد من رغبتك في حذف المهمه</Text>
        </View>
        <View style={styles.bell_button}>
          <TouchableOpacity
            onPress={() => props.setBellmodel(false)}
            style={styles.cansall}
          >
            <Text style={styles.textbodtom}>لاارغب بذلك</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props.preesyes} style={styles.ok}>
            <Text style={styles.textbodtom}>نعم</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  </Modal>
  </>
  )
}

export default Moduls;


const styles = StyleSheet.create({

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
        borderColor: colors.WHITE,
        borderWidth: RFValue(1)
      },
      cansall: {
        backgroundColor: colors.CURRENT,
        width: '50%',
        justifyContent: "center",
        alignItems: 'center',
        borderBottomLeftRadius: RFValue(20),
        borderColor: colors.WHITE,
        borderWidth: RFValue(1)
      },
      textbodtom: {
        fontSize: RFValue(14),
        fontFamily:fonts.CAIROREGULARK,
        color: colors.WHITE,
      },
      textinpu: {
        fontSize: RFValue(14),
        color: colors.CURRENT,
        fontFamily:fonts.CAIROREGULARK,
        padding: RFValue(15)
      },


      
})