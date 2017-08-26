import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { formValueSelector, reduxForm } from 'redux-form';
import { animateScroll } from 'react-scroll';
// eslint-disable-next-line
import * as actions from '../../actions';

import formValues from './form-values';
import Alert from '../form/alert';
import validate from './validate-user';
import asyncValidate from '../../containers/async-validate';

import ViewSwitch from '../form/view/switch';
import EditSwitch from '../form/edit/switch';
import EditPageLast from '../form/edit/page-last';

const relURL = '/auth/edituser';
const thisForm = 'userdata';
const selector = formValueSelector(thisForm);

const propTypes = {
  eventSelector: PropTypes.object.isRequired,
  errorMessage: PropTypes.object,
  fetchData: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func,
  pageTransitionFalse: PropTypes.func.isRequired,
  postForm: PropTypes.func.isRequired,
  transitionPage: PropTypes.bool,
};

const defaultProps = {
  errorMessage: undefined,
  transitionPage: false,
  form: thisForm,
};

let UserWizard = class UserWizard extends Component {
  constructor() {
    super();
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.cancelFormEdit = this.cancelFormEdit.bind(this);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    this.props.fetchData('auth/user');
  }

  componentWillUnmount() {
    this.props.pageTransitionFalse();
  }

  handleFormSubmit(formProps) {
    this.props.postForm(formProps, `${relURL}`, 'AUTH_EDIT_USER');
  }

  cancelFormEdit() {
    () => <Redirect to="/" />;
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
    animateScroll.scrollToBottom();
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  renderAlert() {
    const { errorMessage } = this.props;
    return (errorMessage) ? (
      Object.keys(errorMessage).map(key => errorMessage[key]).map(eM => Alert(eM.path, 'Opps', eM.message))
    ) : (
      null
    );
  }

  render() {
    const {
      eventSelector,
      handleSubmit,
      transitionPage,
    } = this.props;

    const {
      page,
    } = this.state;

    if (transitionPage) {
      return (
        <Redirect to="/user-profile" />
      );
    }

    return (
      <div className="" >
        <div className="col-md-3 col-sm-1" />
        <div className="form-main col-md-5 col-sm-10">
          <h1>User Profile Wizard</h1>
          {formValues.map((fV, i) => (
             page > i + 1 &&
            //  <ViewSwitch
            //    key={fV.contentName}
            //    content={eventSelector[fV.contentName]}
            //    formValues={fV}
            //  />
            <ViewSwitch
              key={`${fV.contentName}static`}
              content={eventSelector[fV.contentName]}
              formValues={fV}
              setPage={this.setPage}
              thisPage={i + 1}
            />
          ))}
          {formValues.map((fV, i) => (
            page === i + 1 &&
            <EditSwitch
              key={fV.contentName}
              form={this.props.form}
              formValues={fV}
              content={eventSelector[fV.contentName]}
              onSubmit={this.nextPage}
              submitLabel="Next"
              auxButton={page > 1 ? this.previousPage : false}
              auxButtonLabel={page > 1 ? 'Back' : false}
            />
          ))}
          { page === formValues.length + 1 &&
            <EditPageLast
              form={thisForm}
              key={'lastPage'}
              formValues={{ contentName: 'lastpage' }}
              auxButton={this.previousPage}
              auxButtonLabel="Back"
              onSubmit={handleSubmit(this.handleFormSubmit)}
            />}
          { this.renderAlert() }
        </div>
        <div className="col-md-4 col-sm-1" />
      </div>
    );
  }
};

function mapStateToProps(state) {
  const initialValues = state.auth.user;
  return {
    message: state.auth.message,
    transitionPage: state.page.transitionPage,
    // to add/change items, use the formValues.js file
    initialValues,
    eventSelector: selector(state, ...formValues.map(fV => fV.contentName)),
  };
}

UserWizard = reduxForm({
  enableReinitialize: true,
  validate,
})(UserWizard);

UserWizard.propTypes = propTypes;
UserWizard.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(UserWizard);
