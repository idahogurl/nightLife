import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent } from 'react-fela';


const CoverImage = function CoverImage(props) {
  const style = {
    backgroundSize: 'cover',
    width: '100%',
    backgroundImage: `url("${props.url}")`,
    backgroundPositionY: props.positionY,
    height: props.height,
  };

  return (
    <FelaComponent render={() => (<div style={style} />)} />);
};

CoverImage.propTypes = {
  url: PropTypes.string.isRequired,
  positionY: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default CoverImage;

