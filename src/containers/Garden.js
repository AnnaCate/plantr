import React, {useEffect, useState} from 'react';
import {redirectTo, Link} from '@reach/router';
import axios from 'axios';
import GardenPlants from '../components/GardenPlants';

const Garden = ({currentUser}) => {
  const [plants, setPlants] = useState([]);

  const getPlants = userId => {
    axios
      .get(`/garden/${userId}`)
      .then(res => {
        console.log(res);
        if (res.status === 200 && res.data.data) {
          setPlants(res.data.data);
        } else {
          console.log('Nothing planted yet');
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => getPlants(currentUser._id), []);

  return (
    <>
      <section className='section'>
        <GardenPlants
          plants={plants}
          currentUser={currentUser}
          getPlants={getPlants}
        />
      </section>

      <section className='section'>
        <div className='columns'>
          <div className='column' />
          <div className='column is-one-third has-text-centered'>
            {plants.length === 0 && (
              <div className='margin-bottom'>There's nothing here!</div>
            )}
            <div>
              <Link to='/' className='button is-primary'>
                {!plants && <span>Search plants</span>}
                {plants && <span>Add more plants</span>}
              </Link>
            </div>
          </div>
          <div className='column' />
        </div>
      </section>
    </>
  );
};

export default Garden;
