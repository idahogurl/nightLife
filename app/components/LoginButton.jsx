import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import FacebookButton from './FacebookButton';

const LoginButton = function LoginButton(props) {
  return (
    <FacebookLogin
      appId="323585701513857"
      callback={props.onLogin}
      render={({ isWorking, isLoading, onClick }) => (
        <FacebookButton onClick={onClick}>
          {isLoading || isWorking ? 'Loading ...' : 'Log in With Facebook'}
        </FacebookButton>
        )}
    />);
};

LoginButton.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginButton;
