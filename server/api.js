// LEGEND:
// searchBreweries(query)
// getRandomBrewery()
// getBreweryById(id)
// getAllBreweries()

import axios from "axios";

const baseURL = 'https://api.openbrewerydb.org/v1';

const apiClient = axios.create({
    baseURL: baseURL
});


// SEARCH BREWERIES
export async function searchBreweries(query, filters={}) {
    try {
        //console.log("Searching for: ", query);
        // Use key/value pairs from filter query
        let queryWithFilters = baseURL + `/breweries/search?query=${query}`;
        
        for (const [key, value] of Object.entries(filters)) {
            if (value) {
                queryWithFilters += `&by_${key}=${value}`;
            }
        }
        
        console.log("Query with filters: ", queryWithFilters);
        const response = await apiClient.get(queryWithFilters);
        return response.data;
    }
    catch (error) {
        console.error("Error connecting to API", error);
    }
}


// GET RANDOM BREWERY
export async function getRandomBrewery() {
    try {
        console.log("Getting random brewery...");

        const response = await apiClient.get(baseURL + "/breweries/random");
        return response.data;
    }
    catch (error) {
        console.error("Error connecting to API", error);
    }
}


// GET BREWERY BY ID
export async function getBreweryById(id) {
    try {
        console.log("Getting brewery: ", id);

        const response = await apiClient.get(baseURL + `breweries/${id}`);
        return response.data;
    }
    catch (error) {
        console.error("Error connecting to API", error);
    }
}


// GET ALL BREWERIES
export async function getAllBreweries() {
    try {
        console.log("Getting all breweries...");
        const response = await apiClient.get(baseURL + "/breweries/");
        return response.data;
    }
    catch (error) {
        console.error("Error connecting to API", error);
    } 
}