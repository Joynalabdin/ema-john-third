import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState } from "react";
import { createContext } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
firebase.initializeApp(firebaseConfig);


const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const auth = Auth();
  return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

export const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

const getUser = user => {
  const { displayName, email, PhotoURL } = user;
  return { name: displayName, email, photo: PhotoURL };
}

const Auth = () => {
  const [user, setUser] = useState(null)
  const singInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider)
      .then(res => {
        const signInUser = getUser(res.user);
        setUser(signInUser);
        return res.user;
      })
      .catch(err => {
        console.log(err);
        setUser(null);
        return err.message;
      })
  }
  const singOut = () => {
    return firebase.auth().signOut().then(function () {
      setUser(null)
    }).catch(function (error) {

    }, []);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (usr) {
      if (usr) {
        const corrUser = getUser(usr)
        setUser(corrUser);
      }
      else {

      }
    })
  }, [])

  return {

    singInWithGoogle,
    singOut,
    user
  }
}


export default Auth;