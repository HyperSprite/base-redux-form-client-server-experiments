import React, { Component } from 'react';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';

import Signin from './signin';
import Signup from './signup';

const propTypes = {};

const AuthModal = class AuthModal extends Component {
  constructor() {
    super();
    this.state = { modalShow: false, signType: Signin };
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ modalShow: false });
  }

  render() {
    return (
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={() => this.setState({ modalShow: true, signType: Signin })}>
          Signin
        </Button>
        <Button bsStyle="primary" onClick={() => this.setState({ modalShow: true, signType: Signup })}>
          Signup
        </Button>
        <Modal {...this.props} show={this.state.modalShow} onHide={this.closeModal} bsSize="small" aria-labelledby="Signin">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-sm">Signin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <this.state.signType onRequestHide={this.closeModal} modal />
          </Modal.Body>
        </Modal>
      </ButtonToolbar>
    );
  }
};

AuthModal.propTypes = propTypes;

export default AuthModal;
