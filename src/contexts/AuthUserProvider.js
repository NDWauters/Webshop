import { onAuthStateChanged } from '@firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';


export const AuthUserStateContext = createContext({
    isLoading: false,
    user: null,
});

const AuthUserProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // subscribe op events --> cleanup
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            try {
                await (user ? setUser(user) : setUser(null));
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        });

        // cleanup observer
        return unsubscribeAuth;
    }, []);

    return (
        <AuthUserStateContext.Provider value={{ isLoading: isLoading, user: user }}>
            {children}
        </AuthUserStateContext.Provider>
    )
}

export default AuthUserProvider;