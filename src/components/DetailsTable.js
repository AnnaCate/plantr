import React from 'react';
const titleCase = require('../utils/titleCase');

const DetailsTable = ({plantInView}) => {
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

  if (!plantInView) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <table className='table'>
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
            <th>plantInView next to</th>
            <td>{convertArray(plantInView, 'companions')}</td>
          </tr>
          <tr>
            <th>Don't plantInView next to</th>
            <td>{convertArray(plantInView, 'enemies')}</td>
          </tr>
          <tr>
            <th>Spacing between plantInViews</th>
            <td>{plantInView.spacingBtwnplantInViews_in} inches</td>
          </tr>
          <tr>
            <th>Spacing between rows</th>
            <td>{plantInView.spacingBtwnRows_in} inches</td>
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
            <th>TransplantInView</th>
            <td>{plantInView.transplantInView}</td>
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
    </>
  );
};

export default DetailsTable;
