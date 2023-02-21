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
            headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + Token },
        };
        const response = await fetch('https://concierge.cooperstandard.org:8443/api/authenticate', getRec);
        const Liked = await response.json();
        setSaved(Liked);
        console.log(Saved);
    }
    function HandleBack() {
        navigate("/recipes", { state: { token: location.state.token, user: location.state.user, Pos: location.state.Pos } })
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
    return (
        <div className='background'>
            <h1 className = 'SavedTitle'>Saved Recipes</h1>
            <button onClick={HandleBack} className="BackButton">
                    <h1 className="BackButtonText">Back</h1>
                </button>
        </div>
    );

}

export default SavedRecipes;