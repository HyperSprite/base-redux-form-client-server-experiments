const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

const ObjectId = mongoose.Schema.Types.ObjectId;

const Schema = mongoose.Schema;

const enumPhones = [
  'Direct',
  'Main',
  'Mobile',
  'Work',
  'Home',
  'Other',
];

const enumAddress = [
  'Home',
  'Office',
  'Other',
];

const userAddressSchema = new Schema({
  locType: { type: String, enum: enumAddress, default: 'Home' },
  locStreet: String,  // from user input
  locStreet2: String, // from user input
  locCity: String,  // from user input
  locState: String,  // from user input
  locCountry: String,  // from user input
  locZip: String,  // from user input
  geoFormattedAddress: String,
  geoCoordinates: { type: [Number], index: '2dsphere' }, // type: [lon,lat]
  geoLongitude: Number,
  geoLatitude: Number,
  geoLevel1Long: String,
  geoLevel2Long: String,
  geoStreetNumber: String,
  geoStreetName: String,
  geoCity: String,
  geoCountry: String,
  geoCountryCode: String,
  geoZipCode: String,
  geoProvider: String,
});

const userPhoneNumbers = new Schema({
  phoneType: { type: String, enum: enumPhones, default: 'Mobile' },
  phoneNumber: String,
});

const userSchema = new Schema({
  email: { type: String, lowercase: true },
  password: String,
  userName: String, // for posting
  accessToken: String,
  resourceState: Number,
  firstname: String,
  lastname: String,
  profileMedium: String,
  profile: String,
  locationPref: Boolean,
  premium: Boolean,
  datePreference: String,
  measurementPreference: String,
  weekStartDay: Number, // 0 - Sun, 1 - Mon...
  addresses: [userAddressSchema],
  phoneNumbers: [userPhoneNumbers],
},
  {
    timestamps: true,
  });

userSchema.pre('save', function userSchemaPre(next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function userSchemaCompPasswords(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);

    callback(null, isMatch);
  });
};

userSchema.plugin(findOrCreate);

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
