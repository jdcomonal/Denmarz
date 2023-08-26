
import './About.css';
import story from '../img/one-man-preparing-homemade-dessert-kitchen-generated-by-ai.jpg'
import Commitment from '../img/flat-lay-composition-with-dough-fresh-ingredients-pepperoni-pizza-wooden-table.jpg'
import _Promise from '../img/close-up-friends-with-delicious-pizza.jpg'

const About = () => {

    return (
        <main>
            <div className='div__welcome gg'>
                <h1>Welcome to Denmarz Pizza House!</h1>
                <p>
                    At Denmarz Pizza House, we're not just about pizzas;
                    we're about creating memorable experiences for every bite.
                    Founded 2019 , our passion for crafting
                    mouthwatering pizzas and delivering exceptional service has
                    been at the heart of our journey.
                </p>

            </div>
            <div className='div__Our-Story'>
                <div className='img-ctrl'> 
                    <img src={story} alt='Story'  />
                </div>
              
                <div className='txt_content'>
                    <h2>Our Story:</h2>
                    <p>
                        From a humble beginning in Denmarz's kitchen, where a love for the perfect
                        pizza crust and the finest toppings ignited, we've grown into a beloved local pizzeria.
                        Denmarz's dedication to quality, flavor, and the joy of sharing a meal
                        with loved ones set the foundation for what Denmarz Pizza House represents today.
                    </p>
                </div>
            </div>
            <div className='div__Our-Commitment'>
                <div className='txt_content'>
                    <h2>Our Commitment:</h2>
                    <p>
                        At Denmarz Pizza House, we are committed to using only the freshest,
                        locally sourced ingredients to create our masterpieces. Our talented chefs pour
                        their heart and creativity into every pizza,
                        ensuring that each bite is a burst of flavor that will delight your taste buds.
                    </p>
                </div>
                <div className='img-ctrl'> 
                    <img src={Commitment} alt='Story'  />
                </div>

            </div>

            <div className='div__Our-Promise'>
                 <div className='img-ctrl'> 
                    <img src={_Promise} alt='Promise'  />
                </div>
                <div className='txt_content'>
                    <h2>Our Promise:</h2>
                    <p>
                        When you choose Denmarz Pizza House, you're choosing not just a pizza,
                        but a culinary experience crafted with love and attention to detail.
                        Whether you're indulging in a classic Margherita, exploring unique flavor
                        combinations, or sharing a laughter-filled meal with friends and family,
                        we're here to make each moment memorable.
                    </p>
                </div>

            </div>

        </main>
    )
}

export default About