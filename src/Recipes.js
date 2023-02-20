//import logo from './logo.svg';
import './Recipes.css';
import './App.css'
import Axios from 'axios';
import React, {useState,useEffect,useLayoutEffect,useRef} from 'react';
import { useParams, useLocation } from 'react-router-dom';


function Recipes () {
  const [Recipes, setRecipes] = useState([]);
  var [Pos, setPos] = useState(0);
  const [Loaded, setLoaded] = useState("0")
  const [Token, setToken] = useState();
  const [Liked, setLiked] = useState([]);

  let location = useLocation();
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
    if (Loaded == 1){
      console.log(Recipes);
    }
  }
  
  useEffect(() => {
   if(isInitialMount.current){
    isInitialMount.current = false;
    HandleRecipes();
    setToken(location.state.token);
   }else{
    //console.log(Token);
    //console.log(Recipes);
   }
  });

  async function HandleLike () {
    if (Pos < Recipes.length - 1) {
      try {
        const LikeHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + Token },
            body: JSON.stringify({recipe: Recipes[Pos]._id})
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
      setPos(Pos+1);
    } else {
      setPos(0);
    }
  }
  async function HandleDislike (event) {
    if (Pos < Recipes.length - 1) {
      try {
        const DislikeHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + Token },
            body: JSON.stringify({recipe: Recipes[Pos]._id})
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
      setPos(Pos+1);
    } else {
      setPos(0);
    }
  }


    if (Recipes && (Pos >= 0) && (Loaded == 1)) {
      return (

        <div className="App">

          <div key={Recipes[Pos]._id} className="background">
            <h1>{Recipes[Pos].title}</h1>
            <h3>{Recipes[Pos].description}</h3>
            <img src={Recipes[Pos].photos[0]} className="RecipeImage"></img>
            <button className="DislikeButton" onClick={HandleDislike}></button>
            <button className="LikeButton" onClick={HandleLike}></button>
            <ul>{Recipes[Pos].ingredients.map(ingredient => {
              return (
                <li key={ingredient}>{ingredient}</li>
              )
            })}</ul>
          </div>
        </div>
      )
    } else {
      return (<h1>Loading...</h1>)
    }
  
}

export default Recipes;