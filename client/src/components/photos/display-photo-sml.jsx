import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const propTypes = {
  photoDelete: PropTypes.func,
  photoDeleteText: PropTypes.string,
  photoDescription: PropTypes.string,
  photoName: PropTypes.string,
  photoNameThumb: PropTypes.string,
  photoPath: PropTypes.string,
  photoTitle: PropTypes.string,
};

const defaultProps = {
  photoDeleteText: '',
  photoDescription: '',
  photoName: '',
  photoNameThumb: '',
  photoPath: '',
  photoTitle: '',
};

const style = {
  displayPhotoSml: {
    margin: 20,
  },
};

const displayPhotoSml = props => (
  <div style={style.displayPhotoSml} >
    <a target="new" href={`${props.photoPath}${props.photoName}`}>
      <img src={`${props.photoPath}${props.photoNameThumb}`} alt={props.photoDescription} />
    </a><br />
    <h4>{props.photoTitle}</h4>
    <p>{props.photoDescription}</p>
    <Button
      bsStyle="info"
      className="previous"
      onClick={props.photoDelete}
    >
      {props.photoDeleteText}
    </Button>
  </div>
);

displayPhotoSml.propTypes = propTypes;
displayPhotoSml.defaultProps = defaultProps;

export default displayPhotoSml;
