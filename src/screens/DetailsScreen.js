import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { add, remove } from '../store/favorites/reducer';

const DetailsScreen = ({ route, navigation }) => {

    const { item, color, icon, isFavorite } = route.params;

    const dispatch = useDispatch();

    const handleFavorite = () => {
        if (isFavorite) {
            dispatch(remove(item.id));
        }else{
            dispatch(add(item.id));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <FontAwesome style={styles.favorite} name={icon} color={color} size={23} onPress={() => {
                handleFavorite();
                navigation.goback;
            }}/>
            <Image style={styles.image} source={{ uri: item.image }} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>€ {item.price}</Text>
        </SafeAreaView>
    )
}

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    button: {
        flex: 1
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
})
