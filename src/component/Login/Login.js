import React from 'react';
import Auth from './useAuth';

const Login = () => {
    const auth = Auth();
    const handleSignIn =()=>{
        auth.singInWithGoogle()
        .then(res=>{
            window.location.pathname ='/review'
        })
    }
    console.log(auth.user);

    const hindleSingOut=()=>{
        auth.singOut()
        .then(res=>{
            window.location.pathname ='/shop'
        })
    }

    return (
        <div>
            <h1>Join the party!!!!!!!!</h1>
            {
                auth.user ? <button onClick={hindleSingOut} >sign out</button> :
                <button onClick={handleSignIn}>Sign In With Google</button>
            }
        </div>
    );
};

export default Login;