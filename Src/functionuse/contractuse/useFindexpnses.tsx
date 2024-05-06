import {useSelector} from 'react-redux';

export default function useFindexpnses() {
  const {tasksCONTRATID, tasksCONTRAT} = useSelector(
    state => state.userReducer,
  );

  const findTaskss = tasksCONTRAT.find(pic => pic.ID === tasksCONTRATID);

  return findTaskss;
}
