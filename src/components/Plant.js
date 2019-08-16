import React from 'react';
import {Link} from '@reach/router';

const Plant = ({plant}) => {
  const handlePlantIt = plant => {
    // get plant name, in cases where a qualifier is listed after a comma
    const firstWord = plant.split(',').shift();
    const verb = firstWord.substr(firstWord.length - 1) === 's' ? 'were' : 'was';
    alert(`${plant} ${verb} added to Your Garden!`);
  };

  return (
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
          <Link to={`/plants/:${plant._id}`} className='card-footer-item'>
            See Details
          </Link>
          <p
            className='card-footer-item plant-it'
            onClick={() => handlePlantIt(plant.commonName)}>
            Plant it!
          </p>
        </footer>
      </div>
    </li>
  );
};

export default Plant;
