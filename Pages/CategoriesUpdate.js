import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, ActivityIndicator, TextInput,Alert } from 'react-native';
import { Input, Button , Icon} from 'react-native-elements';
import apiFuncs from '../env/apiFunctions';



export default function CategoriesUpdate({ route, navigation :{ goBack} }) {

  const {id} = route.params;
  

  // Name and Description for updating
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  //this is For ActivityIndicator
  const [animating,setAnimating] = useState(Boolean)
  const [category, setcategory] = useState([])
  //Succesful update
  const [Success,SetSuccess] = useState(false)

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
        SetSuccess(false)
      })

  }

  const updateData = (data) => {

    if (name != '' || description != '') {
      setloading(true)
    apiFuncs.put('api/categories/'+ category.id, data)
    .then((result)=>{
      setloading(false)
      SetSuccess(true)
      setName('')
      setDescription('')
      
      Alert.alert(
        "Success!",
        "Successful Update!",
        [ { text: "OK", onPress: () => fillDataFromWeb() } ]
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

  const updateStop = () => {
    setloading(!loading)

  }

  const createDeleteAlert = (category) =>{

    Alert.alert(
      category.name,
      "Are you sure about delete category",
      [
        {
          text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete",
          onPress: () => deleteCategory(category.id),
          style: "destructive"
        }
      ]
    );
  }//createDeleteAlert

  const deleteCategory = (id) => {

    apiFuncs.delete('api/categories/', id)
    .then((data) => {
      goBack()
    })
    .catch((msg) => {
    })

  }



  const ConvertCheck = () =>{
    if (Success) {
      return (
        <Icon reverse name='check-circle' type='material' color='green' ></Icon>
      );
    } else {
      return (
        <Icon name='autorenew' type='material' color='#4285F4' raised onPress={()=> updateData({
          name: name != '' ? name : category.name,
          description: description != '' ? description: category.description,
          id: category.id
        }) }></Icon>
      );
    }   
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
              {ConvertCheck()}
          </View>
          {/* recycling  autorenew */}
          
          {/* 2. box */}
          <Text style={{marginBottom:5, marginLeft:10, textDecorationLine:'underline'}}>Current Category Preview:</Text>
          <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between',marginLeft:10,
              marginRight:10, marginTop:20 , marginBottom: 10, backgroundColor:'white', padding:8, borderRadius:8}}>
              <View>
                <Text h2 style={{fontWeight:'300', fontSize:17, fontWeight:'bold',}}>{category.name}</Text>
                <Text h4 style={{fontWeight:'300', fontSize:17,}}>{category.description}</Text> 
              </View>
              <Icon name='delete' color='red' onPress={() => createDeleteAlert(category)}
                containerStyle={{backgroundColor:'transparent', padding:8}}/>
          </View>

          

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
