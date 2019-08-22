import React from 'react';
import titleCase from '../utils/titleCase';
import convertArray from '../utils/convertArray';

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
              </tbody>
            </table>
          </div>
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
