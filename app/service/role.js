const Service = require('egg').Service;

class RoleService extends Service {

    async create(playlod) {
        return await this.ctx.model.Roles.create(playlod);
    }

    async index(playlod) {
        const {currentPage, search} = playlod;
        let res = [];
        let count = 0;
        let skip = ((Number(currentPage || 1) - 1) * Number(10));

        if (search) {
            res = await this
                .ctx
                .model
                .Roles
                .find({
                    name: {
                        $regex: search
                    }
                })
                .populate('access')
                .skip(skip)
                .limit(10)
                .sort({createdAt: "-1"})
                .exec();
            count = await this
                .ctx
                .model
                .Roles
                .find({
                    name: {
                        $regex: search
                    }
                })
                .count({})
                .exec();
        } else {
            res = await this
                .ctx
                .model
                .Roles
                .find({})
                .populate('role')
                .skip(skip)
                .limit(10)
                .sort({createdAt: -1})
                .exec()
            count = await this
                .ctx
                .model
                .Roles
                .count({})
                .exec()
        }

        return {count: count, list: res, currentPage: Number(currentPage)};
    }

    async destroy(_id) {
        const {ctx} = this;
        const model = await this.ctx.service.role.findOne(_id);
        if (!model) {
            ctx.throw(404, 'role not fonud.');
        }
        return await this.ctx.model.Roles.findByIdAndRemove(_id);
    }

    async findOne(_id) {
        return await this.ctx.model.Roles.findById(_id);
    }

    async update(_id, playlod) {

        const model = await this.ctx.service.role.findOne(_id);
        if (!model) {
            this.ctx.throw(404, 'role not fonud.');
        }
        return await this.ctx.model.Roles.findByIdAndUpdate(_id, playlod);
    }

}

module.exports = RoleService;