import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';


export default function Categories({ navigation }) {

  // This is for refreshControl
  const [refreshing, setRefreshing] = React.useState(Boolean);
  const refreshStarting = () => {
    setRefreshing(true)
    // this is for GET Category
    fetch('https://northwind.vercel.app/api/categories')
    .then( (results) => results.json() )
    .then( (data) => {

      
      setFilteredCategories(data);
      setcategories(data);
      setRefreshing(false)


    })
  }
  //this is For ActivityIndicator
  const [animating,setAnimating] = useState(Boolean)
  

  // for Search Bar

  const [search, setSearch] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the categories
      // Update FilteredCategories
      const newData = categories.filter(function (item) {
        //items name convertin to lowercase for matching to text
        const itemData = item.name ? item.name.toLowerCase(): ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredCategories(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update filteredCategories with categories
      setFilteredCategories(categories);
      setSearch(text);
    }
  };

  // category array useState constant
  const [categories, setcategories] = useState([]);

  useEffect(() => {


    fillDataFromWeb();


  }, []);
  
  const fillDataFromWeb = () => {
    setAnimating(true)
    // this is for GET Category
    fetch('https://northwind.vercel.app/api/categories')
    .then( (results) => results.json() )
    .then( (data) => {

      
      setFilteredCategories(data);
      setcategories(data);
      setAnimating(false)


    })

  }

  //Delete icon Onpress Func
  
  const deleteCategory = (id) => {

    let content = {
      id:id
    }

    // this is for delete Category
      let requestoptions = {
        method: 'DELETE',
        body: JSON.stringify(content)
    }

    fetch('https://northwind.vercel.app/api/categories/' + id  , requestoptions)
     .then((res) => res.json())
      .then((data) => {

        fillDataFromWeb();

      })

  }
// creating alert for user be sure about deleting
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
  }

  

  const presRow = (gelenId) =>{
    console.log(gelenId)
  }





  const CategoryUpdatePressHandler = () =>{
    navigation.navigate('CategoriesUpdate');
  }
  // category add buton implement
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (<Icon 
        name='add'
        onPress={() => CategoryAddPressHandler()}
        style={{marginRight:10}}
    />)
    })
  })
  const CategoryAddPressHandler = () =>{
    navigation.navigate('CategoriesAdd');
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
    // this block works while fetching data
    return(
      downloadScreen()

    );
  } else {
    
  
    // this block works when Data loaded
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
          filteredCategories.map((item,i) => (
            <ListItem bottomDivider key = {i} onPress={() => presRow(item.id)} 
              containerStyle={{backgroundColor:'white', marginRight:10, marginLeft:10,
              marginBottom:10, borderRadius:15,}}>
              <ListItem.Content >
                <ListItem.Title style={{fontWeight:'bold'}}>{item.name}</ListItem.Title>
                <ListItem.Subtitle style={{ color:'gray', fontWeight:'300'}}>{item.description}</ListItem.Subtitle>
                
              </ListItem.Content>
              <Icon name='delete' color='red' onPress={() => createDeleteAlert(item)}
                containerStyle={{backgroundColor:'transparent', padding:8}}/>
              <ListItem.Chevron/>
            </ListItem>
            
          ))
        }
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
});
