const Service = require('egg').Service;

class AccessTokenService extends Service {

    async revokeToken(token) {
        let accessToken = await this.ctx.model.AccessToken.findOne({ accessToken: token.accessToken });
        if (!accessToken) {
            this.ctx.throw(404, 'accessToken not found.');
        }
        return await this.ctx.model.AccessToken.remove({ accessToken: token.accessToken })
    }
}

module.exports = AccessTokenService;