import React from 'react';
import { reduxForm } from 'redux-form';
import { Button, ButtonGroup, Form, FormGroup } from 'react-bootstrap';
// eslint-disable-next-line
import * as actions from '../../../actions';

import validate from '../../auth/validate-user';
import asyncValidate from '../../../containers/async-validate';

const UserWizardPageLast = (props) => {
  const { contentName, form, handleSubmit, pristine, submitting, auxButton, auxButtonLabel, reset } = props
  return (
    <Form id={contentName} onSubmit={handleSubmit}>
      <FormGroup className="inline-next form-left">
        {/* { renderAlert() } */}
        <ButtonGroup className="edit-in-place form-right">
          <Button
            type="submit"
            bsStyle="primary"
            className="next"
            disabled={submitting}
            autoFocus
          >
            Submit
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
          <Button
            bsStyle="info"
            className="previous"
            onClick={reset}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </FormGroup>
    </Form>
  );
};

export default reduxForm({
  destroyOnUnmount: false,
  validate,
  asyncValidate,
  // asyncBlurFields: ['userName'],
})(UserWizardPageLast);
