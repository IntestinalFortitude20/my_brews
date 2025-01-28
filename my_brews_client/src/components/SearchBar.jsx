import React, { useState } from 'react';
import axios from 'axios';

export default function SearchBar() {
    const backend = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL
      });
    
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);


    const handleSearch = async () => {
        const backendURL = import.meta.env.VITE_BACKEND_URL;
        const searchURL = `${backendURL}/breweries/search?query=${searchTerm}`;
        console.log('Backend URL:', backendURL);
        console.log('Search URL:', searchURL);

        try {
            const response = await backend.get(searchURL);
            console.log('Successful call to server!', response.data);
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching da breweries:', error);
        }
    };
    
    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for breweries"
            />
            <button onClick={handleSearch}>Search</button>
        
            <div id="results">
                { results.length === 0 ?
                    ( <p>No breweries found.</p> ) : 
                    ( results.map( (brewery, index) => (
                            <p key={index}>
                                {brewery.name} -- {brewery.city}, {brewery.state}
                            </p> ) ) )
                }
            </div>
        </div>            
    );
};