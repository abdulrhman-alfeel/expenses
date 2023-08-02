import { View, Text,ImageBackground } from 'react-native'
import React,{useEffect} from 'react'

export default function Homeing  ({navigation}) {
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            setTimeout(()=>{navigation.navigate('Home')},2000)
        })
        return unsubscribe
    },[navigation])

  return (
    <ImageBackground style={{flex:1}} source={require('./ass/Home.png')} resizeMode="stretch">
    </ImageBackground>
  )
}

