import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { ListItem, SearchBar, Icon } from 'react-native-elements';
import apiFuncs from '../env/apiFunctions';


export default function ProductScreen({ navigation }) {


  // This is for refreshControl
  const [refreshing, setRefreshing] = React.useState(Boolean);

  const refreshStarting = () => {
    setRefreshing(true)
    // this is for GET Products
    apiFuncs.get("api/products")
      .then((data) => {
        setFilteredProducts(data)
        setProducts(data)
        setRefreshing(false)
      })



  }

  //this is For ActivityIndicator
  const [animating,setAnimating] = useState(Boolean)



    // for Search Bar

    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
  
    const searchFilterFunction = (text) => {
      // Check if searched text is not blank
      if (text) {
        // Inserted text is not blank
        // Filter the categories
        // Update FilteredCategories
        const newData = products.filter(function (item) {
          //items name convertin to lowercase for matching to text
          const itemData = item.name ? item.name.toLowerCase(): ''.toLowerCase();
          const textData = text.toLowerCase();
          return itemData.indexOf(textData) > -1;
        });
        setFilteredProducts(newData);
        setSearch(text);
      } else {
        // Inserted text is blank
        // Update filteredProducts with categories
        setFilteredProducts(products);
        setSearch(text);
      }
    };

  // product array useState constant
  const [products, setProducts] = useState([]);

  useEffect(() => {

    fillDataFromWeb();

  }, []);
  
  const fillDataFromWeb = () => {
    setAnimating(true)
    apiFuncs.get('api/products')
      .then((data) => {
        setFilteredProducts(data);
        setProducts(data)
        setAnimating(false)
      })

  }

    //Delete icon Onpress Func
  
    const deleteProduct = (id) => {

      apiFuncs.delete('api/products/', id)
        .then((data) => {
          fillDataFromWeb();
        })


    }

// creating ALERT for user be sure about deleting
  const createDeleteAlert = (product) =>{
    Alert.alert(
      product.name,
      "Are you sure about delete product",
      [
        {
          text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete",
          onPress: () => deleteProduct(product.id),
          style: "destructive"
        }
      ]
    );
  }
  const presRow = (item) =>{
    console.log(item.id)
    
    ProductDetailPressHandler(item)
  }

  const ProductDetailPressHandler = (item) =>{
    navigation.navigate('ProductDetail', {
      id: item.id,
      supplierId:item.supplierId,
      categoryId: item.categoryId,
      quantityPerUnit: item.quantityPerUnit,
      unitPrice: item.unitPrice,
      unitsInStock: item.unitsInStock,
      unitsOnOrder: item.unitsOnOrder,
      reorderLevel: item.reorderLevel,
      discontinued: item.discontinued,
      name: item.name,
      gözükmeyenParam: '', 
    });
  }


  

  const downloadScreen = () =>{
    return (
      <SafeAreaView style={{ flex: 1 }} >
        <SearchBar 
              round 
              inputStyle={{backgroundColor:"lightgray"}}
              containerStyle={{backgroundColor:'transparent', borderWidth:0,
              borderBottomColor:'transparent',borderTopColor:'transparent' , borderWidth:0,
              shadowColor:'white',}}
              inputContainerStyle={{backgroundColor:'lightgray',height:30,}}
              searchIcon={{size: 24}}
              onChangeText={(text) => searchFilterFunction(text)}
              onClear={(text) => searchFilterFunction('')}
              placeholder="Search Here..."
              value={search}
        ></SearchBar>

        <ActivityIndicator style={{alignItems:'center', marginTop:20}} size='large' animating= {animating}/>
      </SafeAreaView>
    )
  }

  if (animating) {
    return(
      downloadScreen()
    );
    
  } else {
    return (

      <SafeAreaView style={{ flex: 1 }} keyboardShouldPersistTaps='always'>
      {/* SearchBar Implement for searching specific category. */}
      <SearchBar 
        round 
        inputStyle={{backgroundColor:"lightgray"}}
        containerStyle={{backgroundColor:'transparent', borderWidth:0,
        borderBottomColor:'transparent',borderTopColor:'transparent' , borderWidth:0,
        shadowColor:'white',}}
        inputContainerStyle={{backgroundColor:'lightgray',height:30,}}
        searchIcon={{size: 24}}
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={(text) => searchFilterFunction('')}
        placeholder="Search Here..."
        value={search}
      ></SearchBar>

      <ScrollView > 
        <RefreshControl refreshing={refreshing} onRefresh={() => refreshStarting()} />
        
          {/* ListItem Implement.*/}
        {
          filteredProducts.map((item,i) => (
            <ListItem bottomDivider key = {i} onPress={() => presRow(item)} 
              containerStyle={{backgroundColor:'white', marginRight:10, marginLeft:10,
              marginBottom:10, borderRadius:15,}}>

                <ListItem.Content>

                  <ListItem.Title style={{fontWeight:'bold'}}>{item.name}</ListItem.Title>
                  {StockNonStock(item.unitsInStock)}
                  
                </ListItem.Content>
                {priceView(item)}

              <Icon name='delete' onPress={() => createDeleteAlert(item)} ></Icon>
            </ListItem>
          ))
        }
      </ScrollView>
    </SafeAreaView>
    );

  }

}
const StockNonStock = (i) =>{
  let num = Number(i);
  if (num > 0) {
    return (
      <ListItem.Subtitle style={{ color:'green', fontWeight:'normal'}}>In Stock</ListItem.Subtitle>
    );
  } else {
    return (
      <ListItem.Subtitle style={{ color:'gray', fontWeight:'300'}}>Out of Stock</ListItem.Subtitle>
    );
  }
}
const priceView = (i) =>{
  let num = Number(i.unitsInStock);
  if (num > 0) {
    return (
      <View>
        <Text style={{fontWeight:'bold'}}>{i.unitPrice} $</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={{fontWeight:'300'}}>{i.unitPrice} $</Text>
      </View>
    );
  }

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
