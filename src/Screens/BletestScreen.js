import React, {useEffect} from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { BleManager, Characteristic, Device } from "react-native-ble-plx"

const BletestScreen = () => {
    const manager = new BleManager();
    const mydevice = new Device(NativeDevice, manager)
    useEffect(() => {
            if (Platform.OS === 'ios') {
              manager.onStateChange((state) => {
                if (state === 'PoweredOn') scanAndConnect()
              })
            } else {
              scanAndConnect()
            }
    }, []);
    const scanAndConnect = () => {
        console.log(mydevice.id)
        manager.startDeviceScan(null,
                                     null, (error, device) => {
          console.log("Scanning...")
          if(device){
          
          console.log('name:'+device.name)
          console.log('id:'+device.id)
          console.log('serviceUUIDs:'+device.serviceUUIDs)
          console.log('-------------------------------------------------------------')
          }else{
              console.log('searched but not found');
          }
          if (error) {
            console.log(error.message)
            return
          }
          manager.stopDeviceScan();

        });

      }
        return (

            <View style={{marginTop:100, alignItems:'center'}}>
                <Text style={{marginBottom:20, fontSize:20}}>turn on your BLE</Text>
                <Button title="scanandconnect" onPress={()=> scanAndConnect()} />
            </View>
        )
    
}



const styles = StyleSheet.create({});

export default BletestScreen;