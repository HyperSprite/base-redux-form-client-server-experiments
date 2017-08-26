import React from 'react';
import PropTypes from 'prop-types';

import Label from '../label';
import StaticPhoneNumber from '../static-phonenumber';

const propTypes = {
  content: PropTypes.array,
  setPage: PropTypes.func,
  thisPage: PropTypes.number,
};

const staticPhoneNumbers = ({ content = [], setPage, thisPage, formValues }) => {

const phoneLabel = content.length === 1 ? 'Phone Number' : 'Phone Numbers';

  const setPageFunc = thisPage ?
    () => setPage(thisPage) :
    null;

  return (
    <div  onClick={setPageFunc} >
      <Label text={phoneLabel} />

        {content.map((pN) => {
          return (
            <div key={pN.phoneNumber} >
              <StaticPhoneNumber
                {...pN}
                options={formValues.contentOptions}
                // phoneType={pN.phoneType}
                // phoneNumber={pN.phoneNumber}
              />
            </div>
          );
        })}
    </div>
  );
};

staticPhoneNumbers.propTypes = propTypes;

export default staticPhoneNumbers;
