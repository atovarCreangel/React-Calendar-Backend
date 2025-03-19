const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//* Create an Express application
const app = express();

//* Database connection
dbConnection();

//* CORS
app.use(cors());

//* Public folder (use is a middleware)
app.use(express.static('public')); // http://localhost:4000/index.html

//* Read and parse body when the request is a JSON
app.use(express.json()); 

//* export all of path routes/auth.js and execute in api/auth
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//* Define server 
app.listen(process.env.PORT_NODE, () => {
    console.log(`Server is running on port ${process.env.PORT_NODE}`);
});