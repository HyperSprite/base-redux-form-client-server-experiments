import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap'
// eslint-disable-next-line
import * as actions from '../actions';

import Signin from './auth/signin';
import Signup from './auth/signup';

class Header extends Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
  }

  state = {
    navExpanded: false,
  }

  openModal(options) {
    this.props.toggleModal(options);
  }

  setNavExpanded(expanded) {
    this.setState({ navExpanded: expanded });
  }

  toggleNav(option) {
    if (option) {
      this.setState({ navExpanded: !this.state.navExpanded });
    } else {
      this.setState({ navExpanded: false });
    }
  }

  renderLinks() {
    return this.props.authenticated ? (
      [
        <li className="nav-item" key={'Photos'}>
          <Link to="/user-photos">Photos</Link>
        </li>,
        <li className="nav-item" key={'Profile'}>
          <Link to="/user-profile">Profile</Link>
        </li>,
        <li className="nav-item" key={'Signout'}>
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>,
        // <li className="nav-item" key={'UserWiz'} >
        //   <Link to="/user-wizard">User Wizard</Link>
        // </li>,
      ]
    ) : (
      [
        <li className="nav-item" key={'Signin'}>
          <a
            href="#signin-modal"
            className="nav-link"
            onClick={() => this.openModal({
              modalTitle: 'Sign In',
              modalType: Signin,
              modalSize: 'small',
            })}
          >
            Sign In
          </a>
        </li>,
        <li className="nav-item" key={'Signup'}>
          <a
            href="#signin-modal"
            className="nav-link"
            onClick={() => this.openModal({
              modalTitle: 'Sign Up',
              modalType: Signup,
              modalSize: 'small',
            })}
          >
            Sign Up
          </a>
        </li>,
      ]
    );
  }
// TODO fix navbar onClick
  render() {
    return (
      <div>
        <Navbar
          inverse
          fluid
          fixedTop
          onToggle={() => this.setNavExpanded}
          expanded={this.state.navExpanded}
        >
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" onClick={() => this.toggleNav()}>Base CMS</Link>
            </Navbar.Brand>
            <Navbar.Toggle onClick={() => this.toggleNav(true)} />
          </Navbar.Header>
          <div className="nav-flex-display" >
            <div className="nav-flex-sidebar" />
            <div className="nav-flex-main" >
              <Navbar.Collapse onClick={() => this.toggleNav(true)} >
                <ul className="nav navbar-nav">
                  {/* <li className="nav-item" key={'Search'} >
                    <Link to="/search" >Search</Link>
                  </li> */}
                  {this.renderLinks()}
                </ul>
              </Navbar.Collapse>
            </div>
            <div className="nav-flex-sidebar" />
          </div>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, actions)(Header);
