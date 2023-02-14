//import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import React,{useEffect, useState} from 'react';
import styles from "./App.css"

function App() {

  const [recipes, setRecipes]=useState([])

  const fetchData = () => {
    fetch("https://concierge.cooperstandard.org:8443/api/recipe/all")
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        setRecipes(data)
      })
  }

  useEffect(() => {
    fetchData();
  }, [])

  /*
  useEffect(() => {
    console.log(recipes)
  }, [recipes]);
  */
  const fetchRecipes = async() => {
    const response = Axios("/api/all");
    console.log(response)
    setRecipes(response.data);
  }


  return (
    <div className="App">
     {
       recipes && recipes.map(recipe => {

          return(
            <div key={recipe._id} className = "background">
            <h1>{recipe.title}</h1>
            <h3>{recipe.description}</h3>
            <img src = {recipe.photos[0]} className = "RecipeImage"></img>
            <button className = "DislikeButton"></button>
            <button className = "LikeButton"></button>
            <ul>{recipe.ingredients.map(ingredient => {
              return(
                <li key = {ingredient}>{ingredient}</li>
              )
            })}</ul>
            
            
            

            </div>
          )


       })
      }
    
    </div>
  );
}

export default App;
