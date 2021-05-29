import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Alert, ActivityIndicator, RefreshControl, View, Text, TouchableOpacity, Button, Platform} from 'react-native';
import { Icon, ListItem, SearchBar } from 'react-native-elements';
import apiFuncs from '../env/apiFunctions';


export default function OrderScreen({ navigation }) {


   // order array useState constant
  const [order, setOrder] = useState([]);
  //this is For ActivityIndicator
  const [animating,setAnimating] = useState(Boolean)
  // this is  For refreshing
  const [refreshing, setRefreshing] = useState(false);
  const refreshStarting = () => {
    setRefreshing(true)
    // this is for get Orders
    apiFuncs.get('api/orders/?_limit=15')
      .then((data) => {
        setFilteredOrder(data)
        setOrder(data)
        setRefreshing(false)
      })
  }

  const sorted_orders = order.slice().sort((a,b) => {
    return new Date(a.orderDate).getTime() - 
        new Date(b.orderDate).getTime()
  }).reverse();

  useEffect(() => {

    fillDataFromWeb();

  }, []);

  const fillDataFromWeb = () => {
    setAnimating(true)
    // this is for get Category
      apiFuncs.get('api/orders/?_limit=15')  // learn limit from https://stackoverflow.com/questions/52842039/how-to-limit-the-amount-of-data-returned-from-a-json-file-using-fetch/52842411
      .then((data) => {
        setOrder(data)
        setAnimating(false)
      })
    
    

  }// fillDataFromWeb

    //Delete icon Onpress Func
    const deleteOrder = (id) => {

      apiFuncs.delete('api/orders/', id)
      .then((data) => {
        fillDataFromWeb()
      })
      .catch((msg) => {
      })
  
    }
  
  
  // Creating alert for user be sure about deleting
    const createDeleteAlert = (order) =>{
      if (Platform.OS === 'ios') {
        // do something for ios
        nativeDeleteAlert(order)
  
      } else if (Platform.OS === 'android') {
        // other thing for android
        nativeDeleteAlert(order)
  
      } else if (Platform.OS === 'web') {
        // it's on web!
        deleteOrder(order.id)
  
      } else {
        // you probably won't end up here unless you support another platform!
      }
    }//createDeleteAlert
  // native alert Create
  const nativeDeleteAlert = (order) => {
    Alert.alert(
      "Order ID: " + order.id,
      "Are you sure about delete order ?",
      [
        {
          text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete",
          onPress: () => deleteOrder(order.id),
          style: "destructive"
        }
      ]
    );
  }


  const downloadScreen = () =>{
    return (
      <SafeAreaView style={{ flex: 1 }} >
        <ActivityIndicator style={{alignItems:'center',justifyContent:'center', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,}} size='large' animating= {animating}/>
      </SafeAreaView>
    )
  }

  if (animating) {
    // this block works while fetching data
    return(
      // I create activity indicator, maybe user has a low internet connection
      downloadScreen()

    );
  } else {

    return (
      <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <RefreshControl refreshing={refreshing} onRefresh={() => refreshStarting()}/>
  
          {
            sorted_orders.map((item , key ) => (
              <View
              key= {item.id}
              style={styles.container}
              tou
              >
                
                <View style={{margin:10,}}>
                  {/* 1. Row */}
                  <View style={{flex: 0.5, flexDirection:'row', justifyContent: 'space-between',alignSelf: 'stretch'}}>
                    
                    <View style={{flexDirection:'row',alignSelf: 'stretch', alignItems:'center'}}>

                      <Icon name='badge' size={20}></Icon>

                      <Text style={{marginLeft:5}}>Order ID: {item.id}</Text>

                    </View>
                  

                    <View style={{flexDirection:'row',alignSelf: 'stretch', alignItems:'center'}}>

                      <Icon name='today' size={20} ></Icon>

                      <Text style={{marginLeft:5}}>Order Date: {item.orderDate.substring(0, 11)}</Text>

                    </View>
                  
  
                  </View>
  
  
                  <View style={{flexDirection:'row', justifyContent: 'space-between',alignSelf: 'stretch',marginTop:20}} >
                  {/* 2. Row */}
                  <View style={{flex: 0.5, flexDirection:'column', justifyContent: 'space-between',alignItems:'flex-start'}}>
                                  
                  <View style={{flexDirection:'row',alignSelf: 'stretch', alignItems:'center'}}>

                      <Icon name='flight-land' size={20} ></Icon>

                      <Text style={{marginLeft:5}}>Arrived: {item.requiredDate.substring(0, 11)}</Text>

                  </View>                
                  
                  <View style={{flexDirection:'row',alignSelf: 'stretch', alignItems:'center'}}>

                      <Icon name='flight-takeoff' size={20} ></Icon>

                      <Text style={{marginLeft:5}}>Shipped: {item.shippedDate.substring(0, 11)}</Text>

                  </View> 
                  
  
                  </View>
  
                  {/* 3. Row */}
                  <View style={{flex: 0.5, flexDirection:'column', justifyContent: 'space-between',alignItems:'flex-end'}}>
                    
                  <View style={{flexDirection:'row',alignSelf: 'stretch', alignItems:'center'}}>

                    <Icon name='local-shipping' size={20} ></Icon>

                    <Text style={{marginLeft:5}}>Ship Name: {item.shipName}</Text>

                  </View>  

                  <View style={{flexDirection:'row',alignSelf: 'stretch', alignItems:'center'}}>

                    <Icon name='storefront' size={20} ></Icon>

                    <Text style={{marginLeft:5}}>Customer Id: {item.customerId}</Text>

                  </View> 
                  
                  
  
                  </View>
                </View>
                  
  
                </View>
  
                <TouchableOpacity onPress={()=> createDeleteAlert(item)}>
  
                <View style={{flexDirection:'row', justifyContent: 'space-between',alignSelf: 'stretch', backgroundColor:'red', margin:10, borderRadius:10}}>
                <Button title='Delete Order' color={versionColor()}  />
                <Icon name='delete' color='white' containerStyle={{backgroundColor:'transparent', padding:8}}/>
                </View>
  
                
                </TouchableOpacity>
  
              </View>
            ))
          }
          </ScrollView>
  
      </SafeAreaView>
    );
  }

  
}
const versionColor = () => {
  if (Platform.OS === 'ios') {
    // do something for ios
    return 'white'
  } else if (Platform.OS === 'android') {
    // other thing for android
    return 'white'
  } else if (Platform.OS === 'web') {
    // it's on web!
    return 'red'
  } else {
    // you probably won't end up here unless you support another platform!
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    minHeight:120,
    margin: 10,
    borderRadius:8,
    shadowColor: 'gray',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,  
    elevation: 3

  },
  DeleteButonStyle:{
    backgroundColor: 'red', 
    color:'white',
    fontWeight:'bold',
    borderRadius: 10,
  },
  flexBoxTextStyle2:{
    color: 'white', 
    fontWeight:'bold',
    fontSize: 17,
  },
});
