const express = require('express');
const router = require('express').Router();
const multer = require('multer');
const passport = require('passport');

const upload = multer({
  dest: 'images/',
  onFileUploadStart(file) {
    console.log(file.originalname + ' is starting ...')
  },
}).single('files');
const Autocomplete = require('./../controllers/autocomplete');
const Photos = require('./../controllers/photos');

const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/test', requireAuth, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ test: 'Open' }));
});
router.get('/secret', requireAuth, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ secret: 'Authorized' }));
});

router.get('/autocomplete/user', requireAuth, Autocomplete.user);

router.get('/photos/user', requireAuth, Photos.user);
// router.get('/photos', requireAuth, Photos.all);
router.get('/photos/:id', requireAuth, Photos.one);
router.post('/photos', requireAuth, upload, Photos.create);
router.patch('/photos/:id', requireAuth, Photos.patch);
router.get('/photos/trash/user', requireAuth, Photos.userTrash);
router.delete('/photos/trash/user', requireAuth, Photos.emptyTrash);

module.exports = router;
