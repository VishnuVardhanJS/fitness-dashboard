import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login/GoogleLogin';
import Home from './pages/Home/Home';
import GoogleLogin from './pages/Login/Login';
import { UserContext } from './context/context';
import Goals from './pages/Goals/Goals';
import Recommendation from './pages/Recommendation/Recommendation';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" exact element={<GoogleLogin />} />
          <Route path="/google" exact element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/goals" exact element={<Goals />} />
          <Route path="/recommendations" exact element={<Recommendation />} />
        </Routes>
      </Router>
  );
}

export default App;
