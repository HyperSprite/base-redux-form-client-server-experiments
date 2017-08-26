import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Button } from 'react-bootstrap';

import Input from './input';
import Select from './select';

const propTypes = {
  fields: PropTypes.object,
  shouldFocus: PropTypes.bool,
};

const defaultProps = {
  shouldFocus: false,
};

const renderAddresses = ({ fields, shouldFocus, contentOptions }) => (
  <div>
    {fields.map((aD, index) =>
      <div
        key={`${aD.locStreet}`}
      >
        <div className="form-box">
          <Field
            inline
            name={`${aD}.locType`}
            type="text"
            component={Select}
            label="Type"
            options={contentOptions.type}
            shouldFocus
          />
          <Field
            name={`${aD}.locStreet`}
            type="text"
            component={Input}
            label="Street Address"
          />
          <Field
            name={`${aD}.locStreet2`}
            type="text"
            component={Input}
            label="Street Address, additional"
          />
          <Field
            name={`${aD}.locCity`}
            type="text"
            component={Input}
            label="City"
          />
          <Field
            name={`${aD}.locState`}
            type="text"
            component={Input}
            label="State"
          />
          <Field
            name={`${aD}.locCountry`}
            type="text"
            component={Input}
            label="Country"
          />
          <Field
            name={`${aD}.locZip`}
            type="text"
            component={Input}
            label="ZIP code"
          />
          <Button
            type="button"
            bsStyle="danger"
            onClick={() => fields.remove(index)}
          >
          delete
          </Button>
        </div>
      </div>,
    )}

      <Button
        type="button"
        onClick={() => fields.push()}
        autoFocus={shouldFocus}
      >
        Add Address
      </Button>

  </div>
);

renderAddresses.propTypes = propTypes;
renderAddresses.defaultProps = defaultProps;

export default renderAddresses;
