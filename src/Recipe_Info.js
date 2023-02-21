
import './styles/Recipes.css';
import './styles/App.css'
import './styles/index.css'
import Axios from 'axios';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import ReactLoading from 'react-loading'
function RecipeInfo() {
    let location = useLocation();
    const [Recipe, setRecipe] = useState();
    const isInitialMount = useRef(true);
    const navigate = useNavigate();

    async function HandleRecipe() {
        const getRecipe = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch('https://concierge.cooperstandard.org:8443/api/recipe/id/' + location.state._id, getRecipe)
        const recRes = await response.json();
        setRecipe(recRes);
    }
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            HandleRecipe();
        } else {
            console.log(Recipe);
        }
    });
    function HandleBack() {
        navigate("/recipes", { state: { token: location.state.token,user:location.state.user , Pos:location.state.Pos} })
    }

    if (Recipe) {
        return (

            <div className="InfoBackground">
                <button onClick={HandleBack} className="BackButton">
                    <h1 className="BackButtonText">Back</h1>
                </button>
                <h1 className="RecipeTitle">{Recipe.title}</h1>
                <h2 className="PrepTime">Prep Time: {Recipe.prepTime}</h2>
                <img src={Recipe.photos[0]} className="RecipeImage" onClick={HandleBack}></img>
                
                <ul className="Description">{Recipe.ingredients.map(ingredient => {
                    return (
                        <li key={ingredient}>{ingredient}</li>
                    )
                })}
                    <h2>Instructions:</h2>
                    <p>{Recipe.instructions}</p>
                </ul>
            </div>
        );
    } else {
        return (<div className = "background">
        <ReactLoading className = "Loading" type = "spin" color = "#4A76E9" height={100} width={100}/>
      </div>
        );
    }
}

export default RecipeInfo;