'use strict';

const path = require('path');

module.exports = appInfo => {
    const config = exports = {
        auth: {
            enable: true,
            match(ctx) {
                // 只有 api 才开启
                const reg = /api/i;     // 包含api
                const regExcept = /oauth2/i     // 不包含users/login接口
                return reg.test(ctx.request.path) && !regExcept.test(ctx.request.path)
            },
            secret: 'shared-secret'
        }
    };


    const dir = [path.join(appInfo.baseDir, 'app/public')];

    config.static = {
        dir
    }

    config.view = {
        mapping: {
            '.ejs': 'ejs'
        }
    }

    config.ejs = {};

    config.security = {
        csrf: {
            enable: false
        }
    }

    config.mongoose = {
        clients: {
            db1: {
                url: "mongodb://testuser:testpass@192.168.33.137:27017/mytestdatabase",
                //url: "mongodb://127.0.0.1:27017/mytestdatabase",
                options: {}
            }
        }
    };

    config.oAuth2Server = {
        debug: true,
        grants: ['password', 'authorization_code', 'refresh_token']
    };

    config.bcrypt = {
        saltRounds: 10
    };

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1524993935931_9352';

    config.bodyParser = {
        jsonLimit: '5mb',
        formLimit: '6mb',
    }

    // add your config here
    config.middleware = ['historyFallback', 'auth'];

    //assets 
    config.assets = {
        publicPath: "/public/",
    }

    config.wechatApi = {
        appId: 'wxcfbf25675724d3bb',
        appSecret: 'd4acd4ef903a9a4d74d8bb71c5de8110',
    };

    return config;
};
