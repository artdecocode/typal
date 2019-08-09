const $_lib_Type = require('./lib/Type');
const $_lib_get_links = require('./lib/get-links');
const $_lib_Property = require('./lib/Property');
const $_lib_Method = require('./lib/Method');
const $_lib = require('./lib');
const $_lib_parse = require('./lib/parse');

module.exports.Type = $_lib_Type
module.exports.getLinks = $_lib_get_links.getLinks
module.exports.Property = $_lib_Property
module.exports.Method = $_lib_Method
module.exports.getNameWithDefault = $_lib.getNameWithDefault
module.exports.parseFile = $_lib_parse