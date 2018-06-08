'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
    /**
     * 创建文章
     */
    async create() {
        const { ctx, service } = this;

        const post = ctx.request.body;
        post.created_at = new Date().getTime();

        const tags = post.tags;

        for (let i in tags) {
            await ctx.service.tags.create({
                name: tags[i],
                type: 'news',
                newNumber: 0,
                createdAt: new Date().getTime()
            });
        }

        post.tags = post.tags.join(',');

        await ctx.service.news.create(post);

        ctx.body = {
            code: 1,
            msg: "添加成功！"
        };
    }
    /**
     * 获取文章列表
     */
    async list() {
        const { ctx } = this;
        const playlod = ctx.request.body;
        try {
            const result = await ctx.service.news.getList(playlod);
            ctx.body = {
                code: 20000,
                message: "获取成功",
                data: result
            }
        } catch (err) {
            ctx.body = {
                code: 50000,
                message: "获取失败"
            }
        }
    }

    async find() {
        const { ctx } = this;
        const id = ctx.params.id;
        try {
            const result = await ctx.service.news.findOne(id);
            ctx.body = {
                code: 20000,
                message: "获取成功",
                data: result
            }
        } catch (err) {
            ctx.body = {
                code: 50000,
                message: err
            }
        }
    }

    async update() {
        const { ctx } = this;
        const id = ctx.params.id;

        const playlod = ctx.request.body;

        const tags = playlod.tags;

        for (let i in tags) {
            await ctx.service.tags.create({
                name: tags[i],
                type: 'news',
                newNumber: 0,
                createdAt: new Date().getTime()
            });
        }

        playlod.tags = playlod.tags.join(',');

        try {
            const result = await ctx.service.news.update(id, playlod);
            ctx.body = {
                code: 20000,
                message: "更新成功"
            }
        } catch (err) {
            ctx.body = {
                code: 50000,
                message: err
            }
        }

    }

    async destroy() {
        const { ctx } = this;
        const id = ctx.params.id;

        try {
            const result = await ctx.service.news.destroy(id);
            ctx.body = {
                code: 20000,
                message: "删除成功"
            }
        } catch (err) {
            ctx.body = {
                code: 50000,
                message: err
            }
        }
    }

}

module.exports = NewsController;
