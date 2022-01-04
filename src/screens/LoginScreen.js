import { auth } from '../firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useNavigation } from '@react-navigation/core';
import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { Formik } from 'formik';
import loginValidationScheme from '../validationSchemes/loginValidationScheme';

const LoginScreen = () => {

    const navigation = useNavigation();

    const refPassword = useRef(null);

    // error if login failed
    const [errorLogin, setErrorLogin] = useState('');

    // function for login action
    const handleLogin = async (values) => {
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
        } catch (error) {
            setErrorLogin('Inloggen is mislukt.');
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <FontAwesome style={styles.icon} name='shopping-basket' size={50} />
            <Text style={styles.title}>Inloggen</Text>
            <Formik
                validationSchema={loginValidationScheme}
                initialValues={{ email: '', password: '' }}
                onSubmit={values => handleLogin(values)}
            >
                {
                    ({ handleChange, handleSubmit, values, errors }) => (
                        // avoid blocking view of input fields by keyboard
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            style={styles.inputContainer}
                        >
                            {
                                // show error here if login failed
                                errorLogin.length > 0 ? <Text style={styles.errorLogin}>{errorLogin}</Text> : null
                            }
                            <Input
                                name='email'
                                style={styles.mail}
                                placeholderTextColor='#2C5F2D'
                                placeholder='Emailadres'
                                value={values.email}
                                onChangeText={handleChange('email')}
                                inputContainerStyle={{ borderBottomColor: '#2C5F2D' }}
                                keyboardType='email-address'
                                onSubmitEditing={() => refPassword.current.focus()}
                                returnKeyType='next'
                                errorMessage={errors.email ? errors.email : null}
                                errorStyle={styles.error}
                            />
                            <Input
                                name='password'
                                style={styles.password}
                                placeholderTextColor='#2C5F2D'
                                placeholder='Wachtwoord'
                                secureTextEntry
                                value={values.password}
                                onChangeText={handleChange('password')}
                                inputContainerStyle={{ borderBottomColor: '#2C5F2D' }}
                                ref={refPassword}
                                returnKeyType='done'
                                errorMessage={errors.password ? errors.password : null}
                                errorStyle={styles.error}
                            />
                            <View style={styles.buttonContainer}>
                                <Button
                                    style={{ alignItems: 'flex-end' }}
                                    title='Registreren'
                                    type='clear'
                                    titleStyle={{ fontSize: 16, textAlign: 'right', color: '#2C5F2D', marginBottom: 5 }}
                                    onPress={() => navigation.navigate('Register')}
                                />
                                <Button
                                    title='Inloggen'
                                    onPress={handleSubmit}
                                    buttonStyle={{ backgroundColor: '#2C5F2D' }}
                                    titleStyle={{ color: 'yellow' }}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    )
                }
            </Formik>
        </SafeAreaView >
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 16,
        backgroundColor: '#97BC62FF'
    },
    inputContainer: {
        flex: 3
    },
    title: {
        flex: 1,
        fontSize: 24,
        fontWeight: '600',
        paddingBottom: 24,
        alignSelf: 'center',
        color: '#2C5F2D'
    },
    icon: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        color: '#2C5F2D',
        marginTop: 30,
    },
    mail: {
        color: 'black'
    },
    password: {
        color: 'black'
    },
    buttonContainer: {
        flex: 5
    },
    error: {
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 15,
        color: 'red'
    },
    errorLogin: {
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 15,
        color: 'red',
        alignSelf: 'center'
    }
});