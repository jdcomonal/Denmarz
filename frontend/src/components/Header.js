import { NavLink, Link } from 'react-router-dom'
import logo from '../img/logo_denmarz1.png'
import { FaShoppingCart, FaBars, FaTimesCircle } from "react-icons/fa"
import './Header.css'
import React, { useState, useEffect } from 'react'

const Header = () => {
   const [isLogin, setisLogin] = useState(false);
   const [toggleMenu, setToggleMenu] = useState(false);
   const [scrolling, setScrolling] = useState(false);
   const [headerKey, setHeaderKey] = useState(0);

   useEffect(() => {

      setHeaderKey(1);

      const handleScroll = () => {
         if (window.scrollY > 0) {
            setScrolling(true);
         } else {
            setScrolling(false);
         }
      };

      window.addEventListener('scroll', handleScroll);

      // Clean up the event listener when the component unmounts
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   useEffect(() => {

      if (localStorage.getItem('login_id')) {
         setisLogin(true)

         
      } else {
         setisLogin(false)
      }
      

   }, [localStorage.getItem('login_id')]);
   
  


   return (


      // NavLinks replacement for <a> tag
      // '/' for index page 
      <header key={headerKey} className={`${scrolling ? 'scrolling' : ''}`} >
         <nav className='txt__fontbase header__navbar'>
            <div className='header__navbar-logo'>
               <img src={logo} alt="Denmarz logo" />
            </div>
            <ul className='nav__links'>
               <li className='hover-underline-animation '><NavLink to="/" > Home </NavLink></li>
               <li className='hover-underline-animation'><NavLink to="/about" > About </NavLink></li>
               <li className='hover-underline-animation'><NavLink to="/menu" > Menu </NavLink></li>

               {!isLogin && (
                  <li className='hover-underline-animation'><NavLink to="/signin" > Sign In </NavLink></li>
               )}
               {isLogin &&(
                     <>
                        {/* <li className='hover-underline-animation'><NavLink to="/trackOrder"> Track Order </NavLink></li> */}
                        <li className='hover-underline-animation'><NavLink to="/profile"> Profile</NavLink></li>
                        <li className='hover-underline-animation'>
                           <NavLink onClick={(e) => {
                              localStorage.removeItem('login_id', 'token','isAdmin');
                              setHeaderKey(0);
                           }}
                           to="/signin"
                           > Logout</NavLink></li>
                     </>
               )}

               <li className='none' ><NavLink to="*" /></li>
            </ul>
            <ul>
               <li className='nav__Fabar'><FaBars className='header__icon' onClick={() => setToggleMenu(true)} /></li>
               <li><Link to="/Cart">
                  <FaShoppingCart className='header__icon' />
                  {/* <h4 className='counter'>3</h4> */}
               </Link></li>
            </ul>
         </nav>

         {toggleMenu && (

            <div className='nav__overlay'>
               <div className='nav__Fabar-overlay'><FaTimesCircle className='header__icon' onClick={() => setToggleMenu(false)} /></div>
               <ul className='txt__fontbase nav__links-overlay'>
                  <li className='hover-underline-animation '><NavLink to="/" onClick={() => setToggleMenu(false)}> Home </NavLink></li>
                  <li className='hover-underline-animation'><NavLink to="/about" onClick={() => setToggleMenu(false)}> About </NavLink></li>
                  <li className='hover-underline-animation'><NavLink to="/menu" onClick={() => setToggleMenu(false)}> Menu </NavLink></li>
                  {!isLogin && (
                     <li className='hover-underline-animation'><NavLink to="/signin" onClick={() => setToggleMenu(false)}>Sign In </NavLink></li>
                  )}
                  {isLogin &&
                     (
                        <>
                           {/* <li className='hover-underline-animation'><NavLink to="/trackOrder" onClick={() => setToggleMenu(false)}> Track Order </NavLink></li> */}
                           <li className='hover-underline-animation'><NavLink to="/profile" onClick={() => setToggleMenu(false)}>Profile</NavLink></li>
                           <li className='hover-underline-animation'>
                              <NavLink onClick={(e) => {
                              localStorage.removeItem('login_id', 'token','isAdmin');
                              alert("Logout");
                              setHeaderKey(0);
                           }}
                           to="/signin"
                           > Logout</NavLink></li>
                        </>
                     )
                  }
               </ul>
            </div>
         )}


      </header>
   )
}

export default Header;