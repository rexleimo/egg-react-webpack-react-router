const Service = require('egg').Service;

class ClientService extends Service {
    async create(playlod) {
        const { ctx } = this;
        const result = await ctx.model.Client.create(playlod);
    }

    async get(playlod) {
        const { ctx } = this;
        const result = await ctx.model.Client.find({});
        return result;
    }

    async findOne(_id) {
        const { ctx } = this;
        const result = await ctx.model.Client.findById(_id);
        return result;
    }

    async delete(_id) {
        const { ctx } = this;
        const client = await ctx.service.client.findOne(_id);
        if (!client) {
            ctx.throw(5000, 'client not fonud.');
        }
        return await ctx.model.Client.findByIdAndRemove(_id);
    }

    async update(_id, playlod) {
        const { ctx } = this;
        const client = await ctx.service.client.findOne(_id);
        if (!client) {
            ctx.throw(5000, 'client not fonud.');
        }
        return await ctx.model.Client.findByIdAndUpdate(_id, playlod);
    }
}

module.exports = ClientService;