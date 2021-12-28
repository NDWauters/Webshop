import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';

const HomeStack = () => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='DetailsScreen' component={DetailsScreen} />
        </Stack.Navigator>
    )
}

export default HomeStack;