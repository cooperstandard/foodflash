
import React  from 'react'
import LoginPage from './LoginPage';
import Recipes from './Recipes';
import CreateAccount from './CreateAccount';
import { Routes, Route, useLocation} from 'react-router-dom';




const Main = () => {
let loc = useLocation();
  return (
    <Routes>
      <Route exact path='' element={<LoginPage />}></Route>
      <Route exact path='/login' element={<LoginPage />}></Route>
      <Route exact path='/register' element={<CreateAccount />}></Route>
      <Route exact path='/recipes' element={<Recipes/>}></Route>
    </Routes>



  );

}

export default Main;

