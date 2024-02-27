import React, { useState, useEffect } from 'react';
import SearchLogo from '../../assets/search.png';
import './SearchButton.css';
import axios from 'axios';
import ArtistCard from '../artistCard/ArtistCard';

const SearchButton = () => {
    const [input, setInput] = useState('');
    const [data, setData] = useState(null);

    useEffect(() => {
        const storedInput = sessionStorage.getItem('searchInput');
        const storedData = sessionStorage.getItem('searchData');
        if (storedInput) {
            setInput(storedInput);
        }
        if (storedData) {
            setData(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    throw new Error('Access token not found in local storage');
                }

                const response = await axios.get('https://api.spotify.com/v1/search', {
                    params: {
                        q: input,  
                        type: 'artist'
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setData(response.data);
                // Save input and data to session storage
                sessionStorage.setItem('searchInput', input);
                sessionStorage.setItem('searchData', JSON.stringify(response.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Function to fetch data
        const fetchDataOnInputChange = () => {
            fetchData();
        };

        fetchDataOnInputChange();
    }, [input]);  

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setInput(inputValue);
        console.log('Input changed', inputValue);
        if (inputValue.trim() === '') {
            setData(null);  
        }
    };
    
    return (
        <div>
            <div className='search-input-container'>
                <div className="search-wrapper">
                    <input
                        className='search-input'
                        type="text"
                        placeholder='Search for an artist...'
                        value={input}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <img className='search-logo' src={SearchLogo} alt="search Logo" />
                </div>
            </div>
            {data !== null && <ArtistCard artistData={data} />}
        </div>
    );
};

export default SearchButton;
