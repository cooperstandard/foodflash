//import logo from './logo.svg';
import './Recipes.css';
import './App.css'
import Axios from 'axios';
import React, { useEffect, useState } from 'react';

function Recipes() {

  const [recipes, setRecipes] = useState([])

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
  const fetchRecipes = async () => {
    const response = Axios("/api/all");
    console.log(response)
    setRecipes(response.data);
  }

  /*
    async function asyncCall(){
      console.log("calling");
      const result = await fetchData();
      console.log(result);
    }
    asyncCall();*/
  
  
  if (recipes == []){
    return(
      <div />
    )
  }
  return (
    <div className="App">
      {



        <div key={recipes[0]._id} className="background">
          <h1>{recipes[0].title}</h1>
          <h3>{recipes[0].description}</h3>
          <img src={recipes[0].photos[0]} className="RecipeImage"></img>
          <button className="DislikeButton"></button>
          <button className="LikeButton"></button>
          <ul>{recipes[0].ingredients.map(ingredient => {
            return (
              <li key={ingredient}>{ingredient}</li>
            )
          })}</ul>
        </div>


      }

    </div>
  );

}


export default Recipes;