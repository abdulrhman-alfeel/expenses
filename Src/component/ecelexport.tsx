import React, {useState} from 'react';
import RNFS from 'react-native-fs';
import ReactNetiv, {
  PermissionsAndroid,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import XLSX from 'xlsx';
import {useSelector} from 'react-redux';
import {tost} from '../functionuse/contractuse/expTemplet';

export default function ExportExcel({
  text,
  onprestyle,
  onpressecel,
  options,
  caseuTarg,
}) {
  const [count, setCount] = useState(0);
  const {Language} = useSelector(state => state.userReducer);
  const exportToExcel = async () => {
    setCount(count + 1);
    let wb = XLSX.utils.book_new();
    // let ws = XLSX.utils.json_to_sheet(options)
    let ws = XLSX.utils.json_to_sheet(options);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
    // Write generated excel to Storage
    const time = new Date().toDateString().replace(' ', '');
    RNFS.writeFile(
      RNFS.ExternalDirectoryPath + `/Exprenss_${time}_${caseuTarg}.xlsx`,
      wbout,
      'ascii',
    )
      .then(r => {
        tost(Language.Converted_to_excel_successfully);
      })
      .catch(e => {
        console.log('Error', e);
      });
  };

  const handleClick = async () => {
    try {
      // Check for Permission (check if permission is already given or not)
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (!isPermitedExternalStorage) {
        // Ask for permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          newFunction(),
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted (calling our exportDataToExcel function)
          exportToExcel();
          console.log('Permission granted');
        } else {
          // Permission denied
          console.log('Permission denied');
        }
      } else {
        // Already have Permission (calling our exportDataToExcel function)
        exportToExcel();
      }
    } catch (e) {
      console.log('Error while checking permission');
      console.log(e);
      return;
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={e => {
          onpressecel();
          handleClick();
        }}
        style={onprestyle}>
        <Text style={text}>{Language.excel_Converter}</Text>
      </TouchableOpacity>
    </View>
  );
}
function newFunction(): ReactNetiv.Rationale | undefined {
  return {
    title: 'Storage permission needed',
    buttonNeutral: 'Ask Me Later',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
  };
}
