import React from 'react';

const Plant = props => {
  return (
    <li key={props.plant._id} className='column is-one-quarter'>
      <div className='card'>
        <div className='card-image'>
          <figure className='image is-4by3'>
            <img alt='img' src={require(`../images/${props.plant.images[0]}`)} />
          </figure>
        </div>

        <div className='card-content'>
          <div className='level is-mobile'>
            <div className='level-left'>
              <div className='level-item has-text-centered'>
                <p className='title is-5'>{props.plant.commonName}</p>
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
          <a href='#' className='card-footer-item'>
            See Details
          </a>
          <a href='#' className='card-footer-item'>
            Plant it!
          </a>
        </footer>
      </div>
    </li>
  );
};

export default Plant;
