import { StyleSheet, View, Text, Button, TextInput, SafeAreaView, Alert, Linking, Platform} from 'react-native';
import { useState, useEffect } from 'react';
import SendSMS from 'react-native-sms';
import { db } from '../../config';
import {onValue, ref, set} from 'firebase/database';
export default Page = (props) =>{
    // console.log("width", props.width, "height", props.height)
    const off = false
    const on = true
    const noWarning = false
    const isWarning = true
    const phone = "0355524273"
    const [valueMq2,setValueMq2] = useState(111)
    const [threshold,setThreshold] = useState(500)
    const [valueInput,setValueInput] = useState('')
    const [warning,setWarning] = useState(noWarning)
    const [stateDK1,setStateDK1] = useState(off)
    const [stateDK2,setStateDK2] = useState(off)
    const styles = StyleSheet.create({
        Home:{
            height:'auto',
            width:props.with,
            flex:1,
            display:'flex',
            justifyContent: 'center',
            alignContent:'center'
        },
        Home_box:{
            height:'100%',
            width:props.width,
            backgroundColor: '#D8D8D8',
            padding:16,
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        },
        Home_box_value_mq2:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        },
        Home_box_warning:{
            paddingTop:16,
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        },
        Home_box_control:{
            paddingTop:16,
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        },
        Home_box_setThreshold:{

        },
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
          },
    })
    const handleSetThreshold = ()=>{
        if(valueInput != ''){
            setThreshold(valueInput)
            setValueInput('')
            console.log("Set threshold");
            set(ref(db,"/esp/server/value_threshold"),valueInput)
        }
    }
    const handleControlDevice = (name, state_control) =>{
        console.log(name,state_control)
        set(ref(db,"/esp/server/state_control_device_"+name),state_control)
    }

    useEffect(()=>{
        const intervalId = setInterval(() => {
            const ccc = ref(db,"esp/server")
            onValue(ccc, (snapshot)=>{
                const data = snapshot.val();
                console.log(data["state_warning"])
                setStateDK1(data["state_control_device_1"])
                setStateDK2(data["state_control_device_2"])
                setThreshold(data["value_threshold"])
                setValueMq2(data["value_mq2"])
                setWarning(data["state_warning"])
            })
        }, 3000);
        return () => clearInterval(intervalId);
    },[])
    useEffect(()=>{
        if(warning == isWarning){
            Alert.alert("Cảnh báo nồng độ khí Gas nhà bạn vược mức báo động")
            const intervalId = setInterval(() => {
                console.log('Đã gọi bn sau mỗi 30 giây');

                // SendSMS.send({
                //     body:"Cảnh báo nồng độ khí Gas nhà bạn vược mức báo động",
                //     recipients:phone,
                //     successTypes:["sent","queued"]
                // },(completed,cancelled,error)=>{
                //     if (completed) {
                //         console.log('SMS Sent Completed');
                //     } else if (cancelled) {
                //         console.log('SMS Sent Cancelled');
                //     } else if (error) {
                //         console.log('Some error occured');
                //     }
                // })
                if (Platform.OS !== 'android') {
                    phoneNumber = `telprompt:${phone}`;
                  }
                  else  {
                    phoneNumber = `tel:${phone}`;
                  }
                  Linking.canOpenURL(phoneNumber)
                  .then(supported => {
                    if (!supported) {
                      Alert.alert('Phone number is not available');
                    } else {
                      return Linking.openURL(phoneNumber);
                    }
                  })
                  .catch(err => console.log(err));
              }, 30000);
              return () => clearInterval(intervalId);
        }
    },[warning])
    return(
        <View style={styles.Home}>
            <View style={styles.Home_box}>
                <View style={styles.Home_box_value_mq2}>
                    <Text style={{fontSize:32,fontWeight:500}}>
                        Chỉ số MQ-2
                    </Text>
                    <Text style={{fontSize:42, color: (valueMq2>threshold) ? 'red' : 'green'}}>
                        {valueMq2}
                    </Text>
                </View>
                <View style={styles.Home_box_warning}>
                    <Text style={{fontSize:28,fontWeight:500}}>
                        Cảnh báo
                    </Text>
                    <Text style={{fontSize:24, color: (valueMq2>threshold) ? 'red' : 'green'}}>
                        {warning == isWarning ? "Nồng độ khí Gas cao..." : "Nồng độ khí Gas bình thường."}
                    </Text>
                </View>
                <View style={styles.Home_box_control}>
                    <Text style={{fontSize:24,fontWeight:500,paddingBottom:16}}>
                        Trạng thái điều khiển
                    </Text>
                    <View style={{display:'flex',flexDirection:'row'}}>
                        <View style={{paddingRight:16}}>
                            <Text style={{fontSize:24,fontWeight:400,paddingBottom:16}}>
                                Điều khiển 1
                            </Text>
                            <Button
                                onPress={()=>{handleControlDevice("1",stateDK1==off ? on : off)}}
                                title={stateDK1==off ? "ON" : "OFF"}
                                color={stateDK1==off ? 'green' : 'red'}
                                accessibilityLabel="button control device 1"
                            />
                        </View>
                        <View>
                            <Text style={{fontSize:24,fontWeight:400,paddingBottom:16}}>
                                Điều khiển 2
                            </Text>
                            <Button
                                onPress={()=>{handleControlDevice("2",stateDK2==off ? on : off)}}
                                title={stateDK2==off ? "ON" : "OFF"}
                                color={stateDK2==off ? 'green' : 'red'}
                                accessibilityLabel="button control device 2"
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.Home_box_setThreshold}>
                    <View style={{display:'flex', flexDirection:'row', paddingTop: 16}}>
                        <Text style={{fontSize: 24}}>
                            Ngưỡng hiện tại:
                        </Text>
                        <Text style={{fontSize: 24, paddingLeft: 8}}>
                            {threshold}
                        </Text>
                    </View>
                    <SafeAreaView>
                        <TextInput
                            style={styles.input}
                            onChangeText={setValueInput}
                            placeholder= {"Ngưỡng hiện tại: " + threshold}
                            value={valueInput}
                            keyboardType='numeric'
                            maxLength={4}
                        />
                    </SafeAreaView>
                    <Button
                        onPress={()=>{handleSetThreshold()}}
                        title={"Thiết lập ngưỡng"}
                        color= "green"
                        accessibilityLabel="button control device 2"
                    />
                </View>
            </View>
        </View>
    )
}