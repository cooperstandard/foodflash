
import React from 'react'
import LoginPage from './LoginPage';
import Recipes from './Recipes';
import CreateAccount from './CreateAccount';
import RecipeInfo from './Recipe_Info.js';
import Account from './Account';
import SavedRecipes from './SavedRecipes';
import ShoppingList from './ShoppingList';
import Feedback from './Feedback';
import './styles/index.css'
import { Routes, Route, useLocation } from 'react-router-dom';




const Main = () => {
  let loc = useLocation();
  return (
    <Routes>
      <Route exact path='' element={<LoginPage />}></Route>
      <Route exact path='/login' element={<LoginPage />}></Route>
      <Route exact path='/register' element={<CreateAccount />}></Route>
      <Route exact path='/recipes' element={<Recipes />}></Route>
      <Route exact path='/recipe-info' element={<RecipeInfo />}></Route>
      <Route exact path='/account' element={<Account />}></Route>
      <Route exact path='/saved' element={<SavedRecipes/>}></Route>
      <Route exact path='/shoppinglist' element={<ShoppingList/>}></Route>
      <Route exact path='/feedback' element={<Feedback/>}></Route>
    </Routes>



  );

}

export default Main;

