import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setTasksCsh, setTasksCshConver} from '../../redux/actions';
import {tost} from '../contractuse/expTemplet';
import {Alert} from 'react-native';

export default function usePayment() {
  const {tasksCSH, tasksConver, Language} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();
  const Puchchshing = (idPush, payment, paushset) => {
    console.log(paushset);
    let already = false;
    let False = true;
    let cash = 0;
    let CashCover = 0;
    let falsing = false;
    let allCount = 0;
    let cashing = parseInt(payment.pushing);
    let datasum = 0;
    if (payment.nameConver?.length > 0) {
      if (payment.allConver?.includes(Language.partial)) {
        allCount = parseInt(payment.monyCnver);
      } else {
        allCount = parseInt(payment.pushing);
      }
    }

    let dataching: any[] = [];
    dataching = [...tasksCSH];
    const datacash = dataching.find(
      (item: {caseuTarg: string}) => item.caseuTarg === payment.nameTArg,
    );
    const index = tasksCSH.findIndex((item: {caseuTarg: string | string[]}) =>
      item.caseuTarg?.includes(payment.nameTArg),
    );
    const indexconver = tasksCSH.findIndex(
      (item: {caseuTarg: string | string[]}) =>
        item.caseuTarg?.includes(payment.nameConver),
    );
    const conver = tasksCSH.find((item: {caseuTarg: string | string[]}) =>
      item.caseuTarg?.includes(payment.nameConver),
    );
    if (payment.pushing.length > 0 && payment.nameTArg.length > 0) {
      const indexEdeitCober = tasksConver.findIndex(item => item.id === idPush);

      const EditArrayCov = conver?.arryCahing.findIndex(
        item => item.id === idPush,
      );
      const EditArray = datacash?.arryCahing.findIndex(
        item => item.id === idPush,
      );

      if (datacash?.DescPush) {
        if (EditArray > -1) {
          const cashingl =
            parseInt(datacash.DescPush) - parseInt(payment.pushSum);
          cashing = cashingl + cashing;
        } else {
          cashing += parseInt(datacash.DescPush);
        }
        if (cashing > parseInt(datacash.SumCash)) {
          Alert.alert(
            Language.The_transaction_cannot_be_Completed_the_payment2,
          );
          falsing = true;
          False = false;
        } else if (cashing === parseInt(datacash.SumCash)) {
          cash = cashing;
          dataching[index].Done = true;
        } else {
          cash = cashing;
          falsing = false;
        }
        // console.log(cashing);
      } else if (parseInt(datacash?.SumCash) < cashing) {
        Alert.alert(Language.The_transaction_cannot_be_Completed_the_payment);
        falsing = true;
        False = false;
      } else if (parseInt(datacash?.SumCash) === cashing) {
        cash = cashing;
        dataching[index].Done = true;
        falsing = false;
      } else {
        cash = cashing;
        falsing = false;
      }
      //conver
      if (
        paushset === Language.Receive &&
        payment.nameConver?.length > 0 &&
        falsing === false
      ) {
        if (EditArray > -1) {
          const datasumEid =
            parseInt(conver.DescPush) - parseInt(payment.pushSumCover);
          datasum = datasumEid + allCount;
          console.log(datasum, datasumEid);
        } else {
          datasum = parseInt(conver?.DescPush) + allCount;
        }
        if (conver.DescPush) {
          if (datasum > parseInt(conver.SumCash)) {
            falsing = true;
            Alert.alert(Language.the_Transaction_cannot_completed1);
            False = false;
          } else if (parseInt(payment.monyCnver) > parseInt(payment.pushing)) {
            falsing = true;
            Alert.alert(Language.the_Transaction_cannot_completed2);
            False = false;
          } else if (datasum === parseInt(conver.SumCash)) {
            CashCover = datasum;
            dataching[indexconver].Done = true;
            falsing = false;
          } else {
            CashCover = datasum;
            falsing = false;
          }
        } else {
          CashCover = datasum;
          falsing = false;
        }
      }
      if (falsing === false) {
        dataching[index].DescPush = cash.toString();
        let convercash: any[] = [];
        console.log(paushset);
        var Tasks = {
          cousused: paushset,
          id: idPush,
          IDCUST: datacash.ID,
          SumCash: datacash.SumCash,
          caseuTarg: payment.nameTArg,
          pushcash: payment.pushing.toString(),
          pushcashSum: cash,
          codm: datacash.codm,
          TiemStart: datacash.selectedStartDateS,
          TiemPUSH: new Date(Date.now()).toUTCString(),
          idConver:
            paushset === Language.Receive ? conver.ID : Language.To_Push,
          conver:
            paushset === Language.Receive
              ? payment.nameConver
              : Language.To_Push,
          money_transfer: allCount.toString(),
          allConver: payment.allConver,
        };
        if (EditArray > -1) {
          convercash = [...tasksConver];
          convercash[indexEdeitCober] = Tasks;
          datacash.arryCahing[EditArray] = Tasks;
          if (payment.nameConver?.length > 0) {
            dataching[indexconver].DescPush = CashCover.toString();
            conver.arryCahing[EditArrayCov] = Tasks;
          }
        } else {
          if (payment.nameConver.length > 0) {
            console.log(CashCover.toString());
            dataching[indexconver].DescPush = CashCover.toString();
            conver.arryCahing.push(Tasks);
          }
          convercash = [...tasksConver, Tasks];
          datacash.arryCahing.push(Tasks);
        }

        AsyncStorage.setItem('Taskscsh', JSON.stringify(dataching)).then(() => {
          dispatch(setTasksCsh(dataching));
          // navigation.navigate('profile')
        });
        AsyncStorage.setItem('Tasksconver', JSON.stringify(convercash)).then(
          () => {
            dispatch(setTasksCshConver(convercash));
            tost(Language.Successful_payment);
          },
        );
        already = true;
      }
    }
    return {False, already};
  };

  return Puchchshing;
}
