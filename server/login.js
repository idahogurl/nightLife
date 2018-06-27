import uuid from 'uuid/v4';
import { User } from './models';

export default async function processLogin(req, res, next) {
  try {
    const {
      facebook: id, displayName, name, email,
    } = req.body;

    const token = Math.random().toString(36).substr(2, 100);
    let user = await User.findOne({ where: { id } });

    if (!user) {
      user = await User.create({
        id,
        displayName,
        name,
        email,
      });
    }

    res.cookie('token', `${user.id}|${token}`, { signed: true, httpOnly: true });
    res.redirect(302, '/');
    next();
  } catch (err) {
    next(err);
  }
}
