import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import { AuthUserStateContext } from '../contexts/AuthUserProvider';
import { db } from '../firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { doc, getDoc } from "firebase/firestore";

const User = () => {

    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useContext(AuthUserStateContext);

    useEffect(async () => {

        try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUserInfo(docSnap.data());
                setIsLoading(false);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                setUserInfo(null);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {
                isLoading
                    ? <ActivityIndicator color='#2C5F2D' size='large' animating />
                    : userInfo == null // if admin => no data in db => only show email
                        ?
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Email: {user.email}</Text>
                        </View>
                        :
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Naam: {userInfo.name}</Text>
                            <Text style={styles.text}>Leeftijd: {userInfo.age}</Text>
                            <Text style={styles.text}>Plaats: {userInfo.place}</Text>
                            <Text style={styles.text}>Email: {userInfo.email}</Text>
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
        marginHorizontal: 10,
    },
    title: {
        flex: 1,
        fontSize: 24,
        alignSelf: 'center',
        paddingBottom: 24,
        fontWeight: '600',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        color: '#2C5F2D',
        marginTop: 5,
        marginBottom: 5,
    },
});