import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-elements';




export default function ProductScreenDetail({ route ,navigation}) {

  const {id, supplierId, categoryId, quantityPerUnit, unitPrice, unitsInStock,unitsOnOrder,
    reorderLevel,discontinued,name} = route.params;
  
  const{ID}= route.params;

  const arr = 10;
  const mainPhotoArr = []


  // product array useState constant
  const [productDetail, setProductDetail] = useState([]);
  const [category, setcategory] = useState([]);


  useEffect(() => {

    fillDataFromWeb();
    fillDataFromWeb2();

  }, []);
  
  const fillDataFromWeb = () => {
    // this is for GET Products
    fetch('https://northwind.vercel.app/api/products/' + id )
    .then( (results) => results.json() )
    .then( (data) => {

      
      setProductDetail(data);


    })

    

  }

  const fillDataFromWeb2 = () => {
    // this is for GET Category
    fetch('https://northwind.vercel.app/api/products/' + categoryId)
    .then( (results) => results.json() )
    .then( (data) => {

      
      setcategory(data);


    })

  }

  return (
    <SafeAreaView style={{ flex: 1 , backgroundColor:'white'}}>
      <View style={{flex:1}}>

          {/* 1. tittle */}
          <View style={{ flex:0.8,marginLeft:10,marginRight:10, marginTop:30 ,marginBottom:30}}>

            <View>
            <Text style={{ textAlign:'center' ,color: 'black', fontWeight:'bold', fontSize: 24,
            marginLeft:30, marginRight:30}}>{productDetail.name}</Text>
            </View>
              
          </View>

          {/* 2. Foto */}
          <View style={{flex:2.5, flexDirection: 'row', justifyContent: 'space-between',marginLeft:10,
              marginRight:10, marginTop:0}}>
                <View>

                  <Icon reverse name='favorite' type='material' color='red' size={17} ></Icon>

                </View>
                
                <View style={{alignItems:'center',alignContent:'center'}}>
                <Image style={{height:220, width:220,borderRadius:20}} 
                  source={{ uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'}}>
                </Image>

                </View>
                <View>

                  {StockNonStock(productDetail)}

                </View>

          </View>

          {/* 3. Info */} 
          <View style={{flex:0.9,marginTop:30 ,marginLeft:10, marginRight:10,backgroundColor:'transparent'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{flex:0.3,flexDirection:'row', backgroundColor:'white', borderRadius:6,alignItems:'center'}}>
                <Icon name='favorite' type='material' color='gray' style={{marginLeft:8}} ></Icon>
                <View style={{alignContent:'center',marginLeft:4}}>
                  <Text h2 style={{fontWeight:'300', color:'gray'}}>22 likes</Text>
                </View>
                
              </View>

              {priceView(productDetail)}

              <View style={{flex:0.3,flexDirection:'row', backgroundColor:'white', borderRadius:6,alignItems:'center'}}>
                <Icon name='local-grocery-store' type='material' color='gray' style={{marginLeft:25}} ></Icon>
                <View style={{alignContent:'center',marginLeft:4}}>
                  <Text h4 style={{color:'gray', fontWeight:'300'}}>{productDetail.unitsOnOrder}</Text>
                </View>
                
              </View>
              
            </View>
            <Text h5 style={{fontWeight:'500', textAlign:'center',padding:10}}>Category: {category.name}</Text>
              
          </View>
          {/* 4. Button */}
          <View>

            {ButtonStock(productDetail)}

          </View>

          {/* 5. CardView */}
          <View style={{ flex:2.5,backgroundColor:'red', marginBottom:-40}}>
            <View backgroundColor='white' style={{width:100,height:2, borderRadius:2, alignSelf:'center'}} marginTop={5}></View>
            <Text  style={{alignSelf:'center',padding: 10,fontSize:15, color:'white'}}>255 peoples like this</Text>

            
            <ScrollView marginTop={25} horizontal={true}>
            <View style={{flexDirection:'row' ,justifyContent:'space-between'}}>
              
              {
                altPhoto()
              }
              
 
            </View>
            </ScrollView>
            


          </View>
      </View>
      
        

    </SafeAreaView>
);
}
const StockNonStock = (p) =>{
  let num = Number(p.unitsInStock);
  if (num > 0) {
    return (
      <Icon reverse name='check-circle' type='material' color='green' size={17} ></Icon>
    );
  } else {
    return (
      <Icon reverse name='error' type='material' color='gray' size={17} ></Icon>
    );
  }
}
const altPhoto = () =>{
  const photoArr = []
  const links = ['https://images.unsplash.com/photo-1552058544-f2b08422138a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=688&q=80',
    'https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=802&q=80',
    'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=666&q=80',
    'https://images.unsplash.com/photo-1461800919507-79b16743b257?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=666&q=80',
    'https://images.unsplash.com/photo-1569124589354-615739ae007b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    'https://images.unsplash.com/photo-1612061279301-c1bd3a484fcf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    ]
  for (let i = 0; i <= 10; i++) {
    photoArr.push(

      (
        <Image key={i} style={{height:50, width:50,borderRadius:50, marginLeft:15}} 
         source={{uri: links[i]}}>
        </Image>
       )

    )
     
  }
  return photoArr
}

const ButtonStock = (p) =>{
  let num = Number(p.unitsInStock);
  if (num > 0) {
    return (
      <Button style={{padding:30}} title= 'Buy Now' ></Button>
    );
  } else {
    return (
      <Button style={{padding:30}} title= 'Buy Now' disabled ></Button>
    );
  }
}

const priceView = (i) =>{
  // let num = Number(i.unitsInStock);
  // if (num > 0) {
  //   return (
  //     <Text style={{fontWeight:'bold', fontSize:24}}>{i.unitPrice} $</Text>
  //   );
  // } else {
  //   return (
  //     <Text style={{fontWeight:'300'}}>{i.unitPrice} $</Text>
  //   );
  // }
  return (
    <Text style={{fontWeight:'bold', fontSize:24}}>{i.unitPrice} $</Text>
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
