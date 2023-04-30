// import { Link } from "react-router-dom";
import "./Card.css"


function Card({childern}) {
    return ( 
        <div className="home-card-container">
          {childern}
        </div>
     );
}

export default Card;