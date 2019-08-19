import React, {useState} from 'react';
import Modal from './Modal';
import axios from 'axios';
import {navigate} from '@reach/router';

const Plant = ({plant, currentUser}) => {
  const [isActive, setIsActive] = useState('');

  // update `is-active` state for  modal
  const toggleActive = () => (isActive ? setIsActive('') : setIsActive('is-active'));

  const handlePlantIt = (commonName, plantId, userId) => {
    !currentUser.loggedIn
      ? navigate('/login')
      : axios
          .post('/garden/', {
            user: userId,
            plant: plantId,
          })
          .then(response => {
            console.log(response);
            if (!response.data.error) {
              // get plant name, in cases where a qualifier is listed after a comma
              const firstWord = commonName.split(',').shift();
              const verb =
                firstWord.substr(firstWord.length - 1) === 's' ? 'were' : 'was';
              alert(`${commonName} ${verb} added to Your Garden!`);
            } else {
              alert(response.data.error);
            }
          })
          .catch(err => {
            console.log('Planting error: ');
            console.log(err);
          });
  };

  return (
    <>
      <li key={plant._id} className='column is-one-quarter'>
        <div className='card'>
          <div className='card-image'>
            <figure className='image is-4by3'>
              <img
                className='cover'
                alt={`${plant.commonName}`}
                src={require(`../images/${plant.images[0]}`)}
              />
            </figure>
          </div>

          <div className='card-content'>
            <div className='level is-mobile'>
              <div className='level-left'>
                <div className='level-item has-text-centered'>
                  <p className='title is-5'>{plant.commonName}</p>
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
            <p className='card-footer-item' onClick={toggleActive}>
              See Details
            </p>
            <p
              className='card-footer-item'
              onClick={() =>
                handlePlantIt(plant.commonName, plant._id, currentUser._id)
              }>
              Plant it!
            </p>
          </footer>
        </div>
      </li>

      <Modal
        plant={plant}
        handlePlantIt={handlePlantIt}
        toggleActive={toggleActive}
        isActive={isActive}
        currentUser={currentUser}
      />
    </>
  );
};

export default Plant;
