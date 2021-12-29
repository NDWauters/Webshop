import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { fetchProducts } from '../store/products/reducer';

const HomeScreen = ({ navigation }) => {

    const productsState = useSelector((state) => state.products);
    const { data, isLoading } = productsState;

    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
        setProducts(data)
    }, []);

    const searchProducts = () => {
        let filteredProducts = []; 

        filteredProducts = search.trim().length > 0 
            ? data.filter(e => e.title.toLowerCase().includes(search.toLowerCase())) 
            : data;

        setProducts(filteredProducts);
    }

    const clearSearch = () => {
        setSearch('');
        setProducts(data);
    }

    return (
        <View style={styles.container}>
            <SearchBar 
                style={styles.searchbar}
                placeholder='Zoek naar product..'
                onChangeText={(value) => setSearch(value)}
                value={search}
                onSubmitEditing={searchProducts}
                onClear={clearSearch}
                containerStyle={{ backgroundColor: '#2C5F2D', marginTop: 50 }}
                inputContainerStyle={{ backgroundColor: '#97BC62FF' }}
                searchIcon={{ color: '#2C5F2D' }}
                clearIcon={{ color: '#2C5F2D' }}
                placeholderTextColor='#2C5F2D'
            />
            {
                isLoading
                    ? (
                        <ActivityIndicator style={styles.loading} color='#2C5F2D' size='large' animating />
                    ) : (
                        <FlatList
                            style={{ margin: 10 }}
                            data={products}
                            renderItem={({ item }) => <Product style={styles.product} item={item} navigation={navigation} />}
                            keyExtractor={(item) => item.id.toString()}
                            ListEmptyComponent={() => <Text style={styles.noData}>Geen Producten</Text>}
                        />
                    )}
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#97BC62FF'
    },
    product: {
        flex: 1,
    },
    noData: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 100
    },
    searchbar:{
        color: '#2C5F2D',
    },
    loading:{
        flex: 1,
    }
});