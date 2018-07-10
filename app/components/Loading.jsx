import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent } from 'react-fela';
import classNames from 'classnames';

const Loading = function Loading(props) {
  const { container } = props;

  const style = container === 'page' ? {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 0 auto',
    marginTop: '1em',
    height: '50%',
  } : {};

  return (
    <FelaComponent style={style} render={container === 'page' ? 'div' : 'span'}>
      <i className={classNames('fa fa-spinner fa-spin', { 'fa-4x': container === 'page' })} />
    </FelaComponent>
  );
};

Loading.propTypes = {
  container: PropTypes.string.isRequired,
};

export default Loading;
