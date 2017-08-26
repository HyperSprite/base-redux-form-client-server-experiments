const jwt = require('jwt-simple');
const form = require('express-form');

const User = require('../models/user');
const hlpr = require('../lib/helpers');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  const newJWT = jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
  hlpr.consLog(['tokenForUser', newJWT]);
  return newJWT;
}

// Form validation middleware
exports.userForm = form(
  form.field('userName').array().custom(value => value.replace(/[^a-z0-9-_]/gi, '')) /* eslint comma-dangle: ["error", "never"] */
);

exports.signinError = (err, req, res, next) => {
  hlpr.consLog(['signin', `AUTH ERROR: Signin - Bad Email or Password @ ${req.ip}`]);
  return res.status(422).send({ error: 'Signin failed: Bad Email or Password.' });
};

exports.signin = (req, res, next) => {
  hlpr.consLog(['signin', `res.send signin token ${req.user}`]);
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    hlpr.consLog(['signup', 'AUTH ERROR: No email or password']);
    return res.status(422).send({ error: 'You must provide email and password!' });
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) { hlpr.consLog(['user.findOne err', err]); return next(err); }
    if (existingUser) {
      hlpr.consLog(['signup', 'AUTH ERROR: Email in use']);
      return res.status(422).send({ error: 'Email is in use!' });
    }
    const user = new User({
      email: email,
      password: password,
    });
    user.save((err) => {
      if (err) { hlpr.consLog(['user.save err', err]); return next(err); }
      hlpr.consLog(['signup', 'AUTH SUCCESS: Token Sent']);
      res.json({ token: tokenForUser(user) });
    });
  });
};

exports.edituser = (req, res, next) => {
  const rQB = req.body;
  const options = {
    new: true, projection: { password: 0 }
  }
  hlpr.consLog(['auth.edituser', req.body, req.user]);
  User.findByIdAndUpdate(req.user._id, rQB, options, (err, user) => {
    if (err || !user) {
      hlpr.consLog(['auth.edituser err', err]);
      res.status(401).send({ error: 'User not found' });
    }
    hlpr.consLog(['auth.edituser user', user]);
    const data = {
      type: 'AUTH_EDIT_USER',
      message: 'Informatoin Updated!',
      auth: {
        user: user
      }
    };
    res.send(data);
  });
};

exports.user = (req, res, next) => {
  User.findOne({ $or: [{ email: req.user.email }] }, {
    email: 1,
    userName: 1,
    accessToken: 1,
    resourceState: 1,
    firstname: 1,
    lastname: 1,
    profileMedium: 1,
    profile: 1,
    locationPref: 1,
    premium: 1,
    datePreference: 1,
    measurementPreference: 1,
    weekStartDay: 1, // 0 - Sun, 1 - Mon...
    addresses: 1,
    phoneNumbers: 1,
  }, (err, user) => {
    if (err) { return next(err); }
    if (user) {
      hlpr.consLog(['auth-user', 'AUTH USER: User found', user.email]);
      return res.json({ user: user });
    }
  });
};
