import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  GithubAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import axios from "axios";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  //Save user info:

  const saveUser = async (user) => {
    const userInfo = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      role: "user",
      status: "requested",
    };
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/users`,
      userInfo
    );
    return data;
  };

  const handleSaveInfo = (e) => {
    setTimeout(() => {
      saveUser(e);
    }, 2000);
  };

  const getToken = async (email) => {
    const { data } = await axiosPublic.post("/jwt", email).then((res) => {
      if (res.data.token) {
        localStorage.setItem("access-token", res.data.token);
      }
    });
    return data;
  };
  //Observer:
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const userInfo = { email: user.email };
        getToken(userInfo);
        handleSaveInfo(user);
      } else {
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => unSubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Providers:
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  //Register:
  const registerAccount = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //Login:
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //Update Account :
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //Logout:
  const logOut = async () => {
    setUser(null);
    setLoading(true);
    await signOut(auth).then(() => {});
  };

  //Google:
  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //Github:
  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  //Facebook:
  const facebookLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider);
  };

  const allValues = {
    registerAccount,
    logIn,
    setLoading,
    googleLogIn,
    user,
    loading,
    githubLogin,
    facebookLogin,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={allValues}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
export default AuthProvider;
