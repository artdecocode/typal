const $_lib_Type = require('./lib/Type');
const $_lib_Property = require('./lib/Property');

       const getLink = (title) => {
  const l = title
    .replace(/<\/?code>/g, '')
    .replace(/<\/?strong>/g, '')
    .replace(/<br\/>/g, '')
    .replace(/&nbsp;/g, '')
    .replace(/[^\w-\d ]/g, '')
    .toLowerCase()
    .replace(/[, ]/g, '-')
  return l
}

module.exports.getLink = getLink
module.exports.Type = $_lib_Type
module.exports.Property = $_lib_Property
//# sourceMappingURL=index.js.map