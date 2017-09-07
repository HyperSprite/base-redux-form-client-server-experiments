const router = require('express').Router();

const requireAuth = require('./require-auth');

const Autocomplete = require('../controllers/autocomplete');

router.get('/user', requireAuth, Autocomplete.user);

module.exports = router;
