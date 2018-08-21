'use strict';
class NRPECheckPlugin {
  constructor(jnrpe) {
    this.jnrpe = jnrpe;

    this.details = {
      name: '_NRPE_CHECK',
      description: 'This plugin is executed when querying without specifying any command to be executed.',
      commandLine: '',
      exampleCommand: '',
      exampleInvocation: 'check_nrpe -2 --no-ssl -H 127.0.0.1 -p 5667',
    };
  }

  check(cb) {
    return cb(null, { code: 0, msg: `JNRPE ${this.jnrpe.getVersion()} Running on Node.js Version ${process.version}`});
  }
}

module.exports = function(data, host, options) {
  return {
    name: '_NRPE_CHECK',
    plugin: new NRPECheckPlugin(host),
  };
};
