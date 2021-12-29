import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';

const ProductStack = () => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name='Producten' component={HomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name='Details' component={DetailsScreen}/>
        </Stack.Navigator>
    )
}

export default ProductStack;