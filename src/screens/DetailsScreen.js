import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../store/favorites/reducer';

const DetailsScreen = ({ route }) => {

    const { item } = route.params;

    const favorites = useSelector((state) => state.favorites.value);

    const [color, setColor] = useState('grey');
    const [icon, setIcon] = useState('heart-o');

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
            setColor('grey');
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
            <View style={styles.section1}>
                <Image style={styles.image} source={{ uri: item.image }} />
            </View>
            <View style={styles.section2}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>€ {item.price}</Text>
            </View>
            <View style={styles.section3}>
                <Text style={styles.descriptionTitle}>Beschrijving:</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
            <TouchableOpacity style={styles.section4} onPress={() => {
                    handleFavorite();
                }}>
                <FontAwesome style={styles.favorite} name={icon} color={color} size={23}/>
            </TouchableOpacity>
            <View style={{ flex: 2 }}>
                { /* spacing */ }
            </View>
        </View>
    )
}

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: '#97BC62FF'
    },
    section1: {
        flex: 4,
        backgroundColor: 'white'
    },
    section2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    section3: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 0
    },
    section4: {
        flex: 0.5,
        flexDirection: 'column',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
    button: {
        flex: 1
    },
    title: {
        flex: 3,
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    image: {
        flex: 1,
        height: 150,
        width: '90%',
        marginBottom: 10,
        resizeMode: 'contain',
        alignSelf: 'center',
        backgroundColor: 'white',
    },
    price: {
        flex: 1,
        textAlign: 'right',
        margin: 10,
        fontSize: 20
    },
    favorite: {
        flex: 1,
        margin: 9,
        alignSelf: 'center',
    },
    description: {
        flex: 1,
        fontSize: 15
    },
    descriptionTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 15
    }
})
