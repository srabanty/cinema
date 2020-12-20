import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
// import * as firebase from "firebase/app"
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import './Login.css';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useState({
        isSignedIn: false,
        displayName: '',
        email: ''
    })

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(result => {
                const { displayName, email} = result.user;
                // console.log('login successfully',result.user);
                const signedInUser = {
                    isSignedIn: true,
                    displayName: displayName,
                    email: email
                }
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                // console.log('login successfully');
                history.replace(from);
            })
            .catch(function (error) {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }
    const handleGoogleSignOut = () => {
        firebase.auth().signOut()
            .then(function () {
                const signedOutUser = {
                    isSignedIn: false,
                    displayName: '',
                    email: ''
                }
                setUser(signedOutUser);
                setLoggedInUser(signedOutUser);
            })
            .catch(function (error) {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }
    return (
        <div className="container">
            <div className="text-center pt-5">
                {/* <Link to="/home">
                    <img src={logo} alt="logo" className="center-logo" />
                </Link> */}
            </div>
            <div className="login-box col-md-6 offset-md-3">
                <h4 className="font-weight-bold text-center">Login With</h4>
                <button className="my-3" onClick={handleGoogleSignIn}>
                    Continue with Google
                </button>
                <p className="text-center">Don’t have an account? 
                    <a target="_blank" href="https://accounts.google.com/signup/v2/webcreateaccount?hl=en&flowName=GlifWebSignIn&flowEntry=SignUp"> Create an account</a>
                </p>
            </div>
        </div>
    );
};

export default Login;