import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Button, Form, FormGroup, Glyphicon } from 'react-bootstrap';

import Input from './input';
import Label from './label';
import Select from './select';

const propTypes = {
  fields: PropTypes.object,
  shouldFocus: PropTypes.bool,
};

const defaultProps = {
  shouldFocus: false,
};

const renderPhoneNumbers = ({ fields, shouldFocus, contentOptions }) => (
  <div>
    <Label text="Phone Numbers" />
    {fields.map((pN, index) => {
      const addedComps = (
        <span>
          <FormGroup>
            <Field
              name={`${pN}.phoneType`}
              type="text"
              component={Select}
              options={contentOptions.type}

            />
          </FormGroup>
          <Button
            type="button"
            bsStyle="danger"
            onClick={() => fields.remove(index)}
          >
            <Glyphicon glyph="glyphicon glyphicon-trash" />
          </Button>
        </span>
      );

      return (<Form
        key={`${pN}.phoneNumber`}
        inline
      >

        <FormGroup controlId="formInlinePhoneNumber" >
          <Field
            name={`${pN}.phoneNumber`}
            type="text"
            component={Input}
            // label="Phone Number"
            addedComps={addedComps}
            shouldFocus
          />
        </FormGroup>


      </Form>)
    })}
    <div>
      <Button
        type="button"
        bsStyle="info"
        onClick={() => fields.push()}
        autoFocus={shouldFocus}
      >
        Add Another Phone Number
      </Button>
    </div>
  </div>
);

renderPhoneNumbers.propTypes = propTypes;
renderPhoneNumbers.defaultProps = defaultProps;

export default renderPhoneNumbers;
