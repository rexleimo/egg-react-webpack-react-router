const assert = require('assert');

const WechatApi = require('co-wechat-api');
const nconf = require('nconf');
const path = require('path');

module.exports = app => {

    nconf.use('file', {
        file: path.join(app.baseDir, 'token.json'),
    });

    const { appId, appSecret } = app.config.wechatApi || {};

    assert(appId && appSecret, '[egg-wechat-api] Must set `appId` and `appSecret` in wechat-api\'s config');
    app.coreLogger.info('[egg-wechat-api] setup');

    async function getAccessToken() {
        try {
            let token = nconf.get('token');
            return token;
        } catch (error) {
            throw (error);
        }
    }

    async function saveAccessToken(token) {
        try {
            const _token = Object.assign({}, token);
            nconf.set('token', _token);
            nconf.save();
            return token;
        } catch (error) {
            throw (error);
        }
    }

    const api = new WechatApi(appId, appSecret, getAccessToken, saveAccessToken);

    app.wechatApi = api;
}