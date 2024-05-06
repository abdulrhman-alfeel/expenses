import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {setTasksCOVENANT, setTasksEVACUTION} from '../../redux/actions';
import PagerView from 'react-native-pager-view';
import CrueatCovenant from './CrueatCovenant';
import SubprodectCovenant from './SubprodectCovenant';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function Covenanting({navigation}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTasks();
      getEVacution();
    });
    return unsubscribe;
  }, []);

  const getTasks = () => {
    try {
      AsyncStorage.getItem('tasksCOVENANT').then(tasks => {
        const Taskstody = JSON.parse(tasks);
        if (Taskstody && typeof Taskstody === 'object') {
          dispatch(setTasksCOVENANT(Taskstody));
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const getEVacution = () => {
    try {
      AsyncStorage.getItem('tasksEVACUTION').then(tasks => {
        const Taskstody = JSON.parse(tasks);
        if (Taskstody && typeof Taskstody === 'object') {
          dispatch(setTasksEVACUTION(Taskstody));
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <PagerView style={styles.pages} initialPage={0}>
      <Stack.Navigator
        initialRouteName="CrueatCovenant"
        screenOptions={() => ({header: () => null})}>
        <Stack.Screen name="CrueatCovenant" component={CrueatCovenant} />
        <Stack.Screen
          name="SubprodectCovenant"
          component={SubprodectCovenant}
        />
      </Stack.Navigator>
    </PagerView>
  );
}
const styles = StyleSheet.create({
  pages: {
    flex: 1,
  },
  body: {
    width: '100%',
    height: '100%',
    //borderWidth:RFValue(10),
  },
});
