import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  errorHeadline: PropTypes.string,
  errorMessage: PropTypes.string,
};

const renderAlert = (errorHeadline, errorMessage) => (
  <div className="alert alert-danger">
    <strong>{ errorHeadline }!</strong>
    <p>{ errorMessage }</p>
  </div>
);

renderAlert.propTypes = propTypes;

export default renderAlert;
