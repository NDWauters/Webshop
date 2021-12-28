import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FavoritesList from '../components/FavoritesList';

const FavoritesScreen = () => {

    return (
        <SafeAreaView>
            <FavoritesList/>
        </SafeAreaView>
    )
}

export default FavoritesScreen;