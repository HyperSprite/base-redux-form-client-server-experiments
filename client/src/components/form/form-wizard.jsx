import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import { formValueSelector, reduxForm } from 'redux-form';
// eslint-disable-next-line
// import * as actions from '../../actions';

// import formValues from '../search/form-values';
import Alert from '../form/alert';
import validate from '../form/validate';

import ViewStatic from '../form/view/static';
import EditSwitch from '../form/edit/switch';
import EditPageLast from '../form/edit/page-last';

const relURL = '/apiv1/search';

const thisForm = 'searchform';

// const selector = formValueSelector(thisForm);

const propTypes = {
  eventSelector: PropTypes.object.isRequired,
  errorMessage: PropTypes.object,
  fetchData: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired,
  formValues: PropTypes.array.isRequired,
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

export default class FormWizard extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.cancelFormEdit = this.cancelFormEdit.bind(this);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    this.props.fetchData('apiv1/search');
  }

  componentWillUnmount() {
    this.props.pageTransitionFalse();
  }

  handleFormSubmit(formProps) {
    this.props.postForm(formProps, `${relURL}`, 'FETCH_SEARCH');
  }

  cancelFormEdit() {
    () => <Redirect to="/" />;
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
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
    const { eventSelector, formValues, handleSubmit, transitionPage } = this.props;
    const {
      page,
    } = this.state;

    if (transitionPage) {
      return (
        <Redirect to="/search-results" />
      );
    }

    return (
      <div className="" >
        <div className="col-md-3 col-sm-1" />
        <div className="form-main col-md-5 col-sm-10">
          <h1>Search</h1>
          {formValues.map((fV, i) => (
             page > i + 1 &&
             <ViewStatic
               key={fV.contentName}
               content={eventSelector[fV.contentName]}
               formValues={fV}
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
}

// function mapStateToProps(state, ownProps) {
//   console.log('ownProps', ownProps);
//   return {
//     message: state.auth.message,
//     transitionPage: state.page.transitionPage,
//     // to add/change items, use the formValues.js file
//     eventSelector: selector(state, ...formValues.map(fV => fV.contentName)),
//   };
// }
//
// FormWizard = reduxForm({
//   enableReinitialize: true,
//   validate,
// })(FormWizard);

FormWizard.propTypes = propTypes;
FormWizard.defaultProps = defaultProps;

// export default connect(mapStateToProps, actions)(FormWizard);
