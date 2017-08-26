import React from 'react';
import PropTypes from 'prop-types';

import Addresses from '../addresses';
import Input from '../input';
import PhoneNumber from '../phonenumber';

import EditInput from './input';
import EditArray from './array';
// import EditPhoneNumbers from './input-phoneNumbers';

const propTypes = {

};

const EditSwitch = (props) => {
  switch (props.formValues.componentType) {
    case 'Input':
      return <EditInput {...props} component={Input} />;
    case 'PhoneNumbers':
      return <EditArray {...props} options={props.formValues.contentOptions} component={PhoneNumber} />;
    case 'Addresses':
      return <EditArray {...props} options={props.formValues.contentOptions} component={Addresses} />;
    default:
      return null;
  }
};

EditSwitch.propTypes = propTypes;

export default EditSwitch;
