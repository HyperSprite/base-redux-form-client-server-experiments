// Rename this file to config.js and randomize the secret string add your own api keys

const hlpr = require('./lib/helpers');

const config = {
  mongoconnect: {
    dev: 'mongodb://localhost/frugalpharma-dev',
    prod: 'YOUR_OWN_PROD_CONNECTION',
  },
  AUTH_SECRET: 'YOUR_AUTH_SECRET',  // Needed for bcrypt
  CERT: 'false', // For production certs example, Heroku CERT = true
  GOOGLE_MAPS: 'GOOGLE_MAPS_KEY',
  LOGGING: 'false', // turns on hlpr.consLog can be used in prod if needed.
  OPEN_WEATHER_MAP: 'OPEN_WEATHER_MAP_KEY', // Not currently needed
  PORT: 4080,
  ROOT_URL: 'http://localhost:4080',
  SITE_PUBLIC: 'public', // static resources
  SITE_URL: '',
};

const localMongoURI = !hlpr.isProd() ?
  config.mongoconnect.dev :
  config.mongoconnect.prod;

exports.loadConfig = () => {
  process.env.AUTH_SECRET = process.env.AUTH_SECRET || config.AUTH_SECRET;
  process.env.CERT = process.env.CERT || config.CERT;
  process.env.GOOGLE_MAPS = process.env.GOOGLE_MAPS || config.GOOGLE_MAPS;
  process.env.MONGODB_URI = process.env.MONGODB_URI || localMongoURI;
  process.env.LOGGING = process.env.LOGGING || config.LOGGING;
  process.env.OPEN_WEATHER_MAP = process.env.OPEN_WEATHER_MAP || config.OPEN_WEATHER_MAP;
  process.env.PORT = process.env.PORT || config.PORT;
  process.env.ROOT_URL = process.env.ROOT_URL || config.ROOT_URL;
  process.env.SITE_PUBLIC = process.env.SITE_PUBLIC || config.SITE_PUBLIC;
  process.env.SITE_URL = process.env.SITE_URL || config.SITE_URL;
};
