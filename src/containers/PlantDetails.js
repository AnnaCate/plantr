import React, {useEffect, useState} from 'react';
import {Link} from '@reach/router';
import axios from 'axios';
import titleCase from '../utils/titleCase';
import convertArray from '../utils/convertArray';

const PlantDetails = ({_id, currentUser}) => {
  const [plantWithNotes, setPlantWithNotes] = useState({
    variety: '',
    dateStartedIndoors: '',
    dateDirectSowed: '',
    numSeedsSowed: '',
    numGerminated: '',
    dateTransplanted: '',
    numTransplanted: '',
    observations: '',
  });
  const [plantInView, setPlantInView] = useState([]);

  useEffect(() => {
    axios
      .get(`/garden/details/${_id}`)
      .then(res => {
        setPlantInView(res.data.data.plant[0]);
        return res;
      })
      .then(res => {
        setPlantWithNotes(res.data.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = e => {
    setPlantWithNotes({
      ...plantWithNotes,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(plantWithNotes);
    axios({
      method: 'put',
      url: `/garden/details/${_id}`,
      data: {
        variety: plantWithNotes.variety,
        dateStartedIndoors: plantWithNotes.dateStartedIndoors,
        dateDirectSowed: plantWithNotes.dateDirectSowed,
        numSeedsSowed: plantWithNotes.numSeedsSowed,
        numGerminated: plantWithNotes.numGerminated,
        dateTransplanted: plantWithNotes.dateTransplanted,
        numTransplanted: plantWithNotes.numTransplanted,
        observations: plantWithNotes.observations,
      },
    }).then(res => console.log(res));
  };

  return (
    <>
      {plantInView.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <section className='section'>
          <div className='columns'>
            <div className='column'>
              <Link to='/your-garden'>
                <span role='img' aria-label='left arrow emoji'>
                  ⬅️{' '}
                </span>{' '}
                Go Back
              </Link>
            </div>
            <div className='column is-11'>
              <table className='table is-fullwidth'>
                <tbody>
                  <tr>
                    <th>Appropriate for USDA Hardiness Zones</th>
                    <td>{`${plantInView.usdaHardinessZones[0]} - ${
                      plantInView.usdaHardinessZones[
                        plantInView.usdaHardinessZones.length - 1
                      ]
                    }`}</td>
                  </tr>
                  <tr>
                    <th>Sun</th>
                    <td>{titleCase(plantInView.sunHrs)}</td>
                  </tr>
                  <tr>
                    <th>Soil</th>
                    <td>{titleCase(plantInView.soil)}</td>
                  </tr>
                  <tr>
                    <th>pH</th>
                    <td>
                      {plantInView.minPh} - {plantInView.maxPh}
                    </td>
                  </tr>
                  <tr>
                    <th>Plant next to</th>
                    <td>{convertArray(plantInView, 'companions')}</td>
                  </tr>
                  <tr>
                    <th>Don't plant next to</th>
                    <td>{convertArray(plantInView, 'enemies')}</td>
                  </tr>
                  <tr>
                    <th>Spacing between plants</th>
                    <td>
                      {plantInView.spacingBtwnPlants_in}{' '}
                      {plantInView.spacingBtwnPlants_in && 'inches'}
                    </td>
                  </tr>
                  <tr>
                    <th>Spacing between rows</th>
                    <td>
                      {plantInView.spacingBtwnRows_in}{' '}
                      {plantInView.spacingBtwnRows_in && 'inches'}
                    </td>
                  </tr>
                  <tr>
                    <th>Water</th>
                    <td>{titleCase(plantInView.water)}</td>
                  </tr>
                  <tr>
                    <th>Fertilizer</th>
                    <td>{plantInView.fertilizer}</td>
                  </tr>
                  <tr>
                    <th>Diseases</th>
                    <td>{convertArray(plantInView, 'diseases')}</td>
                  </tr>
                  <tr>
                    <th>Pests</th>
                    <td>{convertArray(plantInView, 'pests')}</td>
                  </tr>
                  <tr>
                    <th>Start seeds indoors</th>
                    <td>{titleCase(plantInView.startSeedsIndoors)}</td>
                  </tr>
                  <tr>
                    <th>Transplant</th>
                    <td>{plantInView.transplant}</td>
                  </tr>
                  <tr>
                    <th>Direct sow</th>
                    <td>{titleCase(plantInView.directSow)}</td>
                  </tr>
                  <tr>
                    <th>Days to germination</th>
                    <td>{plantInView.daysToGermination}</td>
                  </tr>
                  <tr>
                    <th>Days until harvest</th>
                    <td>{plantInView.daysToHarvest}</td>
                  </tr>
                  <tr>
                    <th>Other tips</th>
                    <td>{plantInView.otherCare}</td>
                  </tr>

                  <tr className='has-background-light'>
                    <th>Variety planted</th>
                    <td>
                      <input
                        className='input'
                        type='text'
                        name='variety'
                        value={plantWithNotes.variety || ''}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr className='has-background-light'>
                    <th>Date seeds started (indoors):</th>
                    <td>
                      <input
                        className='input'
                        type='text'
                        name='dateStartedIndoors'
                        value={plantWithNotes.dateStartedIndoors || ''}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr className='has-background-light'>
                    <th>Date seeds started (outdoors):</th>
                    <td>
                      <input
                        className='input'
                        type='text'
                        name='dateDirectSowed'
                        value={plantWithNotes.dateDirectSowed || ''}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr className='has-background-light'>
                    <th>Number of seeds sown:</th>
                    <td>
                      <input
                        className='input'
                        type='number'
                        name='numSeedsSowed'
                        value={plantWithNotes.numSeedsSowed || ''}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr className='has-background-light'>
                    <th>Number of seeds that germinated:</th>
                    <td>
                      <input
                        className='input'
                        type='number'
                        name='numGerminated'
                        value={plantWithNotes.numGerminated || ''}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr className='has-background-light'>
                    <th>Date transplanted:</th>
                    <td>
                      <input
                        className='input'
                        type='text'
                        name='dateTransplanted'
                        value={plantWithNotes.dateTransplanted || ''}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr className='has-background-light'>
                    <th>Number of plants transplanted:</th>
                    <td>
                      <input
                        className='input'
                        type='number'
                        name='numTransplanted'
                        value={plantWithNotes.numTransplanted || ''}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr className='has-background-light'>
                    <th>Other notes:</th>
                    <td>
                      <textarea
                        className='textarea'
                        name='observations'
                        value={plantWithNotes.observations || ''}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <input
                className='button'
                type='submit'
                value='Submit input'
                onClick={handleSubmit}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PlantDetails;
