import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import FavoritesScreen from '../screens/FavoritesScreen';
import UserScreen from '../screens/UserScreen';
import ProductStack from './ProductStack';

const HomeTab = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={ProductStack}
                options={
                    { 
                        tabBarIcon: ({focused}) => {
                            const color = focused 
                                ? 'red' 
                                : 'black';

                            return <FontAwesome name='home' color={color} size={24} />
                        },  
                        headerShown: false ,
                        tabBarActiveTintColor: 'red'
                    }
                } />
            <Tab.Screen
                name="Favorieten"
                component={FavoritesScreen}
                options={
                    { 
                        tabBarIcon: ({focused}) => {
                            const color = focused 
                                ? 'red' 
                                : 'black';

                            return <FontAwesome name='heart' color={color} size={24} />
                        }, 
                        headerShown: false ,
                        tabBarActiveTintColor: 'red',
                    }
                } />
            <Tab.Screen
                name="Profiel"
                component={UserScreen}
                options={
                    { 
                        tabBarIcon: ({focused}) => {
                            const color = focused 
                                ? 'red' 
                                : 'black';

                            return <FontAwesome name='user' color={color} size={24} />
                        }, 
                        headerShown: false ,
                        tabBarActiveTintColor: 'red'
                    }
                } />
        </Tab.Navigator>
    )
}

export default HomeTab

const styles = StyleSheet.create({});