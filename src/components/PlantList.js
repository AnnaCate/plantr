import React from 'react';
import Plant from './Plant';

const PlantList = ({plants, currentUser}) => {
  return (
    <div className='container'>
      <div className='columns is-multiline is-centered'>
        {plants
          // map over plants to return cards
          .map(plant => (
            <Plant plant={plant} key={plant._id} currentUser={currentUser} />
          ))}
      </div>
    </div>
  );
};

export default PlantList;
