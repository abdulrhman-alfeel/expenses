

import { View, Text ,Modal,Image,TouchableOpacity,StyleSheet,Pressable} from 'react-native'
import React,{useState} from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from './constants/colors'
import { ScrollView } from 'react-native-virtualized-view';
import { fonts } from './constants/fonts'
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import ModelsAbdu from './component/modelsAbdu'
// import { locale } from './Taskscsh';
import  locales,{locale}  from "./locale";


const ModulsData = () => {
  const [calculator, setCalculator] = useState(false);
  return (
        <View >
            {  calculator?  <ModelsAbdu  bellmodel={calculator} setBellmodel={setCalculator}   /> :null}
        <View style={styles.inderction_body}>
        <Text style={styles.heder_inderction}>{locale =='ar_MA'?"معلومات لشرح ماهية التطبيق":"Information to explain what the application is"}</Text>
        </View>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{marginBottom:75}}
        // contentContainerStyle={styles.body_inderch}
        >
{locale =='ar_MA'?
<>
<Text style={styles.text_inderction}>تطبيق الهاتف الذي يقوم بحساب النفقات وقيد العهد والديون والمهام هو أداة رائعة لإدارة الاعمال المالية والإدارية اليومية. يوفر التطبيق للمستخدمين وسيلة سهلة وفعالة لتتبع النفقات والإيرادات وتصنيفها والحفاظ على التزاماتهم المالية.</Text>
        <Text style={[{marginVertical:RFValue(15)},styles.text_inderction]}>يحتوي التطبيق على مجموعة من الميزات المفيدة، بما في ذلك:</Text>
        <Text style={styles.text_inderction}>1- تصنيف النفقات: يمكن للمستخدمين تصنيف النفقات بطريقة مناسبة لهم، مثل تصنيفها حسب الفئات مثل الغذاء والسفر والترفيه والمنزل والسيارة وغيرها.</Text>
        <Text style={styles.text_inderction}>2- تتبع الإيرادات: يمكن للمستخدمين تتبع الإيرادات ومصادرها بطريقة سهلة وفعالة.</Text>
        <Text style={styles.text_inderction}>3- قيد العهد والديون: يمكن للمستخدمين تسجيل الديون وقيود العهد وتحديد مواعيد السداد ومراقبتها.</Text>
        <Text style={styles.text_inderction}>4- إدارة المهام: يمكن للمستخدمين تسجيل وإدارة المهام والمشاريع المالية وتحديد المواعيد النهائية ومراقبة التقدم.</Text>
        <Text style={styles.text_inderction}>5- تقارير وإحصائيات: يمكن للمستخدمين إنشاء تقارير وإحصائيات حول النفقات والإيرادات والديون والعهود والمهام، مما يمكنهم من مراقبة وتحليل أنماط الإنفاق والمصادر واتخاذ القرارات المالية الذكية.</Text>
        <Text style={[{marginVertical:RFValue(15)},styles.text_inderction]}>باستخدام هذا التطبيق، يمكن للمستخدمين توفير الوقت والجهد في إدارة أمورهم المالية والإدارية اليومية، ويمكنهم الاستمتاع بالمزايا العديدة التي يقدمها التطبيق لتحسين الإدارة المالية والحفاظ على التزاماتهم المالية بسهولة وفعالية.</Text>
        <Text style={styles.text_inderction}>عمل التطبيق</Text>
        <Text style={styles.text_inderction}>قسم حسابات النفقات </Text>
        <Text style={styles.text_inderction}>1- قم بإضافة حساب نفقات جديد بادخال اسم ورقم الحساب </Text>
        </>
:
<>
        <Text style={styles.text_inderction}>The mobile app that calculates expenses, covenants, debts, and tasks is a great tool for managing day-to-day financial and administrative chores. The app provides users with an easy and effective way to track and categorize expenses and revenues, and maintain their financial obligations.</Text>
<Text style={[{marginVertical:RFValue(15)},styles.text_inderction]}> The app has a host of useful features, including:</Text>
<Text style={styles.text_inderction}>1- Expense classification: Users can categorize expenses in a way that is convenient for them, such as categorizing them by categories such as food, travel, entertainment, home, car, and others.</Text>
<Text style={styles.text_inderction}>2- Revenue tracking: Users can track revenue and its sources in an easy and efficient way.</Text>
<Text style={styles.text_inderction}>3- Covenant and Debt: Users can record debts and covenant entries and set and monitor repayment dates.</Text>
<Text style={styles.text_inderction}>4- Task Manager: Users can record and manage financial tasks and projects, set deadlines, and monitor progress.</Text>
<Text style={styles.text_inderction}>5- Reports and statistics: Users can generate reports and statistics on expenditures, revenues, debts, covenants, and tasks, enabling them to monitor and analyze spending patterns, sources, and make smart financial decisions.</Text>
<Text style={styles.text_inderction}></Text>
<Text style={[{marginVertical:RFValue(15)},styles.text_inderction]}>Using this application, users can save time and effort in managing their daily financial and administrative affairs, and they can enjoy the many advantages that the application offers to improve financial management and maintain their financial obligations easily and effectively.</Text>
<Text style={styles.text_inderction}>Application work</Text>
<Text style={styles.text_inderction}>Expense Accounts Section </Text>
<Text style={styles.text_inderction}>1- Add a new expense account by entering the account name and number </Text>
</>
}


            <Image style={{width:'100%',height:RFValue(50)}} source={require('./ass/countennew.png')} resizeMode="stretch" />
{   locale =='ar_MA'?
<>
<Text style={styles.text_inderction}>2- قم بإضافة حسابات نفقات فرعية تحت الحساب الرئيسي الذي تم اضافته سابقا</Text>
    <Image style={{width:'100%',height:RFValue(35)}} source={require('./ass/newCountent.png')} resizeMode="stretch" />
    <Image style={{width:'100%',height:RFValue(335),marginVertical:RFValue(5)}} source={require('./ass/AddCountent.png')} resizeMode="stretch" />
        <Text style={styles.text_inderction}>3- سجل قيود النفقات في الحسابات الفرعية ويتكون القيد من المبلغ والبيان والتفاصيل ان وجدت والوقت والتاريخ </Text>
        <Image style={{width:'100%',height:RFValue(80)}} source={require('./ass/addnafkh.png')} resizeMode="stretch" />
        <Image style={{width:'100%',height:RFValue(420),marginVertical:RFValue(5)}} source={require('./ass/Nafkhadd.png')} resizeMode="stretch" />
        <Text style={styles.text_inderction}>4- عند تسجيل قيود نفقات في الحسابات الفرعية يتم ضمها الى نفس الفرع من النفقات</Text>
        <Text style={styles.text_inderction}>5- النفقات الفرعية يتم ضمها جميعا في جدول تحت الحساب الرئيسي</Text>
        <Text style={styles.text_inderction}>6- الواجهة الرئيسية لقسم النفقات توضح اجمالي المبالغ في كل حساب على حدة  مع الاجمالي العام لجميع الحسابات </Text>
        <Text style={styles.text_inderction}>7- عند الانتهاء من حساب نفقات يتيح التطبيق خاصية اقفال الحساب ونقله الى النفقات المنتهية</Text>
        <Text style={styles.text_inderction}>8- يتيح التطبيق تصدير جميع الجداول الى ملفات pdf او اكسل</Text>
        <Text style={styles.text_inderction}>قسم العهد </Text>
        <Text style={styles.text_inderction}>1- قيود عهد موضح فيها المبلغ مع التاريخ والوقت والجهة او الشخص مصدر العهدة والتفاصيل</Text>
        <Text style={styles.text_inderction}>2- يتيح التطبيق ادراج قيود وصور لمستندات من الكاميرا او من المعرض كاخلاءات للمبالغ العهدة</Text>
        <Image style={{width:'100%',height:RFValue(420),marginVertical:RFValue(5)}} source={require('./ass/Covenent.png')} resizeMode="stretch" />
                  <Text style={styles.text_inderction}>قسم الديون والاقساط</Text>
        <Text style={styles.text_inderction}>1- قيود ديون واقساط مبينا فيها المبلغ والتاريخ والوقت والدائن ووقت السداد </Text>
        <Text style={styles.text_inderction}>2- عند السداد يتم نقل حساب الدين الى الديون المنتهية</Text>
        <Text style={styles.text_inderction}>3- قيود الديون والاقساط التي للشخص على الغير او على الشخص للغير</Text>
        <Text style={styles.text_inderction}>4-  يتم سداد الدين بشكل كلي او بشكل دفعات عبر نافذة تسديد الدين - كما يمكن تحويل مبلغ السداد لحساب اخر</Text>
        <Image style={{width:'100%',height:RFValue(420),marginVertical:RFValue(10)}} source={require('./ass/givengCash.png')} resizeMode="stretch" />
        <View style={{marginBottom:RFValue(10)}}>      
            <Text style={styles.text_inderction}>قسم المهام </Text>
        <Text style={styles.text_inderction}>1- تسجيل تفاصيل المهام التي يريد الشخص انجازها </Text>
        <Text style={styles.text_inderction}>2- تحديد المدة الزمنية للتنفيذ</Text>
        <Text style={styles.text_inderction}>3- اضافة صورة للمهامة إذا تطلب الامر</Text>
        <Text style={styles.text_inderction}>لمعرفة مكان تخزين ملفات Execl or pdf</Text>
        <Text style={styles.text_inderction}>1- ادخل إلى قائمة ملفات هاتفك</Text>
        <Text style={styles.text_inderction}>2-ادخل ملف Android</Text>
        <Text style={styles.text_inderction}>3-قم بالدخول إلى مجلد data</Text>
        <Text style={styles.text_inderction}>4-اختر مجلد التطبيق com.expenses</Text>
        <Text style={styles.text_inderction}>5-ادخل مجلد files</Text>
        <Text style={styles.text_inderction}>6-ستكون ملفات pdf Documents</Text>

        <Text style={styles.text_inderction}>تعليمات عامة </Text>
        <Text style={styles.text_inderction}>لتعديل او المشاهدة او الحذف  لاحد اقسام او فروع النفقات انقر نقرة مطولة لتضهر لك مربع عرض البيانات بالاضافة إلى خيارات التعديل والعذف كما في الصورة </Text>
        <Image style={{width:'100%',height:RFValue(420),marginVertical:RFValue(10)}} source={require('./ass/nrgh.png')} resizeMode="stretch" />
     <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Text style={styles.text_inderction}> عند وجود اي اشكاليات او  طرح مقترحات يرجى التواصل بنا </Text>
        <Pressable android_ripple={{color:colors.YALO,borderless:true}} style={{zIndex:1}} onPress={()=>setCalculator(true)}>
                  <FontAwesome5Icon  name='phone' size={20} color={colors.GREYD}/>
                    </Pressable>
                    </View>
        </View>
        </>
       :
       <>
       <Text style={styles.text_inderction}>2- Add sub-expense accounts under the main account added earlier</Text>
<Image style={{width:'100%',height:RFValue(35)}} source={require('./ass/newCountent.png')} resizeMode="stretch" />
<Image style={{width:'100%',height:RFValue(335),marginVertical:RFValue(5)}} source={require('./ass/AddCountent.png')} resizeMode="stretch" />
<Text style={styles.text_inderction}>3- Record expenditure entries in sub-accounts and the entry consists of the amount, statement, details, if any, time and date </Text>
<Image style={{width:'100%',height:RFValue(80)}} source={require('./ass/addnafkh.png')} resizeMode="stretch" />
<Image style={{width:'100%',height:RFValue(420),marginVertical:RFValue(5)}} source={require('./ass/Nafkhadd.png')} resizeMode="stretch" />
<Text style={styles.text_inderction}>4- When expense entries are recorded in sub-accounts, they are combined with the same branch of expenses</Text>
<Text style={styles.text_inderction}>5- Sub-expenses are all combined in a table under the main account</Text>
<Text style={styles.text_inderction}>6- The main interface of the expenses section shows the total amounts in each account separately with the general total of all accounts </Text>
<Text style={styles.text_inderction}>7- Upon completion of an expense account, the application allows the feature of closing the account and transferring it to the expired expenses</Text>
<Text style={styles.text_inderction}>8- The application allows exporting all tables to pdf or Excel files</Text>
<Text style={styles.text_inderction}>Covenant Section </Text>
<Text style={styles.text_inderction}>1- Covenant entries indicating the amount with the date, time, entity or person issuing the custody and details</Text>
<Text style={styles.text_inderction}>2- The application allows the inclusion of restrictions and images of documents from the camera or from the gallery as disclaimers of the amounts of custody</Text>
<Image style={{width:'100%',height:RFValue(420),marginVertical:RFValue(5)}} source={require('./ass/Covenent.png')} resizeMode="stretch" />
<Text style={styles.text_inderction}>Debt and Installments Section</Text>
<Text style={styles.text_inderction}>1- Restrictions of debts and installments indicating the amount, date, time, creditor and time of payment </Text>
<Text style={styles.text_inderction}>2- Upon payment, the debt account is transferred to the expired debts</Text>
<Text style={styles.text_inderction}>3- Restrictions on debts and installments that a person has on others or on a person on others</Text>
<Text style={styles.text_inderction}>4- The debt is paid in full or in installments through the debt payment window - and the repayment amount can be transferred to another account</Text>
<Image style={{width:'100%',height:RFValue(420),marginVertical:RFValue(10)}} source={require('./ass/givengCash.png')} resizeMode="stretch" />
<View style={{marginBottom:RFValue(10)}}> 
<Text style={styles.text_inderction}>Task section </Text>
<Text style={styles.text_inderction}>1- Record the details of the tasks that the person wants to accomplish </Text>
<Text style={styles.text_inderction}>2- Specify the duration of implementation</Text>
<Text style={styles.text_inderction}>3- Add a picture of the task if required</Text>
<Text style={styles.text_inderction}>To find out where Execl or pdf files are stored</Text>
<Text style={styles.text_inderction}>1- Access your phone's files menu</Text>
<Text style={styles.text_inderction}>2-Enter Android File</Text>
<Text style={styles.text_inderction}>3 - Enter the data folder</Text>
<Text style={styles.text_inderction}>4 - Choose the application folder com.expenses</Text>
<Text style={styles.text_inderction}>5 - Enter the files folder</Text>
<Text style={styles.text_inderction}>6-pdf files will be Documents</Text>
<Text style={styles.text_inderction}>General Instructions </Text>
<Text style={styles.text_inderction}>To modify, view or delete one of the sections or branches of expenses, click and hold to show you the data display box in addition to the options for editing and freshness as in the picture </Text>
<Image style={{width:'100%',height:RFValue(420),marginBottom:RFValue(15)}} source={require('./ass/nrgh.png')} resizeMode="stretch" />
<Text style={[{textAlign:'center'},styles.text_inderctione]}> If you have any problems or suggestions, please contact us </Text>
<Pressable android_ripple={{color:colors. YALO,borderless:true}} style={{flexDirection:'row',justifyContent:'space-around',alignSelf:'center', borderRadius:10,backgroundColor:colors.CURRENT}} onPress={()=>setCalculator(true)}>
<Text style={{color:colors.WHITE}}> {locale === 'ar_MA'?"تواصل الان":"Contact Now"} </Text>
<FontAwesome5Icon style={{margin:5}} name='phone' size={15} color={colors.WHITE}/>
</Pressable>
</View>
</>
       }
          </ScrollView>
          </View>
)}

