'use strict';

const Service = require('egg').Service;

class MaterialService extends Service {
    /**
     * 保存文章
     * @param {*} playlod
     */
    async save(playlod) {
        this.ctx.model.Material.create(playlod);
    }

    async update(_id, playlod) {
        await this.ctx.model.Material.findByIdAndUpdate(_id, playlod);
    }
}

module.exports = MaterialService;