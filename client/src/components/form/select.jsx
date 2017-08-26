import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  shouldFocus: PropTypes.bool,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  meta: PropTypes.object,
};

const defaultProps = {
  label: '',
}

const renderSelect = ({ input, label, options, placeholder, shouldFocus, type, meta: { touched, error, warning } }) => (
  <div>
    {!!label ? (
      <label
        htmlFor={input}
      >
        {label}
      </label>
    ) : null}
    <div>
      <select
        className="form-control"
        {...input}
        placeholder={placeholder}
        type={type}
        autoFocus={shouldFocus}
      >
        <option />
        {options.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      {touched && (
        (error && <div className="form-error">{error}</div>) || (warning && <div className="form-warning">{warning}</div>)
      )}
    </div>
  </div>
);

renderSelect.propTypes = propTypes;
renderSelect.defaultProps = defaultProps;

export default renderSelect;
