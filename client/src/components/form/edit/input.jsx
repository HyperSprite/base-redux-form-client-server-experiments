import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, ButtonGroup, Form, FormGroup } from 'react-bootstrap';
// eslint-disable-next-line
import * as actions from '../../../actions';

import validate from '../../auth/validate-user';
import asyncValidate from '../../../containers/async-validate';

const WizardInput = (props) => {
  const { content, formValues, handleSubmit, auxButton, auxButtonLabel, pristine, submitting, submitLabel } = props;

  const buttonSet = (
    <ButtonGroup className="edit-in-place form-right">
      <Button
        type="submit"
        bsStyle="primary"
        className="next"
        disabled={submitting}
      >
        {submitLabel}
      </Button>
      {(auxButtonLabel) ? (
        <Button
          type="button"
          bsStyle="info"
          className="previous"
          onClick={auxButton}
        >
          {auxButtonLabel}
        </Button>
        ) : null}
    </ButtonGroup>
  );

  return (
    <div className="form-container">
      <Form inline id={formValues.contentName} onSubmit={handleSubmit}>
        <FormGroup className="inline-next form-left">
          <Field
            // {...props}
            content={content}
            formValues={formValues}
            component={props.component}
            label={formValues.contentLabel}
            name={formValues.contentName}
            type={formValues.contentType}
            checked={formValues.content}
            shouldFocus
            addedComps={buttonSet}
          />
        </FormGroup>
      </Form>
    </div>
  );
};

export default reduxForm({
  // form: 'formdata',
  destroyOnUnmount: false,
  validate,
  asyncValidate,
  asyncBlurFields: ['userName'],
})(WizardInput);
