import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import MainScreen from './Pages/MainScreen';
import  Navigator  from './routes/HomeStack' ;
import{ createAppContainer} from '@react-navigation/native';

// Navigator = HomeStack
export default Navigator;
// export default function App() {
//   return (
//     <SafeAreaView style={{ flex: 1, padding: 20 }}>

//         {/* 1. box */}
//         <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
//             <Text style={{ color: 'gray' }}>Friday, 15 Dec</Text>
            

//         </View>

//         {/* 2. box */}
//         <View style={{ flex: 1 }}>
//             <Text h2>Learn</Text>
//             <Text h4>Choose the part of the body</Text>
//         </View>

//         {/* 3. box */}
//         <View style={{ flex: 8 , marginLeft:20,marginRight:20}}>

//             <View style={{ backgroundColor: '#EB7662', flex: 2, padding: 20, borderRadius: 10, marginTop: 10 }}>
//                 <Text h3 style={{ color: 'white' }}>Head && Face </Text>
//                 <Text style={{ color: 'white' }}>11 diseases</Text>
//             </View>

//             <View style={{ backgroundColor: '#D4EDE9', flex: 2, marginTop: 10, borderRadius: 10, padding: 20 }}>
//                 <Text h3 style={{ color: 'white' }}>Head && Face</Text>
//                 <Text style={{ color: 'white' }}>11 diseases</Text>
//             </View>

//             <View style={{ backgroundColor: '#FBB563', flex: 2, marginTop: 10, borderRadius: 10, padding: 20 }}>
//                 <Text h3 style={{ color: 'white' }}>Head && Face</Text>
//                 <Text style={{ color: 'white' }}>11 diseases</Text>
//             </View>

//             <View style={{ backgroundColor: '#448BA4', flex: 2, marginTop: 10, borderRadius: 10, padding: 20 }}>
//                 <Text h3 style={{ color: 'white' }}>Head && Face</Text>
//                 <Text style={{ color: 'white' }}>11 diseases</Text>
//             </View>

//         </View>



//     </SafeAreaView>
// );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
