// LEGEND:
// searchBreweries(query)
// getRandomBrewery()
// getBreweryById(id)
// getAllBreweries()

import axios from "axios";
import Brewery from "./brewery.js";

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
                queryWithFilters += `&${key}=${value}`;
            }
        }
        
        console.log("Query with filters: ", queryWithFilters);

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

        return breweries;
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

        return brewery;
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

        return brewery;
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

        return breweries;
    }
    catch (error) {
        console.error("Error connecting to API", error);
    } 
}