import React from 'react'
import './Login.css'
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import login_art from "../../assets/images/login_art.png"

function GoogleLogin() {
  const navigate = useNavigate();

  function timeout(time) {
    return new Promise(res => setTimeout(res, time));
  }

  async function submitClick() {
    window.open('https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://127.0.0.1:5000/login&prompt=consent&response_type=code&client_id=361616255897-semmpmgjdm0h35se46gr1c13r3aqhha6.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/fitness.activity.read+https://www.googleapis.com/auth/fitness.activity.write+https://www.googleapis.com/auth/fitness.blood_glucose.read+https://www.googleapis.com/auth/fitness.blood_glucose.write+https://www.googleapis.com/auth/fitness.blood_pressure.read+https://www.googleapis.com/auth/fitness.blood_pressure.write+https://www.googleapis.com/auth/fitness.body.read+https://www.googleapis.com/auth/fitness.body.write+https://www.googleapis.com/auth/fitness.body_temperature.read+https://www.googleapis.com/auth/fitness.body_temperature.write+https://www.googleapis.com/auth/fitness.heart_rate.read+https://www.googleapis.com/auth/fitness.heart_rate.write+https://www.googleapis.com/auth/fitness.location.read+https://www.googleapis.com/auth/fitness.location.write+https://www.googleapis.com/auth/fitness.nutrition.read+https://www.googleapis.com/auth/fitness.nutrition.write+https://www.googleapis.com/auth/fitness.oxygen_saturation.read+https://www.googleapis.com/auth/fitness.oxygen_saturation.write+https://www.googleapis.com/auth/fitness.reproductive_health.read+https://www.googleapis.com/auth/fitness.reproductive_health.write+https://www.googleapis.com/auth/fitness.sleep.read+https://www.googleapis.com/auth/fitness.sleep.write&access_type=offline',);
    await timeout(2000);
    navigate('/home')
  }


  return (
    <div className="Login">
      <div className='google-login'>
        <img src={logo} className="App-logo" alt="logo" />


        <button className="login-button" onClick={submitClick}>
          Login with Google
        </button>

        <div className='login-text'>
          <h1>Step2 : Grant Permission to Read Data</h1>

        </div>
      </div>


      <div>
        <img className='login-art' src={login_art}></img>
      </div>

    </div>
  )
}

export default GoogleLogin
