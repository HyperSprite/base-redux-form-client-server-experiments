const qs = require('qs');
const mv = require('mv');
const v1 = require('uuid/v1');
const Jimp = require('jimp');

const Photos = require('../models/photos');
const hlpr = require('../lib/helpers');

const project = {
  userId: 1,
  photoTitle: 1,
  photoDescription: 1,
  photoPath: 1,
  photoName: 1,
  photoExtension: 1,
  photoTags: 1,
  photoDeleted: 1,
  photoOriginalName: 1,
  _id: 1,
};

// Returns all photos from user
exports.user = async (req, res) => {
  const userId = req.user._id.toString();
  const match = { $and: [
    { userId },
    { photoDeleted: { $ne: true } },
  ] };
  const result = await Photos.aggregate([
      { $match: match },
      { $sort: { updatedAt: 1 } },
      // { $project: project },
  ]);
  res.send(result);
};

// returns all photos from all users
exports.all = async (req, res) => {
  const match = { photoDeleted: { $ne: true } };
  const result = await Photos.aggregate([
      { $match: match },
      { $sort: { updatedAt: -1 } },
      // { $project: project },
  ]);
  hlpr.consLog([match, result, req.user]);
  res.send(result);
};

// returns one photo
exports.one = async (req, res) => {
  const match = { $and: [
    { _id: req.params.id },
    { photoDeleted: { $ne: true } },
  ] };
  const result = await Photos.aggregate([
      { $match: match },
      { $sort: { updatedAt: -1 } },
      // { $project: project },
  ]);
  hlpr.consLog([match, result, req.user]);
  res.send(result);
};

// Moves a photo fron temp to public
const photoMV = (from, too) => {
  return new Promise((resolve) => {
    mv(from, too, { mkdirp: true }, (err) => {
      if (err) resolve(err);
      resolve('success');
    });
  });
};

// takes a photo and creates a new thumbnail
const photoThumb = (fullPath, photoName, photoNameThumb) => {
  Jimp.read(`${fullPath}${photoName}`).then((tmpPhoto) => {
    tmpPhoto.contain(256, 256)
      .quality(60)
      .write(`${fullPath}${photoNameThumb}`);
  }).catch((err) => {
    console.error(err);
  });
};

// Creates an image in a temp dir
//   .then copies it to public/images/user/ with photoMv
//   .then makes a thumbnail with photoThumb
//   .then creats a new DB record
//    returns new photo info
exports.create = async (req, res) => {
  console.log('started photo upload');
  const uuid = v1();
  const body = req.body;
  const file = req.file;
  body.userId = req.user._id;
  body.photoOriginalName = file.originalname;
  body.photoExtension = file.mimetype.split('/').pop();
  body.photoName = `${uuid}.${body.photoExtension}`;
  body.photoNameThumb = `sml-${uuid}.${body.photoExtension}`;
  body.photoPath = `images/${body.userId}/`;
  body.fullPath = `${process.env.ROOT_PUBLIC}${body.photoPath}`;
  body.fileMove = await photoMV(file.path, `${body.fullPath}${body.photoName}`);
  if (body.fileMove === 'success') {
    photoThumb(body.fullPath, body.photoName, body.photoNameThumb);
  }
  const result = await Photos.create(body);
  hlpr.consLog(['photo.create', body, result]);
  res.send(result);
};

// Marks a photo as deleted, does not delete.
exports.patch = async (req, res) => {
  const result = await Photos.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body);
  res.send(result);
};

// Returns all photos from user
exports.userTrash = async (req, res) => {
  const userId = req.user._id.toString();
  const match = { $and: [
    { userId },
    { photoDeleted: true },
  ] };
  const result = await Photos.aggregate([
      { $match: match },
      { $sort: { updatedAt: -1 } },
      // { $project: project },
  ]);
  hlpr.consLog(['userTrash', result]);
  res.send(result);
};

// undeletes a photo
exports.undelete = async (req, res) => {
  const result = await Photos.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, { photoDeleted: false });
  res.send(result);
};

// actually deletes photos
exports.emptyTrash = async (req, res) => {
  const result = await Photos.findOneAndRemove({ _id: req.params.id, userId: req.user._id });
  res.send(result);
};
