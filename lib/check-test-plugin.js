'use strict';
const commandLineArgs = require('command-line-args');

class CheckTestPlugin {
  constructor() {
    this.optionDefinitions = [
      { name: 'text', alias: 't', type: String, multiple: false, defaultOption: false },
    ];
  }

  check(cl, cb) {
    const options = commandLineArgs(this.optionDefinitions, { argv: cl });
    return cb(null, { code: 0, msg: `CHECK_TEST: ${options.text}`});
  }
}

module.exports = function(data, host, options) {
  return {
    name: 'CHECK_TEST',
    plugin: new CheckTestPlugin(),
  };
};
