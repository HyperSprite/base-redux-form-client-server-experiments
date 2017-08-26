import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Jumbotron, Row } from 'react-bootstrap';

import * as actions from './../actions';
import ScrollIntoView from './../containers/scroll-into-view';

class Home extends Component {
  componentDidMount() {
    // this.props.setPageName('');
  }

  render() {
    return (
      <div className="main-flex-container">
        <ScrollIntoView
          id=""
          alignToTop
          headerHeight={60}
        />
        <div className="main-sidebar" />
        <div className="main">
          <Jumbotron className="jumbo-home">
            <h1>Redux Forms</h1>
            <p>This is an example of using Redux Form for both multi step forms (search) and form validation (Sign In and Sign Up)</p>
            <Row className="show-grid">
              <Col xs={6} md={5}><Link className="btn btn-lg btn-primary btn-block" to="/search">Search</Link></Col>
              <Col xsHidden md={2} className="space" />
              <Col xs={6} md={5}><Link className="btn btn-lg btn-primary btn-block" to="/about">About</Link></Col>
            </Row>
          </Jumbotron>
        </div>
        <div className="main-sidebar" />
      </div>
    );
  }
}

export default connect(null, actions)(Home);
