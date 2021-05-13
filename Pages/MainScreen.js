import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import apiFuncs from '../env/apiFunctions';




export default function MainScreen({ navigation }) {


  // category fetching because I'll writes how many categories in categories subtitle
  const [categories, setcategories] = useState([]);
  const [Products, setProducts] = useState([])
  const [Orders, setOrders] = useState([])
  useEffect(() => {

    fillDataFromWeb();

  }, []);
  const fillDataFromWeb = () => {
    
    apiFuncs.get('api/categories')
    .then((data) =>{
      setcategories(data)
    })

    apiFuncs.get('api/products')
    .then((data) => {
      setProducts(data)
    })
    apiFuncs.get('api/orders/?_limit=15')
    .then((data) => {
      setOrders(data)
    })


  }

  



  const ProductPressHandler = () =>{
    navigation.navigate('Product');
  }
  const CategoryPressHandler = () =>{
    navigation.navigate('Categories', categories);
  }
  const OrderPressHandler = () =>{
    navigation.navigate('Order');
  }
  return (
    <SafeAreaView style={{ flex: 1 , backgroundColor:'white'}}>

        {/* 1. box */}
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between',marginLeft:10,
            marginRight:10, marginTop:15 }}>
            <Text style={{ color: 'black', fontWeight:'bold', fontSize: 24 }}>Shopping App</Text>
            <MaterialCommunityIcons name="shopping-outline" size={24} color="black" />
        </View>

        {/* 2. box */}
        <View style={{ flex: 1, marginLeft:10, marginRight:10}}>
            <Text h2 style={{fontWeight:'bold', fontSize:17}}>Hello</Text>
            <Text h4 style={{color:'gray', fontSize:17}}>Let's start shopping</Text>
        </View>

        {/* 3. box */}
        <View style={{ flex: 7 , margin:20}}>

            {/* Products Box  */}
            <TouchableOpacity style={styles.flexbox1} 
              onPress={ProductPressHandler}>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}} >
                <View>
                  <Text h3 style={styles.flexBoxTextStyle1}>Products</Text>
                  <Text style={{ color: 'black', marginTop:5}}>{Products.length} section</Text>
                </View>
                <View>
                  <Ionicons name="albums" size={24} color="black" /> 
                </View>
              </View>
                
            </TouchableOpacity>
            {/* Category Box  */}
            <TouchableOpacity style={styles.flexbox2} 
              onPress={CategoryPressHandler}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}} >
                  <View>
                    <Text h3 style={styles.flexBoxTextStyle2}>Categories</Text>
                    <Text style={{ color: 'white', marginTop:5 }}>{categories.length} section</Text>
                  </View>
                  <View>
                    <MaterialIcons name="category" size={24} color="white" />
                  </View>
                </View>
            </TouchableOpacity>
            {/* Order Box  */}
            <TouchableOpacity style={styles.flexbox3}
              onPress={OrderPressHandler} >
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}} >
                  <View>
                    <Text h3 style={styles.flexBoxTextStyle2}>Orders</Text>
                    <Text style={{ color: 'white', marginTop:5 }}>{Orders.length} section</Text>
                  </View>
                  <View>
                    <MaterialIcons name="shopping-cart" size={24} color="white" />
                  </View>
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
  flexbox1:{
    backgroundColor: '#D4EDE9', 
    flex: 2, 
    marginTop: 10, 
    borderRadius: 10, 
    padding: 20,
    shadowColor: 'gray',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,  
    elevation: 3
  },
  flexbox2:{
    backgroundColor: '#FBB563', 
    flex: 2,
    marginTop: 10, 
    borderRadius: 10, 
    padding: 20,
    shadowColor: 'gray',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,  
    elevation: 3
  },
  flexbox3: {
    backgroundColor: '#448BA4', 
    flex: 2, 
    marginTop: 10, 
    borderRadius: 10, 
    padding: 20,
    shadowColor: 'gray',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,  
    elevation: 3
  }
});
