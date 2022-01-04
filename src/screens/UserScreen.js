import AsyncStorage  from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import User from '../components/User';
import { auth } from '../firebase';
import { clear } from '../store/favorites/reducer';
import { Button } from 'react-native-elements';

const UserScreen = () => {

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
            <User style={styles.user} />
            <Button
                title='Uitloggen'
                onPress={() => handleLogout()}
                titleStyle={styles.buttonText}
                buttonStyle={styles.button}
            />
        </SafeAreaView>
    )
}

export default UserScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: '#97BC62FF'
    },
    user: {
        flex: 1,
    },
    buttonText: {
        fontSize: 16, 
        textAlign: 'right', 
        color: 'yellow'
    },
    button: {
        backgroundColor: '#2C5F2D',
        marginLeft: 10,
        marginRight: 10,
        marginBottom:20
    },
});