import React, {useEffect, useState} from 'react';
import {Link} from '@reach/router';
import axios from 'axios';
import titleCase from '../utils/titleCase';

const PlantDetails = ({_id, currentUser}) => {
  const [plantWithNotes, setPlantWithNotes] = useState({
    variety: '',
    dateStartedIndoors: null,
    dateDirectSowed: null,
    numSeedsSowed: null,
    numGerminated: null,
    dateTransplanted: null,
    numTransplanted: null,
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

  const convertArray = (obj, prop) => {
    const array = obj[prop];
    const conjunction = prop === 'enemies' ? 'or' : 'and';
    if (!array) return '';
    if (array.length === 1) return titleCase(array[0]);
    if (array.length === 2)
      return `${titleCase(array[0])} ${conjunction} ${array[1].toLowerCase()}`;
    const middle = array
      .slice(1, -1)
      .map(item => item.toLowerCase())
      .join(', ');
    return `${titleCase(array[0])}, ${middle}, ${conjunction} ${
      array[array.length - 1]
    }`;
  };

  const handleChange = e => {
    setPlantWithNotes({
      ...plantWithNotes,
      [e.target.name]: e.target.value,
    });
    console.log(plantWithNotes);
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
                        type='date'
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
                        type='date'
                        name='dateDirectSowed'
                        value={plantWithNotes.dateDirectSowed || ''}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr className='has-background-light'>
                    <th>Number of seeds sown:</th>
                    <td>
                      <input className='input' type='number' />
                    </td>
                  </tr>
                  <tr className='has-background-light'>
                    <th>Number of seeds that germinated:</th>
                    <td>
                      <input className='input' type='number' />
                    </td>
                  </tr>
                  <tr className='has-background-light'>
                    <th>Date transplanted:</th>
                    <td>
                      <input className='input' type='date' />
                    </td>
                  </tr>
                  <tr className='has-background-light'>
                    <th>Number of plants transplanted:</th>
                    <td>
                      <input className='input' type='number' />
                    </td>
                  </tr>
                  <tr className='has-background-light'>
                    <th>Other notes:</th>
                    <td>
                      <textarea className='textarea' />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PlantDetails;
