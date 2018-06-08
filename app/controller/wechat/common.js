const Controller = require('egg').Controller;

const nconf = require('nconf');
const path = require('path');

class WeChatCommon extends Controller {

    async accessToken() {
        this.ctx.body = await this.app.wechatApi.getMenu();
    }

    async getMaterials() {

        let type = this.ctx.params.type;
        let offset = this.ctx.params.offset || 0;
        let count = this.ctx.params.count || 10;

        list = await this.app.wechatApi.getMaterials(type, offset, count);
        list = JSON.parse(list);

        if (list.item.length > 0) {
            list.item.forEach(async (e, i) => {
                var tmp = {
                    media_id: e.media_id,
                    news_item: e.content.news_item,
                    create_time: e.content.create_time,
                    update_time: e.update_time,
                    is_wechat: 1
                };
                await this.ctx.service.material.save(tmp);
            })
        }

        this.ctx.body = {
            code: 20000,
            message: "获取成功",
            data: list
        };

    }

    async getLocalMaterials() {

        let type = this.ctx.request.body.type;
        let offset = this.ctx.request.body.offset || 0;
        let count = this.ctx.request.body.count || 10;

        var list = await this.ctx.model.Material.find({});

        this.ctx.body = {
            code: 20000,
            message: "获取成功",
            data: list
        };
    }

    async findone() {
        let id = this.ctx.params.id;
        let news = await this.ctx.model.Material.findById(id);
        this.ctx.body = {
            code: 20000,
            message: "获取成功",
            data: news
        };
    }

    /**
     * 保存图文消息素材库到本地数据库
     */
    async saveLocalMaterial() {
        var newslist = this.ctx.request.body;
        try {
            await this.ctx.service.material.save(newslist);
            this.ctx.body = {
                code: 20000,
                message: "添加成功"
            };
        } catch (err) {
            console.log(err);
            this.ctx.body = {
                code: 50000,
                message: "添加失败"
            };
        }

    }

    async uploadLocalMaterial() {
        var id = this.ctx.params.id;
        var newslist = this.ctx.request.body;

        newslist.update_time = Date.now();

        try {
            await this.ctx.service.material.update(id, newslist);
            this.ctx.body = {
                code: 20000,
                message: "编辑成功"
            };
        } catch (err) {
            this.ctx.body = {
                code: 50000,
                message: "编辑失败"
            };
        }

    }

}

module.exports = WeChatCommon;