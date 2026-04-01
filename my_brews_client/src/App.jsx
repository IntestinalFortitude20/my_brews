// filepath: /C:/Users/pruck/source/repos/My_Brews/my_brews_client/src/App.jsx
//import { Helmet } from 'react.helmet';
import './App.css';
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
          <li>I&apos;m feeling lucky</li>
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