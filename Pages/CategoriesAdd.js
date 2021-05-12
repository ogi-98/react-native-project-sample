import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Alert} from 'react-native';
import { Input, Button , Icon} from 'react-native-elements';
import apiFuncs from '../env/apiFunctions';



export default function CategoriesAdd({ navigation :{ goBack} }) {


  // Name and Description for adding
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  // Succesful Adding
  const [Success,SetSuccess] = useState(false)
  // buton activity indicator 
  const [loading, setloading] = useState(false)



  const addCategoryIcon = () => {
    if (Success) {
      return (
        <Icon reverse name='check-circle' type='material' color='green' ></Icon>
      );
    } else {
      return (
        <Icon name='add-circle' type='material' color='#4285F4' raised onPress={()=> addData({
          name: name != '' ? name : '',
          description: description != '' ? description: "",
        }) }></Icon>
      );
    }
  }


  const addData = (data) => {

    if (name != '' || description != '') {
      setloading(true)
      apiFuncs.post('api/categories/', data)
      .then((result)=>{
        setloading(false)
        SetSuccess(true)
        setName('')
        setDescription('')
      
        Alert.alert(
        "Success!",
        "Successful Adding!",
        [ { text: "OK", onPress: () => goBack() } ]
        )
      
      })
    } else {
      Alert.alert(
        "All Fields are empty!",
        "You must fill least one row.",
        [ { text: "Cancel" } ]
      )
    }

    

  }



  return (
    <SafeAreaView style={{ flex: 1 }}>

      <ScrollView>

                
          
      {/* 1. box */}
      <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between',marginLeft:10,
          marginRight:10, marginTop:20 , marginBottom: 20}}>
          <Text style={{ color: '#4285F4', fontWeight:'bold', fontSize: 24 }}>Category Add</Text>
          {addCategoryIcon()}
      </View>
      {/* recycling  autorenew */}

      {/* 2. box */}
      <Text style={{marginBottom:5, marginLeft:10, textDecorationLine:'underline'}}>Category Preview:</Text>
      <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between',marginLeft:10,
          marginRight:10, marginTop:20 , marginBottom: 10, backgroundColor:'white', padding:8, borderRadius:8}}>
          <View>
            {name != '' ? <Text h2 style={{fontWeight:'300', fontSize:17, fontWeight:'bold',}}>{name}</Text> : <Text h2 style={{fontWeight:'300', fontSize:17, fontWeight:'bold',}}>Write name</Text>} 
            {description != '' ? <Text h4 style={{fontWeight:'300', fontSize:17,}}>{description}</Text> : <Text h4 style={{fontWeight:'300', fontSize:17,}}>Write description</Text>} 
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon name='delete' color='red' containerStyle={{backgroundColor:'transparent', padding:8}}/>
            <Icon name='chevron-right' color='gray' containerStyle={{backgroundColor:'transparent', padding:8}}/>
          </View>
          
      </View>



      <View style={{padding:10, marginTop:20}} >
        <Input placeholder='Name'  onChangeText={text => setName(text.trim())} ></Input>
        <View style={{borderWidth: 1.5, borderColor:'gray', backgroundColor:'white',borderRadius:10, marginLeft:5, marginRight:5}} >
          <TextInput placeholder='Description' maxLength={40}  multiline={true} style={{minHeight:80, padding:10}}
            onChangeText={ text => setDescription(text.trim())}  ></TextInput>
        </View>
      </View>

      <Button title='Add Category' style={{padding:30}} loading={loading} onPress={()=> addData({
        name: name != '' ? name : "",
        description: description != '' ? description: "",
      })}  ></Button>


      </ScrollView>

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
