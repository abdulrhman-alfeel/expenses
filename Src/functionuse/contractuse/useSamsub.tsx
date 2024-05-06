import {useSelector} from 'react-redux';
export default function useSamsub() {
  const {Language} = useSelector(state => state.userReducer);
  
  const sumSub = finddata => {
    let objectsDoler = [];
    let objectYR = [];
    let objectSR = [];
    finddata?.Databes.forEach((item, index) => {
      item.arthDath === Language.AmericandollarShort
        ? objectsDoler.push({x: parseInt(item.sectionpriclabrr)})
        : item.arthDath === Language.RialSudiaShort
        ? objectSR.push({x: parseInt(item.sectionpriclabrr)})
        : objectYR.push({x: parseInt(item.sectionpriclabrr)});
    });

    const sumSR = objectSR.reduce(
      (accumulator, currentValue) => accumulator + currentValue.x,
      0,
    );
    const sumDoler = objectsDoler.reduce(
      (accumulator, currentValue) => accumulator + currentValue.x,
      0,
    );
    const sumYR = objectYR.reduce(
      (accumulator, currentValue) => accumulator + currentValue.x,
      0,
    );

    return {sumSR: sumSR, sumYR: sumYR, sumDoler: sumDoler};
    // setSum({...Sum, sumSR: sumSR, sumYR: sumYR, sumDoler: sumDoler});
  };

  return sumSub;
}
