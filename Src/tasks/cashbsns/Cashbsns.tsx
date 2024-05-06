//import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
import {setTasksCsh, setTasksCshConver} from '../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CrueatingCAh from './CrueatingCAh';
import Subprodect from './Subprodect';
import PagerView from 'react-native-pager-view';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function Cashbsns() {
  const dispatch = useDispatch();
  useEffect(() => {
    getTasks();
    getTasksCah();
  }, []);

  const getTasks = () => {
    AsyncStorage.getItem('Taskscsh').then(tasks => {
      const Taskstody = JSON.parse(tasks);
      if (Taskstody && typeof Taskstody === 'object') {
        dispatch(setTasksCsh(Taskstody));
      }
    });
  };
  const getTasksCah = () => {
    AsyncStorage.getItem('Tasksconver').then(tasks => {
      const Taskstody = JSON.parse(tasks);
      if (Taskstody && typeof Taskstody === 'object') {
        dispatch(setTasksCshConver(Taskstody));
      }
    });
  };

  return (
    <PagerView style={styles.pages} initialPage={0}>
      <Stack.Navigator
        initialRouteName="CrueatingCAh"
        screenOptions={() => ({header: () => null})}>
        <Stack.Screen name="CrueatingCAh" component={CrueatingCAh} />
        <Stack.Screen name="Subprodect" component={Subprodect} />
      </Stack.Navigator>
    </PagerView>
  );
}

const styles = StyleSheet.create({
  pages: {
    // flex: 10
    marginVertical: RFValue(10),
    flex: 1,
  },
});
