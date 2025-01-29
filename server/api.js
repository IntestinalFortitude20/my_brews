// LEGEND:
// searchBreweries(query)
// getRandomBrewery()
// getBreweryById(id)
// getAllBreweries(page, perPage)

import axios from "axios";
import Brewery from "./brewery.js";
import NodeCache from "node-cache";

// Base URL for API
const baseURL = 'https://api.openbrewerydb.org/v1';

// Create API client object
const apiClient = axios.create({
    baseURL: baseURL
});

// Initialize cache object
const cache = new NodeCache({stdTTL: (60*60*24) });


// SEARCH BREWERIES
export async function searchBreweries(query, filters={}) {
    
    // Generate a key for the cache based on the query and filters
    const cacheKey = `search:${query}:${JSON.stringify(filters)}`;
    console.log("Cache Key: ", cacheKey);
    const cachedResponse = cache.get(cacheKey);
    
    // If cached response exists, return it
    if (cachedResponse) {
        console.log("Response found in cache: ", cacheKey);
        return cachedResponse;
    }
    
    // if cache key does not exist:
    // call API, add response to cache, display results
    try {
        
        // Add filters to query string
        let queryWithFilters = baseURL + `/breweries/search?query=${query}`;
        
        // Use key/value pairs from filters js object
        // that was passed in as an argument.
        // Access using Object.entries() method.
        for (const [key, value] of Object.entries(filters)) {
            if (value) {
                queryWithFilters += `&${key}=${value}`;
            }
        }
        
        console.log("Searching for breweries with query: ", queryWithFilters);

        const response = await apiClient.get(queryWithFilters);
        
        const breweries = response.data.map(breweryData => new Brewery(
            breweryData.id,
            breweryData.name,
            breweryData.brewery_type,
            breweryData.address,
            breweryData.city,
            breweryData.state,
            breweryData.postal_code,
            breweryData.country,
            breweryData.phone,
            breweryData.website,
            breweryData.longitude,
            breweryData.latitude
            )
        );
        cache.set(cacheKey, breweries);
        return breweries;
    }
    catch (error) {
        console.error(error, "\nError searching for breweries");
    }
}


// GET RANDOM BREWERY (NO CACHE)
export async function getRandomBrewery() {
    try {
        console.log("\nGetting random brewery...");

        const response = await apiClient.get(baseURL + "/breweries/random");
        const breweryData = response.data[0];
        // ^^^ This call returns a list, because the query accepts requests
        // for multiple random breweries.  For my sake, I only want one.
        // getByID only returns one brewery, not a list.
        // Just some information for future reference.

        const brewery = new Brewery(
            breweryData.id,
            breweryData.name,
            breweryData.brewery_type,
            breweryData.address,
            breweryData.city,
            breweryData.state,
            breweryData.postal_code,
            breweryData.country,
            breweryData.phone,
            breweryData.website,
            breweryData.longitude,
            breweryData.latitude
        );

        return brewery;
    }
    catch (error) {
        console.error(error, "\nError getting random brewery");
    }
}


// GET BREWERY BY ID (CACHE SUCCESSFUL)
export async function getBreweryById(id) {
    
    const cacheKey = `brewery:${id}`;
    const cachedResponse = cache.get(cacheKey);
    
    if (cachedResponse) {
        console.log("Response found in cache: ", cacheKey);
        return cachedResponse;
    }
    
    try {
        console.log("\nGetting brewery by ID: ", id);

        const response = await apiClient.get(baseURL + `/breweries/${id}`);
        const breweryData = response.data;

        const brewery = new Brewery(
            breweryData.id,
            breweryData.name,
            breweryData.brewery_type,
            breweryData.address,
            breweryData.city,
            breweryData.state,
            breweryData.postal_code,
            breweryData.country,
            breweryData.phone,
            breweryData.website,
            breweryData.longitude,
            breweryData.latitude
        );
        cache.set(cacheKey, brewery);
        return brewery;
    }
    catch (error) {
        console.error(error, "\nError getting brewery by ID");
    }
}


// GET ALL BREWERIES (CACHE SUCCESSFUL)
export async function getAllBreweries(page=1, perPage=50) {
    const cacheKey = `allBreweries:${page}:${perPage}`;    
    const cachedResponse = cache.get(cacheKey);
    
    
    if (cachedResponse) {
        console.log("Response found in cache: ", cacheKey);
        return cachedResponse;
    }

    try {
        console.log(`\nGetting list of breweries (page: ${page}, results per page: ${perPage})...`);
        const response = await apiClient.get(baseURL + "/breweries/");
        
        const breweries = response.data.map(breweryData => new Brewery(
            breweryData.id,
            breweryData.name,
            breweryData.brewery_type,
            breweryData.address,
            breweryData.city,
            breweryData.state,
            breweryData.postal_code,
            breweryData.country,
            breweryData.phone,
            breweryData.website,
            breweryData.longitude,
            breweryData.latitude
            )
        );
        cache.set(cacheKey, breweries);
        return breweries;
    }
    catch (error) {
        console.error(error, "Error getting all breweries");
    } 
}