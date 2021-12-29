import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { AuthUserStateContext } from '../contexts/AuthUserProvider';
import AuthStack from './AuthStack';
import HomeTab from './HomeTab';

const RootNavigator = () => {

    const { user, isLoading } = useContext(AuthUserStateContext);

    if (isLoading) {
        return <ActivityIndicator size='large' animating/>
    }else{
        return (
            <NavigationContainer>
                { user ? <HomeTab /> : <AuthStack/> }
            </NavigationContainer>
         )
    }
}

export default RootNavigator;