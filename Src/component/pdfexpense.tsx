import React, { Component, useState, useEffect } from 'react';
import ReactNetiv, {
  Text,
  TouchableHighlight,
  View,
  Alert,
  Share,
  ToastAndroid,
  TouchableOpacity,
  PermissionsAndroid,
  requireNativeComponent
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import { useSelector, useDispatch } from "react-redux"
// import PDFView from 'react-native-pdf-view';
// import {locale}from '../Taskscsh';
import  locales,{locale}  from "../locale";
//  const CustomPdfView = requireNativeComponent();
function newFunction(): ReactNetiv.Rationale | undefined {
  return {
    title: "Storage permission needed",
    buttonNeutral: "Ask Me Later",
    buttonNegative: "Cancel",
    buttonPositive: "OK"
  };
}


export default function Pdfexpense(props): JSX.Element {

  // const findData = lest_Cash.find(pic => pic.IDCUST === tasksCSHID);

  const createPDF = async () => {
    const file = await RNHTMLtoPDF.convert(props.options);

    console.log(file.filePath);
    ToastAndroid.showWithGravity(locale === 'ar_MA'?'تم التحويل إلى ملف pdf  بنجاح':'Converted to PDF successfully',
    ToastAndroid.CENTER,
    ToastAndroid.SHORT
  )
    const fileExistS = await RNFS.exists(file.filePath);
    if (!fileExistS) {
      console.log('file doesnt exist')
      return
    }
  }

  const handleClick = async () => {
    try {
    await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
    } catch (err) {
      console.warn(err);
    }
    const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE); 
    const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    if(!readGranted || !writeGranted) {
      console.log('Read and write permissions have not been granted');
      return;
    }else{
      createPDF();
    }

  };
  return (
    <TouchableOpacity style={props.onprestyle} onPress={() => { props.onpressfale(); handleClick() }}>
      <Text style={props.text}>{locale==='ar_MA'?"تحويل PDF":"PDF Converter"}</Text>
    </TouchableOpacity>
  )

}
