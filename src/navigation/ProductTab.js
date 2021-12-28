import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import FavoritesScreen from '../screens/FavoritesScreen';
import UserScreen from '../screens/UserScreen';
import HomeStack from './HomeStack';

const ProductTab = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{ tabBarIcon: () => <FontAwesome name='home' color='black' size={24} />, headerShown: false }} />
            <Tab.Screen
                name="Favorieten"
                component={FavoritesScreen}
                options={{ tabBarIcon: () => <FontAwesome name='heart' color='black' size={24} />, headerShown: false }} />
            <Tab.Screen
                name="Profiel"
                component={UserScreen}
                options={{ tabBarIcon: () => <FontAwesome name='user' color='black' size={24} />, headerShown: false }} />
        </Tab.Navigator>
    )
}

export default ProductTab

const styles = StyleSheet.create({})
