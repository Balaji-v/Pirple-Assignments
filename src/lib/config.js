var config = {};

config.staging = {
 'httpPort' : 9090,
 'httpsPort' : 9554,
 'envName' : "Staging"
}

config.production = {
  'httpPort' : 80,
  'httpsPort' : 443,
  'envName' : "Production"
}


var env = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';
var moduleToExport = typeof (config[env]) == 'object' ? config[env] : config.staging;

module.exports = moduleToExport;
