'use strict'

module.exports = options => {
    return async function auth(ctx, next) {
        const token = ctx.header['authorization'];
        if (!token) {
            ctx.body = {
                error: 'unauthorized_request',
                error_description: 'Unauthorized request: no authentication given'
            }
            ctx.status = 401;
            return;
        }
        return await ctx.app.oAuth2Server.authenticate()(ctx, next);
    }
}

//module.exports = require('koa-jwt');