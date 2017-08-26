import React from 'react';
import PropTypes from 'prop-types';

import Header from './header';
import AppModal from './form/modal';

const propTypes = {
  children: PropTypes.element.isRequired,
};

const App = props => (
  <div >
    <Header />
    <div className="site" >
      <div className="site-main container" >
        {props.children}
      </div>
      <AppModal />
    </div>
  </div>
);

App.propTypes = propTypes;

export default App;
