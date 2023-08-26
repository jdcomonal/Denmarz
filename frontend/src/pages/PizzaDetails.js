import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';



import './PizzaDetails.css'

const PizzaDetails = () => {

    

    const { id } = useParams();
    const navigate = useNavigate();
    const [pizza, setPizza] = useState([]);
    const [toppings, setToppings] = useState([]);

    async function fetchPizza() {
        try {
            const response = await fetch('http://localhost:5000/api/find_pizza/' + id);
            const pizza = await response.json();
            setPizza(pizza);

        } catch (error) {
            console.error('Error fetching menu:', error);
        }
    }

 


    async function fetchToppings() {
        try {
            const response = await fetch('http://localhost:5000/api/toppings');
            const toppingz = await response.json();
            setToppings(toppingz);

        } catch (error) {
            console.error('Error fetching menu:', error);
        }
    }

    const [pizzaSize, setPizzaSize] = useState();
    const [selectedToppings, setSelectedToppings] = useState([]);

    const [Total, setTotal] = useState();
    const [quatity, setQuantity] = useState(1);
    const [size, setSize] = useState('R');
    const [slice, setSlice] = useState('6 slice')


    const handlePizzaSize = (e) => {
        setPizzaSize(e.target.value);
        setTotal(e.target.value);
        setSize(e.target.name)
    };

    const handleAddTopping = (e) => {
        const toppingPrice = parseInt(e.target.value);
        const isChecked = e.target.checked;
        const toppingName = e.target.name;

        if (isChecked) {
            // Add the topping to the selectedToppings array
            setSelectedToppings((prevToppings) => {
                return [...prevToppings, { name: toppingName, price: toppingPrice },]
            })

        } else {
            // Remove the topping from the selectedToppings array
            setSelectedToppings((prevToppings) =>
                prevToppings.filter((topping) => topping.name !== toppingName)
            );
        }
    };
    // Calculate the total price of selected toppings
    const calculateToppingsTotal = () => {
        return selectedToppings.reduce((total, topping) => total + topping.price, 0);
    };

    const handleQuantityChange = (e) => {
        if (parseInt(e.target.value) === 0 || isNaN(parseInt(e.target.value))) {
            setQuantity(parseInt(1))
        } else {
            setQuantity(parseInt(e.target.value))
        }

    };

    useEffect(() => {
        // Set default values when pizza data is available
        if (pizza.R_Price) {
            setPizzaSize(pizza.R_Price);
            setTotal(pizza.R_Price);
        }
    }, [pizza]);

    useEffect(() => {
        // Update the Total whenever the pizza size or topping changes
        setTotal(quatity * (parseInt(pizzaSize) + calculateToppingsTotal()));

        console.log("🚀 ~ file: PizzaDetails.js:89 ~ PizzaDetails ~ selectedToppings:", selectedToppings)

    }, [pizzaSize, selectedToppings, quatity]);



    useEffect(() => {
        fetchToppings();
        fetchPizza();
    }, [id]);




    const isLogin = localStorage.getItem('login_id');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLogin) {
            // User is not logged in, show an error message or redirect to login page
            navigate('/signin')
            return;
        }

        const orderData = {

            user: localStorage.getItem('login_id'),
            pizzaId: id,
            pizzaName: pizza.PizzaName,
            pizzaImg: pizza.img,
            pizzaSize: size,
            slice: slice,
            toppings: toppings,
            quantity: quatity,
            totalPrice: Total,
            status: 'Preparing'
        };

        try {
            const response = await fetch('http://localhost:5000/api/submit_order', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log('Order submitted successfully:', data);
                alert("Order submitted successfully");
                
                navigate('/menu');

                // Handle successful order submission, e.g., show confirmation or redirect


            } else {
                console.error('Error submitting order:', data);
                
                localStorage.removeItem('login_id', 'token','isAdmin');
                alert('Error submitting order.', data);
                navigate('/signin')
                // Handle error, show an error message, etc.
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            // Handle error, show an error message, etc.
        }
    };




    return (
        <main>
            <form onSubmit={handleSubmit}>
                <div className='pizzaDetail'>
                    <div className='left div__Detail'>
                        <div className='Pizza-img'>
                            <img src={'../images/' + pizza.img} alt={pizza.alt} />
                        </div>

                        <h2 className='product_title'>{pizza.PizzaName} </h2>
                        <p className='product_price small'>Start at <span className='Pizza_price'>₱{pizzaSize}</span> </p>
                        <p className=' desc'>{pizza.Description}</p>
                    </div>

                    <div className='div__Detail'>
                        <div className='section'>

                            <h3>Select the size of Pizza </h3>
                            <div className='radio-button'>
                                <input
                                    type="radio"
                                    id='R'
                                    defaultChecked
                                    name="R"
                                    value={pizza.R_Price}
                                    required
                                    // checked={setPizzaSize === pizza.R_Price}
                                    onChange={handlePizzaSize}
                                />
                                <label for="R">R</label>
                                <input
                                    type="radio"
                                    id='L'
                                    name="R"
                                    value={pizza.L_Price}
                                    // checked={setPizzaSize === pizza.L_Price}
                                    onChange={handlePizzaSize}
                                />
                                <label for="L">L</label>
                                <input
                                    type="radio"
                                    id='XL'
                                    name="R"
                                    value={pizza.XL_Price}
                                    onChange={handlePizzaSize}
                                />
                                <label for="XL">XL</label>
                                <input
                                    type="radio"
                                    id='XXL'
                                    name="R"
                                    value={pizza.XXL_Price}
                                    //  checked={setPizzaSize === pizza.XXL_Price_Price}
                                    onChange={handlePizzaSize}
                                />
                                <label for="XXL">XXL</label>
                            </div>
                        </div>
                        <div className='section'>
                            <h3>Select the number of slice </h3>
                            <div className='radio-button'>
                                <input type="radio" id='6s' defaultChecked name="slice" value='6 Slices' required />
                                <label for="6s">6 Slices</label>
                                <input type="radio" id='8s' name="slice" value='8 Slices' onChange={(e) => { setSlice(e.target.value) }} />
                                <label for="8s">8 Slices</label>
                                <input type="radio" id='10s' name="slice" value='10 Slices' onChange={(e) => { setSlice(e.target.value) }} />
                                <label for="10s">10 Slices</label>
                                <input type="radio" id='sqs' name="slice" value='Square Slices' onChange={(e) => { setSlice(e.target.value) }} />
                                <label for="sqs">Sq Slices</label>
                            </div>
                        </div>
                        <div className='section'>
                            <h3>Extra Toppings </h3>
                            {/* ---------------------------------------------------- */}
                            <div className='div__topping' >
                                {toppings.map(toppz => (
                                    <div className='label-crtl' key={toppz.id}>
                                        <input
                                            type="checkbox"
                                            id={toppz.name}
                                            name={toppz.name}
                                            value={toppz.price}

                                            onChange={handleAddTopping}
                                        />
                                        <label for={toppz.name} >
                                            <div className='div__label-toppings'>
                                                <div className='img-toppings'>
                                                    <img src={'../toppings/' + toppz.img} alt={toppz.name} />
                                                </div>
                                                <div className='txt_toppings'>
                                                    <p>{toppz.name}</p>
                                                    <p>+₱{toppz.price}</p>
                                                </div>
                                            </div>

                                        </label>
                                    </div>

                                ))}
                            </div>
                            {/* -----------------------------------------------------------------                  */}
                        </div>
                    </div>
                </div>
                <div className="bottom-navigation">
                    <div className="container">
                        <div className="input-container">
                            <input
                                type="number"
                                id="pizza-amount"
                                defaultValue={1}
                                min="1"
                                onChange={handleQuantityChange}
                                required
                            />
                        </div>
                        <div className='container-inside'>
                            <div className="input-container txt-align">
                                <p>Total:</p>
                                <h3>₱{Total}</h3>
                            </div>

                            <input type='submit' className="txt__fontbase link__button" value='Add to Cart' />
                        </div>
                    </div>
                </div>
            </form>
        </main>

    );
}

export default PizzaDetails;
