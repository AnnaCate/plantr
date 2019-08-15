import React from 'react';

const Footer = props => {
  return (
    <footer className='footer'>
      <div className='content has-text-centered'>
        <p>
          Made with{' '}
          <span role='img' aria-label='heart emoji'>
            ♥︎
          </span>{' '}
          by{' '}
          <a href='http://www.github.com/annacate' target='_blank'>
            Anna Fulton
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
