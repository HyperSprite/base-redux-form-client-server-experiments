import React from 'react';
import PropTypes from 'prop-types';

import Static from './static';

const propTypes = {
  locType: PropTypes.string,
  locStreet: PropTypes.string,
  locStreet2: PropTypes.string,
  locCity: PropTypes.string,
  locState: PropTypes.string,
  locCountry: PropTypes.string,
  locZip: PropTypes.string,
};

const renderAddressStatic = ({ locType, locStreet, locStreet2, locCity, locState, locCountry, locZip }) => {
  let addrLineOne = '';
  let addrLineTwo = '';
  let addrLineThree = '';
  if (locStreet) addrLineOne = `${locStreet}`;
  if (locStreet2) addrLineOne += `, ${locStreet2}`;

  if (locCity) addrLineTwo += `${locCity}, `;
  if (locState) addrLineTwo += `${locState}, `;
    if (locZip) addrLineTwo += `${locZip} `;

  if (locCountry) addrLineThree += `${locCountry} `;

  if (locType && addrLineTwo) {
    return (
      <div className="static-list" >
        <div className="static-label inline">{locType}</div>
          <div className="static-txt">
            <div>{addrLineOne}</div>
            <div>{addrLineTwo}</div>
            <div>{addrLineThree}</div>
          </div>
      </div>
    );
  }
  return null;
};

renderAddressStatic.propTypes = propTypes;

export default renderAddressStatic;
