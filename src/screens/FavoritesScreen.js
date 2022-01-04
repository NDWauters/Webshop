import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet, Text, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import Product from '../components/Product';

const FavoritesScreen = () => {

    const favorites = useSelector((state) => state.favorites.value);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
            style={styles.list}
            data={favorites}
            renderItem={({ item }) => <Product style={styles.product} item={item} />}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={() => <Text style={styles.noData}>Geen favorieten</Text>}
        />
        </SafeAreaView>
    )
}

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#97BC62FF',
    },
    product: {
        flex: 1,
    },
    noData: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 100,
        color: '#2C5F2D'
    },
    list: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: Platform.OS === 'ios' ? 0 : 30
    },
});