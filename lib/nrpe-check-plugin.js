class NRPECheckPlugin {
    constructor(jnrpe) {
        this.jnrpe = jnrpe;
    }

    check(cb) {
        return cb(null, { code : 0, msg : `JNRPE ${this.jnrpe.getVersion()} Running on Node.js Version ${process.version}`});
    }
}

module.exports = function(data, host, options) {
    return {
        name: "_NRPE_CHECK",
        plugin: new NRPECheckPlugin(host)
    }
}