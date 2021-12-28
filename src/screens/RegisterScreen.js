import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../firebase';

const RegisterScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [name, setName] = useState('');

    const navigation = useNavigation();

    const handleRegister = async () => {
        if(name !== '' && email !== '' && password !== '' && repeatPassword !== ''){
            if (password === repeatPassword) {
                try {
                    await createUserWithEmailAndPassword(auth, email, password);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Registeer</Text>
            <Input placeholder='Volledige naam' value={name} onChangeText={(text) => setName(text)} />
            <Input placeholder='Emailadres' value={email} onChangeText={(text) => setEmail(text)} />
            <Input placeholder='Wachtwoord' secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
            <Input placeholder='Herhaal wachtwoord' secureTextEntry value={repeatPassword} onChangeText={(text) => setRepeatPassword(text)} />
            <View style={{ alignSelf: 'flex-end' }}>
                <Button 
                    title='Inloggen' 
                    type='clear' titleStyle={{ fontSize: 14, textAlign: 'right' }}
                    titleStyle={{ fontSize: 14, textAlign: 'right' }}
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
            <Button 
                    title='Registreer' 
                    titleStyle={{ fontSize: 14, textAlign: 'right' }}
                    onPress={() => handleRegister()}
                />
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    title: {
        fontSize: 26,
        alignSelf: 'center',
        fontWeight: '600',
        paddingBottom: 24,
    },
})
