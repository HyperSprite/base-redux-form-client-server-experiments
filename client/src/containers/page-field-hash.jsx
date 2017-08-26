import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function pageHash(FunctionalFormElement) {
  return class PageFieldHash extends Component {
    constructor(props) {
      super(props);
      this.state = {
        locationHash: '',
      };
    }
    componentDidMount() {
      console.log(this.props);
      window.location.hash = this.props.formValues.contentName;
    }
    render() {
      return <FunctionalFormElement {...this.props} />;
    }
  };
}
