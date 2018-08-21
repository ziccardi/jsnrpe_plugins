'use strict';
const commandLineArgs = require('command-line-args');

class CheckTestPlugin {
  constructor() {
    this.optionDefinitions = [
      { name: 'text', alias: 't', type: String, multiple: false, defaultOption: false },
    ];

    this.details = {
      name: 'CHECK_TEST',
      description: 'A simple test plugin that just returns the received text',
      commandLine: '-t|--text <text>',
      exampleCommand: '"check_test" : { "plugin": "CHECK_TEST", "args":["-t", "$ARG1$"] }',
      exampleInvocation: 'check_nrpe -2 --no-ssl -H 127.0.0.1 -p 5667  -c check_test -a "hello world"',
    };
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
