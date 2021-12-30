import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Keyboard } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { auth, db } from '../firebase';
import * as Yup from 'yup';
import { doc, setDoc } from "firebase/firestore"; 

const RegisterScreen = () => {

    const navigation = useNavigation();

    const refName = useRef(null);
    const refAge = useRef(null);
    const refPlace = useRef(null);
    const refEmail = useRef(null);
    const refPassword = useRef(null);
    const refRepeatPassword = useRef(null);

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
            console.log(error);
        }
    };

    const registerValidationSchema = Yup.object().shape({
        name: Yup
            .string()
            .required('Volledige Naam is een verplicht veld.'),
        age: Yup
            .number(),
        place: Yup
            .string(),
        email: Yup
            .string()
            .email('Vul een geldig emailadres in.')
            .required('Emailadres is een verplicht veld.'),
        password: Yup
            .string()
            .min(7, ({ min }) => `Wachtwoord moet minstens ${min} karakters bevatten.`)
            .required('Wachtwoord is een verplicht veld.'),
        repeatPassword: Yup
            .string()
            .required('Herhaal wachtwoord is een verplicht veld.')
            .oneOf([Yup.ref('password'), null], 'Wachtwoord komt niet overeen.'),
    });

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Registeer</Text>
            <Formik
                validationSchema={registerValidationSchema}
                initialValues={{ name: '', email: '', password: '', repeatPassword: '', place: '', age: '' }}
                onSubmit={values => handleRegister(values)}
            >
                {
                    ({ handleChange, handleSubmit, values, errors }) => (
                        <>
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
                            />
                            {
                                errors.name && <Text style={styles.error}>{errors.name}</Text>
                            }
                            <Input
                                name='age'
                                ref={refAge}
                                keyboardType='default'
                                placeholder='Leeftijd'
                                value={values.age}
                                onChangeText={handleChange('age')}
                                inputContainerStyle={{ borderBottomColor: '#2C5F2D' }}
                                placeholderTextColor='#2C5F2D'
                                returnKeyType='next'
                                onSubmitEditing={() => refPlace.current.focus()}
                            />
                            {
                                errors.age && <Text style={styles.error}>{errors.age}</Text>
                            }
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
                            />
                            {
                                errors.place && <Text style={styles.error}>{errors.place}</Text>
                            }
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
                            />
                            {
                                errors.email && <Text style={styles.error}>{errors.email}</Text>
                            }
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
                            />
                            {
                                errors.password && <Text style={styles.error}>{errors.password}</Text>
                            }
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
                            />
                            {
                                errors.repeatPassword && <Text style={styles.error}>{errors.repeatPassword}</Text>
                            }
                            <View style={{ alignSelf: 'flex-end' }}>
                                <Button
                                    title='Inloggen'
                                    type='clear' titleStyle={{ fontSize: 14, textAlign: 'right' }}
                                    titleStyle={{ fontSize: 14, textAlign: 'right', color: '#2C5F2D' }}
                                    onPress={() => navigation.navigate('Login')}
                                />
                            </View>
                            <Button
                                title='Registreer'
                                buttonStyle={{ backgroundColor: '#2C5F2D' }}
                                titleStyle={{ color: 'yellow' }}
                                onPress={handleSubmit}
                            />
                        </>
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
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 15,
        color: 'red'
    }
});