import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import User from '../components/User'

const UserScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <User style={styles.user}/>
        </SafeAreaView>
    )
}

export default UserScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    user: {
        flex: 1,
    },
})
