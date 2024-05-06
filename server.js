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

// GET request to serve Arabica's Jaguar Home.html
app.get('/arabica', (req, res) => {
    res.sendFile(__dirname + '/public/Arabica\'s Jaguar Home.html');
});

// GET request to serve cafeContact.html
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/public/cafeContact.html');
});

// GET request to serve cafeAbout.html
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public/cafeAbout.html');
});
// POST request to handle form submission
app.post('/submit',(req,res)=>{
    //assuming form has fields 'item1' 'item2' 'item3' for simplicity
    const {item1,item2,item3} = req.body;


//Calculate total
const total = parseInt(item1) + parseInt(item2) + parseInt(item3);

// Send back the total in the response
res.send(`Total:$${total}`);
});

//Server Listening
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});
