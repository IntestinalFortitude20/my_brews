// filepath: /C:/Users/pruck/source/repos/My_Brews/my_brews_client/src/App.jsx
import React, { useState } from 'react';
//import { Helmet } from 'react.helmet';
import axios from 'axios';
import './App.css';
import KanyeButton from './components/kanyebutton';
import SearchBar from './components/SearchBar';


const App = () => {
  
  
  return (
    <div className="App">
      <header>
        <h1>Brewery Search</h1>
      </header>

      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>I'm feeling lucky</li>
          <li></li>
          <li></li>
        </ul>
      </nav>
      
      <main></main>
      
      <footer></footer>
      
      
      <SearchBar />


    </div>
  );
};

export default App;