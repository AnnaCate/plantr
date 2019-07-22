import React from 'react';
import {Router} from '@reach/router';

// import components
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
// About
// PlantDetails
// YourGarden

const App = () => {
  return (
    <div>
      <NavBar />
      <Router>
        <HomePage path='/' />
      </Router>
    </div>
  );
};

export default App;
