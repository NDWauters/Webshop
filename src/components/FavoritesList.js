import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Product from '../components/Product';

const FavoritesList = () => {

    const products = useSelector((state) => state.products.data);
    const favorites = useSelector((state) => state.favorites.value);

    const [data, setData] = useState([]);

    useEffect(() => {

        const arr = products.filter(element => favorites.indexOf(element.id) > -1);

        setData(arr);
    }, [favorites]);

    return (
        <FlatList
                style={{ margin: 10 }}
                data={data}
                renderItem={({ item }) => <Product style={styles.product} item={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
    )
}

export default FavoritesList;

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