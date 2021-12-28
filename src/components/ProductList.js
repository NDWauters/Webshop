import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/products/reducer';
import Product from './Product';

const ProductList = ({ navigation }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const productsState = useSelector((state) => state.products);
    const { data, isLoading } = productsState;

    return (
        <View>
            {
                isLoading
                    ? (
                        <ActivityIndicator size='large' animating />
                    ) : (
                        data == null
                            ? (
                                <Text style={styles.noData}>No data</Text>
                            ) : (
                                <FlatList
                                    style={{ margin: 10 }}
                                    data={data}
                                    renderItem={({ item }) => <Product style={styles.product} item={item} navigation={navigation} />}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            )
                    )}
        </View>
    )
}

export default ProductList;

const styles = StyleSheet.create({
    product: {
        flex: 1,
    },
    noData: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    },
});