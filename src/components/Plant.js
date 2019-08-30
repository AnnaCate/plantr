import React, {useState} from 'react';
import Modal from './Modal';
import axios from 'axios';
import {navigate} from '@reach/router';

const Plant = ({plant, currentUser, getGardenPlants, gardenPlants}) => {
  const [isActive, setIsActive] = useState('');

  // update `is-active` state for  modal
  const toggleActive = () => (isActive ? setIsActive('') : setIsActive('is-active'));

  const handlePlantIt = async (commonName, plantId, userId) => {
    if (!currentUser.loggedIn) {
      navigate('/login');
    } else {
      try {
        const response = await axios.post('/garden/', {
          user: userId,
          plant: plantId,
        });
        if (!response.data.error) {
          const firstWord = commonName.split(',').shift();
          const verb =
            firstWord.substr(firstWord.length - 1) === 's' ? 'were' : 'was';
          alert(`${commonName} ${verb} added to Your Garden!`);
        } else {
          alert(response.data.error);
        }
        if (response) {
          getGardenPlants(userId);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const iconsVisibility = () => (currentUser.loggedIn ? '' : 'is-hidden');
  const suitable = () =>
    plant.usdaHardinessZones.includes(currentUser.hardinessZone) ? '' : 'is-hidden';

  const notSuitable = () =>
    plant.usdaHardinessZones.includes(currentUser.hardinessZone) ? 'is-hidden' : '';

  const checkIfPlanted = commonName => {
    if (gardenPlants.length > 0) {
      const gardenPlantNames = gardenPlants.map(plant => plant.plant[0].commonName);
      return gardenPlantNames.includes(commonName) ? (
        <span className='icon'>
          <i className='fas fa-check' />
        </span>
      ) : (
        <span>Plant it!</span>
      );
    }
    return <span>Plant it!</span>;
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
              <div className={`level-right ${iconsVisibility()}`}>
                <div className='level-item has-text-centered'>
                  <span className={`icon ${suitable()}`}>
                    <span role='img' aria-label='ok emoji' className='is-size-7'>
                      🆗
                    </span>
                  </span>
                  <span className={`icon has-text-danger ${notSuitable()}`}>
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
              {checkIfPlanted(plant.commonName)}
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
