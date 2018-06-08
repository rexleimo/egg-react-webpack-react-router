'use strict';

const Service = require('egg').Service;
class TagsService extends Service {
    //保存文章
    async create(post) {
        this
            .ctx
            .model
            .Tags
            .create(post);
    }
}

module.exports = TagsService;