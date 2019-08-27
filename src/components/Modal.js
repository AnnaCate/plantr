import React from 'react';
import DetailsTable from './DetailsTable';

const Modal = ({plant, handlePlantIt, toggleActive, isActive, currentUser}) => {
  return (
    <div className={`modal ${isActive}`}>
      <div className='modal-background' onClick={toggleActive} />
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>{plant.commonName}</p>
          <button className='delete' aria-label='close' onClick={toggleActive} />
        </header>

        <section className='modal-card-body'>
          <DetailsTable plant={plant} />
        </section>

        <footer className='modal-card-foot'>
          <button
            className='button is-primary'
            onClick={() => {
              handlePlantIt(plant.commonName, plant._id, currentUser._id);
            }}>
            Plant it!
          </button>
          <button className='button' onClick={toggleActive}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
