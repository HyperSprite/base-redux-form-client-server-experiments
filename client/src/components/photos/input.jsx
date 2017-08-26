import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  shouldFocus: PropTypes.bool,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object,
};

const defaultProps = {
  placeholder: '',
  shouldFocus: false,
  meta: null,
  label: '',
};

const renderInput = ({
  addedComps,
  input,
  label,
  placeholder,
  shouldFocus,
  type,
  meta: {
    asyncValidating,
    touched,
    error,
    warning,
  },
}) => (
  <div>
    <label className="edit-label" htmlFor={input} >
      {label}
    </label>
    <div>
      <input
        className={`form-control edit-txt ${asyncValidating ? 'async-validating' : ''}`}
        {...input}
        placeholder={placeholder}
        type={type}
        autoFocus={shouldFocus}
        onBlur={() => input.onBlur(input.value)}
      />
      {addedComps}
      {touched && (
        (error && <div className="form-error">{error}</div>) || (warning && <div className="form-warning">{warning}</div>)
      )}
    </div>
  </div>
);

renderInput.propTypes = propTypes;
renderInput.defaultProps = defaultProps;

export default renderInput;
