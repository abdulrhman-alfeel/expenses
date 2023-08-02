import React, { useState,useEffect } from "react";
import RNFS from 'react-native-fs'
// import {locale}from '../Taskscsh';
import  locales,{locale}  from "../locale";
import ReactNetiv, { PermissionsAndroid,Share, Alert, NativeModules, TouchableOpacity, Text, View, ToastAndroid } from 'react-native'
import XLSX from "xlsx"

export default function ExportExcel({ text, onprestyle ,onpressecel,options,caseuTarg}) {
  const [count, setCount] = useState(0)
const exportToExcel = async() => {
  setCount(count + 1);
    let wb = XLSX.utils.book_new();
    // let ws = XLSX.utils.json_to_sheet(options)
    let ws = XLSX.utils.json_to_sheet(options)
    XLSX.utils.book_append_sheet(wb, ws, "Users")
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx", });
    // Write generated excel to Storage
    RNFS.writeFile(RNFS.ExternalDirectoryPath + `/Exprenss_${caseuTarg}_${count}.xlsx`, wbout, 'ascii').then((r) => {
      console.log('Success',r);
      ToastAndroid.showWithGravity(locale === 'ar_MA'?'تم التحويل إلى ملف Excel  بنجاح':'Converted to Excel successfully',
      ToastAndroid.CENTER,
      ToastAndroid.SHORT
    )
    }).catch((e) => {
      console.log('Error', e);
    });
 
  }


  const handleClick = async () => {
    try {
      // Check for Permission (check if permission is already given or not)
      let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

      if (!isPermitedExternalStorage) {

        // Ask for permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          newFunction()
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted (calling our exportDataToExcel function)
          exportToExcel();
          console.log("Permission granted");
        } else {
          // Permission denied
          console.log("Permission denied");
        }
      } else {
        // Already have Permission (calling our exportDataToExcel function)
        exportToExcel();
      }
    } catch (e) {
      console.log('Error while checking permission');
      console.log(e);
      return
    }

  };

  return (
    <View>
      <TouchableOpacity
        onPress={(e) =>  {
          onpressecel()
          handleClick()}}
        style={onprestyle}>
        <Text style={text}> {locale === 'ar_MA'?"Excel تحويل":"Excel Converter"}</Text>
      </TouchableOpacity>
    </View>
  )}
function newFunction(): ReactNetiv.Rationale | undefined {
  return {
    title: "Storage permission needed",
    buttonNeutral: "Ask Me Later",
    buttonNegative: "Cancel",
    buttonPositive: "OK"
  };
}

