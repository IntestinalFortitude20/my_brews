import { useState } from 'react';
import axios from 'axios';

export default function SearchBar() {
    const backend = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL
      });
    
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [dataSource, setDataSource] = useState('');


    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setError('Please enter a search term.');
            setResults([]);
            setHasSearched(true);
            return;
        }

        setLoading(true);
        setError('');
        setHasSearched(true);
        setDataSource('');

        try {
            const response = await backend.get('/breweries/search', {
                params: { query: searchTerm.trim() }
            });
            console.log('Successful call to server!', response.data);
            setResults(response.data);
            setDataSource(response.headers['x-data-source'] || 'unknown');
        } catch (error) {
            console.error('Error fetching da breweries:', error);
            const message = error.response?.data?.error || 'Error fetching breweries. Please try again.';
            setError(message);
            setResults([]);
        } finally {
            setLoading(false);
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
            <button onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
            </button>
        
            <div id="results">
                {error && <p>{error}</p>}

                {!error && dataSource && (
                    <p>Data source: {dataSource}</p>
                )}

                {!error && hasSearched && !loading && results.length === 0 ? (
                    <p>No breweries found.</p>
                ) : (
                    results.map((brewery, index) => (
                        <p key={index}>
                            {brewery.name} -- {brewery.city}, {brewery.state}
                        </p>
                    ))
                )
                }
            </div>
        </div>            
    );
};