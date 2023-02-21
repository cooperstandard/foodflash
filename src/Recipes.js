//import logo from './logo.svg';
import './Recipes.css';
import './App.css'
import Axios from 'axios';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';


function Recipes() {
  const [Recipes, setRecipes] = useState([]);
  var [Pos, setPos] = useState(0);
  const [Loaded, setLoaded] = useState("0")
  const [Token, setToken] = useState();
  const [Liked, setLiked] = useState([]);

  let location = useLocation();
  let navigate = useNavigate();
  const isInitialMount = useRef(true);

  async function HandleRecipes() {
    try {
      const response = await fetch("https://concierge.cooperstandard.org:8443/api/recipe/all");
      const data = await response.json();
      if (typeof (data) !== 'undefined') {
        setRecipes(data);
        setLoaded(1);
      } else {
        throw new Error("Error Loading Recipes");
      }
    } catch (error) {
      console.log(error);
    }
    if (Loaded == 1) {
      console.log(Recipes);
    }
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      HandleRecipes();
      setToken(location.state.token);
    } else {
      //console.log(Token);
      //console.log(Recipes);
    }
  });

  async function HandleLike() {
    if (Pos < Recipes.length - 1) {
      try {
        const LikeHead = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + Token },
          body: JSON.stringify({ recipe: Recipes[Pos]._id })
        };
        const response = await fetch('https://concierge.cooperstandard.org:8443/api/user/like', LikeHead)
        const Likeres = await response.json();
        if (Likeres.status >= 400) {
          throw new Error("Error Liking");
        } else {
          console.log(Likeres);
        }
      } catch (error) {
        console.log(error);
        this.setState({ error: error })
      }
      setPos(Pos + 1);
    } else {
      setPos(0);
    }
  }
  async function HandleDislike(event) {
    if (Pos < Recipes.length - 1) {
      try {
        const DislikeHead = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + Token },
          body: JSON.stringify({ recipe: Recipes[Pos]._id })
        };
        const response = await fetch('https://concierge.cooperstandard.org:8443/api/user/dislike', DislikeHead)
        const Disres = await response.json();
        if (Disres.status >= 400) {
          throw new Error("Error Disliking");
        } else {
          console.log(Disres);
        }
      } catch (error) {
        console.log(error);
        this.setState({ error: error })
      }
      setPos(Pos + 1);
    } else {
      setPos(0);
    }
  }
  async function HandleRecipeInfo() {
    navigate("/recipe-info", { state: { _id: Recipes[Pos]._id, token: Token } });
  }

  function HandleAccount() {
    navigate("/account")
}

  if (Recipes && (Pos >= 0) && (Loaded == 1)) {
    return (

      <div className="App">

        <div key={Recipes[Pos]._id} className="background">
          <h1 className="RecipeTitle">{Recipes[Pos].title}</h1>
          <h2 className="PrepTime">Prep Time: {Recipes[Pos].prepTime}</h2>
          <img src={Recipes[Pos].photos[0]} className="RecipeImage" onClick={HandleRecipeInfo}></img>
          <button onClick={HandleAccount} className="AccountButton">
                    <h1 className="BackButtonText">Account</h1>
                </button>
          <button className="DislikeButton" onClick={HandleDislike}></button>
          <button className="LikeButton" onClick={HandleLike}></button>
        </div>
      </div>
    )
  } else {
    return (<div className="background">Loading...</div>)
  }

}

export default Recipes;