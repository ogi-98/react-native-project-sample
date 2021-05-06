import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';


export default function CategoriesUpdate({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>

        {/* 1. box */}
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between',marginLeft:10,
            marginRight:10, marginTop:10 }}>
            <Text style={{ color: 'black', fontWeight:'bold', fontSize: 24 }}>CategoriesUpdate</Text>
            
        </View>

        {/* 2. box */}
        <View style={{ flex: 1, marginLeft:10, marginRight:10}}>
            <Text h2 style={{fontWeight:'bold', fontSize:17}}>CategoriesUpdate</Text>
            <Text h4 style={{color:'gray', fontSize:17}}>CategoriesUpdate</Text>
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
