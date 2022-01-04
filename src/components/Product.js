import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove } from '../store/favorites/reducer';

const Product = ({ item, navigation }) => {

    const [color, setColor] = useState('black');
    const [icon, setIcon] = useState('heart-o');

    const favorites = useSelector((state) => state.favorites.value);

    const dispatch = useDispatch();

    // function for deciding if product is favorite
    const getIsFavorite = () => {
        const values = favorites.filter(e => e.id === item.id);
        return values.length > 0;
    }

    // function for handling 'favorite' action
    const handleFavorite = () => {

        const isFavorite = getIsFavorite();

        // perform action to store
        isFavorite 
            ? dispatch(remove(item.id))
            : dispatch(add(item));

        // set icon layout
        setIconLayout();
    };

    // function for changing layout icon of favorite
    const setIconLayout = () => {

        const isFavorite = getIsFavorite();

        if (isFavorite) {
            setIcon('heart');
            setColor('red');
        }else{
            setIcon('heart-o');
            setColor('black');
        }
    }

    // set icon when init
    useEffect(() => {
        setIconLayout();
    },[]);

    // when favorites state changes => adjust icon
    useEffect(() => {
        setIconLayout();
    },[favorites]);

    return (
        <View style={styles.container}>
            <FontAwesome style={styles.favorite} name={icon} color={color} size={23} onPress={handleFavorite}  />
            <TouchableOpacity onPress={() => {
                // if navigation is undefined, we prevent navigating => favoritesScreen
                if (navigation !== undefined) {
                    navigation.navigate('Details', {item: item})
                }
            }}>
                <Image style={styles.image} source={{ uri: item.image }} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>€ {item.price}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Product;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 20,
        shadowOffset: { width: 5, height: 5, },
        shadowColor: '#2C5F2D',
        shadowOpacity: 0.8,
        shadowRadius: 5,
        margin: 5,
    },
    title: {
        flex: 1,
        textAlign: 'left',
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    image: {
        flex: 1,
        height: 150,
        width: 150,
        marginBottom: 10,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    price: {
        flex: 1,
        textAlign: 'left',
        marginBottom: 10,
        marginLeft: 10
    },
    favorite: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'flex-end',
        paddingRight: 10,
    },
});