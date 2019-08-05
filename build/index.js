const $_lib_Type = require('./lib/Type');
const $_lib_Property = require('./lib/Property');
const $_lib = require('./lib');
const $_lib_parse = require('./lib/parse');

module.exports.Type = $_lib_Type
module.exports.getLinks = $_lib_Type.getLinks
module.exports.Property = $_lib_Property
module.exports.getNameWithDefault = $_lib.getNameWithDefault
module.exports.parseFile = $_lib_parse