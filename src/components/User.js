import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { signOut } from '@firebase/auth';
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
            <View style={styles.textContainer}>
                <Text>UID: {user.uid}</Text>
                <Text>Email: {user.email}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
                    <Text style={styles.buttonText} >Uitloggen</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default User;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 16,
        justifyContent: 'space-between'
    },
    title: {
        flex: 1,
        fontSize: 24,
        alignSelf: 'center',
        paddingBottom: 24,
        fontWeight: '600',
    },
    textContainer: {
        flex: 10,

    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        flex: 1,
        backgroundColor: '#2C5F2D',
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        width: '80%',
        borderRadius: 30,
    },
    buttonText: { 
        flex: 1,
        alignSelf: 'center', 
        color: 'yellow' ,
        fontSize: 22,
    }
})
