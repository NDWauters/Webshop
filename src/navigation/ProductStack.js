import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';

const ProductStack = () => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#2C5F2D' } }}>
            <Stack.Screen name='Producten' component={HomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen 
            name='Details' 
            component={DetailsScreen} 
            options={
                { 
                    headerBackTitleVisible: false, 
                    headerTintColor: '#97BC62FF'
                }
            }/>
        </Stack.Navigator>
    )
}

export default ProductStack;