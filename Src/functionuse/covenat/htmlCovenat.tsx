import {useSelector} from 'react-redux';
import {Tofixed} from '../contractuse/expTemplet';
export default function usehtmlCovenat() {
  const {tasksCOVENANT, tasksCOVENANTID, Language} = useSelector(
    state => state.userReducer,
  );

  const htmlCavenat = locale => {
    const options = {
      html: `
            <!DOCTYPE html>
        <html lang="ar">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <Style>
          body{
              width: 95%;
              margin: auto;
              margin-top: 35px;
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
        padding: 3px;
        text-align: center;
        font-family:'Tajawal';
        font-size: 11px;
        border-bottom: 1px solid #ccc;
        font-weight: bold;
        }
        .footer{
          height: 70px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 100px;
        
        }
        .namedata{
          display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        height:70%;
        padding: 5px;
        }
        h4{
          font-family:'Tajawal';
        }
        h5 {
          font-family:'Tajawal';
          margin: auto;
        }
        p{
          margin: 5px;
          font-family:'Tajawal';
        }
        span{
          height: 80%;
          margin: auto;
          margin-left: 10px;
          text-align: center;
        }
        </Style>
        <body>
        
        <table>
           <thead>
                               <tr>
                                      <thead>
                                             <tbody>
                                              <th style="text-align: center;border-color: #333;"  colspan="9">${
                                                Language.Disclaimer_of_all_covenants
                                              }</th>
                                                 <tr>
                                                 <th scope="col" rowspan="2">${
                                                   Language.number
                                                 }</th>
                                                 <th scope="col" rowspan="2">${
                                                   Language.The_amount_evacuated
                                                 }</th>
                                                 <th scope="col" rowspan="2">${
                                                   Language.Total
                                                 }</th>
                                                 <th scope="col" rowspan="2">${
                                                   Language.State_of_the_Covenant
                                                 }</th>
                                                 <th scope="col" rowspan="2">${
                                                   Language.Provider_Or_Recipient_of_the_Covenant
                                                 }</th>
                                                 <th scope="col" rowspan="2">${
                                                   Language.Date
                                                 } </th>
                                                 <th scope="col" colspan="2"  rowspan="2">${
                                                   Language.name
                                                 }</th>         
                                                     <!-- rowspan="2" هذه للدمج عمودي -->
                                                 </tr>                                  
                                             </tbody>
                                     </thead>
                                     </tr>         
                                     <tbody>  
                                     ${tasksCOVENANT
                                       .map(
                                         (pic, index) =>
                                           `                
                                         <tr>
                                             <td>${pic.phone}</td>
                                             <td>${
                                               pic.kindmony +
                                               Tofixed(pic.DescPush)
                                             }</td>
                                             <td>${
                                               pic.kindmony +
                                               Tofixed(pic.SumCash)
                                             }</td>
                                             <td>${
                                               pic.Done === false
                                                 ? Language.unFinished
                                                 : Language.Finished
                                             }</td>
                                             <td>${pic.caseused}</td>
                                             <td>${pic.TimeDate}</td>
                                             <td colspan='2'>${
                                               pic.describtion
                                             }</td>
                                             <td>${index + 1}</td>
                                     </tr>    
                                     `,
                                       )
                                       .join('')}        
                                     </tbody>
                                  <tr>
                               <thead>
                               </table>
                 <footer class="footer">
                  <div class="namedata">
                  <h4>BY:</h4>
                  <span>
                  <h5>م:عبدالرحمن محمد الفيل</h5>
                  <h5>Abdulrhman mohammed AlFil</h5>
              </span>
                </div>
                  <div class="namedata">
                  <P>phon:775227593</P>
                  <P>phon:718295860</P>
              </div>
                 </footer>
        </body>
        </html>
           `,
      fileName: `Exprenss_All_Covenent_pdf_${new Date().toLocaleDateString()}`,
      directory: 'Documents',
    };
    return options;
  };
  const findCavenat = () => {
    const findTaskss = tasksCOVENANT.find(pic => pic.ID === tasksCOVENANTID);
    return findTaskss;
  };

  const findDonestrue = () => {
    const Done = tasksCOVENANT.find(tasks => tasks.ID === tasksCOVENANTID);
    const Donestrue = Done?.Done;
    return Donestrue;
  };
  const htmlconvenantSub = locale => {
    const findTaskss = findCavenat();
    const options = {
      html: `
      <!DOCTYPE html>
  <html lang="ar">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <Style>
    body{
        width: 95%;
        margin: auto;
        margin-top: 35px;
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
  padding: 3px;
  text-align: center;
  font-family:'Tajawal';
  font-size: 11px;
  border-bottom: 1px solid #ccc;
  font-weight: bold;
  }
  .footer{
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
  
  }
  .namedata{
    display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height:70%;
  padding: 5px;
  }
  h4{
    font-family:'Tajawal';
  }
  h5 {
    font-family:'Tajawal';
    margin: auto;
  }
  p{
    margin: 5px;
    font-family:'Tajawal';
  }
  span{
    height: 80%;
    margin: auto;
    margin-left: 10px;
    text-align: center;
  }
  </Style>
  <body>
  ${tasksCOVENANT
    .filter(item => item.ID === tasksCOVENANTID)
    .map(
      (pic, index) =>
        `
  <table>
     <thead>
<tr>
                                <thead>
                                       <tbody>
                                        <th style="text-align: center;border-color: #333;"  colspan="7">${
                                          Language.Detailed_disclosure_of_the_detailed_covenant
                                        }</th>
                                           <tr>
                                               <th scope="col" rowspan="2">${
                                                 Language.number
                                               }</th>
                                               <th scope="col" rowspan="2">${
                                                 Language.The_amount_evacuated
                                               }</th>
                                               <th scope="col" rowspan="2">${
                                                 Language.Total
                                               }</th>
                                               <th scope="col" rowspan="2">${
                                                 Language.State_of_the_Covenant
                                               }</th>
                                               <th scope="col" rowspan="2">${
                                                 Language.Provider_Or_Recipient_of_the_Covenant
                                               }</th>
                                               <th scope="col" rowspan="2">${
                                                 Language.Date
                                               } </th>
                                               <th scope="col" colspan="2"  rowspan="2">${
                                                 Language.name
                                               }</th>    
                                               <!-- rowspan="2" هذه للدمج عمودي -->
                                           </tr>                                  
                                       </tbody>
                               </thead>
                               </tr>         
                               <tbody>                  
                                   <tr>
                                       <td>${pic.phone}</td>
                                       <td>${
                                         pic.kindmony + Tofixed(pic.DescPush)
                                       }</td>
                                       <td>${
                                         pic.kindmony + Tofixed(pic.SumCash)
                                       }</td>
                                       <td>${
                                         pic.Done === false
                                           ? Language.unFinished
                                           : Language.Finished
                                       }</td>
                                       <td>${pic.caseused}</td>
                                       <td>${pic.TimeDate}</td>
                                       <td>${pic.describtion}</td>
                               </tr>            
                               </tbody>
                            <tr>
                         <thead>
                         </table>
                         ${pic.arrayOprition.map(
                           (item, index) =>
                             `  <table>
                         <tbody>
                         <th style="text-align: center;border-color: #333; background-color:darkblue;"  colspan="5">${
                           Language.A_detailed_statement_of_the_covenant_release
                         }</th>   
                       <tbody style="align-self:center; justify-content:center">
                                      <tr>
                                        <th scope="col" rowspan="2">${
                                          Language.the_amount_vacated_so_far
                                        }</th>
                                        <th scope="col" rowspan="2"> ${
                                          Language.Date
                                        } </th>
                                        <th scope="col" rowspan="2">${
                                          Language.Amount
                                        }</th>
                                        <th scope="col"   rowspan="2">${
                                          Language.Details
                                        }</th>        
                                        <th scope="col"  rowspan="2">${
                                          Language.m
                                        }</th>        
                                    </tr>
                                </tbody>
                        </thead>
                        </tr>         
                        <tbody>
                            <tr>
                                <td>${Tofixed(item.thremn)}</td>
                                <td>${item.TimeCovenant}</td>
                                <td>${Tofixed(item.Covenantday)}</td>
                                <td>${item.Describtions}</td>
                                <td>${index + 1}</td>
                        </tr>                
                        </tbody>
                    </tbody>
                        <!-- tm-app-feature-header -->
                    </table>
                    <div style="margin-bottom: 20px; flex-direction: column; display: flex;width: 100%; margin: auto;">
                    <h4 style="padding:5px;width:50%;margin:auto; text-align: center;border-color: #333; color:#ccc;border-radius: 15px; background-color:rgb(9, 9, 53);" colspan="5">${
                      Language.Evacuation_attachments
                    }</h4>
                <div  style="flex-wrap: wrap; flex-direction: row; display: flex;width: 95%; margin: auto;">
                ${item.imagop.map(
                  it =>
                    `<div style=" margin: 5px;width:200px; height:200px; border-radius:10px; background-color: #b8cef9;">
                    <img src=${it.image}  style="width: 100%;height: 100%;" />
                </div>`,
                )}
                </div>
                `,
                         )}`,
    )
    .join('')}  
           <footer class="footer">
            <div class="namedata">
            <h4>BY:</h4>
            <span>
            <h5>م:عبدالرحمن محمد الفيل</h5>
            <h5>Abdulrhman mohammed AlFil</h5>
        </span>
          </div>
            <div class="namedata">
            <P>phon:775227593</P>
            <P>phon:718295860</P>
        </div>
           </footer>
  </body>
  </html>
     `,
      fileName: `Exprenss_${
        findTaskss?.describtion
      }pdf_${new Date().toDateString()}`,
      directory: 'Documents',
    };
    return options;
  };

  const arraPrss = locale => {
    let arrays = [];
    tasksCOVENANT
      .filter(item => item.ID === tasksCOVENANTID)
      .map((pic, index) =>
        arrays.push({
          [Language.He_has_no_mobile_number]: pic.phone,
          [Language.The_amount_evacuated]: pic.kindmony + Tofixed(pic.DescPush),
          [Language.Total]: pic.kindmony + Tofixed(pic.SumCash),
          [Language.State_of_the_Covenant]:
            pic.Done === false ? Language.unFinished : Language.Finished,
          [Language.Provider_Or_Recipient_of_the_Covenant]: pic.caseused,
          [Language.Date_of_receipt_of_covenant]: pic.TimeDate,
          [Language.name]: pic.describtion,
        }),
      );
    tasksCOVENANT
      .find(item => item.ID === tasksCOVENANTID)
      ?.arrayOprition.forEach((item, index) =>
        arrays.push({
          [Language.The_amount_evacuated]: Tofixed(item.thremn),
          [Language.Date]: item.TimeCovenant,
          [Language.Total]: Tofixed(item.Covenantday),
          [Language.Details]: item.Describtions,
          [Language.m]: index + 1,
        }),
      );
    return arrays;
  };

  const arraPrssAll = locale => {
    let arrays = [];
    tasksCOVENANT.map((pic, index) =>
      arrays.push({
        [Language.He_has_no_mobile_number]: pic.phone,
        [Language.The_amount_evacuated]: pic.kindmony + Tofixed(pic.DescPush),
        [Language.Total]: pic.kindmony + Tofixed(pic.SumCash),
        [Language.State_of_the_Covenant]:
          pic.Done === false ? Language.unFinished : Language.Finished,
        [Language.Provider_Or_Recipient_of_the_Covenant]: pic.caseused,
        [Language.Date_of_receipt_of_covenant]: pic.TimeDate,
        [Language.name]: pic.describtion,
      }),
    );
    return arrays;
  };
  return {
    htmlCavenat,
    htmlconvenantSub,
    arraPrss,
    findCavenat,
    findDonestrue,
    arraPrssAll,
  };
}
