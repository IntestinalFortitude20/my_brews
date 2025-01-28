// This app.js file is the server where routes and endpoints
// are defined for both the API and the database
// API calls are defined in api.js
// Database calls are defined in database.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getAllBreweries, getBreweryById, getRandomBrewery, searchBreweries } from './api.js';
//

// Load the environment variables from project root folder
dotenv.config({ path: '../.env' });

// Create the express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());





// "/breweries" is the base endpoint for all the api calls
// functions are defined in the api.js file
// The app.js file is the server which contains the get endpoints

////////////////////////////////////////////////////////////////
// START OF API ENDPOINTS //////////////////////////////////////
////////////////////////////////////////////////////////////////

// HOME PAGE (root endpoint)
app.get('/', (req,res) => {
    res.send('This should be the home page');
});


// SEARCH BREWERIES
app.get('/breweries/search', async (req,res) => {
    //res.send(`This should be a search page with ${query}`);
    
    const query = req.query.query; // <-- from client
    const filters = {
        city: req.query.city,
        state: req.query.state,
        country: req.query.country,
        postal: req.query.postal,
        page: req.query.page,
        per_page: req.query.per_page
    }; // <-- also from client

    console.log("\nSearching for breweries...")
    console.log("Query: ", query);
    if ( (filters.city === undefined) &&
         (filters.state === undefined) &&
         (filters.country === undefined) &&
         (filters.postal === undefined) &&
         (filters.per_page === undefined) ){
        console.log("No filters applied");
    }
    else {
        console.log("Filters: ", filters);
    }

    const breweries = await searchBreweries(query, filters);
    res.send(breweries);
});

// GET RANDOM BREWERY
app.get('/breweries/random', async (req,res) => {
    //res.send("This should be a random brewery");
    
    const brewery = await getRandomBrewery();
    //res.send(brewery);
});


// GET BREWERY BY ID
app.get('/breweries/:id', async (req,res) => {
    //res.send("This should be a specific brewery");
    
    const id = req.params.id;
    const brewery = await getBreweryById(id);
    res.send(brewery);
});


// GET ALL BREWERIES
app.get('/breweries', async (req,res) => {
    //res.send("This should be a list of breweries");
    
    const breweries = await getAllBreweries();
    res.send(breweries);
});


/////////////////////////////////////////////////
//  END OF API ENDPOINTS  ///////////////////////
/////////////////////////////////////////////////
// START OF DATABASE ENDPOINTS  /////////////////
/////////////////////////////////////////////////


/////////////////////////////////////////////////
//  END OF DATABASE ENDPOINTS  //////////////////
/////////////////////////////////////////////////


/////////////////////////////////////////////////
// ERROR HANDLING (try/catch blocks are in the .api file)
/////////////////////////////////////////////////
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


////////////////////////////////////////////////////////////////

// Start the server
// The command is "npm run dev" to start the server (because of nodemon)
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});