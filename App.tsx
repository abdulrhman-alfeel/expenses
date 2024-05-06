/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect, useState, Component} from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider, useSelector} from 'react-redux';
import {Store} from './Src/redux/store';
const Stack = createStackNavigator();
import {NavigationContainer} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import type {PropsWithChildren} from 'react';
import locales, {locale} from './Src/locale';

import {
  Pressable,
  Modal,
  StatusBar,
  TouchableOpacity,
  Text,
  useColorScheme,
  View,
  StyleSheet,
} from 'react-native';
import My_profile from './Src/tasks/My_profile';
import Tasks from './Src/Tasks';
import {colors} from './Src/constants/colors';
import {fonts} from './Src/constants/fonts';
import Taskscsh from './Src/Taskscsh';
import ModulsData from './Src/Modulsdata';
import Contracting from './Src/contracting/Contracting';
import TasksCovenant from './Src/TasksCovenant';
import Homeing from './Src/Homeing';
import {RFValue} from 'react-native-responsive-fontsize';
import PagerView from 'react-native-pager-view';
import ModulsCalculator from './Src/component/modulsCalculator';
import ModelsAbdu from './Src/component/modelsAbdu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import useEnquryLanguag from './Src/functionuse/EnquryLanguag';

const Tap = createBottomTabNavigator();
function Home() {
  const {rowS} = useEnquryLanguag();
  const {Language} = useSelector(state => state.userReducer);
  const [bellmodels, setBellmodels] = useState(false);
  const [calculator, setCalculator] = useState(false);
  // useEffect(()=>{searching.name = search;},[search])

  const styles = StyleSheet.create({
    pages: {
      flex: 1,
    },
  });

  return (
    <>
      {calculator ? (
        <ModulsCalculator
          visble={calculator}
          onrequewt={setCalculator}
          onprssfounction={() => null}
        />
      ) : null}
      <ModelsAbdu setBellmodel={setBellmodels} bellmodel={bellmodels} />
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        hidden={false}
        // translucent={true}
      />

      <PagerView style={styles.pages} initialPage={0}>
        <Tap.Navigator
          initialRouteName="مشاريعي"
          screenOptions={({route}) => ({
            // orientation: 'portrait',
            tabBarShowLabel: false,
            // tabBarButton:()=> null,
            tabBarLabelStyle: {fontFamily: fonts.CAIROREGULARK},
            tabBarIcon: ({focused, size, color}) => {
              let iconName;
              if (route.name === 'Contracting') {
                iconName = 'money-check-alt';
                size = focused ? 25 : 20;
                color = colors.CURRENT;
              } else {
                iconName = 'money-bill-alt';
                size = focused ? 25 : 20;
                color = colors.CURRENT;
              }
              return <FontAwesome5 name={iconName} size={size} color={color} />;
            },

            // tabBarActiveBackgroundColor:colors.BLACK,
            // tabBarVisibilityAnimationConfig: route.name === "Advertising" ? "shown" :"hiddan",
            tabBarActiveBackgroundColor: colors.YALO,
            // tabBarVisibilityAnimationConfig: route.name === "Advertising" ? "shown" :"hiddan",
            tabBarActiveTintColor: colors.CURRENT,
            tabBarInactiveTintColor: colors.BLACK,
            tabBarInactiveBackgroundColor: colors.WHITE,
          })}>
          <Tap.Screen
            name="Contracting"
            component={Contracting}
            options={{
              header: () => null,
            }}
          />
          <Tap.Screen
            name="Profile"
            component={My_profile}
            options={{
              header: () => {
                return (
                  <View
                    style={{
                      marginHorizontal: RFValue(15),
                      marginVertical: RFValue(10),
                      flexDirection: rowS(),
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        flex: 1.5,
                        fontFamily: fonts.CAIROBLACK,
                        color: colors.BLACK,
                        textShadowColor: colors.BORDER,
                        textShadowRadius: 0.2,
                      }}>
                      {Language.expenses}
                    </Text>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                        flex: 0.8,
                      }}>
                      <Pressable
                        android_ripple={{color: colors.YALO, borderless: true}}
                        style={{
                          height: RFValue(40),
                          width: RFValue(50),
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginHorizontal: 5,
                        }}
                        onPress={() => setCalculator(true)}>
                        <FontAwesome5Icon
                          name="calculator"
                          size={20}
                          color={colors.GREYD}
                        />
                      </Pressable>
                      <TouchableOpacity
                        style={{
                          height: RFValue(40),
                          width: RFValue(50),
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginHorizontal: 5,
                        }}
                        onPress={() => setBellmodels(true)}>
                        <FontAwesome5
                          style={{height: 25}}
                          name="phone"
                          color={colors.CURRENT}
                          size={18}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              },
              // header:()=>
              // header:()=>null,
            }}
          />
        </Tap.Navigator>
      </PagerView>
    </>
  );
}
type SectionProps = PropsWithChildren<{
  title: string;
}>;

class App extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content');
    StatusBar.setHidden(true);
  }
  render() {
    // const isDarkMode = useColorScheme() === 'dark';

    // const backgroundStyle = {
    //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    //   flex:1,
    //   height:'100%'
    // };

    return (
      <View style={{flex: 1}}>
        <Provider store={Store}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Homeing"
              screenOptions={() => ({header: () => null})}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Tasks" component={Tasks} />
              <Stack.Screen name="ModulsData" component={ModulsData} />
              <Stack.Screen name="Taskscsh" component={Taskscsh} />
              <Stack.Screen name="Homeing" component={Homeing} />
              <Stack.Screen name="TasksCovenant" component={TasksCovenant} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </View>
    );
  }
}
export default App;
