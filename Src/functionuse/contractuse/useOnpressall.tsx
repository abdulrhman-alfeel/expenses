import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setTasksCONTRAT} from '../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {tost} from './expTemplet';
import useSamsuball from './useSamsuball';
export default function useOnpressall() {
  const {tasksCONTRAT, tasksCONTRATID, Language} = useSelector(
    state => state.userReducer,
  );
  const [falseerr, setFalseerr] = useState(false);
  const dispatch = useDispatch();
  const [allSav, setLiprre] = useState(false);
  const sumSuball = useSamsuball();

  const onPresslTask = (allTsks, newadd) => {
    if (allTsks.sectionidnfy.length === 0) {
      tost(Language.The_required_data_must_be_completed);
      setFalseerr(true);
    } else {
      try {
        const {sumSR, sumYR, sumDoler} = sumSuball(
          newadd === 'pagHOm' ? allTsks.databuld : newadd,
        );
        setLiprre(true);
        const newTasks = [...tasksCONTRAT];
        let Task = {
          ...allTsks,
          databuld: newadd === 'pagHOm' ? allTsks.databuld : newadd,
          SumDollar: sumDoler.toString(),
          SumِSR: sumSR.toString(),
          SumِYR: sumYR.toString(),
        };
        const index = tasksCONTRAT.findIndex(
          item => item.ID === tasksCONTRATID,
        );
        if (index > -1) {
          newTasks[index] = Task;
        } else {
          newTasks.push(Task);
        }
        AsyncStorage.setItem('TasksCONTRAT', JSON.stringify(newTasks)).then(
          () => {
            dispatch(setTasksCONTRAT(newTasks));
            tost(Language.SavedSuccessfully);
            setLiprre(false);
          },
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
  return [onPresslTask, falseerr, allSav];
}
