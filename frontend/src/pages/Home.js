import { Link } from 'react-router-dom';
import './Home.css';
import login from '../img/Mobile-login.jpg'
import order from '../img/Map-light.jpg'
import buildPizza from '../img/buildpizza.png'
import delivery from '../img/pizza_delivery.png'
import Ham_Chees from '../img/products/Ham&CheesPizza.png'
import Hawaiian from '../img/products/HawaiianPizza.png'
import Pepperoni from '../img/products/PepperoniPizza.png'
import Vegetarian from '../img/products/VegetarianPizza.png'





const Home = () => {

    return (
        <main>
            <div className="home__div">
                <div className='home__content'>
                    <h1>The Best Pizza in Town.</h1>
                    <p>We are serving hand-tossed pizza using mozzarella cheese in Italian style.</p>
                    <p>Freshly baked everyday.</p>
                    <Link to="/menu" className='txt__fontbase link__button'>Order Now</Link>
                </div>
            </div>
            <div className='how-to-order'>
                <h2>4 Easy Steps to Delicious Pizza:</h2>

                <div className='flex-row'>
                    <div className='how-to-order__card'>
                        <p>Create Account</p>
                        <img src={login} width={250} alt="Create Accout" />
                    </div>
                    <div className='how-to-order__card'>
                        <p>Build Your Pizza</p>
                        <img src={buildPizza} width={250} alt="Create Accout" />
                    </div>
                    <div className='how-to-order__card'>
                        <p>Confirm & Pay</p>
                        <img src={order} width={250} alt="Place Order" />
                    </div>
                    <div className='how-to-order__card'>
                        <p>Track & Enjoy</p>
                        <img src={delivery} width={250} alt="Place Order" />
                    </div>
                </div>

            </div>
            <div className=' Feature_Product '>
                <h2>Feature Product</h2>
                <div className='products'>
                    <div className='product_card'>
                        <div className='img-product'>
                            <img src={Vegetarian} width={200} alt="Place Order" />
                        </div>
                        <h3 className='product_title'>Vegetarian</h3>
                        <p className='product_desc'>A garden-fresh delight featuring a medley of colorful veggies and melted cheese on a perfectly baked crust. A wholesome choice for veggie lovers.</p>
                        <p className='product_price'>₱250.00</p>
                        <Link to="/menu" className='txt__fontbase link__button'>Order</Link>
                        
                    </div>
                    <div className='product_card'>
                        <div className='img-product'>
                            <img src={Ham_Chees} width={200} alt="Place Order" />
                        </div>
                        <h3 className='product_title'>Ham and Cheese</h3>
                        <p className='product_desc'>A classic favorite, our Ham and Cheese Pizza combines premium ham with melted cheese for a simple yet satisfying slice of comfort.</p>
                        <p className='product_price'>₱250.00</p>
                        <Link to="/pizza/4" className='txt__fontbase link__button'>Order</Link>

                    </div>
                    <div className='product_card'>
                        <div className='img-product'>
                            <img src={Hawaiian} width={200} alt="Place Order" />
                        </div>
                        <h3 className='product_title'>Hawaiian</h3>
                        <p className='product_desc'>Taste the tropics with our Hawaiian Pizza, featuring sweet pineapple and savory ham on a bed of gooey cheese - a tropical twist you'll love.</p>
                        <p className='product_price'>₱250.00</p>
                        <Link to="/pizza/5" className='txt__fontbase link__button'>Order</Link>

                    </div>
                    <div className='product_card'>
                        <div className='img-product'>
                            <img src={Pepperoni} width={200} alt="Place Order" />
                        </div>
                        <h3 className='product_title'>Pepperoni</h3>
                        <p className='product_desc'>A timeless classic, our Pepperoni Pizza boasts a generous layer of zesty pepperoni over melted cheese, delivering a bold and satisfying flavor in every bite.</p>
                        <p className='product_price'>₱250.00</p>
                        <Link to="/pizza/3" className='txt__fontbase link__button'>Order</Link>

                    </div>



                </div>
                <Link to="/menu" className='txt__fontbase hover-underline-animation view-Menu'>View Menu</Link>

            </div>


        </main>

    )

}

export default Home