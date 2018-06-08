const Controller = require('egg').Controller;

class IndexController extends Controller {
    /**
     * 网站首页
     */
    async index() {
        let q = this.ctx.query.q;

        let query = {};
        if (q) {
            query.title = { $regex: `${q}` };
        }

        const pageSize = 10;
        const options = { limit: pageSize, sort: '-created_at', skip: (((this.ctx.query.page || 1) - 1) * pageSize) };

        let news = await this.ctx.service.news.getList(query, options);
        let count = await this.ctx.service.news.getListCount(query);
        let pages = Math.floor((count + (pageSize - 1)) / pageSize);

        await this.ctx.render('home/index.ejs', {
            lists: news,
            current_page: this.ctx.query.page || 1,
            pages: pages,
            base_url: '/',
            q: q
        });
    }
    /**
     * 详情页
     */
    async post() {
        const { ctx } = this;
        let id = ctx.params.id;

        let model = await ctx.service.news.findOne(id);
        let count = await this.ctx.service.news.getListCount();

        const options = { limit: 5, sort: '-created_at', skip: Math.floor(Math.random() * count) };
        let news = await this.ctx.service.news.getList({}, options);
        
        await ctx.render('home/p.ejs', {
            data: model,
            lists: news,
            q: null
        });
    }
}

module.exports = IndexController;