const Controller = require('egg').Controller;

class UserController extends Controller {
    async create() {
        const { ctx, service } = this;
        const playlod = ctx.request.body;
        playlod.password = await ctx.genHash(playlod.password);
        try {
            const result = await service.user.create(playlod);
            ctx.body = {
                code: 20000,
                message: "操作成功"
            };
        } catch (err) {
            ctx.body = {
                code: 50000,
                message: "操作失败"
            };
        }
    }

    async list() {
        const { ctx } = this;
        const playlod = ctx.request.body;
        try {
            const result = await ctx.service.user.list();
            ctx.body = {
                code: 20000,
                message: "获取成功",
                data: result
            };
        } catch (err) {
            ctx.body = {
                code: 50000,
                message: "获取失败"
            };
        }
    }
}

module.exports = UserController;