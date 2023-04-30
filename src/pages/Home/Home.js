import React, { useEffect, useState } from 'react'
import './Home.css'
// import Card from '../../components/Card/Card'
import heart from '../../assets/images/heart.png'
import foot from '../../assets/images/foot.png'
import sleep from '../../assets/images/sleep.png'

function Home() {
  const [Steps, setSteps] = useState(0)
  const [Heart, setHeart] = useState(0)
  const [Sleep, setSleep] = useState("")

  
  useEffect(()=> {


    setTimeout(()=>{

      const api=async()=>{
        const response = await fetch('http://localhost:5000/aggregate')
        const data= await response.json()
        setSteps(data.steps)
        setHeart(~~data.heart)
        setSleep(data.sleep)
        console.log(Steps)
        console.log(Heart)
        console.log(Sleep)
    }
    api()
    },2000)
    


  },[Heart,Steps]);

  return (
    <div className='Home'>
      <div className='header-container'>
        <h1 className="header-text">FitYou</h1>
        <div className='nav-bar'>
          <a href='/goals'> Goals</a>
          <a href='/recommendations'> Recommendations</a>
        </div>
        <div className="home-btn">

          <a href="/">{localStorage.getItem('name')}</a>
          <div className='icon'>
            <img className='icon' src={localStorage.getItem("icon")}></img>
          </div>

        </div>
      </div>

      <div className='home-body'>
        <div className='heart-card'>
          <img className='heart-img' src={heart}></img>
          <h3>Heart Rate</h3>
          <h1>{Heart}</h1>

        </div>

        <div className='heart-card'>
          <img className='heart-img' src={foot}></img>
          <h3>Step Count</h3>
          <h1>{Steps}</h1>
        </div>

        <div className='heart-card'>
          <img className='heart-img' src={sleep}></img>
          <h3>Sleep</h3>
          <h1>{Sleep}</h1>
        </div>
      </div>
    </div>
  )
}

export default Home