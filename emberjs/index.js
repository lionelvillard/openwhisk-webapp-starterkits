/* eslint-env node */
'use strict';

module.exports = {
  name: 'openwhisk',

  isDevelopingAddon: function() {
    return false;
  },

  postBuild: function (results) {
    let fs = this.project.require('fs-extra');

    fs.copySync(__dirname + '/emberjsrouter.js', results.directory + '/emberjsrouter.js');
    fs.copySync(__dirname + '/wsk-package.json', results.directory + '/package.json');
  }
};
