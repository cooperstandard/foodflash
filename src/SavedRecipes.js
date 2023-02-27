import './styles/Recipes.css';
import './styles/App.css'
import './styles/index.css'
import './styles/SavedRecipes.css'
import Axios from 'axios';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ReactLoading from "react-loading";

function SavedRecipes() {
    let location = useLocation();
    let navigate = useNavigate();
    const [Saved, setSaved] = useState();
    const [Token, setToken] = useState();
    const [Pos, setPos] = useState();
    const isInitialMount = useRef(true);

    async function HandleSaved() {
        const getRec = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + location.state.token },
        };
        const response = await fetch('https://concierge.cooperstandard.org/api/recipe/viewLiked', getRec);
        const Liked = await response.json();
        setSaved(Liked);
    }
    function HandleBack() {
        navigate("/recipes", { state: { token: location.state.token, user: location.state.user, Pos: location.state.Pos } })
    }
    function HandleShoppingList() {
        navigate("/shoppinglist", { state: { token: Token, Pos: Pos } })
    }

    function handleDeleteRecipe(recipeId) {
        const updatedRecipes = Saved.recipes.filter(recipe => recipe.title !== recipeId);
        setSaved({ ...Saved, recipes: updatedRecipes });
    }

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            setToken(location.state.token);
            setPos(location.state.Pos);
            HandleSaved();
        } else {
            //console.log(Token);
            //console.log(Saved);
        }
    });
    if (Saved) {
        return (

            <div className='background'>
                <div>
                    <div className="saved-recipes-saved-recipes">
                        <button onClick={HandleBack} className="BackButton">
                            <h1 className="BackButtonText">Back</h1>
                        </button>
                        <h1 className='SavedTitle'>Saved Recipes</h1>

                        <ul className='saved-recipe-container'>
                            {Saved.recipes.map(recipe => {
                                return (
                                    <div className='saved-recipe-item' key={recipe.title}>
                                        <span className='saved-recipes-test'>
                                            <span>{recipe.title}</span>
                                            <button className='delete-recipe-button' onClick={() => handleDeleteRecipe(recipe.title)}></button>
                                            <button className='info-recipe-button'></button>
                                        </span>
                                    </div>
                                )
                            })}
                        </ul>



                        <button className="shopping-list-button">
                            <span onClick={HandleShoppingList} className="shopping-list-text"><span>Shopping List</span></span>
                        </button>


                    </div>
                </div>
            </div>


        );
    } else {
        return (<div className="background">
            <ReactLoading className="Loading" type="spin" color="#4A76E9" height={100} width={100} />
        </div>
        );
    }

}

export default SavedRecipes;