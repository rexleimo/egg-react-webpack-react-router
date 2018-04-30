'use strict';

const path = require('path');

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1524993935931_9352';

    // add your config here
    config.middleware = ['historyFallback'];

    const dir = [
        path.join(appInfo.baseDir, 'app/public')
    ];

    config.static = {
        dir,
    }

    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.nj': 'nunjucks',
        },
    }


    return config;
};
