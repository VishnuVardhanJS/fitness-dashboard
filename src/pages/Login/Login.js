import React, { useState, useEffect, useContext } from 'react'
import './Login.css'
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '../../firebase/firebase_config'
import { signInWithPopup, signInWithRedirect } from 'firebase/auth'
import google_login_art from '../../assets/images/google_login_art.png'


function Login() {
    const navigate = useNavigate();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Icon, setIcon] = useState("")
    const [Uid, setUid] = useState("")
    function timeout(time) {
        return new Promise(res => setTimeout(res, time));
    }

    async function submitClick() {
        signInWithPopup(auth, provider).then((data) => {
            setEmail(data.user.email)
            setName(data.user.displayName)
            setIcon(data.user.photoURL)
            setUid(data.user.uid)
            localStorage.setItem("email", data.user.email)
            localStorage.setItem("name", data.user.displayName)
            localStorage.setItem("icon", data.user.photoURL)
            localStorage.setItem("uid", data.user.uid)
        })
        await timeout(6000);
        navigate('/google')
    }

    // console.log(Email)
    // console.log(Uid)



    // console.log(localStorage.getItem("email"))
    // console.log(localStorage.getItem("name"))
    // console.log(localStorage.getItem("icon"))
    // console.log(localStorage.getItem("uid"))

    return (
        <div className="Login">
            <div className='google-login'>
                <img src={logo} className="App-logo" alt="logo" />


                <button className="login-button" onClick={submitClick}>
                    Login with Google
                </button>

                <div className='login-text'>
                    <h1>Step1 : Login with Google</h1>
                </div>
            </div>


            <div>
                <img className='google-login-art' src={google_login_art}></img>
            </div>

        </div>
    )
}

export default Login
