'use strict';
let buildConfig = require('usaa-build-app');

// custom build settings can be passed in as a 2nd parameter to the buildConfig call
/*var buildSettings = {
    minimize: false,
    hotLoading: true,
    devtool: 'source-map',
    useExternals: false
};*/


let config = buildConfig();


// Overrides can go here, if needed
config.entry = ['react-hot-loader/patch', config.entry];
config.devServer.port = 8080;

module.exports = config;