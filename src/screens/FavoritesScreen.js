import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Product from '../components/Product';

const FavoritesScreen = () => {

    const favorites = useSelector((state) => state.favorites.value);

    return (
        <SafeAreaView>
            <FlatList
            style={{ margin: 10 }}
            data={favorites}
            renderItem={({ item }) => <Product style={styles.product} item={item} />}
            keyExtractor={(item) => item.id.toString()}
            initialNumToRender={20}
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
    },
});