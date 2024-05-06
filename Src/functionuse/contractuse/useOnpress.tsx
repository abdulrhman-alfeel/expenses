import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setTasksCONTRAT} from '../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {tost} from './expTemplet';
export default function useOnpress() {
  const {tasksCONTRAT, tasksCONTRATID, Language} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();
  const [allSav, setLiprre] = useState(false);
  const onEdit = sectionidnfy => {
    if (sectionidnfy.length === 0) {
      tost(Language.The_required_data_must_be_completed);
    } else {
      try {
        setLiprre(true);
        const newTasks = [...tasksCONTRAT];
        const index = tasksCONTRAT.findIndex(
          item => item.ID === tasksCONTRATID,
        );
        if (index > -1) {
          newTasks[index].sectionidnfy = sectionidnfy;
          AsyncStorage.setItem('TasksCONTRAT', JSON.stringify(newTasks)).then(
            () => {
              dispatch(setTasksCONTRAT(newTasks));
              tost(Language.SavedSuccessfully);
              setLiprre(false);
            },
          );
        } else {
          tost(Language.notSaved);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return [onEdit, allSav];
}
