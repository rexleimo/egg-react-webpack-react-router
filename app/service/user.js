const Service = require('egg').Service;

class UserService extends Service {
    async create(playlod) {
        const { ctx } = this;
        return await ctx.model.Users.create(playlod);
    }

    async list() {
        const { ctx } = this;
        return await ctx.model.Users.find({});
    }
}

module.exports = UserService;