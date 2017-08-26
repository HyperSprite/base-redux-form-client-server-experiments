import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string.isRequired,
}

const Label = ({ text }) => (
  <label className="static-label" >{text}</label>
);

Label.propTypes = propTypes;

export default Label;
