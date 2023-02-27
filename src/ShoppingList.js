import './styles/Recipes.css';
import './styles/App.css'
import './styles/index.css'
import './styles/SavedRecipes.css'
import Axios from 'axios';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ReactLoading from "react-loading";

function ShoppingList() {
    let location = useLocation();
    let navigate = useNavigate();
    const [Saved, setSaved] = useState();
    const [Token, setToken] = useState();
    const [Pos, setPos] = useState();
    const [Ingredients, setIngredients] = useState([]);
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

    function HandleSavedRecipe() {
        navigate("/saved", { state: { token: Token, Pos: Pos } })
    }
    function handleDeleteIngredient(index) {
        const updatedIngredients = [...Ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
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

    useEffect(() => {
        if (Saved) {
            const ingredientsList = Saved.recipes.map(recipe => recipe.ingredients.map((ingredient) => <li>{ingredient}</li>));
            setIngredients(ingredientsList.flat());
        }
    }, [Saved]);

    if (Saved) {
        return (

            <div className='background'>
                <div>
                    <div className="saved-recipes-saved-recipes">
                        <button onClick={HandleBack} className="BackButton">
                            <h1 className="BackButtonText">Back</h1>
                        </button>
                        <h1 className='SavedTitle'>Shopping List</h1>

                        <ul className='saved-recipe-container'>
                            {Ingredients.map((ingredient, index) => (
                                <div>
                                <div key={index}>{ingredient} 
                                </div>
                                <button className='delete-recipe-button' onClick={() => handleDeleteIngredient(index)}></button>
                                </div>
                            ))}
                            
                        </ul>

                        <button className="shopping-list-button">
                            <span onClick={HandleSavedRecipe} className="shopping-list-text"><span>Saved Recipes</span></span>
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

export default ShoppingList