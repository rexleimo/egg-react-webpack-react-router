'use strict';

// had enabled by egg exports.static = true;
const path = require('path');
exports.static = true;

exports.mongoose = {
    enable: true,
    package: 'egg-mongoose'
};

exports.oAuth2Server = {
    enable: true,
    package: "egg-oauth2-server"
}

exports.bcrypt = {
    enable: true,
    package: "egg-bcrypt"
}

exports.view = {
    enable: true,
    package: 'egg-view',
}

exports.ejs = {
    enable: true,
    package: 'egg-view-ejs',
};

exports.wechatApi = {
    enable: true,
    path: path.join(__dirname, '../plugin/egg-wechat-api'),
};