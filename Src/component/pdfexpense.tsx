import React from 'react';
import {Text, TouchableOpacity, PermissionsAndroid} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import {useSelector} from 'react-redux';
import {tost} from '../functionuse/contractuse/expTemplet';
//  const CustomPdfView = requireNativeComponent();
// function newFunction(): ReactNetiv.Rationale | undefined {
//   return {
//     title: 'Storage permission needed',
//     buttonNeutral: 'Ask Me Later',
//     buttonNegative: 'Cancel',
//     buttonPositive: 'OK',
//   };
// }

export default function Pdfexpense(props): JSX.Element {
  const {Language} = useSelector(state => state.userReducer);
  // const findData = lest_Cash.find(pic => pic.IDCUST === tasksCSHID);

  const createPDF = async () => {
    const file = await RNHTMLtoPDF.convert(props.options);

    console.log(file.filePath);
    tost(Language.Converted_to_Pdf_successfully);
    const fileExistS = await RNFS.exists(file.filePath);
    if (!fileExistS) {
      console.log('file doesnt exist');
      return;
    }
  };

  const handleClick = async () => {
    try {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
    } catch (err) {
      console.warn(err);
    }
    const readGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    const writeGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (!readGranted || !writeGranted) {
      console.log('Read and write permissions have not been granted');
      return;
    } else {
      createPDF();
    }
  };
  return (
    <TouchableOpacity
      style={props.onprestyle}
      onPress={() => {
        props.onpressfale();
        handleClick();
      }}>
      <Text style={props.text}>{Language.PDF_Converter}</Text>
    </TouchableOpacity>
  );
}
