import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  baseURL: PropTypes.string,
  content: PropTypes.any,
  contentLabel: PropTypes.string,
  contentOptions: PropTypes.array,
  contentType: PropTypes.string,
  contentAlt: PropTypes.string,
};

const renderContent = (content, contentType, contentAlt, baseURL, contentOptions) => {
  switch (contentType) {
    case 'html': {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    case 'img': {
      return <img src={content} alt={contentAlt} />;
    }
    case 'address': {
      if (contentAlt) {
        return <a href={`${baseURL}${contentAlt}`} target="new" className="url">{contentAlt}</a>;
      }
      let place = content.filter(item => !!item);
      place = place.join(', ');
      return <a href={`${baseURL}${place}`} target="new" className="url">{place}</a>;
    }
    case 'checkbox': {
      if (content === true || content === "true") {
        return (
          <span>
            {contentOptions[1]}
          </span>
        );
      }
      return (
        <span>
          {contentOptions[0]}
        </span>
      );
    }
    case 'url': {
      return (
        <div className="ellipsis">
          <a href={`${baseURL}${content}`} target="new" className="url" >{content}</a>
        </div>
      );
    }
    default:
      return content;
  }
};

const renderStatic = ({ baseURL, contentLabel, content, contentType, contentAlt, contentOptions }) => {
  if (content || contentType === 'checkbox') {
    return (
      <div className="static" >
        <div>
          <label className="static-label" htmlFor={content} >
            {contentLabel}
          </label>
        </div>
        <div className="static-txt" >
          {renderContent(content, contentType, contentAlt, baseURL, contentOptions)}
        </div>
      </div>
    );
  }
  return null;
};

renderStatic.propTypes = propTypes;

export default renderStatic;
