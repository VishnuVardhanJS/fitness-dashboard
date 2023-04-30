import React, { useState, useEffect } from 'react'
import './Recommendation.css'
import axios from 'axios';

const req = axios.get('http://127.0.0.1:5000/recipie')

function Recommendation() {
  const [Recipe, setRecipe] = useState()
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {

    const req_recipie = axios.get("http://127.0.0.1:5000/recipie_list")
      .then(res => {
        console.log(res.data)
        setRecipe(res.data)
      })
  }, []);

  // const recipe_count = 1

  return (
    <div className='rec-container'>
      <div className='modal-input-field'>
        <p className='select-para'>Enter Diet Plan:  </p>
        <select
          className="form-control"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Weight_Loss">Weight Loss</option>
          <option value="Weight_Gain">Weight Gain</option>
          <option value="Nutrition">Highly Nutrition</option>
        </select>
      </div>
      <div className='recipe'>
        <div className="recipe-card-container">
          <h1 className='head-text'>Recipe</h1>
        

        {Recipe?.recipie.map((item,index)=>{
      
          return < h3 > Step {index+1} : {item}</h3>
        })}

            
      </div>
    </div>
    </div >
  );
}

export default Recommendation;