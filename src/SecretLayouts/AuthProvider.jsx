import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const googleSign = () => {
        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail }
            console.log(currentUser)
            setUser(currentUser)
            setLoading(false)
            if (currentUser) {
                axios.post('https://food-share-server.vercel.app/jwt', loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log("token", res.data)
                    })
            }
            else {
                axios.post('https://food-share-server.vercel.app/logout', loggedUser, { withCredentials: true })
                    .then(res=>{
                        console.log(res.data)
                    })
            }

        })
        return () => {
            unsubcribe();
        }
    }, [])

    const info = {
        user, createUser, logInUser, loading, logOut, googleSign
    }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;