import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { add, remove } from '../store/favorites/reducer';

const DetailsScreen = ({ route }) => {

    const { item, isFavorite } = route.params;

    const [color, setColor] = useState(isFavorite ? 'red' : 'grey');
    const [icon, setIcon] = useState(isFavorite ? 'heart' : 'heart-o');
    const [isFavo, setIsFavo] = useState(isFavorite);

    const dispatch = useDispatch();

    const handleFavorite = () => {
        if (isFavo) {
            dispatch(remove(item.id));
            setIcon('heart-o');
            setColor('grey');
            setIsFavo(false);
        }else{
            dispatch(add(item));
            setIcon('heart');
            setColor('red');
            setIsFavo(true);
        }
    };

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
        justifyContent: 'space-evenly'
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
