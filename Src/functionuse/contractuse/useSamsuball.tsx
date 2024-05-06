export default function useSamsuball() {
  const sumSuball = newadd => {
    let objectsDoler = [];
    let objectsYR = [];
    let objectsSR = [];

    newadd.forEach((item, index) => {
      objectsDoler.push({x: parseInt(item.SumDollar)});
      objectsSR.push({x: parseInt(item.SumِSR)});
      objectsYR.push({x: parseInt(item.SumِYR)});
    });
    const sumDoler = objectsDoler.reduce(
      (accumulator, currentValue) => accumulator + currentValue.x,
      0,
    );
    //sum reduce SR
    const sumYR = objectsYR.reduce(
      (accumulator, currentValue) => accumulator + currentValue.x,
      0,
    );
    const sumSR = objectsSR.reduce(
      (accumulator, currentValue) => accumulator + currentValue.x,
      0,
    );
    return {sumSR: sumSR, sumYR: sumYR, sumDoler: sumDoler};
    // setSum({...Sumall, sumSR: sumSR, sumYR: sumYR, sumDoler: sumDoler});
  };

  return sumSuball;
}
