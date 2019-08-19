import React, {useState} from 'react';
const titleCase = require('../utils/titleCase');

const Modal = ({plant, handlePlantIt, toggleActive, isActive}) => {
  const convertArray = (obj, prop) => {
    const array = obj[prop];
    if (!array) return '';
    if (array.length === 1) return titleCase(array[0]);
    if (array.length === 2)
      return `${titleCase(array[0])} and ${array[1].toLowerCase()}`;
    const middle = array
      .slice(1, -1)
      .map(item => item.toLowerCase())
      .join(', ');
    return `${titleCase(array[0])}, ${middle}, and ${array[array.length - 1]}`;
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
              {convertArray(plant, 'companions')}
            </p>
            <p>
              <span className='subtitle is-5'>Don't plant next to: </span>
              {convertArray(plant, 'enemies')}
            </p>
            <p>
              <span className='subtitle is-5'>Spacing between plants: </span>
              {plant.spacingBtwnPlants_in} inches
            </p>
            <p>
              <span className='subtitle is-5'>Spacing between rows: </span>
              {plant.spacingBtwnPlants_in} inches
            </p>
            <p>
              <span className='subtitle is-5'>Water: </span>
              {titleCase(plant.water)}
            </p>
            <p>
              <span className='subtitle is-5'>Fertilizer: </span>
              {plant.fertilizer}
            </p>
            <p>
              <span className='subtitle is-5'>Diseases: </span>
              {convertArray(plant, 'diseases')}
            </p>
            <p>
              <span className='subtitle is-5'>Pests: </span>
              {convertArray(plant, 'pests')}
            </p>
            <p>
              <span className='subtitle is-5'>Start seeds indoors: </span>
              {titleCase(plant.startSeedsIndoors)}
            </p>
            <p>
              <span className='subtitle is-5'>Transplant: </span>
              {titleCase(plant.transplant)}
            </p>
            <p>
              <span className='subtitle is-5'>Direct sow: </span>
              {titleCase(plant.directSow)}
            </p>
            <p>
              <span className='subtitle is-5'>Days to germination: </span>
              {plant.daysToGermination}
            </p>
            <p>
              <span className='subtitle is-5'>Days until harvest: </span>
              {plant.daysToHarvest}
            </p>
            <p>
              <span className='subtitle is-5'>Other tips: </span>
              {titleCase(plant.otherCare)}
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
