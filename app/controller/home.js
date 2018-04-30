'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;

    await ctx.render('index.nj',{});
  }
}

module.exports = HomeController;
