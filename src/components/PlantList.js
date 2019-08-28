import React from 'react';
import Plant from './Plant';

const PlantList = ({plants, currentUser, gardenPlants, getGardenPlants}) => {
  return (
    <div className='container'>
      <div className='columns is-multiline is-centered'>
        {plants
          // map over plants to return cards
          .map(plant => (
            <Plant
              plant={plant}
              key={plant._id}
              currentUser={currentUser}
              getGardenPlants={getGardenPlants}
              gardenPlants={gardenPlants}
            />
          ))}
      </div>
    </div>
  );
};

export default PlantList;
