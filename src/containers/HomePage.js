import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import PlantList from '../components/PlantList';

const HomePage = props => {
  const [allPlants, setAllPlants] = useState([]);

  useEffect(() => getAllPlants(), []);

  const getAllPlants = () => {
    axios.get('/plants').then(res => setAllPlants(res.data.data));
  };

  return (
    <section className='section'>
      <div className='columns'>
        <div className='column is-one-third' />
        <div className='column is-one-third'>
          <SearchBar />
        </div>
        <div className='column is-one-third' />
      </div>

      <PlantList allPlants={allPlants} />
    </section>
  );
};

export default HomePage;
