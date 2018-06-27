import { User } from './models';

/**
 * Authentication Middleware
 *
 * Finds a user associated with a cookie. If cookie does not exist,
 * the request is unauthenticated.
 */
const getUser = async (req, res, next) => {
  if (req.signedCookies.token) {
    // cookie exists
    const [id] = req.signedCookies.token.split('|');
    const user = await User.findById(id);

    req.user = user;
  }
  next();
};

export default (req, res, next) => {
  getUser(req, res, next).then(() => {}).catch(next);
};
