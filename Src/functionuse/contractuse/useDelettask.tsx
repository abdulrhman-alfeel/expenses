import {useState} from 'react';
import useSamsub from './useSamsub';
import useOnpressall from './useOnpressall';

export default function useDelettask(key) {
  const [databuldArray, setData] = useState([]);
  const sumSub = useSamsub();
  const [onPresslTask] = useOnpressall();

  const deletingall = Tasks => {
    const indexconten = Tasks.allTsks.databuld.findIndex(
      tasks => tasks.idHOM === Tasks.idHOM,
    );
    console.log(Tasks.idSub);
    let addnew = [];
    addnew = [...Tasks.allTsks.databuld];
    if (Tasks.caseused === 'headersub') {
      //  databes.push(filterDasec);
      const finddata = addnew.find(tasks => tasks.idHOM === Tasks.idHOM);
      const ind = finddata?.Databes.findIndex(
        tasks => tasks.idSub === Tasks.idSub,
      );
      if (finddata) {
        finddata.Databes.splice(ind, 1);
        const {sumSR, sumYR, sumDoler} = sumSub(finddata);
        addnew[indexconten].SumDollar = sumDoler;
        addnew[indexconten].SumِSR = sumSR;
        addnew[indexconten].SumِYR = sumYR;
        setData(addnew);
      }
    } else {
      const filterDasec = addnew.findIndex(
        tasks => tasks.idHOM === Tasks.idHOM,
      );
      if (filterDasec > -1) {
        addnew.splice(filterDasec, 1);
        setData(addnew);
      }
    }
    key === 'Exit' ? onPresslTask(Tasks.allTsks, addnew) : null;
  };
  return {deletingall, databuldArray};
}
