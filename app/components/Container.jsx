import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent } from 'react-fela';


const Container = function Container(props) {
  const style = {
    backgroundColor: props.backgroundColor,
    padding: '1em',
    width: props.width,
  };
  return (
    <FelaComponent render={() => (
      <div className="container" style={style}>
        {props.children}
      </div>)
      }
    />);
};

Container.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  backgroundColor: PropTypes.string,
  width: PropTypes.string,
};

Container.defaultProps = {
  backgroundColor: 'transparent !important',
  width: '80%',
};

export default Container;
