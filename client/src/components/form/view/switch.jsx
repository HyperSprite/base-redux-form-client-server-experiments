import React from 'react';
import PropTypes from 'prop-types';

import Static from '../static';
import Address from '../static-address';
import PhoneNumber from '../static-phonenumber';

import ViewStatic from './static';
import ViewAddresses from './addresses';
import ViewPhoneNumbers from './phonenumbers';

const propTypes = {

};

const ViewSwitch = (props) => {
  switch (props.formValues.componentType) {
    case 'Input':
      return <ViewStatic {...props} component={Static} />;
    case 'PhoneNumbers':
      return <ViewPhoneNumbers {...props} component={PhoneNumber} />;
    case 'Addresses':
      return <ViewAddresses {...props} component={Address} />;
    default:
      return null;
  }
};

ViewSwitch.propTypes = propTypes;

export default ViewSwitch;
