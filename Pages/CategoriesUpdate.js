import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, ActivityIndicator, TextInput,Alert } from 'react-native';
import { Input, Button , Icon} from 'react-native-elements';
import apiFuncs from '../env/apiFunctions';



export default function CategoriesUpdate({ route, navigation}) {

  const {id} = route.params;
  

  // Name and Description for updating
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  //this is For ActivityIndicator
  const [animating,setAnimating] = useState(Boolean)
  const [category, setcategory] = useState([])
  

  useEffect(() => {
    fillDataFromWeb()
    console.log(id);
  }, [])

  // buton activity indicator 
  const [loading, setloading] = useState(false)


  const fillDataFromWeb = () => {
    setAnimating(true)

    apiFuncs.get('api/categories/'+ id)
      .then((data) => {
        setcategory(data)
        setAnimating(false)
      })

  }

  const updateData = (data) => {
    setloading(true)
    apiFuncs.patch('api/categories/'+ category.id, data)
    .then((result)=>{
      setloading(false)
      Alert.alert(
        "Successful Update!",
        [ { text: "OK", onPress: () => console.log("OK Pressed") } ]
      )
    })

  }

  const updateBttnPress = () => {
    
  }

  const updateStop = () => {
    setloading(!loading)

  }

  if (animating) {

    return(
      <SafeAreaView style={styles.container}>

      <ActivityIndicator size= 'large'></ActivityIndicator>


      </SafeAreaView>
    );
    
  }else{
    return (

    
      <SafeAreaView style={{ flex: 1 }}>
  
        <ScrollView>

          
    
          {/* 1. box */}
          <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between',marginLeft:10,
              marginRight:10, marginTop:20 , marginBottom: 20}}>
              <Text style={{ color: '#4285F4', fontWeight:'bold', fontSize: 24 }}>Category Update</Text>
              <Icon name='autorenew' type='material' color='#4285F4' raised></Icon>
          </View>
          
          
          {/* 2. box */}
          <Text h2 style={{fontWeight:'300', fontSize:17, padding:10}}>Current Category Name:{'\n'}{category.name}</Text>
          <Text h4 style={{fontWeight:'300', fontSize:17, padding:10}}>Current Category Description:{'\n'}{category.description}</Text>

          

          <View style={{padding:10, marginTop:20}} >
            <Input placeholder='Name'  onChangeText={text => setName(text.trim())} ></Input>
            <View style={{borderWidth: 1.5, borderColor:'gray', backgroundColor:'white',borderRadius:10, marginLeft:5, marginRight:5}} >
              <TextInput placeholder='Description' maxLength={40}  multiline={true} style={{minHeight:80, padding:10}}
                onChangeText={ text => setDescription(text.trim())}   ></TextInput>
            </View>
          </View>

          <Button title='Update Category' style={{padding:30}} loading={loading} onPress={()=> updateData({
            name: name != '' ? name : category.name,
            description: description != '' ? description: category.description,
            id: category.id
          })}  ></Button>
          
  
        </ScrollView>
  
      </SafeAreaView>
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
