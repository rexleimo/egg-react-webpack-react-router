'use strict';

const Service = require('egg').Service;
class NewsService extends Service {
    /**
     * 保存文章
     * @param {*} post 
     */
    async create(post) {
        this.ctx.model.News.create(post);
    }
    /**
     * 获取文章
     * @param {*} playlod 
     */
    async getList(playlod, options) {
        const result = await this.ctx.model.News.find(playlod, {}, options).select('_id title thumb digest created_at').exec();
        return result;
    }

    async getListCount(playlod) {
        const result = await this.ctx.model.News.find(playlod).count();
        return result;
    }

    async findOne(_id) {
        const result = await this.ctx.model.News.findById(_id);
        return result;
    }

    async update(_id, playlod) {
        const news = await this.findOne(_id);
        if (!news) {
            this.ctx.throw(404, 'news not found.');
        }

        return await this.ctx.model.News.findByIdAndUpdate(_id, playlod);
    }

    async destroy(_id) {
        const news = await this.findOne(_id);
        if (!news) {
            this.ctx.throw(404, 'news not found.');
        }
        return await this.ctx.model.News.findByIdAndRemove(_id);
    }
}

module.exports = NewsService;