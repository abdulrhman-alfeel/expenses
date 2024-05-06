import {useSelector} from 'react-redux';
import {Tofixed} from '../contractuse/expTemplet';
export default function usehtmlCash() {
  const {tasksConver, tasksCSHID, tasksCSH, Language} = useSelector(
    state => state.userReducer,
  );

  const htmlCash = locale => {
    // const filteCash = tasksConver.filter(
    //   item => item.IDCUST === tasksCSHID || item.idConver === tasksCSHID,
    // );
    // const lest_Cash = filteCash[filteCash.length - 1];

    const options = {
      html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <Style>
  body{
    width:95%
  }
      table {
      border-collapse: collapse;
      width: 90%;
      color: #333;
      font-family: Arial, sans-serif;
      font-size: 8px;
      text-align: left;
      padding: 5px;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      margin: auto;
      margin-top: 10px;
      margin-bottom: 10px;
   
    } 
    table th {
  background-color: #447dee;
  color: #fff;
  font-weight: bold;
  font-family:'Tajawal';
  font-size: 13px;
  padding: 3px;
  text-transform: uppercase;
  /* letter-spacing: 1px; */
  text-align: center;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #ccc;
  }
  table tr:nth-child(even) td {
  background-color: #f2f2f2;
  }
  table tr:hover td {
  background-color: #ffedcc;
  }
  table td {
  background-color: #fff;
  padding: 2px;
  text-align: center;
  font-family:'Tajawal';
  font-size: 13px;
  border-bottom: 1px solid #ccc;
  font-weight: bold;
  }
  </Style>
  <body>
                <table>
                          <thead>
                              <tr>
                           <thead>
                                  <tbody>
                                      <tr>
                                          <!-- the cell we want to combine -->
                                        
                                          <th scope="col" rowspan="2">${
                                            Language.Amount_paid_so_far
                                          }</th>
                                          <th scope="col" rowspan="2">${
                                            Language.Debt_start_date
                                          }</th>
                                          <th scope="col" rowspan="2">${
                                            Language.Total_amount_of_debt
                                          }</th>
                                          <th scope="col" rowspan="2">${
                                            Language.name
                                          }</th>
                                          <th scope="col" rowspan="2">${
                                            Language.class
                                          }</th>
                                          <th scope="col" rowspan="2">${
                                            Language.m
                                          }</th>
                                      </tr>
                                  </tbody>
                          </thead>
                          </tr>         
                          <tbody>
                          ${tasksCSH.map(
                            (pic, index) =>
                              ` <tr >
                              <td>${pic.codm + Tofixed(pic.DescPush)}</td>
                              <td>${new Date(
                                pic.selectedStartDateS,
                              ).toDateString()}</td>
                              <td>${pic.codm + Tofixed(pic.SumCash)}</td>
                              <td>${pic.caseuTarg}</td>
                              <td>${pic.caseused}</td>
                              <th scope="row">${index + 1}</th>
                          </tr>`,
                          )}
                          </tbody>
                          <!-- tm-app-feature-header -->
                      </table>                 
  </body>
  </html>`,
      fileName: `Exprenss_ALLCash_pdf_${new Date().toLocaleDateString()}`,
      // directory:RNFS.DownloadDirectoryPath ,
      directory: 'Documents',
      // directory: 'Download',
    };
    return options;
  };

  const htmlCashsub = locale => {
    const findTasks = tasksCSH.find(pic => pic.ID === tasksCSHID);
    const filteCash = findTasks.arryCahing;
    const lest_Cash = filteCash[filteCash.length - 1];
    const options = {
      html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <Style>
    body{
      width:95%
    }
        table {
        border-collapse: collapse;
        width: 90%;
        color: #333;
        font-family: Arial, sans-serif;
        font-size: 8px;
        text-align: left;
        padding: 5px;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        margin: auto;
        margin-top: 10px;
        margin-bottom: 10px;
      } 
      table th {
    background-color: #447dee;
    color: #fff;
    font-weight: bold;
    font-family:'Tajawal';
    font-size: 13px;
    padding: 3px;
    text-transform: uppercase;
    /* letter-spacing: 1px; */
    text-align: center;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #ccc;
    }
    table tr:nth-child(even) td {
    background-color: #f2f2f2;
    }
    table tr:hover td {
    background-color: #ffedcc;
    }
    table td {
    background-color: #fff;
    padding: 2px;
    text-align: center;
    font-family:'Tajawal';
    font-size: 13px;
    border-bottom: 1px solid #ccc;
    font-weight: bold;
    }
    </Style>
    <body>
                  <table>
                            <thead>
                                <tr>
                             <thead>
                                    <tbody>
                                    <tr>
                                    <!-- the cell we want to combine -->
                                    <th scope="col" rowspan="2">${
                                      Language.Last_payment_date
                                    }</th>
                                    <th scope="col" rowspan="2">${
                                      Language.Amount_paid_so_far
                                    }</th>
                                    <th scope="col" rowspan="2">${
                                      Language.Debt_start_date
                                    }</th>
                                    <th scope="col" rowspan="2">${
                                      Language.Total_amount_of_debt
                                    }</th>
                                    <th scope="col" rowspan="2">${
                                      Language.name
                                    }</th>
                                    <th scope="col" rowspan="2">${
                                      Language.class
                                    }</th>
                                    <th scope="col" rowspan="2">${
                                      Language.m
                                    }</th>
                                </tr>
                                    </tbody>
                            </thead>
                            </tr>         
                            <tbody>
                            ${tasksCSH
                              .filter(item => item.ID === tasksCSHID)
                              .map(
                                (pic, index) =>
                                  `<tr>
                                <td>${
                                  lest_Cash?.TiemPUSH?.length > 0
                                    ? lest_Cash.TiemPUSH
                                    : null
                                }</td>
                                <td>${pic.codm + Tofixed(pic.DescPush)}</td>
                                <td>${new Date(
                                  pic.selectedStartDateS,
                                ).toDateString()}</td>
                                <td>${pic.codm + Tofixed(pic.SumCash)}</td>
                                <td>${pic.caseuTarg}</td>
                                <td>${pic.caseused}</td>
                                <th scope="row">${index + 1}</th>
                            </tr>`,
                              )}
                            </tbody>
                            <!-- tm-app-feature-header -->
                        </table>
                  <table>
                    <header>
                        <h1 style=" font-size: 13px; text-align: center;">${
                          Language.payments_and_money_transfers
                        }</h1>
                    </header>
                            <thead>
                                <tr>
                             <thead>
                                    <tbody>
                                        <tr>
                                            <th style="text-align: center;border-color: #333;" colspan="2">${
                                              Language.Conversion_Process
                                            }</th>
                                            <!-- the cell we want to combine -->
                                            <th scope="col" rowspan="2">${
                                              Language.Installment_date
                                            }</th>
                                            <th scope="col" rowspan="2">${
                                              Language.Installment_number
                                            }</th>
                                            <th scope="col" rowspan="2">${
                                              Language.name
                                            }</th>
                                            <th scope="col" rowspan="2">${
                                              Language.class
                                            }</th>
  
    
                                            <!-- rowspan="2" هذه للدمج عمودي -->
                                        </tr>
                                        <th scope="col">${
                                          Language.Transfer_amount
                                        }</th>
                                        <th scope="col">${
                                          findTasks?.caseused.includes(
                                            Language.To_Push,
                                          )
                                            ? Language.the_person_transferred_from
                                            : Language.the_person_to_whom_the_transfer_is_made
                                        } </th>
                                        
                                    </tbody>
    
                            </thead>
                            </tr>         
                            <tbody>
                            ${findTasks.arryCahing
                              .map(
                                (pic, index) =>
                                  `<tr >
                                    <td>${Tofixed(pic.money_transfer)}</td>
                                    <td>${
                                      findTasks?.caseused.includes(
                                        Language.To_Push,
                                      )
                                        ? tasksCSH.find(
                                            item => item.ID === pic.IDCUST,
                                          )?.caseuTarg
                                        : pic.conver
                                    }</td>
                                    <td>${pic.TiemPUSH}</td>
                                    <td>${index + 1}</td>
                                    <td>${findTasks.caseuTarg}</td>
                                    <td>${findTasks.caseused}</td>
                                </tr>`,
                              )
                              .join('')}
                            </tbody>
                            <!-- tm-app-feature-header -->
                        </table>
    </body>
    </html>`,
      fileName: `contract_Cash_${
        findTasks?.caseuTarg
      }pdf_${new Date().toTimeString()}`,
      // directory:RNFS.DownloadDirectoryPath ,
      directory: 'Documents',
      // directory: 'Download',
    };
    return options;
  };

  const arraPrss = locale => {
    let optionsC = [];

    const findTasks = tasksCSH.find(pic => pic.ID === tasksCSHID);
    const filteCash = findTasks.arryCahing;
    const lest_Cash = filteCash[filteCash.length - 1];
    tasksCSH
      .filter(item => item.ID === tasksCSHID)
      .map((pic, index) =>
        optionsC.push({
          [Language.Last_payment_date]: lest_Cash?.TiemPUSH,
          [Language.Amount_paid_so_far]: pic.codm + Tofixed(pic.DescPush),
          [Language.Debt_start_date]: pic.selectedStarateS,
          [Language.Total_amount_of_debt]: pic.codm + Tofixed(pic.SumCash),
          [Language.name]: pic.caseuTarg,
          [Language.class]: pic.caseused,
          [Language.m]: index + 1,
        }),
      );
    findTasks.arryCahing?.forEach((pic, index) =>
      optionsC.push({
        [Language.Converter]: findTasks.caseused.includes('دفع')
          ? tasksCSH.find(item => item.ID === pic.IDCUST).caseuTarg
          : pic.conver,
        [Language.Transfer_amount]: Tofixed(pic.money_transfer),
        [Language.Installment_date]: pic.TiemPUSH,
        [Language.Installment_number]: index + 1,
        [Language.Installment_number]: findTasks.caseuTarg,
        [Language.class]: findTasks.caseused,
      }),
    );
    return optionsC;
  };

  const arraPrssAll = () => {
    try {
      const arrays = [];
      // const filteCash = tasksConver.filter(
      //   item => item.IDCUST === tasksCSHID || item.idConver === tasksCSHID,
      // );
      // const lest_Cash = filteCash[filteCash.length - 1];
      tasksCSH.map((pic, index) =>
        arrays.push({
          // 'تاريخ اخر عملية سداد': lest_Cash?.TiemPUSH,
          [Language.Amount_paid_so_far]: pic.codm + Tofixed(pic.DescPush),
          [Language.Debt_start_date]: pic.selectedStarateS,
          [Language.Total_amount_of_debt]: pic.codm + Tofixed(pic.SumCash),
          [Language.name]: pic.caseuTarg,
          [Language.class]: pic.caseused,
          [Language.m]: index + 1,
        }),
      );
      return arrays;
    } catch (err) {
      console.log(err);
    }
  };
  return {htmlCash, htmlCashsub, arraPrss, arraPrssAll};
}
