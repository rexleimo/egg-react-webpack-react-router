const Service = require('egg').Service;

class AccessService extends Service {
    async create(post) {
        await this
            .ctx
            .model
            .Access
            .create(post);
    }

    async find() {
        return await this
            .ctx
            .model
            .Access
            .find({});
    }

    async findOne(id) {
        return await this
            .ctx
            .model
            .Access
            .findById(id);
    }

    async updateRoles(_id, payload) {
        const {ctx, service} = this;
        const role = await ctx
            .service
            .access
            .findOne(_id);
        if (!role) {
            ctx.throw(404, 'role not found');
        }

        return ctx
            .model
            .Access
            .findByIdAndUpdate(_id, payload);
    }

    async destroy(_id) {
        const {ctx, service} = this;
        const role = await ctx
            .service
            .access
            .findOne(_id);
        if (!role) {
            ctx.throw(404, 'role not found');
        }

        return ctx
            .model
            .Access
            .findByIdAndRemove(_id);

    }
}

module.exports = AccessService;