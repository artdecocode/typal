// src/index.js
/**
 * @param {_ns.Config} config
 */
function example(config = {}) {
  const { test } = config
}

// manually add the namespace and dependencies' imports
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('stream').Readable}
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types').Config} _ns.Config
 */