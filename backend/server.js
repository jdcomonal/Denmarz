const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const cors = require('cors');

const PizzaMenu = require('./database/PizzaMenu'); //data for menu
const LoginProfiles= require('./database/userProfiles');// data for users
const toppings=require('./database/toppings');
// const orders=require('./database/orders');

const port = process.env.PORT || 5000;
// Parse URL-encoded form data 
// The express.urlencoded() function is used to parse incoming requests with 
// URL-encoded payloads and populate the req.body property with the parsed data.
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000"
    })
)


const orders=[{}];


//4 middleware for security
const verify = (req, res, next) => {

    // retrieves the value of the Authorization header from an incoming HTTP request
    const autHeader = req.headers.authorization;
    console.log('check token here:  ' + req.headers.authorization);

    if (autHeader) {
        // Extract the token from the Authorization header
        const token = autHeader.split(" ")[1];


        // This line verifies the JWT token provided in the token variable.
        // It uses the jsonwebtoken library to perform the verification.
        jwt.verify(token, "ThisMYsecretKey", (err, user) => { // receives two parameters: err (error) and user (decoded payload from the JWT).

            if (err) {
                return res.status(403).json("Session Expired.")
            }
            // Store the user information in the request object
            req.user = user;
            next();// Move to the next middleware or route handler
        })

    } else {
        return res.status(403).json("You are not authenticated")
    }
}
//generate token 
const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "ThisMYsecretKey", { expiresIn: '1000s' })
}

// 1 Make an endpoint to return all pizza in pizzaMenu 
app.get('/api/PizzaMenu', (req, res) => {
    res.json(PizzaMenu);
})

app.get('/api/toppings',(req, res) => {
    res.json(toppings);
})
app.get('/api/views_order',(req, res) => {
    res.json(orders);
})

// 2 Make an endpoint that will receive an Id of a book and return its details
app.get('/api/find_pizza/:id', (req, res) => {

    let id = parseInt(req.params.id); // Accessing the value from the request body ; parseInt() = convert str to number
    // console.log("🚀 ~ file: server.js:189 ~ app.post ~ id:", id)

    const pizza = PizzaMenu.find((u) => {  
        return u.Pizza_id === id;
    });


    if (pizza) {

        res.json(pizza);

    } else {
        res.status(404).json("PIZZA NOT FOUND");
    }
});
app.get('/api/userInfo/:id', (req, res) => {

    let id = parseInt(req.params.id); // Accessing the value from the request body ; parseInt() = convert str to number
    console.log("🚀 ~ file: server.js:94 ~ app.post ~ id:", id)

    const user = LoginProfiles.find((u) => {  
        return u.id === id;
    });


    if (user) {

        res.json(user);

    } else {
        res.status(404).json("Info not FOUND");
    }
});

//3 Create a login end point and implement the JWT security, use the LoginProfiles variable below.
app.post('/login', (req, res) => {

    // let username = req.body.username;
    // let password = req.body.password;
    const { username, password } = req.body;
    console.log("🚀 ~ file: server.js:88 ~ app.post ~ username, password:", username, password)

    const user = LoginProfiles.find((u) => {
        return u.username === username && u.password === password;
    });

    if (user) {

        const accessToken = generateAccessToken(user);

        res.json({
            id:user.id,
            username: user.username,
            isAdmin: user.isAdmin,
            accessToken: accessToken,
        });

    } else {
        res.status(400).json("Username or Password incorrect");
    }

});

// ------------------

app.get('/all-user',(req, res) => {
    
    res.json(LoginProfiles);

})

app.post('/create-user', (req, res)=>{

       let uname = req.body.username
       let psWord = req.body.password
       let fname = req.body.firstname
       let lname = req.body.lastname
       let addr = req.body.address
       let mobileNo = req.body.mobileNo
       

    
    //saving it to array of objects
    const newRecord = {
        id: (LoginProfiles.length + 1),
        username: uname,
        password: psWord,
        firstname: fname,
        lastname: lname,
        address: addr,
        contact: mobileNo,
        status: 'activate',
        img:'',
        isAdmin: ''
    }
  
   if (LoginProfiles.push(newRecord)) {
        res.status(200).json( { "Code":"suceess", "Msg":"Success in saving","id":LoginProfiles.length + 1} ); 

   } else{
        res.status(400).json( { "Code":"failed", "Msg":"Error in Saving"} ); 
   }

})

app.post('/api/submit_order',verify, (req, res)=>{
    //verify
    const { user, pizzaId, pizzaName, pizzaSize, slice,toppings, quantity,totalPrice,status } = req.body;

    const newRecord = {
        id: (orders.length + 1),
        pizzaID: pizzaId,

        user: user,
        pizzaName:pizzaName,
        slice: slice,
        toppings: toppings,
        quantity: quantity,
        totalPrice: totalPrice,
        status: status
    }
    
    if (orders.push(newRecord)) {
        res.status(200).json( { "Code":"suceess", "Msg":"Success Placing order"}); 

   } else{
        res.status(400).json( { "Code":"failed", "Msg":"Error in Placing Order"} ); 
   }
})

app.post('/api/updateUser/:id',  (req, res)=>{

    const userId = parseInt(req.params.id);
    console.log("🚀 ~ file: server.js:209 ~ app.get ~ userId:", userId)


    let username= req.body.username;
    let password=req.boby.password;
    let fname = req.body.firstname;
    let lname = req.body.lastname;
    let address = req.body.address;
    let contact = req.body.contact;
    // let occupation = req.body.occupation;
    
  
    //saving it to array of objects
    const updateRecord = {
        id: userId,
        username:username,
        password:password,
        Firstname: fname,
        Lastname: lname,
        address: address,
        contact: contact,
        // occupation: occupation,
        // status: 1
    }

   const updatedUserProfile = LoginProfiles.findIndex( (obj) => obj.id == userId );
       
   LoginProfiles[updatedUserProfile] = updateRecord;

       if(LoginProfiles){
            res.json(
                {
                code: 'success',
                msg:"Successfully Udpate"
                }
            ); 

        } else {
            res.status(401).json( { code:"failed", msg:"Error in updating" } ); 
        }


})

 
//logout
app.post('/api/logout', verify, (req, res)=>{
 
    const autHeader = req.headers.authorization;  
    console.log('check token here:  ' + req.headers.authorization);
    const token = autHeader.split(" ")[1];
    jwt.delete(token);

})





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});