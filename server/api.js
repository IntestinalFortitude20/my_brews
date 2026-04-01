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

function toBreweryModel(breweryData) {
    return new Brewery(
        breweryData.id,
        breweryData.name,
        breweryData.brewery_type,
        breweryData.address || breweryData.street || null,
        breweryData.city,
        breweryData.state || breweryData.state_province || null,
        breweryData.postal_code,
        breweryData.country,
        breweryData.phone || null,
        breweryData.website || breweryData.website_url || null,
        breweryData.longitude || null,
        breweryData.latitude || null
    );
}

function throwApiError(context, error) {
    const status = error?.response?.status;
    const details = error?.response?.data ? JSON.stringify(error.response.data) : error.message;
    throw new Error(`${context}${status ? ` (status ${status})` : ''}: ${details}`);
}


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
        const params = {
            query,
            ...filters
        };

        console.log("Searching for breweries with params: ", params);

        const response = await apiClient.get('/breweries/search', { params });

        const breweries = response.data.map((breweryData) => toBreweryModel(breweryData));
        cache.set(cacheKey, breweries);
        return breweries;
    }
    catch (error) {
        throwApiError('Error searching for breweries', error);
    }
}


// GET RANDOM BREWERY (NO CACHE)
export async function getRandomBrewery() {
    try {
        console.log("\nGetting random brewery...");

        const response = await apiClient.get('/breweries/random');
        const breweryData = response.data[0];
        // ^^^ This call returns a list, because the query accepts requests
        // for multiple random breweries.  For my sake, I only want one.
        // getByID only returns one brewery, not a list.
        // Just some information for future reference.

        const brewery = toBreweryModel(breweryData);

        return brewery;
    }
    catch (error) {
        throwApiError('Error getting random brewery', error);
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

        const response = await apiClient.get(`/breweries/${id}`);
        const breweryData = response.data;

        const brewery = toBreweryModel(breweryData);
        cache.set(cacheKey, brewery);
        return brewery;
    }
    catch (error) {
        throwApiError('Error getting brewery by ID', error);
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
        const response = await apiClient.get('/breweries', {
            params: {
                page,
                per_page: perPage
            }
        });

        const breweries = response.data.map((breweryData) => toBreweryModel(breweryData));
        cache.set(cacheKey, breweries);
        return breweries;
    }
    catch (error) {
        throwApiError('Error getting all breweries', error);
    } 
}