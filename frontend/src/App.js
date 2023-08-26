
import './App.css';
import { Routes, Route } from 'react-router-dom'

//importing pages
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import MenuPage from './pages/Menu'
import PizzaDetails from './pages/PizzaDetails'
import SignUpPage from './pages/Signup'
import SignInPage from './pages/Signin'
import UserInformation from './pages/UserInformation'
import PageNotFound from './pages/404'
//RootLayout the Layout of all the pages
import RootLayout from './layouts/RootLayout'
import React from 'react';



function App() {
  return (
    <Routes>
        <Route element={<RootLayout />}>
        <Route  path="/" element={<HomePage />} > </Route>
          <Route  path="/home" element={<HomePage />} > </Route>
          <Route path="/about" element={<AboutPage />}> </Route>
          <Route path="/menu" element={<MenuPage />}> </Route>
          <Route path="/signup" element={<SignUpPage/> }> </Route>
          <Route path="/signin" element={<SignInPage/> }> </Route>
          <Route path="/profile" element={<UserInformation/> }> </Route>
          <Route path="*" element={<PageNotFound/> }> </Route>
          <Route path="/pizza/:id" element={<PizzaDetails/> }> </Route>
         
        </Route>   
   </Routes>
  );
}

export default App;
