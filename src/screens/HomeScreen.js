import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductList from '../components/ProductList';

const HomeScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <ProductList style={styles.list} navigation={navigation}/>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flex: 1,
    },
})
