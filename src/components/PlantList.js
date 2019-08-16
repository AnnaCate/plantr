import React from 'react';
import Plant from './Plant';

const PlantList = props => {
  return (
    <div className='container'>
      <div className='columns is-multiline is-centered'>
        {props.allPlants.map(plant => (
          <Plant plant={plant} key={plant._id} />
        ))}
      </div>
    </div>
  );
};

export default PlantList;
