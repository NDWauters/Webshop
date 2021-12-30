import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import FavoritesScreen from '../screens/FavoritesScreen';
import UserScreen from '../screens/UserScreen';
import ProductStack from './ProductStack';

const HomeTab = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={
            {
                tabBarActiveTintColor: 'yellow',
                tabBarInactiveTintColor: '#97BC62FF',
                tabBarStyle: {
                    backgroundColor: '#2C5F2D'
                }
            }} >
            <Tab.Screen
                name="Home"
                component={ProductStack}
                options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ focused }) => {
                            const color = focused
                                ? 'yellow'
                                : '#97BC62FF';

                            return <FontAwesome name='home' color={color} size={24} />
                        },
                    }} />
            <Tab.Screen
                name="Favorieten"
                component={FavoritesScreen}
                options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ focused }) => {
                            const color = focused
                                ? 'yellow'
                                : '#97BC62FF';

                            return <FontAwesome name='heart' color={color} size={24} />
                        },
                    }} />
            <Tab.Screen
                name="Profiel"
                component={UserScreen}
                options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ focused }) => {
                            const color = focused
                                ? 'yellow'
                                : '#97BC62FF';

                            return <FontAwesome name='user' color={color} size={24} />
                        },
                    }} />
        </Tab.Navigator>
    )
}

export default HomeTab;