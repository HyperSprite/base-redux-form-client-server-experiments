const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const photoSchema = new Schema({
  userId: String,
  photoTitle: String,
  photoDescription: String,
  photoPath: String,
  photoName: String,
  photoNameThumb: String,
  photoExtension: String,
  photoTags: [String],
  photoDeleted: Boolean,
  photoOriginalName: String,
},
  {
    timestamps: true,
  });

const PhotoSchema = mongoose.model('photo', photoSchema);

module.exports = PhotoSchema;
