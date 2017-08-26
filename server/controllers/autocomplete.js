const qs = require('qs');
const User = require('../models/user');
const hlpr = require('../lib/helpers');

// Returns array of case insensitve exact matchs, exclusive excludes current user
// /apiv1/autocomplete/user?lookupType=userName&lookupExact=true&exclusive=true&lookupValue=someusername
// Returns array of case insensitve, partial matches
// /apiv1/autocomplete/user?lookupType=userName&lookupValue=someusername
exports.user = async (req, res) => {
  const query = qs.parse(req.query);
  const lookupType = query.lookupType;
  const lookupValue = query.lookupExact ? `^${query.lookupValue}$` : query.lookupValue;
  const match = query.exclusive ?
    { _id: { $ne: req.user._id }, [lookupType]: { $regex: lookupValue, $options: 'i' } } :
    { [lookupType]: { $regex: lookupValue, $options: 'i' } };
  const project = { [lookupType]: 1, _id: 0 };
  const result = await User.aggregate([
      { $match: match },
      { $project: project },
  ]);
  hlpr.consLog([query, match, project, result.map(r => r[lookupType]), req.user]);
  res.send(result.map(r => r[lookupType]));
};
