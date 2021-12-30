import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import { signOut } from '@firebase/auth';
import { AuthUserStateContext } from '../contexts/AuthUserProvider';
import { auth, db } from '../firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { clear } from '../store/favorites/reducer';
import { Button } from 'react-native-elements';
import { doc, getDoc } from "firebase/firestore";

const User = () => {

    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(async () => {

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setUserInfo(docSnap.data());
            setIsLoading(false);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {
                isLoading
                    ? <ActivityIndicator size='large' animating />
                    :
                    <View style={{ flex: 1 }}>
                        <View style={styles.textContainer}>
                            <Text>ID: {user.uid}</Text>
                            <Text>Naam: {userInfo.name}</Text>
                            <Text>Leeftijd: {userInfo.age}</Text>
                            <Text>Plaats: {userInfo.place}</Text>
                            <Text>Email: {userInfo.email}</Text>
                        </View>
                        <Button
                            title='Uitloggen'
                            onPress={() => handleLogout()}
                            titleStyle={{ fontSize: 16, textAlign: 'right', color: 'yellow' }}
                            buttonStyle={{ backgroundColor: '#2C5F2D' }}
                        />
                    </View>
            }
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
    buttonText: {
        flex: 1,
        alignSelf: 'center',
        color: 'yellow',
        fontSize: 22,
    }
})
