import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { auth, db } from '../firebase';
import { doc, setDoc } from "firebase/firestore";
import registerValidationScheme from '../validationSchemes/registerValidationScheme';

const RegisterScreen = () => {

    const navigation = useNavigation();

    const refName = useRef(null);
    const refAge = useRef(null);
    const refPlace = useRef(null);
    const refEmail = useRef(null);
    const refPassword = useRef(null);
    const refRepeatPassword = useRef(null);

    // error if email already exists
    const [errorRegister, setErrorRegister] = useState('');

    // function for register action
    const handleRegister = async (values) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            await setDoc(doc(db, "users", userCredential.user.uid), {
                id: userCredential.user.uid,
                name: values.name,
                age: values.age,
                place: values.place,
                email: values.email,
            });
        } catch (error) {
            if (error.code == 'auth/email-already-in-use') {
                setErrorRegister('Emailadres is al in gebruik.')
            }else{
                setErrorRegister('Registratie is mislukt.')
            }
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Registreer</Text>
            <Formik
                validationSchema={registerValidationScheme}
                initialValues={{ name: '', email: '', password: '', repeatPassword: '', place: '', age: '' }}
                onSubmit={values => handleRegister(values)}
            >
                {
                    ({ handleChange, handleSubmit, values, errors }) => (
                        // avoid blocking input fields with keyboard
                        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} >
                            {
                                // show error here if register fails
                                errorRegister.length > 0 ? <Text style={styles.errorRegister}>{errorRegister}</Text> : null
                            }
                            <Input
                                name='name'
                                placeholder='Volledige naam'
                                ref={refName}
                                value={values.name}
                                onChangeText={handleChange('name')}
                                inputContainerStyle={{ borderBottomColor: '#2C5F2D' }}
                                placeholderTextColor='#2C5F2D'
                                returnKeyType='next'
                                onSubmitEditing={() => refAge.current.focus()}
                                errorMessage={errors.name ? errors.name : null}
                                errorStyle={styles.error}
                            />
                            <Input
                                name='age'
                                ref={refAge}
                                keyboardType='number-pad'
                                placeholder='Leeftijd'
                                value={values.age}
                                onChangeText={handleChange('age')}
                                inputContainerStyle={{ borderBottomColor: '#2C5F2D' }}
                                placeholderTextColor='#2C5F2D'
                                returnKeyType={Platform.OS === "ios" ? "done" : "next"}
                                onSubmitEditing={() => refPlace.current.focus()}
                                errorMessage={errors.age ? errors.age : null}
                                errorStyle={styles.error}
                            />
                            <Input
                                name='place'
                                placeholder='Plaats'
                                ref={refPlace}
                                value={values.place}
                                onChangeText={handleChange('place')}
                                inputContainerStyle={{ borderBottomColor: '#2C5F2D' }}
                                placeholderTextColor='#2C5F2D'
                                returnKeyType='next'
                                onSubmitEditing={() => refEmail.current.focus()}
                                errorMessage={errors.place ? errors.place : null}
                                errorStyle={styles.error}
                            />
                            <Input
                                name='email'
                                placeholder='Emailadres'
                                ref={refEmail}
                                value={values.email}
                                onChangeText={handleChange('email')}
                                keyboardType='email-address'
                                inputContainerStyle={{ borderBottomColor: '#2C5F2D' }}
                                placeholderTextColor='#2C5F2D'
                                returnKeyType='next'
                                onSubmitEditing={() => refPassword.current.focus()}
                                errorMessage={errors.email ? errors.email : null}
                                errorStyle={styles.error}
                            />
                            <Input
                                name='password'
                                placeholder='Wachtwoord'
                                ref={refPassword}
                                secureTextEntry
                                value={values.password}
                                onChangeText={handleChange('password')}
                                inputContainerStyle={{ borderBottomColor: '#2C5F2D' }}
                                placeholderTextColor='#2C5F2D'
                                returnKeyType='next'
                                onSubmitEditing={() => refRepeatPassword.current.focus()}
                                errorMessage={errors.password ? errors.password : null}
                                errorStyle={styles.error}
                            />
                            <Input
                                name='repeatPassword'
                                placeholder='Herhaal wachtwoord'
                                ref={refRepeatPassword}
                                secureTextEntry
                                value={values.repeatPassword}
                                onChangeText={handleChange('repeatPassword')}
                                inputContainerStyle={{ borderBottomColor: '#2C5F2D' }}
                                placeholderTextColor='#2C5F2D'
                                returnKeyType='done'
                                onSubmitEditing={() => Keyboard.dismiss()}
                                errorMessage={errors.repeatPassword ? errors.repeatPassword : null}
                                errorStyle={styles.error}
                            />
                            <View style={{ alignSelf: 'flex-end' }}>
                                <Button
                                    title='Inloggen'
                                    type='clear'
                                    titleStyle={{ fontSize: 16, textAlign: 'right', color: '#2C5F2D', marginRight: 10, marginBottom: 5 }}
                                    onPress={() => navigation.navigate('Login')}
                                />
                            </View>
                            <Button
                                title='Registreer'
                                buttonStyle={{ backgroundColor: '#2C5F2D', marginLeft: 10, marginRight: 10 }}
                                titleStyle={{ color: 'yellow' }}
                                onPress={handleSubmit}
                            />
                        </KeyboardAvoidingView>
                    )
                }
            </Formik>
        </SafeAreaView>
    )
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#97BC62FF'
    },
    title: {
        fontSize: 26,
        alignSelf: 'center',
        fontWeight: '600',
        paddingBottom: 24,
        color: '#2C5F2D'
    },
    error: {
        fontSize: 15,
        color: 'red'
    },
    errorRegister: {
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 15,
        color: 'red',
        alignSelf: 'center'
    }
});