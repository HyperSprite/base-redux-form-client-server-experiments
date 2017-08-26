import React from 'react';
import PropTypes from 'prop-types';

import Static from '../static';

const propTypes = {
  setPage: PropTypes.func,
};

const userView = ({ content, formValues, setPage, thisPage }) => {

  const setPageFunc = thisPage ?
    () => setPage(thisPage) :
    null;

  return (
    <div onClick={setPageFunc} >
      <Static
        content={content}
        {...formValues}
      />
    </div>
  );
};

userView.propTypes = propTypes;

export default userView;
