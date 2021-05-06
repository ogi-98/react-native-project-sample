import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import{ NavigationContainer , DefaultTheme} from '@react-navigation/native';
import  MainScreen  from '../Pages/MainScreen';
import ProductScreen from '../Pages/ProductScreen';
import ProductScreenDetail from '../Pages/ProductScreenDetail';
import Categories from '../Pages/Categories';
import CategoriesAdd from '../Pages/CategoriesAdd';
import CategoriesUpdate from '../Pages/CategoriesUpdate';
import OrderScreen from '../Pages/OrderScreen';
import { Icon } from 'react-native-elements';




const Stack = createStackNavigator();


export default () => {
    return(
       <NavigationContainer >
        <Stack.Navigator initialRouteName='Home' screenOptions={{ gestureEnabled:true }}>
            <Stack.Screen name='Home' options={{headerShown:false}} component={MainScreen} />
            <Stack.Screen name="Product" component={ProductScreen} />
            <Stack.Screen name="ProductDetail" options={{title:'Product Detail'}} component={ProductScreenDetail} />
            <Stack.Screen name="Categories" options={{headerTitle:'Categories'}} component={Categories} />
            <Stack.Screen name="CategoriesAdd" options={{title:'Categories Add'}} component={CategoriesAdd} />
            <Stack.Screen name="CategoriesUpdate" options={{title:'Categories Update'}} component={CategoriesUpdate} />
            <Stack.Screen name="Order" options={{title:'Order'}} component={OrderScreen} />
        </Stack.Navigator>
    </NavigationContainer>
    );

}

const pressAddCategory = () =>{
    (   <Icon 
            name='add'
            onPress={() => Categories.arguments.pressAddCategory() }
        />
    )
    
}
