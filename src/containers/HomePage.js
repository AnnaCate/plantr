import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import PlantList from '../components/PlantList';

const HomePage = props => {
  const [allPlants, setAllPlants] = useState([]);

  useEffect(() => getAllPlants(), []);

  const getAllPlants = () => {
    axios
      .get('/plants')
      .then(res => setAllPlants(res.data.data))
      .catch(err => console.log(err));
  };

  return (
    <>
      <section className='section no-bottom-padding'>
        <div className='columns'>
          <div className='column is-one-third' />
          <div className='column is-one-third'>
            <SearchBar />
          </div>
          <div className='column is-one-third' />
        </div>
      </section>

      <section className='section'>
        <PlantList allPlants={allPlants} currentUser={props.currentUser} />
      </section>
    </>
  );
};

export default HomePage;
