const Controller = require('egg').Controller;

class OAuthControoler extends Controller {
    async create() {
        const { ctx } = this;

        let post = ctx.request.body;
        try {
            await ctx.service.client.create(post);
            ctx.body = {
                code: 20000,
                message: "添加成功"
            };
        } catch (err) {
            ctx.body = {
                code: 50000,
                message: "添加失败"
            };
        }
    }

    async list() {
        const { ctx } = this;
        let post = ctx.request.body;
        try {
            let result = await ctx.service.client.get(post);
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
        let id = ctx.params.id;
        try {
            const result = await ctx.service.client.findOne(id);
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

    async delete() {
        const { ctx } = this;
        let id = ctx.params.id;

        try {
            const result = await ctx.service.client.delete(id);
            ctx.body = {
                code: 20000,
                message: "操作成功"
            }
        } catch (err) {
            ctx.body = {
                code: 50000,
                message: "操作失败"
            }
        }
    }

    async update() {
        const { ctx } = this;
        let id = ctx.params.id;
        let playlod = ctx.request.body;
        try {
            const result = await ctx.service.client.update(id, playlod);
            ctx.body = {
                code: 20000,
                message: "操作成功"
            }
        } catch (err) {
            ctx.body = {
                code: 50000,
                message: "操作失败"
            }
        }
    }
}

module.exports = OAuthControoler;













