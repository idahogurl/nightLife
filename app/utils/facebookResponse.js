import axios from 'axios';
import onError from '../utils/onError';

export function processResponse(response) {
  const {
    id, first_name: displayName, name, email,
  } = response;

  const user = {
    facebook: id,
    displayName,
    name,
    email,
  };

  return axios.post('/auth/facebook', user);
}

export function handleError(error) {
  onError(error);
}
