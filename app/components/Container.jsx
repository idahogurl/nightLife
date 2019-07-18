import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent } from 'react-fela';
import classNames from 'classnames';

const Container = function Container(props) {
  const style = {
    backgroundColor: props.backgroundColor,
    width: props.width,
  };
  return (
    <FelaComponent
      style={style}
      render={({ className }) => (
        <div className={classNames('container p-1', className)}>{props.children}</div>
      )}
    />
  );
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
