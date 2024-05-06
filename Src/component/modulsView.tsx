import {View, Modal, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../constants/colors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
const ModulsView = props => {
  return (
    <>
      <Modal
        visible={props.visble}
        transparent
        onRequestClose={() => props.onrequewt(false)}
        animationType="fade"
        hardwareAccelerated={true}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.onrequewt(false)}>
          <FontAwesome5Icon name="times" size={20} color={colors.CURRENT} />
        </TouchableOpacity>
        <View style={styles.centered_recoinr}>
          <Image
            style={styles.imagies}
            resizeMode="stretch"
            source={{uri: props.uri}}
          />
        </View>
      </Modal>
    </>
  );
};

export default ModulsView;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    zIndex: 1,
    width: RFValue(20),
    marginHorizontal: RFValue(15),
    marginVertical: RFValue(15),
    borderRadius: RFValue(50),
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  centered_recoinr: {
    flex: 1,
    height: '100%',
    //  top:RFValue(-20),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    // borderColor: colors.BORDER,
    // borderRadius: RFValue(20),
  },
  imagies: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
