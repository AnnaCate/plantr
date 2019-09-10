import React from 'react';

const IconLegend = ({currentUser}) => {
  return (
    <div>
      <span className='icon'>
        <span role='img' aria-label='ok emoji' className='is-size-6'>
          🆗
        </span>
      </span>
      <span className='is-size-7'>
        = Suitable for Hardiness Zone {currentUser.hardinessZone}
      </span>
      <br />
      <span className='icon has-text-danger'>
        <i className='fas fa-ban' />
      </span>
      <span className='is-size-7'>
        = Not suitable for Hardiness Zone {currentUser.hardinessZone}
      </span>
    </div>
  );
};

export default IconLegend;
