import { auth } from '../firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';


const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const handleLogin = async () => {

        if(email !== '' && password !== ''){
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Inloggen</Text>
            <Input placeholder='Emailadres' value={email} onChangeText={(text) => setEmail(text)} />
            <Input placeholder='Wachtwoord' secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
            <View style={{ alignItems: 'flex-end' }}>
                <Button 
                    title='Registreren' 
                    type='clear' 
                    titleStyle={{ fontSize: 14, textAlign: 'right' }}
                    onPress={() => navigation.navigate('Register')}
                />
            </View>
            <Button title='Inloggen' onPress={() => handleLogin()} ></Button>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        paddingBottom: 24,
        alignSelf: 'center',
    },
})
