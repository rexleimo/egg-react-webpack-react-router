const Controller = require('egg').Controller;

class RoleController extends Controller {
    async create() {
        const {ctx} = this;

        let playlod = ctx.request.body;

        let result = await ctx
            .service
            .role
            .create(playlod);

        if (result) {
            ctx.body = {
                code: 20000,
                message: "添加成功"
            }
        } else {
            ctx.body = {
                code: 50000,
                message: "添加失败"
            }
        }
    }

    async index() {
        const {ctx} = this;
        let playlod = ctx.request.body;
        let result = await ctx
            .service
            .role
            .index(playlod);

        ctx.body = {
            code: 20000,
            data: result
        }
    }

    async delete() {
        const {ctx} = this;
        let id = ctx.params.id;
        let result = await ctx.service.role.destroy(id);
    }

    async show() {
        const {ctx} = this;
        let id = ctx.params.id;
        let result = await ctx.service.role.findOne(id);
        if (!result) {
            ctx.throw(404, 'role not fond');
        } else {
            ctx.body = {
                code: 20000,
                data: result,
                message: "获取成功"
            };
        }
    }

    async update() {
        const {ctx} = this;
        let id = ctx.params.id;

        let result = await ctx.service.role.update(id, ctx.request.body);
        if (result) {
            ctx.body = {
                code: 20000,
                message: "修改成功"
            }
        } else {
            ctx.body = {
                code: 50000,
                message: "修改失败"
            }
        }
    }
}

module.exports = RoleController;





















