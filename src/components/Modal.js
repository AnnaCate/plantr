import React, {useState} from 'react';
const titleCase = require('../utils/titleCase');

const Modal = ({plant, handlePlantIt, toggleActive, isActive}) => {
  const getPlantCompanions = () => {
    if (!plant.companions) {
      return '';
    } else if (plant.companions.length === 1) {
      return titleCase(plant.companions[0]);
    } else if (plant.companions.length === 2) {
      return `${titleCase(
        plant.companions[0]
      )} and ${plant.companions[1].toLowerCase()}`;
    } else {
      return 'More than 2';
    }
    const first = titleCase(plant.companions.shift());
    const last = plant.companions.pop();
    const middle = plant.companions
      .slice(1, -1)
      .map(item => item.toLowerCase())
      .join(', ');
    return `${first}, ${middle}and ${last}`;
  };

  return (
    <div className={`modal ${isActive}`}>
      <div className='modal-background' onClick={toggleActive} />
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>{plant.commonName}</p>
          <button className='delete' aria-label='close' onClick={toggleActive} />
        </header>

        <section className='modal-card-body'>
          <div className='modal-content'>
            {/* <figure className='image is-4by3'>
              <img
                className='cover'
                alt={`${plant.commonName}`}
                src={require(`../images/${plant.images[0]}`)}
              />
            </figure> */}
            <p>
              <span className='subtitle is-5'>Sun: </span>
              {titleCase(plant.sunHrs)}
            </p>
            <p>
              <span className='subtitle is-5'>Soil: </span>
              {titleCase(plant.soil)}
            </p>
            <p>
              <span className='subtitle is-5'>pH: </span>
              {plant.minPh} - {plant.maxPh}
            </p>
            <p>
              <span className='subtitle is-5'>Plant next to: </span>
              {getPlantCompanions()}
            </p>
          </div>
        </section>

        <footer className='modal-card-foot'>
          <button
            className='button is-primary'
            onClick={() => {
              handlePlantIt(plant.commonName);
              toggleActive();
            }}>
            Plant it!
          </button>
          <button className='button' onClick={toggleActive}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
