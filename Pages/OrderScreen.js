import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Alert, ActivityIndicator, RefreshControl, View, Text, TouchableOpacity, Button } from 'react-native';
import { Icon, ListItem, SearchBar } from 'react-native-elements';
import apiFuncs from '../env/apiFunctions';


export default function OrderScreen({ navigation }) {


   // order array useState constant
  const [order, setOrder] = useState([]);
  const [filteredOrder, setFilteredOrder] = useState([]);
  //this is For ActivityIndicator
  const [animating,setAnimating] = useState(Boolean)
  //orders details
  const [Detail, seTDetail] = useState([])

  const [refreshing, setRefreshing] = useState(false);
  const refreshStarting = () => {
    setRefreshing(true)
    // this is for get Category
    apiFuncs.get('api/orders/?_limit=15')
      .then((data) => {
        setFilteredOrder(data)
        setOrder(data)
        setRefreshing(false)
      })
  }



  useEffect(() => {

    fillDataFromWeb();

  }, []);
  const fillDataFromWeb = () => {
    setAnimating(true)
    // this is for get Category
      apiFuncs.get('api/orders/?_limit=15')  // learn limit from https://stackoverflow.com/questions/52842039/how-to-limit-the-amount-of-data-returned-from-a-json-file-using-fetch/52842411
      .then((data) => {
        setFilteredOrder(data);
        setOrder(data)
        setAnimating(false)
      })
    
    

  }// fillDataFromWeb

  const getDetailsFromWeb = (i) => {

    apiFuncs.get('api/orders/' + i)
    .then((data) => {
      seTDetail(data)
    })

  }

  

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <RefreshControl refreshing={refreshing} onRefresh={() => refreshStarting()}/>

        {
          filteredOrder.map((item , key ) => (
            <TouchableOpacity
            key= {item.id}
            style={styles.container}
            >
              <View style={{margin:5,}}>
                {/* 1. Row */}
                <View style={{flex: 0.5, flexDirection:'row', justifyContent: 'space-between',alignSelf: 'stretch'}}>
                  
                <Text>Order ID: {item.id}</Text>
                <Text >Order Date: {item.orderDate.substring(0, 11)}</Text>

                </View>

                <Icon name='chevron-right' style={{alignSelf: 'flex-end',marginTop:20}}  />

              <View style={{flexDirection:'row', justifyContent: 'space-between',alignSelf: 'stretch',marginTop:20}} >
              {/* 2. Row */}
              <View style={{flex: 0.5, flexDirection:'column', justifyContent: 'space-between',alignItems:'flex-start'}}>
                                
                <Text >Arrived: {item.requiredDate.substring(0, 11)}</Text>
                <Text >Shipped: {item.shippedDate.substring(0, 11)}</Text>

                </View>

                {/* 3. Row */}
                <View style={{flex: 0.5, flexDirection:'column', justifyContent: 'space-between',alignItems:'flex-end'}}>
                  
                <Text>Ship Name: {item.shipName}</Text>
                <Text >Customer Id: {item.customerId}</Text>

                </View>
              </View>
                

              </View>

              <View style={{flexDirection:'row', justifyContent: 'space-between',alignSelf: 'stretch', backgroundColor:'red', margin:10, borderRadius:10}}>
              <Button title='Delete Order' color='white'/>
              <Icon name='delete' color='white' containerStyle={{backgroundColor:'transparent', padding:8}}/>
              </View>

              

            </TouchableOpacity>
          ))
        }







{/* 
          {filteredOrder.map((item , key ) => (
            <ListItem key = {key}>
              <ListItem.Content backgroundColor='lightgray' padding={50}>

              <View style={{flexDirection:'row', justifyContent:'space-between', flex:1.0}}>
              <ListItem.Title style={{fontWeight:'bold'}}>Customer Id: {item.customerId}</ListItem.Title>
              <Text>Order Date: {item.orderDate}</Text>
              
              <Text>Customer Id: {item.customerId}</Text>
              <Text>Ship Name: {item.shipName}</Text>
              </View>
              <ListItem.Subtitle style={{ color:'gray', fontWeight:'300'}}>Ship Name: {item.shipName}</ListItem.Subtitle>
              </ListItem.Content>
              


            </ListItem>
            console.log("shipname:");
            console.log(item.shipName);
            console.log("item.detail.productId:");
            console.log(item.details.productId);
          ))} */}
        </ScrollView>

    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    minHeight:120,
    margin: 5,
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
