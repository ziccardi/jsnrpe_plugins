'use strict';
const commandLineArgs = require('command-line-args');
const { execFile } = require('child_process');
const split = require('split-string');
const q = require('quote-unquote');

class CheckNativePlugin {
  constructor() {
    this.optionDefinitions = [
      { name: 'command', alias: 'c', type: String, multiple: false },
      { name: 'args', alias: 'a', type: String, multiple: false },
    ];

    this.details = {
      name: 'CHECK_NATIVE',
      description: 'A plugin to be used to execute external, executable, Nagios plugins',
      commandLine: '-c|--command <command> -a <args>',
      exampleCommand: '"check_disk" : { "plugin": "CHECK_NATIVE", "args":["-c", "/usr/local/sbin/check_disk", "-a", "$ARG1$"] }',
      exampleInvocation: 'check_nrpe -2 --no-ssl -H 127.0.0.1 -p 5667  -c check_disk -a "-w 10: -c :30 -p /tmp"',
    };
  }

  check(cl, cb) {
    const options = commandLineArgs(this.optionDefinitions, { argv: cl });

    var args = split(q.unquote(options.args), { separator: ' ' });

    execFile(options.command, args, (error, stdout, stderr) => {
      if (error) {
        if (Number.isInteger(error.code)) {
          return cb(null, { code: error.code, msg: `${stdout}`});
        } else {
          return cb(null, { code: 3, msg: `Unable to execute ${options.command}`});
        }
      }
      return cb(null, { code: 0, msg: `${stdout}`});
    });
  }
}

module.exports = function(data, host, options) {
  return {
    name: 'CHECK_NATIVE',
    plugin: new CheckNativePlugin(),
  };
};
