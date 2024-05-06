//server.js

const express = require('express');
const app = express();
const PORT = 3000;

//Body parser middleware to handle form data 
app.use(express.urlencoded({extended:true}));

//Serve static files from the 'public' folder 
app.use(express.static('public'));

//GET request to serve the order form 
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html');   
});
//Fixed prices for menu items 
const itemPrices = {
    "Iced Latte": 3.75,
    "Capuccino":3.75,
    "Mocha":4.25,
    "Croissant":2.75,
    "Chocolate Croissant":3.50,
    "Avocado Toast":4.75
};

// POST request to handle form submission
app.post('/submit',(req,res)=>{
    //assuming form has fields 'item1' 'item2' 'item3' for simplicity
    const itemQuantities = {
        "Iced Latte": parseInt(req.body["Iced Latte"]),
        "Cappuccino": parseInt(req.body['Cappuccino']),
        "Mocha": parseInt(req.body['Mocha']),
        "Croissant": parseInt(req.body['Croissant']),
        "Chocolate Croissant": parseInt(req.body['Chocolate Croissant']),
        "Avocado Toast": parseInt(req.body['Avocado Toast'])
    };


//Calculate total
    let total = 0;
    for (const item in itemQuantities){
        if (!isNaN(itemQuantities[item])) {
            total += itemQuantities[item] * itemPrices[item]
        }
    }


// Redirect to the order confirmation page with the total amount as a query parameter
res.redirect(`/order-confirmation?total=${total.toFixed(2)}`);
});

// GET request to serve the order confirmation page
app.get('/order-confirmation', (req, res) => {
    // Retrieve the total amount from the query parameter
    const total = req.query.total;
    res.send(`Total amount of your order: $${total}`);
});

//Server Listening
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});
