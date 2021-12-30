import { auth } from '../firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';


const LoginScreen = () => {

    const navigation = useNavigation();

    const handleLogin = async (values) => {

        if (values.email !== '' && values.password !== '') {
            try {
                await signInWithEmailAndPassword(auth, values.email, values.password);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const loginValidationSchema = Yup.object().shape({
        email: Yup
            .string()
            .email("Vul een geldig emailadres in.")
            .required('Emailadres is een verplicht veld.'),
        password: Yup
            .string()
            .min(7, ({ min }) => `Wachtwoord moet minstens ${min} karakters bevatten.`)
            .required('Wachtwoord is een verplicht veld.'),
    });

    return (
        <SafeAreaView style={styles.container}>
            <FontAwesome style={styles.icon} name='shopping-basket' size={50} />
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Inloggen</Text>
                <Formik
                    validationSchema={loginValidationSchema}
                    initialValues={{ email: '', password: '' }}
                    onSubmit={values => handleLogin(values)}
                >
                    {
                        ({ handleChange, handleSubmit, values, errors }) => (
                            <>
                                <Input
                                    name='email'
                                    style={styles.mail}
                                    placeholderTextColor='#2C5F2D'
                                    placeholder='Emailadres'
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    inputContainerStyle={{ borderBottomColor: '#2C5F2D' }}
                                    keyboardType='email-address'
                                />
                                {
                                    errors.email && <Text style={styles.error}>{errors.email}</Text>
                                }
                                <Input
                                    name='password'
                                    style={styles.password}
                                    placeholderTextColor='#2C5F2D'
                                    placeholder='Wachtwoord'
                                    secureTextEntry
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    inputContainerStyle={{ borderBottomColor: '#2C5F2D' }}
                                />
                                {
                                    errors.password && <Text style={styles.error}>{errors.password}</Text>
                                }
                                <View style={styles.buttonContainer}>
                                    <Button
                                        style={{ alignItems: 'flex-end' }}
                                        title='Registreren'
                                        type='clear'
                                        titleStyle={{ fontSize: 16, textAlign: 'right', color: '#2C5F2D' }}
                                        onPress={() => navigation.navigate('Register')}
                                    />
                                    <Button
                                        title='Inloggen'
                                        onPress={handleSubmit}
                                        buttonStyle={{ backgroundColor: '#2C5F2D' }}
                                        titleStyle={{ color: 'yellow' }}
                                    />
                                </View>
                            </>
                        )
                    }

                </Formik>
            </View>

        </SafeAreaView>
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
    }
})
