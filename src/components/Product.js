import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove } from '../store/favorites/reducer';

const Product = ({ item, navigation }) => {

    const [color, setColor] = useState('grey');
    const [icon, setIcon] = useState('heart-o');
    const [isFavorite, setIsFavorite] = useState(false);

    const favorites = useSelector((state) => state.favorites.value);

    const dispatch = useDispatch();

    const handleFavorite = () => {
        if (favorites.indexOf(item) > -1) {
            dispatch(remove(item.id));
            setIcon('heart-o');
            setColor('grey');
            setIsFavorite(false);
        }else{
            dispatch(add(item));
            setIcon('heart');
            setColor('red');
            setIsFavorite(true);
        }
    };

    useEffect(() => {
        if (favorites.indexOf(item) > -1) {
            setIcon('heart');
            setColor('red');
            setIsFavorite(true);
        }
    },[]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handleFavorite()}>
                <FontAwesome style={styles.favorite} name={icon} color={color} size={23}  />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                if (navigation !== undefined) {
                    navigation.navigate('Details', {item: item,color: color,icon: icon,isFavorite: isFavorite})
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
        shadowColor: 'lightgrey',
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