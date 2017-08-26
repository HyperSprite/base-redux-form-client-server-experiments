import React from 'react';
import PropTypes from 'prop-types';

import Lable from '../label';
import StaticAddress from '../static-address';

const propTypes = {
  content: PropTypes.array,
  setPage: PropTypes.func,
  thisPage: PropTypes.number,
};

const staticAddresses = ({ content = [], setPage, thisPage, formValues }) => {

  const setPageFunc = thisPage ?
    () => setPage(thisPage) :
    null;

  const addressLabel = content.length === 1 ? 'Address' : 'Addresses';

  return (
    <div onClick={setPageFunc} >
      <Lable text={addressLabel} />
        {content.map(ad => (
          <div key={ad.locStreet} >
            <StaticAddress
              {...ad}
              options={formValues.contentOptions}
            />
          </div>
        ))}
    </div>
  );
};

staticAddresses.propTypes = propTypes;

export default staticAddresses;
