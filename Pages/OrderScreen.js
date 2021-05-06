import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView,TouchableOpacity } from 'react-native';


export default function OrderScreen({ navigation }) {

  

  return (
    <SafeAreaView style={{ flex: 1 }}>

        {/* 1. box */}
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between',marginLeft:10,
            marginRight:10, marginTop:10 }}>
            <Text style={{ color: 'black', fontWeight:'bold', fontSize: 24 }}>OrderScreen</Text>
            
        </View>

        {/* 2. box */}
        <View style={{ flex: 1, marginLeft:10, marginRight:10}}>
            <Text h2 style={{fontWeight:'bold', fontSize:17}}>OrderScreen</Text>
            <Text h4 style={{color:'gray', fontSize:17}}>OrderScreen</Text>
        </View>
        <View style={{flex:2, margin: 10}}>
          <TouchableOpacity style={{ backgroundColor:'red', padding:20, borderRadius:10}} >
            <View>
              <Text style={styles.flexBoxTextStyle2}>OrderScreen</Text>
            </View>
          </TouchableOpacity>
        </View>

    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexBoxTextStyle1:{
    color: 'black', 
    fontWeight:'bold',
    fontSize: 17,
  },
  flexBoxTextStyle2:{
    color: 'white', 
    fontWeight:'bold',
    fontSize: 17,
  },
});
