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
        //console.log(Liked);
    }
    function HandleBack() {
        navigate("/recipes", { state: { token: location.state.token, user: location.state.user, Pos: location.state.Pos } })
    }
    function HandleShoppingList() {
        navigate("/shoppinglist", { state: { token: Token, Pos: Pos } })
    }
    async function handleDeleteRecipe(recipeTitle) {
        const ID = await getID(recipeTitle);
        //console.log(ID);
        const DislikeHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + Token },
            body: JSON.stringify({ recipe: ID, title: recipeTitle })
        };
        const res2 = await fetch('https://concierge.cooperstandard.org/api/user/dislike', DislikeHead)
        const Disres = await res2.json();
        const updatedRecipes = Saved.recipes.filter(recipe => recipe.title !== recipeTitle);
        setSaved({ ...Saved, recipes: updatedRecipes });
    }
    async function getID(title) {
        const getRec = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + location.state.token },
        };
        const response = await fetch('https://concierge.cooperstandard.org/api/recipe/search?term=' + title, getRec);
        const Liked = await response.json();
        return Liked[0]._id;
    }
    async function handleRecipeInfo(title) {
        const ID = await getID(title);
        navigate("/recipe-info", { state: { _id: ID, token: Token, user: location.state.user, Pos: location.state.Pos, isSaved: 1, Toggle: 1 } });
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


            <div className="background">

                <div className="Header">
                    <div className="SavedTitle">Saved</div>
                    <div className="BackButton" onClick={HandleBack}>Back</div>
                </div>
                <div className="Toggle" style={{ top: "90px" }}>
                    <div className="ToggleBackground" onClick={HandleShoppingList}></div>
                    <div className="IngredientsButton"></div>
                    <div className="IngredientsText" style= {{left:"40px"}}>Recipes</div>
                    <div className="InstructionsText" style={{ color: "#BDBDBD",left:"165px"}} onClick={HandleShoppingList}>Shopping</div>
                </div>
                <ul className='saved-recipe-container'>
                    {Saved.recipes.map(recipe => {
                        return (
                            <div className='saved-recipe-item' key={recipe.title}>
                                <div className='saved-recipes-test' style={{ textTransform: 'Capitalize' }}>{recipe.title}</div>
                                <button className='delete-recipe-button' onClick={() => handleDeleteRecipe(recipe.title)}>
                                    <img src = "https://cdn-icons-png.flaticon.com/512/1828/1828843.png"  style={{position : "relative",width:"25px",height:"25px" ,bottom:"3px",right:"7.2px"}}></img>
                                </button>
                                <button className='info-recipe-button' onClick={() => handleRecipeInfo(recipe.title)}>
                                    <img src = "https://cdn-icons-png.flaticon.com/512/471/471662.png" style={{position : "relative",width:"25px",height:"25px" ,bottom:"3px",right:"6.1px"}}></img>
                                </button>
                            </div>
                        )
                    })}
                </ul>



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