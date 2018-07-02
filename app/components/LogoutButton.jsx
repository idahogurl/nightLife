import React from 'react';
import PropTypes from 'prop-types';
import FacebookButton from './FacebookButton';

const LogoutButton = function LogoutButton(props) {
  return (
    <FacebookButton onClick={props.onLogout}>
        Log Out
    </FacebookButton>
  );
};

LogoutButton.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default LogoutButton;
