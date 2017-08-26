import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
// import Dropzone from 'react-dropzone';
import { Button, ButtonGroup, Form, FormGroup } from 'react-bootstrap';

// eslint-disable-next-line
import * as actions from '../../actions';

import Alert from '../form/alert';
import DisplayPhotoSml from './display-photo-sml';
import InputDropzone from './input-dropzone';
import Input from './input';
// import validate from './validate';
// import asyncValidate from './async-validate';

const relURLUser = 'apiv1/photos/user';
const relURLUserTrash = 'apiv1/photos/trash/user';
const relURLTrash = 'apiv1/photos/trash';
const relURL = 'apiv1/photos';
const thisForm = 'photoForm';

const propTypes = {
  fetchPhotos: PropTypes.func.isRequired,
};

const defaultProps = {

};

let Photos = class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTrash: false,
    };
  }

  componentDidMount() {
    this.props.fetchPhotos(relURLUser, 'PHOTOS_FETCH');
  }

  handleFormSubmit = (formProps) => {
    const body = new FormData();
    Object.keys(formProps).forEach((key) => {
      if (key === 'files') {
        body.append(key, formProps[key][0]);
      } else {
        body.append(key, formProps[key]);
      }
    });
    this.props.postPhotos(body, relURL, 'PHOTOS_POST');
  }

  deletePhoto = (id, displayTrash) => {
    this.props.patchPhotos(id, relURL, { photoDeleted: !displayTrash }, 'PHOTOS_DELETE');
  }

  swapDisplayTrash = (displayTrash) => {
    this.props.fetchPhotos(displayTrash ? relURLUser : relURLUserTrash, 'PHOTOS_FETCH');
    this.setState({ displayTrash: !this.state.displayTrash });
  }

  render() {
    const { form, formData, submitting, handleSubmit, submitLabel, auxButton, auxButtonLabel, photos } = this.props;

    return (
      <div className="" >
        <div className="col-md-3 col-sm-1" />
        <div className="form-main col-md-5 col-sm-10">

          {this.state.displayTrash ? (
            <h2>Trashed Photos</h2>
          ) : (
            <h2>Photos</h2>
          )}
          <div style={{ margin: 20 }} >
            {photos.map(p => (
              <DisplayPhotoSml
                {...p}
                key={p._id}
                photoDelete={() => this.deletePhoto(p._id, this.state.displayTrash)}
                photoDeleteText={this.state.displayTrash ? 'Remove from Trash' : 'Move to Trash'}
              />

            ))}
          </div>
          {this.state.displayTrash ? (
            null
          ) : (
            <div>
              <Form onSubmit={handleSubmit(this.handleFormSubmit)} encType="multipart/form-data">
                <FormGroup className="inline-next form-left">
                  <Field
                    component={Input}
                    label="Title"
                    name="photoTitle"
                    type="text"
                    shouldFocus
                  />
                </FormGroup>
                <FormGroup className="inline-next form-left">
                  <Field
                    component={Input}
                    label="Description"
                    name="photoDescription"
                    type="text"
                  />
                </FormGroup>
                <FormGroup className="inline-next form-left">
                  <div>
                    <label htmlFor="files">Files</label>
                    <Field
                      name="files"
                      component={InputDropzone}
                    />
                  </div>
                </FormGroup>
                <ButtonGroup className="edit-in-place form-right">
                  <Button
                    type="submit"
                    bsStyle="primary"
                    className="next"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                  {(auxButtonLabel) ? (
                    <Button
                      type="button"
                      bsStyle="info"
                      className="previous"
                      onClick={auxButton}
                    >
                      {auxButtonLabel}
                    </Button>
                    ) : null}
                </ButtonGroup>
              </Form>
            </div>
          )}
          <Button
            bsStyle="info"
            className="previous"
            onClick={() => this.swapDisplayTrash(this.state.displayTrash)}
          >
            {this.state.displayTrash ? 'Exit Trash' : 'View Trash'}
          </Button>
        </div>
        <div className="col-md-4 col-sm-1" />
      </div>
    );
  }
};

Photos.propTypes = propTypes;
Photos.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    photos: state.photos.photos,
  };
}

Photos = reduxForm({
  form: thisForm,
  // destroyOnUnmount: false,
  // validate,
  // asyncValidate,
  // asyncBlurFields: ['userName'],
})(Photos);

export default connect(mapStateToProps, actions)(Photos);
