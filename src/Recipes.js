//import logo from './logo.svg';
import './styles/Recipes.css';
import './styles/App.css'
import './styles/index.css'
import Axios from 'axios';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ReactLoading from "react-loading";


function Recipes() {
  const [Recipes, setRecipes] = useState([]);
  var [Pos, setPos] = useState();
  const [Loaded, setLoaded] = useState("0")
  const [Token, setToken] = useState();
  const [Liked, setLiked] = useState([]);

  let location = useLocation();
  let navigate = useNavigate();
  const isInitialMount = useRef(true);

  async function HandleRecipes() {
    try {
      const response = await fetch("https://concierge.cooperstandard.org/api/recipe/all");
      //console.log(await response.json())
      const data = await response.json();
      //console.log(data)
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
      setPos(location.state.Pos);
      
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
        const response = await fetch('https://concierge.cooperstandard.org/api/user/like', LikeHead)
        const Likeres = await response.json();
        if (Likeres.status >= 400) {
          throw new Error("Error Liking");
        } else {
          setLiked(Likeres);
          //console.log(Likeres);
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
          body: JSON.stringify({ recipe: Recipes[Pos]._id, title: Recipes[Pos].title })
        };
        const response = await fetch('https://concierge.cooperstandard.org/api/user/dislike', DislikeHead)
        const Disres = await response.json();
        if (Disres.status >= 400) {
          throw new Error("Error Disliking");
        } else {
          setLiked(Disres);
          //console.log(Disres);
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

  async function HandleSkip() {
    if (Pos < Recipes.length - 1) {
      setPos(Pos + 1);
    } else {
      setPos(0);
    }

  }
  async function HandleRecipeInfo() {
    navigate("/recipe-info", { state: { _id: Recipes[Pos]._id, token: Token, user: location.state.user, Pos: Pos, isSaved: 0 ,Toggle:1} });
  }

  function HandleAccount() {
    navigate("/account", { state: { token: Token, user: location.state.user, Pos: Pos } })
  }
  function HandleSaved() {
    navigate("/saved", { state: { token: Token,user: location.state.user,Pos: Pos } })
  }

  if (Recipes && (Pos >= 0) && (Loaded == 1) && location.state.user) {
    const temp = Object.values(Liked);
    return (

        <div key={Recipes[Pos]._id} className="background">
          <div className="Header">
            <div className="RecipeTitle" style={{ textTransform: 'Capitalize' }}>{Recipes[Pos].title}</div>
            <div className="BackButton" onClick={HandleAccount}>Account</div>
            <div className="SavedButton" onClick={HandleSaved}>Saved</div>
            <img src = "https://cdn-icons-png.flaticon.com/512/2088/2088617.png" style={{width:"20px",height:"20px",position:"absolute",left:"15px", top:"118px"}}></img>
            <div className="PrepTime">{Recipes[Pos].prepTime}</div>
          </div>
          <img src={Recipes[Pos].photos[0]} className="RecipeImage" onClick={HandleRecipeInfo}></img>
          <button className="DislikeButton" onClick={HandleDislike}>
            <img src = "https://cdn-icons-png.flaticon.com/512/9451/9451075.png" style={{width:"45px",height:"45px",position:"absolute",right:"23px",bottom:"21px"}}></img>
          </button>
          <button className="LikeButton" onClick={HandleLike}>
            <img src = "https://cdn-icons-png.flaticon.com/512/9741/9741124.png" style={{width:"50px",height:"50px",position:"absolute",right:"23px",bottom:"21px"}}></img>
          </button>
          <button className="SkipButton" onClick={HandleSkip}>
          <img src = "https://cdn-icons-png.flaticon.com/512/3585/3585438.png" style={{width:"40px",height:"40px",position:"absolute",right:"13px",bottom:"14px"}}></img>
          </button>
        </div>

    );



  } else {
    return (<div className="background">
      <ReactLoading className="Loading" type="spin" color="#4A76E9" height={100} width={100} />
    </div>
    );
  }

}

export default Recipes;