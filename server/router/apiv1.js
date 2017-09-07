const router = require('express').Router();

const requireAuth = require('./require-auth');
const AutocompleteRoutes = require('./autocomplete');
const PhotosRoutes = require('./photos');

router.get('/test', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ test: 'Open' }));
});
router.get('/secret', requireAuth, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ secret: 'Authorized' }));
});

router.use('/autocomplete', AutocompleteRoutes);
router.use('/photos', PhotosRoutes);

module.exports = router;
