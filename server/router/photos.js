const router = require('express').Router();
const multer = require('multer');

const requireAuth = require('./require-auth');
const Photos = require('../controllers/photos');

const upload = multer({
  dest: 'images/',
  onFileUploadStart(file) {
    console.log(`${file.originalname} is starting ...`);
  },
}).single('files');

router.get('/test', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ test: 'Open' }));
});
router.get('/secret', requireAuth, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ secret: 'Authorized' }));
});

router.get('/user', requireAuth, Photos.user);
router.get('/', Photos.all);
router.get('/:id', Photos.one);
router.post('/', requireAuth, upload, Photos.create);
router.patch('/:id', requireAuth, Photos.patch);
router.get('/trash/user', requireAuth, Photos.userTrash);
router.delete('/trash/user', requireAuth, Photos.emptyTrash);

module.exports = router;
