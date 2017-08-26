import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Redirect, Link } from 'react-router-dom';
import { Button, ButtonGroup, Form, FormGroup } from 'react-bootstrap';

import { signinUser, ifToken } from '../../actions';
import validate from './../form/validate';
import Input from './../form/input';
import Alert from './../form/alert';

const propTypes = {
  authenticated: PropTypes.bool,
  handleSubmit: PropTypes.func,
  modal: PropTypes.bool,
  onRequestHide: PropTypes.func,
  signinUser: PropTypes.func,
  ifToken: PropTypes.func,
};

let Signin = class Signin extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSubmitSuccess = this.handleSubmitSuccess.bind(this);
  }

  componentDidUpdate() {
    if (this.props.modal && this.props.authenticated ) {
      this.handleSubmitSuccess();
    }
  }

  handleFormSubmit(formProps) {
    this.props.signinUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        Alert('Opps', this.props.errorMessage)
      );
    }
  }

  handleSubmitSuccess() {
    if (this.props.authenticated) {
      this.props.onRequestHide();
    }
  }

  render() {
    const { authenticated, handleSubmit, modal, pristine, reset, submitting } = this.props;

    if (authenticated) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <Form
        onSubmit={handleSubmit(this.handleFormSubmit)}
      >
        <FormGroup>
          <Field
            component={Input}
            label="Email:"
            name="email"
            type="email"
            placeholder="Type your email"
            shouldFocus={modal}
          />
        </FormGroup>
        <FormGroup>
          <Field
            component={Input}
            label="Password:"
            name="password"
            type="password"
            placeholder="Type a password"
          />
        </FormGroup>
        { this.renderAlert() }
        <ButtonGroup>
          <Button type="submit" bsStyle="primary" disabled={pristine || submitting}>Submit</Button>
          <Button type="button" bsStyle="info" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
        </ButtonGroup>
        {this.props.modal ? (
          null
        ) : (
          <span>
            {' or '}
            <Link to="/signup">
              {'Sign up!'}
            </Link>
          </span>
        )}
      </Form>
    );
  }
};

Signin.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error,
  };
}

Signin = reduxForm({
  form: 'signin',
  validate,
})(Signin);

export default Signin = connect(mapStateToProps, { signinUser, ifToken })(Signin);
