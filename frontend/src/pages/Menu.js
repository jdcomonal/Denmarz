
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './Menu.css'


  
function Menu() {

  const [menu, setMenu] = useState([]);

  async function fetchMenu() {
    try {
      const response = await fetch('http://localhost:5000/api/PizzaMenu');
      const menu = await response.json();
      setMenu(menu);
  
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  }

  useEffect(() => {

    fetchMenu();

  },[]);

  return (
    <main>
      <div className='Container__menu'>
      <div className='MenuHeader'>
          <h1>Pizza Menu</h1>
      </div>
        
        <div className='products' >
{/* --------------------------------------------- */}
          {menu.map(pizza => (
            <div className='product_card' key={pizza.Pizza_id}>
              <div className='img-product'>
               <img src={'../images/'+pizza.img} alt={pizza.alt} />
              </div>
              <h3 className='product_title'>{pizza.PizzaName}</h3>
              <p className='product_desc'>{pizza.Description}</p>
              <p className='product_price'>₱ {pizza.R_Price }</p>

              <Link to={`/pizza/${pizza.Pizza_id}`}  className='txt__fontbase link__button'>Order</Link>

            </div>
          ))}
{/* ----------------------------------------------*/}
        </div>

      </div>
    </main>
  )
}

export default Menu
