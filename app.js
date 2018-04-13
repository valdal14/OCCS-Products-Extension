const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
require('dotenv').config();


const app = express();

// import server class
const Occs = require('./server').Occs;
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// Middleware serve static pages
app.use(serveStatic('./public/', {'index': ['index.html', 'index.htm']}));

// get
app.get('/', (req, res)=>{
    if(Occs.token === null && Occs.token === ''){
        Occs.getToken();
    }
});

app.get('/products', (req, res)=>{
    Occs.getProduct(req, res);
})

app.listen(3000, ()=> {
    console.log('Server Listening at port 3000'); 
});