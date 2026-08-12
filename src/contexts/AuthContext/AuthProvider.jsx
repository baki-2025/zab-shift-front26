// import React, { useEffect, useState } from 'react';
// import { AuthContext } from './AuthContext';
// import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
// import { auth } from '../../firebase/firebase.init';

// const googleProvider = new GoogleAuthProvider()

// const AuthProvider = ({children}) => {
//     const [user, setUser] = useState(null);
//     const [loading , setLoading] = useState(true);
//     const registerUser = (email, password) =>{
//         setLoading(true);
//         return createUserWithEmailAndPassword(auth,email,password)
//     }

//     const signInUser = (email,password) =>{
//          setLoading(true);
//         return signInWithEmailAndPassword(auth,email,password)
//     }

//     const signInGoogle = () =>{
//          setLoading(true);
//         return signInWithPopup(auth,googleProvider);
//     }

//     const logOut = () =>{
//         setLoading(true)
//         return signOut(auth);
//     }

//     const updateUserProfile = (profile) =>{
//         return updateProfile(auth.currentUser, profile)
//     }

//     useEffect(() =>{
//         const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
//              setUser(currentUser);
//              setLoading(false)
//              console.log(currentUser);
//         })
//         return () =>{
//             unSubscribe();
//         }


//     },[])
//     const authInfo = {
//         user,
//         loading,
//        registerUser,
//        signInUser,
//        signInGoogle,
//        logOut,
//     updateUserProfile
//     }
//     return (
//         <AuthContext value={authInfo}>
//             {children}
//         </AuthContext>
//     );
// };

// export default AuthProvider;

import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    sendPasswordResetEmail
} from 'firebase/auth';

import axios from 'axios';
import { auth } from '../../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = (email, password) => {
        setLoading(true);

        return createUserWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                setLoading(false);
                throw error;
            });
    };

    const signInUser = (email, password) => {
        setLoading(true);

        return signInWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                setLoading(false);
                throw error;
            });
    };

    const signInGoogle = () => {
        setLoading(true);

        return signInWithPopup(auth, googleProvider)
            .catch((error) => {
                setLoading(false);
                throw error;
            });
    };

    const logOut = () => {
        setLoading(true);

        return signOut(auth)
            .catch((error) => {
                setLoading(false);
                throw error;
            });
    };

    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    };

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    useEffect(() => {

        const unSubscribe = onAuthStateChanged(
            auth,
            async (currentUser) => {

                setUser(currentUser);

                if (currentUser) {

                    const userInfo = {
                        displayName: currentUser.displayName,
                        email: currentUser.email,
                        photoURL: currentUser.photoURL
                    };

                    try {

                        const response = await axios.post(
                            'http://localhost:3000/users',
                            userInfo
                        );

                        console.log('MongoDB user response:', response.data);

                    } catch (error) {

                        console.error(
                            'Failed to save user to MongoDB:',
                            error
                        );

                    }
                }

                setLoading(false);
            }
        );

        return () => {
            unSubscribe();
        };

    }, []);

    const authInfo = {
        user,
        loading,
        registerUser,
        signInUser,
        signInGoogle,
        logOut,
        updateUserProfile,
        resetPassword
    };

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;