import { useState } from "react";
import axios from 'axios';

export default function KanyeButton() {
    const [quote, setQuote] = useState('');
    
    const handleClick = async () => {
        const response = await axios.get('https://api.kanye.rest');
        setQuote(response.data.quote);
        //const newQuote = "This is the quote.";
        //setQuote(newQuote);
    };
    

    return (
        <div>
            <button onClick = {handleClick}>
                Get a quote!
            </button>
            <p>{quote}</p>
        </div>
    );
};


