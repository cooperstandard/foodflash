
import './styles/Recipes.css';
import './styles/App.css'
import './styles/index.css'
import './styles/Recipe_info.css'
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
        const response = await fetch('https://concierge.cooperstandard.org/api/recipe/id/' + location.state._id, getRecipe)
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
        if (location.state.isSaved == 0) {
            navigate("/recipes", { state: { token: location.state.token, user: location.state.user, Pos: location.state.Pos } })
        } else {
            navigate("/saved", { state: { token: location.state.token, user: location.state.user, Pos: location.state.Pos } })
        }
    }
    function HandleToggle() {
        if (location.state.Toggle == 0) {
            navigate("/recipe-info", { state: { token: location.state.token, user: location.state.user, Pos: location.state.Pos, isSaved: location.state.isSaved, _id: location.state._id, Toggle: 1 } })
        } else {
            navigate("/recipe-info", { state: { token: location.state.token, user: location.state.user, Pos: location.state.Pos, isSaved: location.state.isSaved, _id: location.state._id, Toggle: 0 } })
        }
        //console.log(location.state.Toggle);
    }

    if (Recipe) {
        return (

            <div className="InfoBackground">
                <div className="Header" style={{position:'-webkit-sticky',position:'sticky'}}>
                    <div className="HeaderBG"></div>
                    <div className="RecipeTitle" style={{ textTransform: 'Capitalize' }}>{Recipe.title}</div>
                    <div className="BackButton" onClick={HandleBack}>Back</div>
                </div>
                <h2 className="PrepTime">Prep Time: {Recipe.prepTime}</h2>
                <img src={Recipe.photos[0]} className="RecipeImage" onClick={HandleBack}></img>

                {location.state.Toggle == 1 && (
                    <div>
                        <div className="Toggle">
                            <div className="ToggleBackground" onClick={HandleToggle}></div>
                            <div className="IngredientsButton"></div>
                            <div className="IngredientsText">Ingredients</div>
                            <div className="InstructionsText" style={{ color: "#BDBDBD" }} onClick={HandleToggle}>Instructions</div>
                        </div>
                        <div className="info-Title">Ingredients</div>
                        <ul className="ingredient-container">
                            {Recipe.ingredients.map(ingredient => {
                                return (
                                    <div className="ingredient-item" key={ingredient}>
                                        <span className="ingredient-text" style={{ textTransform: 'Capitalize' }}>
                                            <span>{ingredient}</span>
                                        </span>
                                        <div className="Divider"></div>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                )}{location.state.Toggle == 0 && (
                    <div>
                        <div className="Toggle">
                            <div className="ToggleBackground" onClick={HandleToggle}></div>
                            <div className="IngredientsText" style={{ color: "#BDBDBD" }} onClick={HandleToggle}>Ingredients</div>
                            <div className="InstructionsButton"></div>
                            <div className="InstructionsText" style={{ color: "#4A76E9" }}>Instructions</div>
                        </div>
                        <div className="info-Title">Instructions</div>
                        <div className="InstructionsBody">{Recipe.instructions}</div>
                    </div>
                )}

            </div>
        );
    } else {
        return (<div className="background">
            <ReactLoading className="Loading" type="spin" color="#4A76E9" height={100} width={100} />
        </div>
        );
    }
}

export default RecipeInfo;