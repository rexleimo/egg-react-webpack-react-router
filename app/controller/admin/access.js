'use strict';

const Controller = require('egg').Controller;

class AccessController extends Controller {

  async get() {
    const {ctx} = this;
    try {
      const result = await ctx
        .service
        .access
        .find({})
      ctx.body = {
        code: 20000,
        message: "获取成功",
        data: result
      };
    } catch (err) {
      ctx.body = {
        code: 50000,
        message: '获取失败'
      };
    }
  }

  async find() {
    const {ctx} = this;

    let id = ctx.request.body.id;

    const reuslt = await ctx
      .service
      .access
      .findOne(id);

    ctx.body = {
      code: 20000,
      data: reuslt
    };
  }

  async create() {
    const ctx = this.ctx;

    let post = ctx.request.body;

    try {
      await ctx
        .service
        .access
        .create(post);
      ctx.body = {
        code: 20000,
        message: "添加成功"
      };
    } catch (err) {
      if (err.code == 11000) {
        ctx.body = {
          code: 11000,
          message: "权限名称以存在"
        };
      }
    }

  }

  async update() {
    const ctx = this.ctx;
    let post = ctx.request.body;
    let id = ctx.params.id;

    const result = await ctx
      .service
      .access
      .updateRoles(id, post);
    if (result) {
      ctx.body = {
        code: 20000,
        message: "更改成功"
      }
    } else {
      ctx.body = {
        code: 50000,
        message: "更改失败"
      }
    }

  }

  async destroy() {
    const {ctx} = this;
    let id = ctx.params.id;

    const result = await ctx
      .service
      .access
      .destroy(id);

    if (result) {
      ctx.body = {
        code: 20000,
        message: "删除成功"
      }
    } else {
      ctx.body = {
        code: 50000,
        message: "删除失败"
      };
    }

  }

}

module.exports = AccessController;
