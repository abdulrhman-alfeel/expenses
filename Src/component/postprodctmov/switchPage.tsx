import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, Pressable, Text} from 'react-native';
import {colors} from '../../constants/colors';
import {useSelector, useDispatch} from 'react-redux';
import {setTasksCONTRATID} from '../../redux/actions';
import Creattaskmove from './creattaskmove';
import {styles} from '../../contracting/styles';
import {searching} from '../../contracting/Contracting';
import {RFValue} from 'react-native-responsive-fontsize';
import {Tofixed} from '../../functionuse/contractuse/expTemplet';
import useEnquryLanguag from '../../functionuse/EnquryLanguag';
export default function SwitchPage({navigation, SElect}) {
  const {tasksCONTRAT, Language} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const {rowS} = useEnquryLanguag();

  useEffect(() => {
    console.log(tasksCONTRAT);
    navigation.addListener('focus', () => {
      setTimeout(async () => {
        await SumFunction();
      }, 5000);
    });
  }, [searching, Sum]);
  const [dates, setSetData] = useState(0);
  const [rials, setRials] = useState('');
  const [rial, setRia] = useState('');
  const [doler, setDor] = useState('');
  const [Sum, setSu] = useState('');
  const onpress = () => {
    dates === 0 ? setSetData(1) : setSetData(0);
  };
  const data_footer = () => {
    // rial,rialS,doler,
    return (
      <View
        style={{
          backgroundColor: colors.WHITE,
          flexDirection: rowS(),
          padding: RFValue(2),
        }}>
        <View style={styles.sumsng}>
          <Text style={{flex: 1, color: colors.CURRENT}}>{Language.Total}</Text>
        </View>
        <View
          style={[
            dates === 1 ? {height: RFValue(50)} : {height: RFValue(30)},
            {flexDirection: 'column', flex: 1},
          ]}>
          <Pressable
            onPress={onpress}
            android_ripple={{color: colors.YALO, borderless: true}}>
            <Text style={styles.textaddBottom}>
              {parseInt(Sum) > 0 ? Tofixed(Sum) : 0}
            </Text>
          </Pressable>
          <View
            style={[
              dates === 0
                ? {display: 'none'}
                : {
                    display: 'flex',
                    flex: 2,
                    flexDirection: rowS(),
                    justifyContent: 'space-around',
                  },
            ]}>
            <Text
              style={[{width: '30%'}, styles.textaddfoter]}
              numberOfLines={1}>
              {parseInt(rials) > 0 ? Tofixed(rials) : 0}
              {Language.RialSudiaShort}
            </Text>
            <Text
              style={[{width: '30%'}, styles.textaddfoter]}
              numberOfLines={1}>
              {parseInt(rial) > 0 ? Tofixed(rial) : 0}
              {Language.RialYemeniShort}
            </Text>
            <Text
              style={[{width: '30%'}, styles.textaddfoter]}
              numberOfLines={1}>
              ${parseInt(doler) > 0 ? Tofixed(doler) : 0}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const datItem = useCallback(
    searching?.length > 0
      ? tasksCONTRAT.filter(
          item =>
            (item.databuld.find(
              ite =>
                ite.sectiontitle
                  .toLowerCase()
                  .includes(searching?.substring(0, 2)) ||
                ite.abzrphtion
                  .toLowerCase()
                  .includes(searching?.substring(0, 2)) ||
                ite.Databes.find(
                  i =>
                    i.sectiontitle
                      .toLowerCase()
                      .includes(searching?.substring(0, 2)) ||
                    i.sectionpriclabrr
                      .toLowerCase()
                      .includes(searching?.substring(0, 2)) ||
                    i.abzrphtion
                      .toLowerCase()
                      .includes(searching?.substring(0, 2)),
                ),
            ) &&
              item.Done === SElect) ||
            (item.sectionidnfy
              .toLowerCase()
              .includes(searching?.substring(0, 2)) &&
              item.Done === SElect),
        )
      : tasksCONTRAT.filter(item => item.Done === SElect),
    [tasksCONTRAT, searching],
  );

  const SumFunction = () => {
    let sumOpjectD = [];
    for (item of tasksCONTRAT) {
      if (item.Done === SElect) {
        sumOpjectD.push({
          x: parseInt(item.SumDollar),
          xS: parseInt(item.SumِSR),
          xR: parseInt(item.SumِYR),
        });
      }
      // data_footer(Sumd, rialS, riald, dolerd);
    }
    const dolerd = sumOpjectD.reduce(
      (accumulator, currentValue) => accumulator + currentValue.x,
      0,
    );
    const rialS = sumOpjectD.reduce(
      (accumulator, currentValue) => accumulator + currentValue.xS,
      0,
    );
    const riald = sumOpjectD.reduce(
      (accumulator, currentValue) => accumulator + currentValue.xR,
      0,
    );
    let Sumd = dolerd + rialS + riald;
    console.log(Sumd, 'hhhhhho', tasksCONTRAT);
    setSu(Sumd);
    setRials(rialS);
    setRia(riald);
    setDor(dolerd);
  };

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <Creattaskmove
          keys={index}
          SumDollar={Tofixed(item.SumDollar)}
          onpress={() => {
            dispatch(setTasksCONTRATID(item.ID));
            navigation.navigate('Subprodect');
          }}
          SumِSR={Tofixed(item.SumِSR)}
          SumِYR={Tofixed(item.SumِYR)}
          sectionidnfy={item.sectionidnfy}
          Datetiem={item.Datetiem}
        />
      );
    },
    [searching],
  );

  return (
    <View style={styles.body}>
      <FlatList
        data={datItem}
        renderItem={renderItem}
        // keyExtractor={(item, index) => index.toString()}
      />
      {data_footer()}
    </View>
  );
}
