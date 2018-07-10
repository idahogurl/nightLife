import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent } from 'react-fela';
import classNames from 'classnames';

const Container = function Container(props) {
  const style = {
    backgroundColor: props.backgroundColor,
    padding: '1em',
    width: props.width,
  };
  return (
    <FelaComponent
      style={style}
      render={({ className }) => (
        <div className={classNames('container', className)}>
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
