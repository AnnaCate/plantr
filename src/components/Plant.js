import React, {useState} from 'react';
import {Link} from '@reach/router';
import Modal from './Modal';

const Plant = ({plant, currentUser}) => {
  const [isActive, setIsActive] = useState('');

  // update `is-active` state for  modal
  const toggleActive = () => (isActive ? setIsActive('') : setIsActive('is-active'));

  const handlePlantIt = plant => {
    // get plant name, in cases where a qualifier is listed after a comma
    const firstWord = plant.split(',').shift();
    const verb = firstWord.substr(firstWord.length - 1) === 's' ? 'were' : 'was';
    const message = currentUser.loggedIn
      ? `${plant} ${verb} added to Your Garden!`
      : 'Please log in';
    alert(message);
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
              onClick={() => handlePlantIt(plant.commonName)}>
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
      />
    </>
  );
};

export default Plant;
