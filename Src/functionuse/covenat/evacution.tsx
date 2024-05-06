import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import {setTasksCOVENANT, setTasksEVACUTION} from '../../redux/actions';
import {tost} from '../contractuse/expTemplet';

export default function useEVacuationsing() {
  const {tasksCOVENANT, tasksEVACUTION, tasksCONTRAT, Language} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();

  const Evacuationsing = (IDEV, ObjectCovenant) => {
    let cash = 0;
    let falsing = false;
    const datacash = tasksCOVENANT.find(
      (item: {describtion: string}) =>
        item.describtion === ObjectCovenant.nameTArg,
    );
    let dataching: any[] = [];
    dataching = [...tasksCOVENANT];
    //خاص بالتحويل
    const index = tasksCOVENANT.findIndex(
      (item: {describtion: string | string[]}) =>
        item.describtion.includes(ObjectCovenant.nameTArg),
    );
    const find = dataching.find((item: {describtion: string | string[]}) =>
      item.describtion.includes(ObjectCovenant.nameTArg),
    );
    //خاص بالتعديل
    const indexEvacution = tasksEVACUTION.findIndex(
      (item: {id: string | string[]}) => item.id === IDEV,
    );
    const Editfunction = find.arrayOprition.findIndex(item => item.id === IDEV);

    if (datacash.DescPush.length > 0) {
      const cashing =
        parseInt(datacash.DescPush) + parseInt(ObjectCovenant.pushing);
      if (cashing > parseInt(datacash.SumCash)) {
        Alert.alert(Language.The_covenant_process_cannot_be_completed);
        falsing = true;
      } else if (cashing === parseInt(datacash.SumCash)) {
        cash = cashing;
        dataching[index].Done = true;
      } else {
        cash = cashing;
        falsing = false;
      }
      // console.log(cashing);
    } else if (parseInt(datacash.SumCash) < parseInt(ObjectCovenant.pushing)) {
      Alert.alert(Language.The_covenant_process_cannot_be_completed2);
      falsing = true;
    } else if (
      parseInt(datacash.SumCash) === parseInt(ObjectCovenant.pushing)
    ) {
      cash = parseInt(ObjectCovenant.pushing);
      dataching[index].Done = true;
      falsing = false;
    } else {
      cash = parseInt(ObjectCovenant.pushing);
      falsing = false;
    }
    //  arrayOprition
    if (falsing === false) {
      var Tasks = {
        id: IDEV,
        IDCUST: datacash.ID,
        SumCash: datacash.SumCash,
        Covenantday: parseInt(ObjectCovenant.pushing).toString(),
        TimeCovenant: new Date().toDateString(),
        Describtions: ObjectCovenant.descrbtion,
        imagop: ObjectCovenant.imagop,
        //اجمالي المدفوع لهذا اليوم
        CovenantSum: cash,
        kindmony: datacash.kindmony,
        //المتبقي
        thremn: parseInt(datacash.SumCash) - cash,
        caseused: ObjectCovenant.paushset,
      };
      let convercash = [];

      if (indexEvacution > -1) {
        cash = cash - parseInt(ObjectCovenant.Proveid);
        convercash = [...tasksEVACUTION];
        convercash[indexEvacution] = Tasks;
        find.arrayOprition[Editfunction] = Tasks;
        dataching[index].DescPush = cash.toString();
      } else {
        if (ObjectCovenant.constrltl.length > 0) {
          var Tasksctrc = {};
          var cashing = 0;
          const data = tasksCONTRAT.find(
            item => item.sectionidnfy === ObjectCovenant.constrltl,
          );

          if (data?.databuld.length > 0) {
            data.databuld.map(item =>
              item.Databes?.map(pic => {
                if (parseInt(datacash.DescPush) > 0) {
                  cashing =
                    parseInt(datacash.DescPush) +
                    parseInt(pic.sectionpriclabrr);
                } else {
                  cashing = parseInt(pic.sectionpriclabrr);
                }
                console.log(pic.arthDath, datacash.kindmony);
                if (pic.arthDath === datacash.kindmony) {
                  Tasksctrc = {
                    id: IDEV,
                    IDCUST: datacash.ID,
                    SumCash: datacash.SumCash,
                    Covenantday: pic.sectionpriclabrr,
                    TimeCovenant: pic.TimeSub,
                    Describtions:
                      pic.sectiontitle.length > 0
                        ? pic.sectiontitle
                        : pic.abzrphtion,
                    imagop: ObjectCovenant.imagop,
                    //اجمالي المدفوع لهذا اليوم
                    CovenantSum: cashing,
                    kindmony: datacash.kindmony,
                    //المتبقي
                    thremn: parseInt(datacash.SumCash) - cashing,
                    caseused: ObjectCovenant.paushset,
                  };
                  if (cashing <= parseInt(datacash.SumCash)) {
                    find?.arrayOprition.push(Tasksctrc);
                    convercash = [...tasksEVACUTION, Tasksctrc];
                    dataching[index].DescPush = cashing.toString();
                    falsing = false;
                  }
                } else {
                  Alert.alert(Language.The_amount_cannot_be_transferred);
                  falsing = true;
                }
              }),
            );
          } else {
            tost(Language.There_are_no_expenses_in_this_account);
            falsing = true;
          }
        } else {
          find?.arrayOprition.push(Tasks);
          convercash = [...tasksEVACUTION, Tasks];
          dataching[index].DescPush = cash.toString();
          falsing = false;
        }
      }
      if (!falsing) {
        AsyncStorage.setItem('tasksEVACUTION', JSON.stringify(convercash)).then(
          () => {
            dispatch(setTasksEVACUTION(convercash));
            tost(Language.Successfully_Evacuated);
            AsyncStorage.setItem(
              'tasksCOVENANT',
              JSON.stringify(dataching),
            ).then(() => {
              dispatch(setTasksCOVENANT(dataching));
              // navigation.navigate('profile')
            });
          },
        );
      }
    }

    return falsing;
  };

  return Evacuationsing;
}
