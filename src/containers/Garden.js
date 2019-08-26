import React, {useEffect, useState} from 'react';
import {Link} from '@reach/router';
import axios from 'axios';
import GardenPlants from '../components/GardenPlants';

const Garden = ({currentUser}) => {
  const [plants, setPlants] = useState([]);

  const getPlants = userId => {
    axios
      .get(`/garden/${userId}`)
      .then(res => {
        if (res.status === 200 && res.data.data) {
          setPlants(res.data.data);
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getPlants(currentUser._id);
  }, [currentUser._id]);

  return (
    <>
      <header className='section columns no-bottom-padding'>
        <div className='column is-one-third'>
          <span className='icon has-text-success'>
            <i className='fas fa-check-square' />
          </span>
          <span className='is-size-7'>
            = Suitable for Hardiness Zone {currentUser.hardinessZone}
          </span>
          <br />
          <span className='icon has-text-danger'>
            <i className='fas fa-ban' />
          </span>
          <span className='is-size-7'>
            = Not suitable for Hardiness Zone {currentUser.hardinessZone}
          </span>
        </div>
        <div className='column is-one-third'>
          <h1 className='title has-text-centered'>Your Garden</h1>
        </div>
        <div className='column is-one-third'></div>
      </header>

      <section className='section has-text-centered'>
        {plants.length === 0 && (
          <div className='margin-bottom'>There's nothing here!</div>
        )}
        {plants.length > 0 && (
          <GardenPlants
            plants={plants}
            currentUser={currentUser}
            getPlants={getPlants}
          />
        )}
      </section>

      <section className='section'>
        <div className='columns'>
          <div className='column' />
          <div className='column is-one-third has-text-centered'>
            <div>
              <Link to='/' className='button is-primary'>
                {!plants && <span>Search plants</span>}
                {plants && <span>Add {plants.length > 0 && 'more'} plants</span>}
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
