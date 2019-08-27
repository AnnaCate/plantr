import React from 'react';
import titleCase from '../utils/titleCase';
import convertArray from '../utils/convertArray';

const DetailsTable = ({plant}) => {
  return (
    <>
      {plant.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <table className='table is-fullwidth'>
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
              <td>
                {plant.spacingBtwnPlants_in} {plant.spacingBtwnPlants_in && 'inches'}
              </td>
            </tr>
            <tr>
              <th>Spacing between rows</th>
              <td>
                {plant.spacingBtwnRows_in} {plant.spacingBtwnRows_in && 'inches'}
              </td>
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
      )}
    </>
  );
};

export default DetailsTable;
