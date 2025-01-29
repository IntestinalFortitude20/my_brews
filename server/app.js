// API calls and caching are defined in api.js
// Database calls are defined in database.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getAllBreweries, getBreweryById, getRandomBrewery, searchBreweries } from './api.js';

// Load the environment variables from project root folder
dotenv.config({ path: '../.env' });

// Create the express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());



////////////////////////////////////////////////////////////////
// START OF API ENDPOINTS //////////////////////////////////////
////////////////////////////////////////////////////////////////


// TODO: ADD MORE MANUAL FILTERS BECAUSE
// THE API DOESN'T PROVIDE A WAY TO DO THIS
// ADD PAGINATION TO THE SEARCH RESULTS, TOO

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
    };

    console.log("\nSearching for breweries...")
    console.log("Query: ", query);
    
    if ( !filters.city && !filters.state && !filters.country && 
        !filters.postal && !filters.per_page ) {
        console.log("No filters applied");
    }
    else {
        console.log("Filters: ", filters);
    }
    
    try {
        const breweries = await searchBreweries(query, filters);     
        return res.json(breweries);
    }
    catch (error) {
        res.status(500).json({ error: '(App.js) Error searching for breweries' });
    }
});


// GET RANDOM BREWERY
app.get('/breweries/random', async (req,res) => {
    //res.send("This should be a random brewery");
    const brewery = await getRandomBrewery();
    res.json(brewery);
});


// GET BREWERY BY ID
app.get('/breweries/:id', async (req,res) => {
    //res.send("This should be a specific brewery");
    const id = req.params.id;
    
    try {
        const brewery = await getBreweryById(id);
        res.json(brewery);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// GET ALL BREWERIES
app.get('/breweries', async (req,res) => {
    //res.send("This should be a list of breweries");
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 50;

    try {
        const breweries = await getAllBreweries(page, perPage);
        res.json(breweries);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
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