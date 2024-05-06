import {View, Text, StyleSheet, Animated, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../constants/colors';
import About from './About ';
import Cashbsns from './cashbsns/Cashbsns';
import Covenanting from './covenent/Covenanting';
import {useSelector, useDispatch} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import {RFValue} from 'react-native-responsive-fontsize';
import PagerView from 'react-native-pager-view';
import useEnquryLanguag from '../functionuse/EnquryLanguag';
export let searchinpro = '';

function MyTabBar({state, descriptors, navigation, position}) {
  const {rowS} = useEnquryLanguag();

  return (
    <View style={{flexDirection: rowS()}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          // outputRange: [20,8,6],
          // extrapolate:'extend'
          outputRange: inputRange.map(i => (i === index ? 1 : 3)),
        });
        return (
          <Pressable
            android_ripple={{color: colors.WHITE}}
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: route.name == 'Cashbsns' ? 1.2 : 1,
              marginHorizontal: RFValue(2),
              justifyContent: 'space-between',
              marginVertical: RFValue(10),
              borderBottomWidth: isFocused ? RFValue(2) : 0,
              padding: RFValue(5),
              // backgroundColor: isFocused? colors.CURRENT : null,
              // borderRadius: isFocused ? 4 : 10
            }}>
            <Animated.Text
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                color: colors.CURRENT,
                opacity: opacity,
              }}>
              {label}
            </Animated.Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function My_profile({navigation}) {
  const {Language} = useSelector(state => state.userReducer)
  useEffect(() => {
    createchannels();

    // addlangog()
    // return unsubscribe
  }, []);

  function createchannels() {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  }
  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      <Tab.Navigator
        removeClippedSubviews
        tabBar={props => <MyTabBar {...props} />}
        initialRouteName="About">
        <Tab.Screen
          name="About"
          component={About}
          options={{tabBarLabel: Language.Tasks}}
        />
        <Tab.Screen
          name="Cashbsns"
          component={Cashbsns}
          options={{tabBarLabel: Language.Debts}}
        />
        <Tab.Screen
          name="Covenanting"
          component={Covenanting}
          options={{tabBarLabel: Language.Covenant}}
        />
      </Tab.Navigator>
    </PagerView>
  );
}
const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    justifyContent: 'space-between',
    // backgroundColor:colors.CURRENT,
  },
  buttomcoloor: {
    width: 30,
    height: 30,
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    top: 10,
    marginHorizontal: 15,
    borderRadius: 20,
  },
  Avatar: {
    width: 80,
    height: 80,
    margin: 5,
    elevation: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.ORANGE,
  },
  Avtersima: {
    width: '90%',
    justifyContent: 'space-around',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap-reverse',
    // borderWidth:1
  },
  modleconten: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modleconten1: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  theemte: {
    width: '100%',
    alignItems: 'center',
  },
  colorss: {
    width: '98%',
    justifyContent: 'space-around',
    alignSelf: 'center',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap-reverse',
    // borderWidth:1
  },
  prents: {
    width: 50,
    height: 50,
    margin: 5,
    elevation: 5,
    borderRadius: 15,
  },
  Molescolr: {
    height: '50%',
    width: '90%',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: colors.WHITE,
  },
  centered_view: {
    flex: 1,
    backgroundColor: '#00000039',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contfavorit: {
    backgroundColor: colors.BORDER,
    borderRadius: 5,
    padding: 5,
    margin: 4,
  },
  favorit: {
    width: '80%',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignItems: 'baseline',
  },
  textfavor: {
    fontSize: 10,
    color: colors.GREYD,
  },
  sectionconteiner1: {
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  sectionconteiner_sub: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectioncountener_sub1: {
    flex: 1,
    // borderWidth:1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 5,
    padding: 5,
  },
  sectioncountener_sub2: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 5,
    padding: 5,
  },
  sectioncountener_sub3: {
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 1,
    // margin:5,
    // padding:5
  },
  contsec: {
    // backgroundColor:colors.BLACK,
    height: '90%',
  },
  conter: {
    borderBottomWidth: 3,
    borderBottomColor: colors.GREYD,
    borderRadius: 2,
  },
  text: {
    top: 5,
    color: colors.GREYD,
    fontWeight: 'bold',
    fontSize: 14,
  },
  textbod: {
    //  top:5,
    color: colors.GREYD,
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
  textheder: {
    color: colors.GREYD,
    fontWeight: 'bold',
    fontSize: 20,
  },
  textRayan: {
    fontWeight: 'bold',
    fontSize: 27,
  },
  textRayanimg: {
    fontWeight: 'bold',
    fontSize: 10,
    backgroundColor: colors.GREYD,
    color: colors.WHITE,
    padding: 2,
    borderRadius: 5,
    marginTop: 5,
  },
  descrebtext: {
    width: '80%',
    padding: 5,
    // margin:5,
    fontSize: 12,
    color: colors.BLACK,
    lineHeight: 25,
  },
  body: {
    // borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 5,
    width: '100%',
    height: '100%',
    backgroundColor: colors.WHITE,
  },
  senction1: {
    flex: 0.5,
    width: '100%',
    margin: 15,
    alignItems: 'center',
  },
  senction2: {
    flex: 3,
    borderRadius: 15,
    width: '100%',
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // height:300,
  },
  senction3: {
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
    borderRadius: 15,
    backgroundColor: colors.GREY,
    width: '95%',
  },
  senction4: {
    flex: 5,
    marginVertical: 10,
    marginHorizontal: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.BACKGRUONDPAG,
    borderRadius: 15,
    width: '95%',
    overflow: 'hidden',
  },
  imags: {
    justifyContent: 'center',
    width: '45%',
    height: '60%',
  },
  imagspag: {
    justifyContent: 'center',
    width: '50%',
    height: '70%',
  },
  frondt: {
    width: 105,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    top: 40,
  },
});
