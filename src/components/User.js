import React, { useContext } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { signOut } from '@firebase/auth';
import { Button } from 'react-native-elements';
import { AuthUserStateContext } from '../contexts/AuthUserProvider';
import { auth } from '../firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { clear } from '../store/favorites/reducer';

const User = () => {

    const { user } = useContext(AuthUserStateContext);

    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
                dispatch(clear())
                await AsyncStorage.clear();
                await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Home page</Text>
            <Text>UID: {user.uid}</Text>
            <Text>Email: {user.email}</Text>

            <View style={styles.button} >
                <Button
                    title='Uitloggen'
                    onPress={() => handleLogout()}
                />
            </View>
        </SafeAreaView>
    )
}

export default User;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        justifyContent: 'space-evenly'
    },
    title: {
        flex: 1,
        fontSize: 24,
        alignSelf: 'center',
        paddingBottom: 24,
        fontWeight: '600',
    },
    button: {
        flex: 1,
        marginTop: 10,
    },
})
