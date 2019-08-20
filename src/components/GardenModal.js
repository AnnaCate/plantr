import React from 'react';
const titleCase = require('../utils/titleCase');

const GardenModal = ({eachPlant, handleDelete, toggleActive, isActive}) => {
  const plant = eachPlant.plant[0];

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
            <table className='table'>
              <tbody>
                <tr>
                  <th>Appropriate for USDA Hardiness Zones</th>
                  <td>{`${plant.usdaHardinessZones[0]} - ${
                    plant.usdaHardinessZones[plant.usdaHardinessZones.length - 1]
                  }`}</td>
                </tr>
                <tr>
                  <th>Sun</th>
                  <td>{titleCase(plant.sunHrs)}</td>
                </tr>
                <tr>
                  <th>Soil</th>
                  <td>{titleCase(plant.soil)}</td>
                </tr>
                <tr>
                  <th>pH</th>
                  <td>
                    {plant.minPh} - {plant.maxPh}
                  </td>
                </tr>
                <tr>
                  <th>Plant next to</th>
                  <td>{convertArray(plant, 'companions')}</td>
                </tr>
                <tr>
                  <th>Don't plant next to</th>
                  <td>{convertArray(plant, 'enemies')}</td>
                </tr>
                <tr>
                  <th>Spacing between plants</th>
                  <td>{plant.spacingBtwnPlants_in} inches</td>
                </tr>
                <tr>
                  <th>Spacing between rows</th>
                  <td>{plant.spacingBtwnRows_in} inches</td>
                </tr>
                <tr>
                  <th>Water</th>
                  <td>{titleCase(plant.water)}</td>
                </tr>
                <tr>
                  <th>Fertilizer</th>
                  <td>{plant.fertilizer}</td>
                </tr>
                <tr>
                  <th>Diseases</th>
                  <td>{convertArray(plant, 'diseases')}</td>
                </tr>
                <tr>
                  <th>Pests</th>
                  <td>{convertArray(plant, 'pests')}</td>
                </tr>
                <tr>
                  <th>Start seeds indoors</th>
                  <td>{titleCase(plant.startSeedsIndoors)}</td>
                </tr>
                <tr>
                  <th>Transplant</th>
                  <td>{plant.transplant}</td>
                </tr>
                <tr>
                  <th>Direct sow</th>
                  <td>{titleCase(plant.directSow)}</td>
                </tr>
                <tr>
                  <th>Days to germination</th>
                  <td>{plant.daysToGermination}</td>
                </tr>
                <tr>
                  <th>Days until harvest</th>
                  <td>{plant.daysToHarvest}</td>
                </tr>
                <tr>
                  <th>Other tips</th>
                  <td>{plant.otherCare}</td>
                </tr>

                <tr>
                  <th className='has-background-light'>Add Notes:</th>
                  <td className='has-background-light' />
                </tr>
                <tr>
                  <th>Variety planted:</th>
                  <td>
                    <input className='input' type='text' />
                  </td>
                </tr>
                <tr>
                  <th>Date seeds started (indoors):</th>
                  <td>
                    <input className='input' type='date' />
                  </td>
                </tr>
                <tr>
                  <th>Date seeds started (outdoors):</th>
                  <td>
                    <input className='input' type='date' />
                  </td>
                </tr>
                <tr>
                  <th>Number of seeds sown:</th>
                  <td>
                    <input className='input' type='number' />
                  </td>
                </tr>
                <tr>
                  <th>Number of seeds that germinated:</th>
                  <td>
                    <input className='input' type='number' />
                  </td>
                </tr>
                <tr>
                  <th>Date transplanted:</th>
                  <td>
                    <input className='input' type='date' />
                  </td>
                </tr>
                <tr>
                  <th>Number of plants transplanted:</th>
                  <td>
                    <input className='input' type='number' />
                  </td>
                </tr>
                <tr>
                  <th>Other notes:</th>
                  <td>
                    <textarea className='textarea' />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <footer className='modal-card-foot'>
          <button className='button is-primary'>
            {/* Change to 'Save' when editing */}
            Edit
          </button>
          <button className='button is-primary' onClick={toggleActive}>
            {/* Change to 'Cancel' when editing */}
            Close
          </button>
          <button className='button' onClick={() => handleDelete(eachPlant._id)}>
            Remove
          </button>
        </footer>
      </div>
    </div>
  );
};

export default GardenModal;
