import React from 'react';
import {Link} from '@reach/router';
import axios from 'axios';

const GardenPlant = ({gardenPlant, currentUser, getPlants}) => {
  const handleDelete = (objectId, plantName) => {
    const confirm = window.confirm(
      `Are you sure you want to remove ${plantName} from your garden? All of your notes about it will be lost forever.`
    );

    if (confirm) {
      axios
        .delete(`/garden/${objectId}`)
        .then(res => console.log(res))
        .then(() => getPlants(currentUser._id))
        .catch(err => console.log(err));
    }
  };

  const suitable = () =>
    gardenPlant.plant[0].usdaHardinessZones.includes(currentUser.hardinessZone)
      ? ''
      : 'is-hidden';

  const notSuitable = () =>
    gardenPlant.plant[0].usdaHardinessZones.includes(currentUser.hardinessZone)
      ? 'is-hidden'
      : '';

  return (
    <>
      <li key={gardenPlant._id} className='column is-one-quarter'>
        <div className='card'>
          <div className='card-image'>
            <figure className='image is-4by3'>
              <img
                className='cover'
                alt={`${gardenPlant.plant[0].commonName}`}
                src={require(`../images/${gardenPlant.plant[0].images[0]}`)}
              />
            </figure>
          </div>

          <div className='card-content'>
            <div className='level is-mobile'>
              <div className='level-left'>
                <div className='level-item has-text-centered'>
                  <p className='title is-5'>{gardenPlant.plant[0].commonName}</p>
                </div>
              </div>
              <div className='level-right'>
                <div className='level-item has-text-centered'>
                  <span className={`icon has-text-success ${suitable()}`}>
                    <i className='fas fa-check-circle' />
                  </span>
                  <span className={`icon has-text-danger ${notSuitable()}`}>
                    <i className='fas fa-ban' />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <footer className='card-footer'>
            <Link
              to={`/your-garden/${gardenPlant._id}`}
              className='card-footer-item'>
              See Details
            </Link>
            <p
              className='card-footer-item'
              onClick={() =>
                handleDelete(gardenPlant._id, gardenPlant.plant[0].commonName)
              }>
              Remove
            </p>
          </footer>
        </div>
      </li>
    </>
  );
};

export default GardenPlant;
