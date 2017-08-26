const express = require('express');
const router = require('express').Router();
const passport = require('passport');

const Auth = require('./../controllers/authentication');
const passportService = require('./../services/passport');

// Auth middleware
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false, failWithError: true });

router.post('/signin', requireSignin, Auth.signin, Auth.signinError);
router.post('/signup', Auth.signup);
router.post('/edituser', requireAuth, Auth.userForm, Auth.edituser);

router.get('/user', requireAuth, Auth.user);

module.exports = router;
