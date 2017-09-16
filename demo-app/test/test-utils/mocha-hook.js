'use strict';
// Transpile all imports
require('babel-register');

// Disable imports of css & images
let noop = function() {};
require.extensions['.css'] = noop;
require.extensions['.png'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.jpg'] = noop;
