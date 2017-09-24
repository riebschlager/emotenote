const path = require('path');
const { remote } = require('electron');
const config = remote.getGlobal('config');
const app = angular.module('App', []);

app.config(function($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
    $compileProvider.commentDirectivesEnabled(false);
    $compileProvider.cssClassDirectivesEnabled(false);
});
