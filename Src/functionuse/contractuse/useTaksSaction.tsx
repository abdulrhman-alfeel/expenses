import {useState} from 'react';
import useOnpressall from './useOnpressall';
import {useSelector} from 'react-redux';

export default function useTaksSaction(key) {
  const {Language} = useSelector(state => state.userReducer);
  const [dataSuction, setData] = useState([]);
  const [EditFoun, setEdit] = useState('إضافة');
  const [liprri, setLiprre] = useState(false);
  const [falseerr, setFalseerr] = useState(false);
  const [onPresslTask] = useOnpressall();

  const getDataSction = (TasksSac, allTsks) => {
    console.log(TasksSac.idHOM);
    let addnew = [];
    addnew = [...allTsks.databuld];
    if (TasksSac.sectiontitle.length > 0) {
      try {
        setLiprre(true);
        var datares = TasksSac;
        const index = allTsks.databuld.findIndex(
          tasks => tasks.idHOM === TasksSac.idHOM,
        );
        const finddata = allTsks.databuld.find(
          tasks => tasks.idHOM === TasksSac.idHOM,
        );
        var datares = TasksSac;
        if (finddata) {
          addnew[index] = datares;
          setEdit(Language.add);
        } else {
          addnew.push(datares);
        }

        key === 'Exit' ? onPresslTask(allTsks, addnew) : null;
        // console.log(addnew);
        setData(addnew);
        setLiprre(false);
      } catch (err) {
        console.log(err);
        setLiprre(false);
      }
      return addnew;
    } else {
      tost(Language.The_required_data_must_be_completed);
      setFalseerr(true);
    }
  };

  return {getDataSction, dataSuction, EditFoun, liprri, falseerr};
}
