import React from 'react';
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
            <table className='table'>
              <tbody>
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
              </tbody>
            </table>
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
