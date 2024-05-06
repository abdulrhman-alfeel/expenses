import {useSelector} from 'react-redux';
import useFindexpnses from './useFindexpnses';
import {Tofixed} from './expTemplet';
export default function usehtmlContractuse() {
  const {tasksCONTRAT, Language, tasksCONTRATID} = useSelector(
    state => state.userReducer,
  );
  const findTaskss = useFindexpnses();

  const htmlContractuse = () => {
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
                            <th style="text-align: center;border-color: #333;"  colspan="8">${
                              Language.Detailed_account_statement
                            }</th>
                                <tr>
                                    <th style="text-align: center;border-color: #333;"  colspan="3">${
                                      Language.Total
                                    }</th>
                                    <th scope="col" rowspan="2">${
                                      Language.Status_Account
                                    }</th>
                                    <th scope="col" rowspan="2">${
                                      Language.Account_creation_time
                                    }</th>
                                    <th scope="col" rowspan="2">${
                                      Language.Account_creation_Date
                                    }</th>
                                    <th scope="col" colspan="2"  rowspan="2">${
                                      Language.nameAccount
                                    }</th>        
                                    <!-- rowspan="2" هذه للدمج عمودي -->
                                </tr>
                                <th scope="col">${Language.RialSudiaLong}</th>
                                <th scope="col">${
                                  Language.Americandollarlong
                                }</th>
                                <th scope="col">${
                                  Language.RialYemeniLong
                                }</th>                                      
                            </tbody>
                           
                               ${tasksCONTRAT
                                 .map(
                                   (pic, index) =>
                                     ` <tr>
                                       <td>${Tofixed(pic.SumِSR)}</td>
                                       <td>${Tofixed(pic.SumDollar)}</td>
                                       <td>${Tofixed(pic.SumِYR)}</td>
                                       <td>${
                                         pic.Done === false
                                           ? Language.unFinished
                                           : Language.Finished
                                       }</td>
                                       <td>${pic.Timeminet}</td>
                                       <td>${pic.Datetiem}</td>
                                       <td colspan='2'>${pic.sectionidnfy}</td>
                                       <td>${index + 1}</td>
                               </tr>  `,
                                 )
                                 .join('')}           
                               </tbody>
                            <tr>
                            </table>
                        </table>
                        <!-- tm-app-feature-header -->
           <footer class="footer">
            <div class="namedata">
            <h4>BY:</h4>
            <span>
            <h5>م:عبدالرحمن محمد الفيل</h5>
            <h5>Abdulrhman mohammed AlFil</h5>
        </span>
          </div>
            <div class="namedata">
            <P>phon:0966502464530</P>
        </div>
          </footer>
  </body>
  </html>
 `,
      fileName: `Exprenss_contract_pdf_${new Date().toDateString()}`,
      directory: 'Documents',
    };
    return options;
  };
  const arraPrssAll = () => {
    let arrays = [];

    tasksCONTRAT.map((pic, index) =>
      arrays.push({
        [Language.Total_account_in_Yemeni_riyals]: Tofixed(pic.SumِYR),
        [Language.Total_Account_in_Saudi_Riyals]: Tofixed(pic.SumِSR),
        [Language.Total_Account_in_Dollars]: Tofixed(pic.SumDollar),
        [Language.Status_Account]:
          pic.Done === false ? Language.unFinished : Finished,
        [Language.Account_creation_time]: pic.Timeminet,
        [Language.Account_creation_Date]: pic.Datetiem,
        [Language.nameAccount]: pic.sectionidnfy,
      }),
    );
    return arrays;
  };

  const arraPrssSub = () => {
    let arrays = [];
    tasksCONTRAT
      .filter(item => item.ID === tasksCONTRATID)
      .map((pic, index) =>
        arrays.push({
          [Language.Total_account_in_Yemeni_riyals]: Tofixed(pic.SumِYR),
          [Language.Total_Account_in_Saudi_Riyals]: Tofixed(pic.SumِSR),
          [Language.Total_Account_in_Dollars]: Tofixed(pic.SumDollar),
          [Language.Status_Account]:
            pic.Done === false ? Language.unFinished : Finished,
          [Language.Account_creation_time]: pic.Timeminet,
          [Language.Account_creation_Date]: pic.Datetiem,
          [Language.nameAccount]: pic.sectionidnfy,
        }),
      );
    tasksCONTRAT
      .find(item => item.ID === tasksCONTRATID)
      ?.databuld.forEach((item, index) =>
        arrays.push({
          [Language.Expense_Name_Statement]: item.sectiontitle,
          [Language.description]: item.abzrphtion,
          [Language.Expense_department_creation_date]: item.Time,
          [Language.Expense_section_creation_time]: item.Timeminet,
          [Language.Total_section_in_Yemeni_rials]: Tofixed(item.SumِYR),
          [Language.Total_Section_in_Saudi_Riyals]: Tofixed(item.SumِSR),
          [Language.Total_section_in_dollars]: Tofixed(item.SumDollar),
        }),
      );
    tasksCONTRAT
      .find(item => item.ID === tasksCONTRATID)
      ?.databuld.forEach(item =>
        item.Databes.map((it, index) =>
          arrays.push({
            [Language.Substatement_of_Expenditure]: it.sectiontitle,
            [Language.description]: it.abzrphtion,
            [Language.Date]: it.TimeSub,
            [Language.Time]: it.Timeminet,
            [Language.Total]: Tofixed(it.sectionpriclabrr) + it.arthDath,
            [Language.m]: index + 1,
          }),
        ),
      );
    return arrays;
  };
  const htmlContractuseSub = carmsu => {
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
    ${tasksCONTRAT
      .filter(item => item.ID === tasksCONTRATID)
      .map(
        (pic, index) =>
          `<table>
   
           <thead>
                              <tr>
                                  <thead>
                                  <tbody>
                                  <th style="text-align: center;border-color: #333;"  colspan="8">${
                                    Language.Detailed_account_statement
                                  }</th>
                                      <tr>
                                          <th style="text-align: center;border-color: #333;"  colspan="3">${
                                            Language.Total
                                          }</th>
                                          <th scope="col" rowspan="2">${
                                            Language.Status_Account
                                          }</th>
                                          <th scope="col" rowspan="2">${
                                            Language.Account_creation_time
                                          }</th>
                                          <th scope="col" rowspan="2">${
                                            Language.Account_creation_Date
                                          }</th>
                                          <th scope="col" colspan="2"  rowspan="2">${
                                            Language.nameAccount
                                          }</th>        
                                          <!-- rowspan="2" هذه للدمج عمودي -->
                                      </tr>
                                      <th scope="col">${
                                        Language.RialSudiaLong
                                      }</th>
                                      <th scope="col">${
                                        Language.Americandollarlong
                                      }</th>
                                      <th scope="col">${
                                        Language.RialYemeniLong
                                      }</th>                                      
                                  </tbody>
                                 </thead>
                                 </tr>         
                                 <tbody>                  
                                     <tr>
                                         <td>${Tofixed(pic.SumِSR)}</td>
                                         <td>${Tofixed(pic.SumDollar)}</td>
                                         <td>${Tofixed(pic.SumِYR)}</td>
                                         <td>${
                                           pic.Done === false
                                             ? Language.unFinished
                                             : Language.Finished
                                         }</td>
                                         <td>${pic.Timeminet}</td>
                                         <td>${pic.Datetiem}</td>
                                         <td>${pic.sectionidnfy}</td>
                                 </tr>            
                                 </tbody>
                              <tr>
                              </table>
                              <table>
                           ${pic.databuld.map(
                             (item, index) =>
                               `
            <thead>
 <tbody>
            <th style="text-align: center;border-color: #333; background-color:darkblue;"  colspan="8">${
              Language.Details_of_the_account_sections
            }</th>
                                        <tr>
                                          <th style="text-align: center;border-color: #333;"  colspan="3">${
                                            Language.Total
                                          }</th>
                                          <th scope="col" rowspan="2">${
                                            Language.Time
                                          }</th>
                                          <th scope="col" rowspan="2">${
                                            Language.Date
                                          }</th>
                                          <th scope="col" rowspan="2">${
                                            Language.description
                                          }</th>
                                          <th scope="col"   rowspan="2">${
                                            Language.Expense_Name_Statement
                                          }</th>        
                                          <th scope="col"  rowspan="2">${
                                            Language.m
                                          }</th>        
                                      </tr>
                                      <th scope="col">${
                                        Language.AmericandollarLong
                                      }</th>
                                      <th scope="col">${
                                        Language.RialSudiaLong
                                      }</th>
                                      <th scope="col">${
                                        Language.RialYemeniLong
                                      }</th>
                          </tr>         
                          </tbody>
      
                          </thead>
                          <tbody>
                              <tr >
                                  <td>${Tofixed(item.SumِSR)}</td>
                                  <td>${Tofixed(item.SumDollar)}</td>
                                  <td>${Tofixed(item.SumِYR)}</td>
                                  <td>${item.Timeminet}</td>
                                  <td>${item.Time}</td>
                                  <td>${item.abzrphtion}</td>
                                  <td>${item.sectiontitle}</td>
                                  <td>${index + 1}</td>
                          </tr>      
                          </table>
                          <table>                  
    </tbody>
                          <th style="text-align: center;border-color: #333; "  colspan="6">${
                            Language.Department_expenses
                          }</th>
                          <tr>
                              <th style="text-align: center;border-color: #333;" >${
                                Language.Amount
                              }</th>
                              <th scope="col" rowspan="2">${Language.Time}</th>
                              <th scope="col" rowspan="2">${Language.Date} </th>
                              <th scope="col" rowspan="2">${
                                Language.description
                              }</th>
                              <th scope="col" rowspan="2">${
                                Language.Manifesto
                              }</th>
                              <th scope="col" rowspan="2">${Language.m}</th>
                              <!-- rowspan="2" هذه للدمج عمودي -->
                          </tr>
                          <tbody>
                          ${item?.Databes.filter(
                            carmsu.length > 0
                              ? i => i.arthDath === carmsu
                              : i => i.idHOM === item.idHOM,
                          ).map(
                            (it, index) =>
                              ` <tr>
                                  <td>${
                                    Tofixed(it.sectionpriclabrr) + it.arthDath
                                  }</td>
                                  <td>${it.Timeminet}</td>
                                  <td>${it.TimeSub}</td>
                                  <td>${it.abzrphtion}</td>
                                  <td>${it.sectiontitle}</td>
                                  <td>${index + 1}</td>
                              </tr>
                              </tbody>`,
                          )} `,
                           )}
                          </table>
                          </table>`,
      )
      .join('')}  
                          <!-- tm-app-feature-header -->
                   
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
      fileName: `Exprenss_contract_${
        findTaskss?.sectionidnfy
      }pdf_${new Date().toDateString()}`,
      directory: 'Documents',
    };
    return options;
  };
  return {htmlContractuse, arraPrssAll, htmlContractuseSub, arraPrssSub};
}
