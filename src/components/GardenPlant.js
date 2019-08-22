import React from 'react';
import {Link} from '@reach/router';
import axios from 'axios';

const GardenPlant = ({eachPlant, currentUser, getPlants}) => {
  const handleDelete = (objectId, plantName) => {
    const confirm = window.confirm(
      `Are you sure you want to remove ${plantName} from your garden? All of your notes about it will be lost forever.`
    );

    if (confirm) {
      axios
        .delete(`/garden/${objectId}`)
        .then(res => getPlants(currentUser._id))
        .catch(err => {
          console.log('Delete error: ');
          console.log(err);
        });
    }
  };

  return (
    <>
      <li key={eachPlant._id} className='column is-one-quarter'>
        <div className='card'>
          <div className='card-image'>
            <figure className='image is-4by3'>
              <img
                className='cover'
                alt={`${eachPlant.plant[0].commonName}`}
                src={require(`../images/${eachPlant.plant[0].images[0]}`)}
              />
            </figure>
          </div>

          <div className='card-content'>
            <div className='level is-mobile'>
              <div className='level-left'>
                <div className='level-item has-text-centered'>
                  <p className='title is-5'>{eachPlant.plant[0].commonName}</p>
                </div>
              </div>
              <div className='level-right'>
                <div className='level-item has-text-centered'>
                  <span className='icon has-text-success'>
                    <i className='fas fa-check-square' />
                  </span>
                  <span className='icon has-text-danger'>
                    <i className='fas fa-ban' />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <footer className='card-footer'>
            <Link to={`/your-garden/${eachPlant._id}`} className='card-footer-item'>
              See Details
            </Link>
            <p
              className='card-footer-item'
              onClick={() =>
                handleDelete(eachPlant._id, eachPlant.plant[0].commonName)
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
