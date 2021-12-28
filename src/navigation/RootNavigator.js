import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { AuthUserStateContext } from '../contexts/AuthUserProvider';
import AuthStack from './AuthStack';
import ProductTab from './ProductTab';

const RootNavigator = () => {

    const { user, isLoading } = useContext(AuthUserStateContext);

    if (isLoading) {
        return <ActivityIndicator size='large' animating/>
    }else{
        return (
            <NavigationContainer>
                { user ? <ProductTab /> : <AuthStack/> }
            </NavigationContainer>
         )
    }
}

export default RootNavigator;