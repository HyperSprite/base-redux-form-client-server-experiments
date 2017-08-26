import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import * as actions from '../../actions';
import Loading from '../form/loading';
// import Signin from './signin';
// import Signup from './signup';

const propTypes = {};

const ReduxModal = class ReduxModal extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    window.location.hash = '';
    this.props.toggleModal({
      modalTitle: '',
      modalType: Loading,
    });
  }

  render() {
    const { modal } = this.props;
    return (
      <Modal
        show={modal.modalShow}
        onHide={this.closeModal}
        bsSize={modal.modalSize}
        aria-labelledby={`Modal for ${modal.modalTitle}`}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">{modal.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <modal.modalType onRequestHide={this.closeModal} modal />
        </Modal.Body>
      </Modal>
    );
  }
};

ReduxModal.propTypes = propTypes;

function mapStateToProps(state) {
  const modal = state.page;
  if (!modal.modalShow) {
    modal.modalType = Loading;
    modal.modalTitle = '';
    modal.modalSize = 'small';
  }
  return {
    modal,
  };
}

export default connect(mapStateToProps, actions)(ReduxModal);