export default ModulsData;


const styles = StyleSheet.create({

  centered_Abdu: {
        flex: 1,
        backgroundColor: "#00000099",
        justifyContent: 'center',
        alignItems: 'center'
      },
      inderction_mod1al: {
        width: RFValue(300),
        backgroundColor: colors.WHITE,
        // height: RFValue(150),
        flex:1,
        borderRadius:RFValue(10),
        marginHorizontal: RFValue(10),
        marginVertical:RFValue(20),
        alignSelf: 'center',
    
      },
      inderction_body: {
        height: RFValue(50),
        borderTopLeftRadius:RFValue(10),
        borderTopRightRadius:RFValue(10),
        justifyContent: 'space-around',
        backgroundColor:colors.CURRENT,
        alignItems: 'center'
      },
      body_inderch: {
        marginHorizontal:RFValue(15),
        marginVertical:RFValue(15)
      },
      inderction_button: {
        flexDirection: 'row',
        height: RFValue(50),
      },
      
      text_inderction: {
        fontFamily: fonts.CAIROREGULARK,
        color: colors.CURRENT,
        paddingHorizontal:RFValue(10)
      },
      text_inderctione: {
        fontFamily: fonts.CAIROREGULARK,
        color: colors.CURRENT,
        fontSize:RFValue(10),
        paddingHorizontal:RFValue(10)
      },
      heder_inderction: {
        fontFamily: fonts.CAIROREGULARK,
        color: colors.WHITE,
        fontSize:RFValue(15)
      }

      
})
