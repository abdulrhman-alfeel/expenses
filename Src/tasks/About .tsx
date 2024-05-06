import React, {useState, useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import RNFS from 'react-native-fs';
import {colors} from '../constants/colors';
import {useSelector, useDispatch} from 'react-redux';
import {setTasks, setTasksID} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import Moduls from '../component/moduls';
import uuid from 'react-native-uuid';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {tost} from '../functionuse/contractuse/expTemplet';
export default function About({navigation}) {
  const {tasks, Language} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [bellmodel, setBellmodel] = useState(false);
  const [pagSec, setPagSec] = useState('Crueat');
  const [iddelet, setIddelet] = useState();

  useEffect(() => {
    navigation.addListener('focus', () => {
      getTasks();
    });
  }, [navigation]);

  const getTasks = () => {
    AsyncStorage.getItem('Tasks').then(tasks => {
      const Taskstody = JSON.parse(tasks);
      if (Taskstody && typeof Taskstody === 'object') {
        dispatch(setTasks(Taskstody));
      }
    });
  };
  const delet = id => {
    const filterDasec = tasks.filter(tasks => tasks.ID !== id);
    AsyncStorage.setItem('Tasks', JSON.stringify(filterDasec))
      .then(() => {
        dispatch(setTasks(filterDasec));
        tost(Language.savedTheOperationSuccessfully);
      })
      .catch(err => console.log(err));
  };
  const checkTask = (id, newValue) => {
    const index = tasks.findIndex(tasks => tasks.ID === id);
    if (index > -1) {
      let newTasks = [...tasks];
      newTasks[index].Done = newValue;
      AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTasks(newTasks));
          tost(Language.Moved_to_finished_task_list);
        })
        .catch(ERR => {
          console.log(ERR);
        });
    }
  };

  const coverPdf = async (dataimag, Title, id) => {
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
                  <div style="margin-bottom: 20px; flex-direction: column; display: flex;width: 100%; margin: auto;">
                  <h3 style="padding:5px;width:50%;margin:auto; text-align: center;border-color: #333; color:#ccc;border-radius: 15px; background-color:rgb(9, 9, 53);" >${Title}</h3>
              <div  style="width: 50%; margin: auto;">
              ${dataimag.map(
                it =>
                  `
             <p>${it.docements}</p>
             ${
               it.uri.length > 0
                 ? `<div style=" margin:auto;width:200px; height:200px; border-radius:10px; background-color: #b8cef9;">
              <img src=${it.uri}  style="width: 100%;height: 100%;" />
              </div>`
                 : null
             }
`,
              )}
              </div>
          
         
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
      fileName: `Exprenss_${Title}pdf_${id}`,
      directory: 'Documents',
    };
    const file = await RNHTMLtoPDF.convert(options);
    const fileExistS = await RNFS.exists(file.filePath);
    if (fileExistS) {
      tost(Language.Converted_to_Pdf_successfully)
    }
    console.log(file.filePath);
  };

  return (
    <>
      <Moduls
        setBellmodel={setBellmodel}
        bellmodel={bellmodel}
        preesyes={() => {
          delet(iddelet);
          setBellmodel(false);
        }}
      />
      <View style={styles.body}>
        <View style={styles.senction3}>
          <TouchableOpacity
            onPress={() => {
              setPagSec('Crueat');
            }}
            style={[pagSec == 'Crueat' ? styles.conter : null, styles.contsec]}>
            <Text style={styles.text}>{Language.Current}</Text>
          </TouchableOpacity>
          <Pressable
            android_ripple={{color: colors.WHITE}}
            onPress={() => {
              dispatch(setTasksID(uuid.v4()));
              navigation.navigate('Tasks');
            }}
            style={styles.buttom}>
            <Text style={styles.textadd}>{Language.Add}</Text>
          </Pressable>
          <TouchableOpacity
            onPress={() => setPagSec('Fanshing')}
            style={[
              pagSec === 'Fanshing' ? styles.conter : null,
              styles.contsec,
            ]}>
            <Text style={styles.text}>{Language.Ended}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={tasks.filter(item =>
            pagSec === 'Fanshing' ? item.Done === true : item.Done === false,
          )}
          renderItem={({item, index}) => (
            <View style={styles.tasksbox}>
              <CheckBox
                value={item.Done}
                onValueChange={newValue => {
                  checkTask(item.ID, newValue);
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  dispatch(setTasksID(item.ID));
                  // handleNotification(item, index)
                  navigation.navigate('Tasks');
                }}
                style={styles.item_row}>
                <View style={styles.item_body}>
                  <Text style={styles.texttask} numberOfLines={1}>
                    {item.Title}
                  </Text>
                  <Text style={styles.textdesc} numberOfLines={1}>
                    {item.dataimag[0].docements}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.delet}
                  onPress={() => {
                    setBellmodel(true);
                    setIddelet(item.ID);
                  }}>
                  <FontAwesome5 name={'trash'} size={12} color={'#ff3636'} />
                </TouchableOpacity>
              </TouchableOpacity>
              <Pressable
                android_ripple={{color: colors.WHITE}}
                style={{
                  backgroundColor: colors.GREYD,
                  alignItems: 'center',
                  justifyContent: 'center',
                  left: RFValue(10),
                  width: RFValue(40),
                  borderRadius: RFValue(10),
                  height: RFValue(20),
                }}
                onPress={() => {
                  coverPdf(item.dataimag, item.Title, item.ID);
                }}>
                <FontAwesome5
                  name={'file-pdf'}
                  size={15}
                  color={colors.WHITE}
                />
              </Pressable>
            </View>
          )}
          keyExtractor={(tiem, index) => index.toString()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    //borderWidth:RFValue(10),
  },
  plus: {
    position: 'absolute',
    top: RFValue(20),
  },

  tasksbox: {
    flexDirection: 'row',
    width: RFValue(290),
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(8),
    padding: RFValue(1),
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: RFValue(10),
    elevation: RFValue(1),
  },
  item_row: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkTask: {
    position: 'relative',
    marginHorizontal: RFValue(5),
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: RFValue(60),
    height: RFValue(60),
    borderRadius: RFValue(60),
    bottom: RFValue(30),
    right: RFValue(-50),

    borderColor: colors.BLACK,
  },
  item_body: {
    flex: 1,
  },
  delet: {
    width: RFValue(30),
    height: RFValue(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  texttask: {
    color: '#000000',
    fontSize: RFValue(16),
    margin: RFValue(2),
  },
  textdesc: {
    color: '#999999',
    fontSize: RFValue(12),
    margin: RFValue(2),
  },

  centered_view: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_mod1al: {
    width: RFValue(300),
    backgroundColor: colors.WHITE,
    height: RFValue(150),
    borderRadius: RFValue(20),
  },
  bell_body: {
    flex: 1,
    height: RFValue(150),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_button: {
    flexDirection: 'row',
    height: RFValue(50),
  },
  ok: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: RFValue(20),
    backgroundColor: colors.BLUEDARK,
    borderColor: colors.WHITE,
    borderWidth: RFValue(1),
  },
  cansall: {
    backgroundColor: colors.BLUEDARK,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: RFValue(20),
    borderColor: colors.WHITE,
    borderWidth: RFValue(1),
  },
  textbodtom: {
    fontSize: RFValue(17),
    color: colors.WHITE,
  },
  textinpu: {
    fontSize: RFValue(17),
    color: colors.BLACK,
    padding: RFValue(15),
  },
  conter: {
    flex: 2,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contsec: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // fontFamily:fonts.CAIROREGULARK,
    color: colors.CURRENT,
    fontSize: RFValue(13),
  },
  textadd: {
    // fontFamily:fonts.CAIROREGULARK,
    color: colors.WHITE,
    fontSize: RFValue(13),
    padding: 2,
    textAlign: 'center',
  },
  buttom: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    marginHorizontal: RFValue(10),
    borderRadius: RFValue(60),
    backgroundColor: colors.CURRENT,
  },
  senction3: {
    padding: RFValue(4),
    marginHorizontal: RFValue(15),
    marginVertical: RFValue(15),
    borderRadius: RFValue(5),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.YALO,
  },
});

/*
 
 
 
 
 
 
<Text>welcome {name}</Text>
     <Text>AGE {age}</Text>
     <TextInput
     style={style.input}
     onChangeText={(value)=>setName(value)}
     placeholder='Enter'
     value={name}
     />
     <TextInput
     style={style.input}
     onChangeText={(value)=>setAge(value)}
     placeholder='Enter'
     value={age}
     />
     <ConstomBtom 
     title="updut"
     color='#f0f'
     onpress={uputfuncbtom}/>
     <ConstomBtom 
     title="remove"
     color='#555'
     onpress={remofuncbtom}/>
*/
