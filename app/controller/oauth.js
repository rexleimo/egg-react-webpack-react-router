'use strict';

const Controller = require('egg').Controller;
var rp = require('request-promise');

class OAuthController extends Controller {

  // 登录页
  async login() {
    // 发送/token
    const Authorization = Buffer.from('2ah61vbVTR4xK8ih:ncpI2dpDC1YEB2rvawwz1CuV83Xs6a1B').toString('base64');
    console.log(Authorization);
    var options = {
      method: "POST",
      uri: "http://localhost:7001/oauth2/token",
      form: {
        grant_type: "password",
        username: `${this.ctx.request.body.username}`,
        password: `${this.ctx.request.body.userpwd}`
      }
      , headers: {
        'Authorization': `Basic  ${Authorization}`
      }
      , json: true
    };

    let result = await rp(options);

    console.log(result);

    this.ctx.body = {
      code: 20000,
      message: "获取成功",
      data: result
    }
  }

  // 认证过的请求
  async authenticate() {
    this.ctx.body = {
      msg: 'successed!'
    }
  }

  // 返回Token
  async token() {
    this.ctx.body = this.ctx.state.oauth.token
  }

  //退出操作
  async logout() {
    const { ctx } = this;
    const token = ctx.state.oauth.token;
    try {
      const result = await ctx.service.accesstoken.revokeToken(token);
      ctx.body = {
        code: 20000,
        message: "操作成功"
      };
    } catch (err) {
      ctx.body = {
        code: 50000,
        message: "操作失败"
      };
    }
  }

}

module.exports = OAuthController;