import React from 'react';
import titleCase from '../utils/titleCase';
import convertArray from '../utils/convertArray';

const DetailsTable = ({plantInView}) => {
  return (
    <>
      {plantInView.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div className='column is-6'>
          <h1 className='subtitle'>
            <span role='img' aria-label='book emoji'>
              📖{' '}
            </span>{' '}
            Plant Information:
          </h1>
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
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default DetailsTable;
